import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Share2,
  Copy,
  RotateCcw,
  BookOpen,
  Brain,
  Heart,
  Shield,
  Zap,
  Check,
  Users,
  Loader2,
  Download,
  AlertTriangle,
  Smile,
  Bot,
  Sparkles,
  X,
  Compass
} from 'lucide-react';
import { DiagnosisResult } from '../lib/diagnosisLogic';
import { PERSONALITY_TYPES, PersonalityResult } from '../data/results';
import { soundManager } from '../lib/soundEffects';

interface ResultScreenProps {
  result: DiagnosisResult;
  onRetake: () => void;
  onOpenAllTypes: () => void;
  onSelectTypeDetail: (type: PersonalityResult) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRetake,
  onOpenAllTypes,
}) => {
  const { matchedPersonality, customStatus, zodiac, profile } = result;

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'strengths' | 'weaknesses' | 'relationship' | 'advice'>('overview');

  // AI Deep Reading State
  const [aiReading, setAiReading] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // AI Compatibility Modal State
  const [showCompatModal, setShowCompatModal] = useState(false);
  const [compatPartnerName, setCompatPartnerName] = useState('');
  const [compatPartnerTypeId, setCompatPartnerTypeId] = useState<string>('passion_leader');
  const [compatResultText, setCompatResultText] = useState<string | null>(null);
  const [isCompatLoading, setIsCompatLoading] = useState(false);

  // "About Me" AI Prompt Modal State
  const [showAboutAiModal, setShowAboutAiModal] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);

  // Copied state
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#10b981', '#ef4444'],
      });
    } catch {
      // Ignore confetti error
    }
  }, []);

  // Fetch AI Deep Reading
  const handleFetchAiReading = async () => {
    soundManager.playClick();
    setIsAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/deep-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalityName: matchedPersonality.name,
          tagline: matchedPersonality.tagline,
          categoryTag: matchedPersonality.categoryTag,
          status: customStatus,
        }),
      });

      const data = await response.json();
      if (data.success && data.reading) {
        setAiReading(data.reading);
      } else {
        setAiError(data.error || 'AIレポートの生成に失敗しました。');
      }
    } catch {
      setAiError('通信エラーが発生しました。時間を置いて再度お試しください。');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Run AI Compatibility Check
  const handleRunAiCompatibility = async () => {
    soundManager.playClick();
    setIsCompatLoading(true);
    setCompatResultText(null);

    const partnerType = PERSONALITY_TYPES[compatPartnerTypeId];

    try {
      const response = await fetch('/api/gemini/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          myName: '自分',
          myPersonality: matchedPersonality.name,
          targetName: compatPartnerName || 'お相手',
          targetPersonality: partnerType ? partnerType.name : '相手のタイプ',
        }),
      });

      const data = await response.json();
      if (data.success && data.compatibility) {
        setCompatResultText(data.compatibility);
      }
    } catch {
      setCompatResultText('相性分析の通信エラーが発生しました。');
    } finally {
      setIsCompatLoading(false);
    }
  };

  // Share Actions
  const shareText = `【性格診断結果】私の性格タイプは『${matchedPersonality.name}』でした！\n「${matchedPersonality.tagline}」\n#本格性格診断 #行動分析`;
  const shareUrl = window.location.href;

  const handleShareLINE = () => {
    soundManager.playClick();
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate "About Me" AI System Prompt Text with Full Context
  const aboutAiPromptText = `【AIへの相談・分析依頼プロンプト】
以下は、私がWEBの本格性格診断アプリ（全25問の行動質問＋基本プロフィール）を実施して得られた、私の性格・行動パターン・思考傾向に関する詳細な診断データです。

あなたには「私の個性を理解したプロのパーソナルキャリアコーチ兼ライフアドバイザー」として、このデータをもとに私の強みの活かし方・適職・人間関係のコツについてアドバイスをしてほしいです。

==================================================
■ 私の基本診断データ
・性格タイプ名：${matchedPersonality.name}
・タイプ分類　：${matchedPersonality.categoryTag}
・特徴キャッチ：「${matchedPersonality.tagline}」
・星座　　　　：${zodiac.signJP}
・分析実施日時：${new Date(result.timestamp).toLocaleDateString('ja-JP')}

■ 5つの行動指標スコア（各100点満点）
・論理的思考力（思考の客観性・分析力） : ${customStatus.logic} %
・行動性・推進力（実行力・意思決定）   : ${customStatus.action} %
・協調・共感力   （配慮・チームワーク） : ${customStatus.empathy} %
・創造性・独自性（発想力・アイデア）   : ${customStatus.creativity} %
・メンタル・安定性（ストレス耐性・軸） : ${customStatus.stability} %

■ 詳細な定性分析データ
【1. 全体的特徴】
${matchedPersonality.description.overview}

【2. 主な強み】
${matchedPersonality.description.strengths}

【3. 注意したい弱み・傾向】
${matchedPersonality.description.weaknesses}

【4. 人間関係・コミュニケーションの傾向】
${matchedPersonality.description.relationship}

【5. アナリストからの基本アドバイス】
${matchedPersonality.description.advice}

■ 人間関係の相性傾向
・相性の良いタイプ：${matchedPersonality.affinity.bestPartnerName}（${matchedPersonality.affinity.bestPartnerReason}）
・すれ違いやすいタイプ：${matchedPersonality.affinity.challengePartnerName}（${matchedPersonality.affinity.challengeReason}）
${aiReading ? `\n■ AI追加アドバイス\n${aiReading}\n` : ''}
==================================================

【あなた（AI）へのお願い・質問】
上記の診断結果とコンテキストを前提として、私に対して以下の3点について具体的にアドバイスしてください。

1. 【適職と成果の出し方】
私の性格と行動スコアの強みを最も活かせる職種・働き方のスタイル・プロジェクトでの理想的な役割は何ですか？

2. 【人間関係とコミュニケーション】
「すれ違いやすいタイプ」や苦手な相手と関わる際、私がストレスを溜めずにスムーズにコラボレーションするための具体的なコミュニケーションのコツは何ですか？

3. 【明日からの習慣・アクションプラン】
私の注意点（弱み）をフォローし、今後さらに個人として成長するために、明日から取り入れられる具体的な行動習慣を3つ教えてください。`;

  const handleCopyAboutAiPrompt = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(aboutAiPromptText);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  // Rich Expanded Output File Download
  const handleDownloadCard = () => {
    soundManager.playClick();
    const fullReportText = `==================================================
【本格性格診断 - 詳細分析結果レポート】
==================================================
作成日時: ${new Date(result.timestamp).toLocaleString('ja-JP')}

■ 診断結果サマリー
・性格タイプ: ${matchedPersonality.name}
・分類タグ  : ${matchedPersonality.categoryTag}
・キャッチコピー: 「${matchedPersonality.tagline}」
・星座: ${zodiac.signJP}

--------------------------------------------------
■ 5つの行動指標・スコア（100点満点）
--------------------------------------------------
・論理的思考 : ${customStatus.logic}%
・行動性・推進力 : ${customStatus.action}%
・協調・共感力   : ${customStatus.empathy}%
・創造性・独自性 : ${customStatus.creativity}%
・メンタル・安定性: ${customStatus.stability}%

--------------------------------------------------
■ 性格の詳細分析
--------------------------------------------------
【1. 全体的特徴】
${matchedPersonality.description.overview}

【2. あなたの強み】
${matchedPersonality.description.strengths}

【3. 注意したいポイント】
${matchedPersonality.description.weaknesses}

【4. 人間関係・コミュニケーションの傾向】
${matchedPersonality.description.relationship}

【5. アドバイス】
${matchedPersonality.description.advice}

--------------------------------------------------
■ 相性の傾向
--------------------------------------------------
・最高の相性パートナー:
  ${matchedPersonality.affinity.bestPartnerName}
  理由: ${matchedPersonality.affinity.bestPartnerReason}

・すれ違いやすい注意パートナー:
  ${matchedPersonality.affinity.challengePartnerName}
  理由: ${matchedPersonality.affinity.challengeReason}
${aiReading ? `\n--------------------------------------------------\n■ AI詳細アドバイスレポート\n--------------------------------------------------\n${aiReading}\n` : ''}
==================================================
本格性格診断 - Personality Diagnosis System
`;

    const blob = new Blob([fullReportText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Personality_Report_${matchedPersonality.id}_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start px-4 py-6 max-w-xl mx-auto text-slate-100 space-y-6">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between z-20">
        <button
          onClick={() => { soundManager.playClick(); onRetake(); }}
          className="p-2 rounded-full glass-card hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 text-xs transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
          <span>もう一度診断する</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setShowAboutAiModal(true); }}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-xs text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
        >
          <Bot className="w-4 h-4 text-indigo-200" />
          <span>私について（AIプロンプト）</span>
        </button>
      </div>

      {/* Main Result Card */}
      <div className={`w-full glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-indigo-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br ${matchedPersonality.gradientBg}`}>
        {/* Category Header */}
        <div className="flex items-center justify-between text-xs z-10 relative">
          <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-indigo-200 font-semibold">
            {matchedPersonality.categoryTag}
          </span>
          <span className="text-slate-400 text-[11px]">
            {zodiac.signJP}
          </span>
        </div>

        {/* Title Block */}
        <div className="text-center space-y-3 pt-2 relative z-10">
          <div className="text-5xl sm:text-6xl drop-shadow-md">
            {matchedPersonality.symbolEmoji}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {matchedPersonality.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-md mx-auto leading-relaxed border-y border-white/10 py-2.5">
            「{matchedPersonality.tagline}」
          </p>
        </div>

        {/* 5 Core Status Meters */}
        <div className="space-y-3 pt-2 relative z-10 bg-slate-950/70 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
            <span>行動指標・パラメーター</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 text-xs">
            {[
              { label: '論理的思考', score: customStatus.logic, color: 'from-blue-500 to-indigo-500' },
              { label: '行動性・推進力', score: customStatus.action, color: 'from-rose-500 to-red-500' },
              { label: '協調・共感力', score: customStatus.empathy, color: 'from-emerald-500 to-teal-500' },
              { label: '創造性・独自性', score: customStatus.creativity, color: 'from-amber-500 to-orange-500' },
              { label: 'メンタル・安定性', score: customStatus.stability, color: 'from-purple-500 to-indigo-500' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>{stat.label}</span>
                  <span className="font-mono font-bold text-indigo-300">{stat.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${stat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tabs for Breakdown */}
      <div className="w-full glass-panel rounded-2xl p-5 space-y-4 border border-white/10 shadow-xl">
        {/* Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'overview', label: '全体特徴', icon: Smile },
            { id: 'strengths', label: '強み', icon: Shield },
            { id: 'weaknesses', label: '注意点', icon: AlertTriangle },
            { id: 'relationship', label: '人間関係', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { soundManager.playClick(); setActiveTab(tab.id as typeof activeTab); }}
                className={`py-2 px-1 rounded-lg font-medium transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal min-h-[140px] bg-slate-900/50 rounded-xl border border-white/5">
          {activeTab === 'overview' && (
            <div className="space-y-2 animate-fade-in">
              <h4 className="font-bold text-indigo-300 text-xs">【全体的特徴】</h4>
              <p className="leading-relaxed">{matchedPersonality.description.overview}</p>
            </div>
          )}

          {activeTab === 'strengths' && (
            <div className="space-y-2 animate-fade-in">
              <h4 className="font-bold text-emerald-300 text-xs">【あなたの主な強み】</h4>
              <p className="leading-relaxed">{matchedPersonality.description.strengths}</p>
            </div>
          )}

          {activeTab === 'weaknesses' && (
            <div className="space-y-2 animate-fade-in">
              <h4 className="font-bold text-amber-300 text-xs">【気をつけたい注意点】</h4>
              <p className="leading-relaxed">{matchedPersonality.description.weaknesses}</p>
            </div>
          )}

          {activeTab === 'relationship' && (
            <div className="space-y-2 animate-fade-in">
              <h4 className="font-bold text-pink-300 text-xs">【人間関係・仕事での傾向】</h4>
              <p className="leading-relaxed">{matchedPersonality.description.relationship}</p>
            </div>
          )}
        </div>
      </div>

      {/* Best & Incompatible Partner Compatibility Cards */}
      <div className="w-full glass-panel rounded-2xl p-5 space-y-4 border border-white/10">
        <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>相性の良いタイプ & 難易度の高いタイプ</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Best Partner */}
          <div className="glass-card p-3.5 rounded-xl border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                相性抜群（ベスト）
              </span>
            </div>
            <p className="font-bold text-slate-100 text-sm">{matchedPersonality.affinity.bestPartnerName}</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">{matchedPersonality.affinity.bestPartnerReason}</p>
          </div>

          {/* Incompatible Partner */}
          <div className="glass-card p-3.5 rounded-xl border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                すれ違いやすいタイプ（注意）
              </span>
            </div>
            <p className="font-bold text-slate-100 text-sm">{matchedPersonality.affinity.challengePartnerName}</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">{matchedPersonality.affinity.challengeReason}</p>
          </div>
        </div>

        <button
          onClick={() => { soundManager.playClick(); setShowCompatModal(true); }}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-indigo-500/40 text-xs text-indigo-200 hover:border-indigo-400 flex items-center justify-center gap-2 transition-all"
        >
          <span>特定の相手・友人とのAI相性分析を行う</span>
        </button>
      </div>

      {/* AI Deep Reading Button */}
      <div className="w-full glass-panel rounded-2xl p-5 space-y-4 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950">
        <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
          <span className="flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>AIアドバイスレポート</span>
          </span>
        </div>

        {!aiReading ? (
          <div className="text-center py-2 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              Google Gemini AIがあなたの回答傾向を統合分析し、個別の詳細アドバイスを生成します。
            </p>
            <button
              onClick={handleFetchAiReading}
              disabled={isAiLoading}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-200" />
                  <span>AIがアドバイスを分析作成中...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-indigo-200" />
                  <span>AI詳細アドバイスレポートを作成する</span>
                </>
              )}
            </button>
            {aiError && <p className="text-xs text-rose-400 pt-1">{aiError}</p>}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-xs text-slate-200 leading-relaxed space-y-3 animate-fade-in font-normal">
            <div className="whitespace-pre-wrap">{aiReading}</div>
          </div>
        )}
      </div>

      {/* Share Actions */}
      <div className="w-full space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            onClick={() => { soundManager.playClick(); setShowAboutAiModal(true); }}
            className="py-3 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white flex items-center justify-center gap-1.5 font-bold shadow-md transition-all"
          >
            <Bot className="w-4 h-4 text-indigo-200" />
            <span>私について</span>
          </button>

          <button
            onClick={handleShareLINE}
            className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-100 flex items-center justify-center gap-1.5 font-medium transition-all"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>LINEで送る</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-400 text-slate-100 flex items-center justify-center gap-1.5 font-medium transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? 'コピー完了' : '結果をコピー'}</span>
          </button>

          <button
            onClick={handleDownloadCard}
            className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-400 text-slate-100 flex items-center justify-center gap-1.5 font-medium transition-all"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>詳細保存</span>
          </button>
        </div>

        <button
          onClick={() => { soundManager.playClick(); onOpenAllTypes(); }}
          className="w-full py-3 px-4 rounded-xl glass-card border-slate-800 hover:border-indigo-400 text-xs text-slate-300 flex items-center justify-center gap-2 transition-all"
        >
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>全20種類の性格タイプ一覧を見る</span>
        </button>
      </div>

      {/* "ABOUT ME" AI PROMPT MODAL WITH FULL CONTEXT */}
      {showAboutAiModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 space-y-4 border border-indigo-500/50 relative max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowAboutAiModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 shrink-0 pr-6">
              <div className="flex items-center gap-2 text-indigo-300">
                <Bot className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">私について（AI深層分析用プロンプト）</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                以下のコンテキスト付きプロンプトをコピーして ChatGPT、Gemini、Claude などのAIに送ると、AIがあなたの専属コーチとなって適職やアドバイスを返してくれます。
              </p>
            </div>

            {/* Formatted Code Block */}
            <div className="flex-1 overflow-y-auto p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
              {aboutAiPromptText}
            </div>

            {/* Copy Button */}
            <div className="pt-2 shrink-0 space-y-2">
              <button
                onClick={handleCopyAboutAiPrompt}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {promptCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>コンテキスト付きプロンプトをコピーしました！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-indigo-200" />
                    <span>プロンプトをワンタップでコピーする</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400">
                ※ コピー後、AI（ChatGPTなど）の新規チャット画面にペーストして送信してください
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI COMPATIBILITY MODAL */}
      {showCompatModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 space-y-4 border border-indigo-500/40 relative">
            <button
              onClick={() => setShowCompatModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI 相性分析</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">お相手のお名前（任意）</label>
                <input
                  type="text"
                  placeholder="例：同僚・友人"
                  value={compatPartnerName}
                  onChange={(e) => setCompatPartnerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">お相手の性格タイプを選択</label>
                <select
                  value={compatPartnerTypeId}
                  onChange={(e) => setCompatPartnerTypeId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-400"
                >
                  {Object.values(PERSONALITY_TYPES).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleRunAiCompatibility}
                disabled={isCompatLoading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCompatLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>相性を分析中...</span>
                  </>
                ) : (
                  <span>相性を分析する</span>
                )}
              </button>

              {compatResultText && (
                <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-500/30 text-xs text-slate-200 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap mt-3">
                  {compatResultText}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
