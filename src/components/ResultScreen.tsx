import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Share2,
  Copy,
  RotateCcw,
  BookOpen,
  Check,
  Award,
  Users,
  Shield,
  Zap,
  Heart,
  Brain,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowRight
} from 'lucide-react';
import { DiagnosisResult } from '../lib/diagnosisLogic';
import { soundManager } from '../lib/soundEffects';
import { CharacterPortraitCard } from './CharacterPortraitCard';

interface ResultScreenProps {
  result: DiagnosisResult;
  onRestart: () => void;
  onOpenAllTypes: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRestart,
  onOpenAllTypes,
}) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'career' | 'affinity' | 'aiprompt' | 'glossary'>('detail');
  const [copied, setCopied] = useState(false);
  const [showAccuracyTips, setShowAccuracyTips] = useState(false);

  const { matchedPersonality, customStatus, profile, zodiac, aiPromptText } = result;
  const confidenceScore = result.confidenceScore || 90;
  const precisionLevel = result.precisionLevel || 'Aランク（高精度）';
  const affinity = matchedPersonality.affinity;

  // Glossary terms list
  const GLOSSARY_ITEMS = [
    { term: 'ストラテジスト', meaning: '【戦略参謀】', desc: '感情に流されず、全体を俯瞰して数歩先の未来を予測し、勝率の高い作戦を組み立てる参謀。', icon: '🦉' },
    { term: 'ビジョナリー', meaning: '【未来構想家】', desc: 'スケールの大きな夢や未来像（ビジョン）を描き、前向きな熱量で周囲に希望を与える人。', icon: '🦅' },
    { term: 'ハーモナイザー', meaning: '【調和者】', desc: '場の空気や人間関係のハーモニー（調和）を守り、誰もが安心できる穏やかな居場所を作る人。', icon: '🦌' },
    { term: 'オーガナイザー', meaning: '【組織整備士】', desc: '散らかったタスクや不透明な仕組みをオーガナイズ（綺麗に整理整頓）する実務家。', icon: '🦫' },
    { term: 'パイオニア', meaning: '【開拓者】', desc: 'リスクを恐れず、誰も足を踏み入れていない前人未到の領域へ真っ先に進む先駆者。', icon: '🐆' },
    { term: 'アナリスト', meaning: '【分析者】', desc: '事実やデータに基づいて冷静に物事の裏側や原因を分析（アナライズ）する知性派。', icon: '🦅' },
    { term: 'プロモーター', meaning: '【発信推進者】', desc: 'アイデアや企画の魅力をプロモート（大々的に宣伝・発信）し、ムーブメントを作る人。', icon: '📣' },
    { term: 'パーフェクショニスト', meaning: '【完璧追求者】', desc: '妥協を許さず、高い完成度とプロ意識でクオリティを極限まで高める職人。', icon: '🎯' },
    { term: 'イノベーター', meaning: '【技術革新者】', desc: '従来の常識や枠組みを打破し、革新的なアイデアやイノベーションを起こす創発者。', icon: '🦄' },
    { term: 'メディエーター', meaning: '【仲裁調停者】', desc: '対立する意見の真ん中に立ち、双方の納得いく着地点を導き出すバランス調整役。', icon: '🕊️' },
    { term: 'クリエイター', meaning: '【創作者】', desc: '既成概念にとらわれない柔軟な発想と感性でワクワクする新しい価値を創り出す人。', icon: '🦊' },
    { term: 'サポーター', meaning: '【支援者】', desc: '困っている人や悩んでいる人に寄り添い、足元を温かく支える献身的なパートナー。', icon: '🐬' },
    { term: 'スペシャリスト', meaning: '【専門探求者】', desc: '流行に左右されず、自分の興味のあるテーマを深く追求して極める探求者。', icon: '🐆' },
    { term: 'カウンセラー', meaning: '【相談役】', desc: '人の隠れた悩みや微細な感情に耳を傾け、深い包容力で受け止める心の専門家。', icon: '🦢' },
    { term: '守護エレメント', meaning: '【占星術の4大属性】', desc: '西洋占星術の4大要素（火＝情熱、地＝現実安定、風＝客観知性、水＝情感共感）を指します。', icon: '🔮' },
  ];

  // Trigger celebration confetti on mount
  useEffect(() => {
    soundManager.playFanfare();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
    });
  }, []);

  // Copy AI Prompt
  const handleCopyPrompt = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(aiPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Web Share
  const handleShare = () => {
    soundManager.playClick();
    const shareData = {
      title: `【本格性格タイプ診断】私の結果は「${matchedPersonality.name}」でした！`,
      text: `【本格性格診断】私の性格タイプは『${matchedPersonality.name}』(${matchedPersonality.categoryTag})でした！\n「${matchedPersonality.tagline}」\n#性格診断 #本格心理テスト`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      alert('診断結果のテキストをコピーしました！SNS等でシェアしてください。');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start px-4 py-6 max-w-2xl mx-auto text-slate-100 pb-20">
      {/* Top Action Bar */}
      <div className="w-full flex items-center justify-between py-2 z-20 mb-2">
        <button
          onClick={onRestart}
          className="p-2.5 rounded-xl glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-medium"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>最初に戻る</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAllTypes}
            className="p-2.5 rounded-xl glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-medium"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>全24タイプ</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-bold border border-indigo-400/30"
          >
            <Share2 className="w-4 h-4" />
            <span>結果をシェア</span>
          </button>
        </div>
      </div>

      {/* Styled Character Portrait Hero Card */}
      <div className="w-full my-2">
        <CharacterPortraitCard personality={matchedPersonality} size="large" />
      </div>

      {/* Basic Profile Quick Info & Accuracy Meter */}
      <div className="w-full glass-card rounded-2xl p-3.5 px-4 flex flex-col gap-2.5 my-2 border border-white/10 shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>{profile.birthdate} ({zodiac.signJP}・{zodiac.element}属性)</span>
          </span>
          <span className="text-slate-400">
            利き手: {profile.dominantHand === 'left' ? '左手' : profile.dominantHand === 'both' ? '両利き' : '右手'}
          </span>
        </div>

        {/* Diagnostic Precision & Confidence Rating */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-200">診断適合精度:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                  {precisionLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">コサイン類似度スコア: <span className="font-bold text-emerald-300">{confidenceScore}%</span></p>
            </div>
          </div>

          <button
            onClick={() => { soundManager.playClick(); setShowAccuracyTips(!showAccuracyTips); }}
            className="text-[11px] text-indigo-300 hover:text-indigo-200 underline flex items-center gap-1 shrink-0 font-medium"
          >
            <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
            <span>精度向上のコツ</span>
          </button>
        </div>

        {/* Accuracy Tips Expandable Guide Box */}
        {showAccuracyTips && (
          <div className="mt-1 p-3 rounded-xl bg-slate-900/95 border border-indigo-500/30 text-xs text-slate-300 space-y-2 animate-fadeIn">
            <div className="font-bold text-yellow-300 flex items-center gap-1.5 border-b border-white/10 pb-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>診断精度（回答の信頼度）を高めるコツ</span>
            </div>
            <ul className="space-y-1.5 text-[11px] leading-relaxed text-slate-300 list-disc pl-4">
              <li>
                <strong className="text-white">直感で素早く答える:</strong> 深く考え込まず「素の自分」の最初の直感で答えると、本質的な傾向が出やすくなります。
              </li>
              <li>
                <strong className="text-white">「当てはまり度（5段階）」評価を選ぶ:</strong> 微妙な心の強弱が連続体（グラデーション）として計算され、ベクトルの解像度が最高精度になります。
              </li>
              <li>
                <strong className="text-white">詳細プロファイルを入力する:</strong> 出生地や恋愛状況を入力すると、西洋占星術の属性補正とAIプロンプトの個別具体化度がアップします。
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 8-Dimensional Trait Vector Precision Analysis Card */}
      <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-indigo-500/30 space-y-3.5 relative z-10 my-2 shadow-2xl backdrop-blur-md">
        <div className="text-xs font-bold text-slate-100 flex items-center justify-between border-b border-white/10 pb-2">
          <span className="flex items-center gap-1.5 text-amber-300 font-serif text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>8因子性格ベクトル分析（精密診断データ）</span>
          </span>
          <span className="text-[10px] bg-indigo-950 px-2 py-0.5 rounded-full text-indigo-300 font-mono border border-indigo-500/30">
            PRIMARY: {result.primaryTrait.toUpperCase()}
          </span>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          全25問の多角的な心理評価から抽出された、あなたの「8つのパーソナリティ基本因子」の構成割合です。最も高い上位2つの因子が性格タイプの決定基盤となっています。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
          {[
            { key: 'leader', label: 'リーダーシップ（行動・推進）', color: 'from-rose-500 to-red-600', text: 'text-rose-300' },
            { key: 'analyst', label: '論理分析力（客観・思考）', color: 'from-blue-500 to-indigo-600', text: 'text-blue-300' },
            { key: 'creator', label: '創造発想力（独創・表現）', color: 'from-amber-500 to-orange-600', text: 'text-amber-300' },
            { key: 'supporter', label: '支援貢献力（共感・ホスピタリティ）', color: 'from-emerald-500 to-teal-600', text: 'text-emerald-300' },
            { key: 'realist', label: '現実着実性（リスク・安全）', color: 'from-slate-400 to-zinc-600', text: 'text-slate-300' },
            { key: 'idealist', label: '理想追及力（ビジョン・情熱）', color: 'from-yellow-400 to-amber-500', text: 'text-yellow-300' },
            { key: 'individual', label: '独自独立性（マイペース・自己探求）', color: 'from-purple-500 to-violet-600', text: 'text-purple-300' },
            { key: 'harmonizer', label: '調和協調性（平和・場の空気）', color: 'from-cyan-500 to-blue-600', text: 'text-cyan-300' },
          ].map(trait => {
            const pct = result.traitPercentages[trait.key as keyof typeof result.traitPercentages] || 0;
            const isPrimary = trait.key === result.primaryTrait;
            const isSecondary = trait.key === result.secondaryTrait;
            return (
              <div key={trait.key} className={`p-2 rounded-xl border transition-all ${
                isPrimary ? 'bg-indigo-950/80 border-amber-400/60 ring-1 ring-amber-400/40' :
                isSecondary ? 'bg-slate-950/80 border-indigo-500/40' : 'bg-slate-950/50 border-white/5'
              }`}>
                <div className="flex items-center justify-between font-medium text-[11px] mb-1">
                  <span className="flex items-center gap-1 text-slate-200">
                    <span>{trait.label}</span>
                    {isPrimary && <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-300 font-bold rounded border border-amber-500/40">主因子</span>}
                    {isSecondary && <span className="text-[9px] px-1 py-0.2 bg-indigo-500/20 text-indigo-300 font-bold rounded border border-indigo-500/40">副因子</span>}
                  </span>
                  <span className={`font-mono font-bold ${trait.text}`}>{pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${trait.color} transition-all duration-500`}
                    style={{ width: `${Math.max(4, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Radar Gauges (5 Parameters) */}
      <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-white/10 space-y-3 relative z-10 my-2 shadow-xl">
        <div className="text-xs font-bold text-slate-200 flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>思考・行動ステータス (100pt スケール)</span>
          </span>
          <span className="text-[10px] text-indigo-400 font-mono">DIAGNOSIS MATRIX</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-medium">
              <span>論理的思考力</span>
              <span className="font-mono text-indigo-400">{customStatus.logic} pt</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${customStatus.logic}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-medium">
              <span>行動力・推進力</span>
              <span className="font-mono text-rose-400">{customStatus.action} pt</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${customStatus.action}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-medium">
              <span>協調性・共感力</span>
              <span className="font-mono text-emerald-400">{customStatus.empathy} pt</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${customStatus.empathy}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-medium">
              <span>創造性・独創性</span>
              <span className="font-mono text-amber-400">{customStatus.creativity} pt</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${customStatus.creativity}%` }} />
            </div>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <div className="flex justify-between text-slate-300 font-medium">
              <span>精神的安定度</span>
              <span className="font-mono text-cyan-400">{customStatus.stability} pt</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${customStatus.stability}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher (5 Tabs) */}
      <div className="w-full grid grid-cols-3 sm:grid-cols-5 gap-1 rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 text-[11px] sm:text-xs font-bold my-2 shadow-lg">
        <button
          onClick={() => { soundManager.playClick(); setActiveTab('detail'); }}
          className={`py-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
            activeTab === 'detail'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>本質＆強み</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setActiveTab('career'); }}
          className={`py-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
            activeTab === 'career'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>仕事＆恋愛</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setActiveTab('affinity'); }}
          className={`py-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
            activeTab === 'affinity'
              ? 'bg-indigo-600 text-white shadow-md font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>詳細相性</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setActiveTab('glossary'); }}
          className={`py-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
            activeTab === 'glossary'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>用語解説</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setActiveTab('aiprompt'); }}
          className={`py-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 col-span-2 sm:col-span-1 ${
            activeTab === 'aiprompt'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>AIプロンプト</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & STRENGTHS */}
      {activeTab === 'detail' && (
        <div className="w-full space-y-4 animate-fade-in text-xs sm:text-sm my-2">
          {/* Quick Glossary Guide Banner */}
          <div
            onClick={() => { soundManager.playClick(); setActiveTab('glossary'); }}
            className="w-full glass-card rounded-2xl p-3 px-4 border border-purple-500/30 bg-purple-950/20 flex items-center justify-between text-xs text-purple-200 cursor-pointer hover:border-purple-400/60 transition-all shadow-md group"
          >
            <div className="flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-amber-300 shrink-0 group-hover:scale-110 transition-transform" />
              <span>カタカナ称号や用語の意味はこちら 【🔮 用語解説ガイド】</span>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>

          {/* Overview */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2 text-sm border-b border-white/10 pb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>性格の全体像と本質</span>
            </h3>
            <p className="text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
              {matchedPersonality.description.overview}
            </p>
          </div>

          {/* Strengths */}
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/20 space-y-2">
            <h3 className="font-bold text-emerald-300 flex items-center gap-2 text-sm border-b border-emerald-500/20 pb-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>あなたの主な強みと潜在能力</span>
            </h3>
            <p className="text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
              {matchedPersonality.description.strengths}
            </p>
          </div>

          {/* Blind Spots / Caution Points */}
          <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-amber-950/20 space-y-2">
            <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm border-b border-amber-500/20 pb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>注意点・陥りやすい思考の穴</span>
            </h3>
            <p className="text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
              {matchedPersonality.description.weaknesses}
            </p>
          </div>

          {/* Actionable Advice */}
          <div className="glass-card rounded-2xl p-5 border border-indigo-500/30 bg-indigo-950/20 space-y-2">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2 text-sm border-b border-indigo-500/20 pb-2">
              <Lightbulb className="w-4 h-4 text-indigo-400" />
              <span>開運と成長のためのアクションアドバイス</span>
            </h3>
            <p className="text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
              {matchedPersonality.description.advice}
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: CAREER & LOVE */}
      {activeTab === 'career' && (
        <div className="w-full space-y-4 animate-fade-in text-xs sm:text-sm my-2">
          {/* Work Style */}
          <div className="glass-card rounded-2xl p-5 border border-blue-500/30 bg-blue-950/20 space-y-2">
            <h3 className="font-bold text-blue-300 flex items-center gap-2 text-sm border-b border-blue-500/20 pb-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>仕事・適職・キャリアのスタイル</span>
            </h3>
            <p className="text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
              {matchedPersonality.description.workStyle}
            </p>
          </div>

          {/* Interpersonal Dynamics */}
          <div className="glass-card rounded-2xl p-5 border border-indigo-500/30 bg-indigo-950/20 space-y-2">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2 text-sm border-b border-indigo-500/20 pb-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>人間関係とコミュニケーションの傾向</span>
            </h3>
            <p className="text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
              {matchedPersonality.description.relationship}
            </p>
          </div>

          {/* Love & Marriage */}
          <div className="glass-card rounded-2xl p-5 border border-pink-500/30 bg-pink-950/20 space-y-2">
            <h3 className="font-bold text-pink-300 flex items-center gap-2 text-sm border-b border-pink-500/20 pb-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span>恋愛・パートナーシップの傾向</span>
            </h3>
            <p className="text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
              {matchedPersonality.description.loveAndMarriage}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: EXTENDED DETAILED AFFINITY (相性診断) */}
      {activeTab === 'affinity' && (
        <div className="w-full space-y-5 animate-fade-in text-xs sm:text-sm my-2">
          
          {/* 1. BEST PARTNER */}
          <div className="glass-card rounded-2xl p-5 border-2 border-emerald-500/40 bg-emerald-950/30 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
              <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>最高の相性（ベストパートナー）</span>
              </div>
              <span className="text-[10px] bg-emerald-900/90 text-emerald-300 font-extrabold px-3 py-1 rounded-full border border-emerald-500/50 shadow-md">
                相性スコア 98% ★★★★★
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                  {affinity.bestPartnerCategory}
                </span>
                <h4 className="text-lg font-black text-white">
                  {affinity.bestPartnerName}
                </h4>
              </div>

              <div className="space-y-2 text-slate-200 leading-relaxed font-normal">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>相性の詳細解説</span>
                  </div>
                  <p className="whitespace-pre-wrap">{affinity.bestPartnerReason}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>関係を最良に保つコツ</span>
                  </div>
                  <p className="whitespace-pre-wrap">{affinity.bestPartnerAdvice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SYNERGY PARTNER */}
          {affinity.synergyPartnerName && (
            <div className="glass-card rounded-2xl p-5 border-2 border-indigo-500/40 bg-indigo-950/30 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-indigo-500/30 pb-2">
                <div className="flex items-center gap-2 font-bold text-indigo-300 text-sm">
                  <Zap className="w-5 h-5 text-indigo-400" />
                  <span>補い合う相性（シナジーパートナー）</span>
                </div>
                <span className="text-[10px] bg-indigo-900/90 text-indigo-300 font-extrabold px-3 py-1 rounded-full border border-indigo-500/50 shadow-md">
                  掛け合わせ効果 ★★★★☆
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40 font-bold">
                    {affinity.synergyPartnerCategory}
                  </span>
                  <h4 className="text-lg font-black text-white">
                    {affinity.synergyPartnerName}
                  </h4>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-indigo-500/20 text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
                  {affinity.synergyPartnerReason}
                </div>
              </div>
            </div>
          )}

          {/* 3. CHALLENGE PARTNER */}
          <div className="glass-card rounded-2xl p-5 border-2 border-rose-500/40 bg-rose-950/30 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-rose-500/30 pb-2">
              <div className="flex items-center gap-2 font-bold text-rose-300 text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>注意が必要な相性（チャレンジパートナー）</span>
              </div>
              <span className="text-[10px] bg-rose-900/90 text-rose-300 font-extrabold px-3 py-1 rounded-full border border-rose-500/50 shadow-md">
                相互理解が必要 ★★☆☆☆
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                  {affinity.challengePartnerCategory}
                </span>
                <h4 className="text-lg font-black text-white">
                  {affinity.challengePartnerName}
                </h4>
              </div>

              <div className="space-y-2 text-slate-200 leading-relaxed font-normal">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-rose-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>すれ違いや衝突の理由</span>
                  </div>
                  <p className="whitespace-pre-wrap">{affinity.challengeReason}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-rose-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>円滑に付き合うための対策ルール</span>
                  </div>
                  <p className="whitespace-pre-wrap">{affinity.challengeAdvice}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: GLOSSARY (占い＆カタカナ用語解説) */}
      {activeTab === 'glossary' && (
        <div className="w-full space-y-3 animate-fade-in text-xs sm:text-sm my-2">
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-purple-500/40 bg-purple-950/20 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm sm:text-base">
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>🔮 占い・カタカナ用語解説ガイド</span>
              </div>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 font-mono px-2.5 py-0.5 rounded-full border border-indigo-500/40">
                GLOSSARY
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              診断結果に出てくるカタカナのタイプ名や用語の和訳・日本語解説一覧です。用語の意味をチェックして理解を深めましょう。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {GLOSSARY_ITEMS.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-white/10 space-y-1 hover:border-indigo-400/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.term}</span>
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                      {item.meaning}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed pt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI PROMPT COPY FOR EXTERNAL AI */}
      {activeTab === 'aiprompt' && (
        <div className="w-full space-y-4 animate-fade-in text-xs sm:text-sm my-2">
          <div className="glass-card rounded-2xl p-5 border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-950/60 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>🔮 AI深層分析用 プロンプト生成＆コピー</span>
              </div>
              <span className="text-[10px] bg-gradient-to-r from-amber-500 to-indigo-600 text-slate-950 font-extrabold px-3 py-1 rounded-full shadow-md">
                FOR AI CHAT
              </span>
            </div>

            <p className="text-slate-200 leading-relaxed text-xs">
              あなたの回答データ・基本プロファイル・ホロスコープ属性を統合した高精度なプロンプトです。下のボタンでコピーし、ChatGPTやGemini Webなどの外部AIに貼り付けることで、さらに深層的な性格分析やアドバイスを受けられます。
            </p>

            <div className="bg-slate-950/90 rounded-2xl p-4 border border-indigo-500/30 text-xs font-mono text-slate-200 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed select-all shadow-inner">
              {aiPromptText}
            </div>

            <div className="pt-2">
              <button
                onClick={handleCopyPrompt}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-amber-300/40 min-h-[52px]"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-slate-950 stroke-[3]" />
                    <span>クリップボードにコピー完了！AIチャットに貼り付けてください</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-slate-950" />
                    <span>AI用プロンプトをコピーする</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Restart Button */}
      <div className="w-full flex justify-center pt-4">
        <button
          onClick={onRestart}
          className="py-3.5 px-8 rounded-2xl glass-card hover:bg-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center gap-2 border border-slate-700 shadow-xl"
        >
          <RotateCcw className="w-4 h-4 text-indigo-400" />
          <span>トップへ戻って再診断する</span>
        </button>
      </div>
    </div>
  );
};
