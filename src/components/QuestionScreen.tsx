import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Hand,
  Palette,
  CheckCircle2,
  Clock,
  MapPin,
  Heart,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sliders,
  Sparkles,
  Zap,
  HelpCircle,
  Check
} from 'lucide-react';
import { QUESTIONS, DOMINANT_HAND_OPTIONS, COLOR_OPTIONS } from '../data/questions';
import { UserProfile, getZodiacInfo } from '../lib/diagnosisLogic';
import { soundManager } from '../lib/soundEffects';

interface QuestionScreenProps {
  onComplete: (profile: UserProfile, answers: Record<number, string>, testMode: 'quick' | 'gradient') => void;
  onBackToHome: () => void;
}

const PREFECTURES = [
  '指定なし/不明', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
  '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県', '海外/その他'
];

const TIME_SLOTS = [
  { id: '指定なし/不明', label: '指定なし / 不明' },
  { id: '早朝 (04:00〜08:00)', label: '早朝 (04:00〜08:00)' },
  { id: '午前 (08:00〜12:00)', label: '午前 (08:00〜12:00)' },
  { id: '昼過ぎ (12:00〜16:00)', label: '昼過ぎ (12:00〜16:00)' },
  { id: '夕方 (16:00〜20:00)', label: '夕方 (16:00〜20:00)' },
  { id: '夜 (20:00〜00:00)', label: '夜 (20:00〜00:00)' },
  { id: '深夜 (00:00〜04:00)', label: '深夜 (00:00〜04:00)' },
];

const RELATIONSHIP_OPTIONS = [
  '指定なし',
  '未婚・シングル (恋人募集中)',
  '恋人あり (交際中)',
  '既婚',
  '片想い・気になる人あり',
  'その他 / 複雑・保留'
];

const WORK_OPTIONS = [
  '指定なし',
  '会社員・公務員',
  '経営者・役員・個人事業主',
  'フリーランス・クリエイター',
  'パート・アルバイト',
  '学生',
  '求職中・準備中',
  '専業主婦 (主夫)',
  'その他'
];

const GRADIENT_SCALE_OPTIONS = [
  { id: '1', label: 'とてもそう思う', emoji: '✨', bg: 'bg-emerald-950/80 border-emerald-400 text-emerald-200 hover:bg-emerald-900' },
  { id: '2', label: 'ややそう思う', emoji: '🙂', bg: 'bg-indigo-950/80 border-indigo-400 text-indigo-200 hover:bg-indigo-900' },
  { id: '3', label: 'どちらとも言えない', emoji: '😐', bg: 'bg-slate-900/80 border-slate-600 text-slate-300 hover:bg-slate-800' },
  { id: '4', label: 'あまり思わない', emoji: '🙁', bg: 'bg-amber-950/80 border-amber-500/60 text-amber-200 hover:bg-amber-900' },
  { id: '5', label: '全く思わない', emoji: '🙅', bg: 'bg-rose-950/80 border-rose-500/60 text-rose-200 hover:bg-rose-900' },
];

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  onComplete,
  onBackToHome,
}) => {
  // Phase 1: profile, Phase 2: questions
  const [phase, setPhase] = useState<'profile' | 'questions'>('profile');

  // Test Mode: 'quick' (situation choices) vs 'gradient' (5-point rating scale)
  const [testMode, setTestMode] = useState<'quick' | 'gradient'>('quick');

  // Show/Hide Precision Options
  const [showPrecisionOptions, setShowPrecisionOptions] = useState<boolean>(false);

  // Birthdate state (YYYY-MM-DD)
  const [dateInput, setDateInput] = useState<string>('2000-01-01');

  // Individual Y, M, D
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    birthdate: '2000-01-01',
    dominantHand: 'right',
    auraColor: 'red',
    birthPlace: '指定なし/不明',
    relationshipStatus: '指定なし',
  });

  // Handle native date input change
  const handleNativeDateChange = (val: string) => {
    if (!val) return;
    setDateInput(val);
    setProfile(prev => ({ ...prev, birthdate: val }));
    const parts = val.split('-');
    if (parts.length === 3) {
      setBirthYear(Number(parts[0]) || 2000);
      setBirthMonth(Number(parts[1]) || 1);
      setBirthDay(Number(parts[2]) || 1);
    }
  };

  // Sync YYYY-MM-DD whenever birthYear/Month/Day change
  const handleDropdownChange = (y: number, m: number, d: number) => {
    setBirthYear(y);
    setBirthMonth(m);
    setBirthDay(d);
    const formattedMonth = String(m).padStart(2, '0');
    const formattedDay = String(d).padStart(2, '0');
    const dateStr = `${y}-${formattedMonth}-${formattedDay}`;
    setDateInput(dateStr);
    setProfile(prev => ({ ...prev, birthdate: dateStr }));
  };

  // Questions state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const zodiac = getZodiacInfo(profile.birthdate);

  const handleStartQuestions = () => {
    soundManager.playClick();
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsTransitioning(false);
    setPhase('questions');
  };

  const handleSelectAnswer = (questionId: number, answerVal: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    soundManager.playClick();

    const updatedAnswers = { ...answers, [questionId]: answerVal };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    } else {
      setTimeout(() => {
        onComplete(profile, updatedAnswers, testMode);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handlePrevQuestion = () => {
    if (isTransitioning) return;
    soundManager.playClick();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setPhase('profile');
    }
  };

  const currentQ = QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 py-6 max-w-xl mx-auto text-slate-100 pb-16">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between py-2 z-20">
        <button
          onClick={phase === 'questions' ? handlePrevQuestion : onBackToHome}
          className="p-2 sm:px-3 sm:py-2 rounded-xl glass-card hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 text-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <span>{phase === 'questions' ? '前へ' : 'トップ'}</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span>{phase === 'profile' ? 'ステップ 1 : プロフィール＆形式選択' : `ステップ 2 : 質問 ${currentQuestionIndex + 1} / 25`}</span>
        </div>
      </div>

      {/* PHASE 1: PROFILE & TEST MODE SETUP */}
      {phase === 'profile' && (
        <div className="w-full flex-1 flex flex-col justify-center my-2 space-y-5 animate-fade-in z-10">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">診断設定 ＆ プロフィール</h2>
            <p className="text-xs text-slate-400">
              回答形式と基本情報を設定して精密鑑定を開始します
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-4 sm:p-6 space-y-5 border border-white/10 shadow-2xl">
            {/* 1. Mode Selector Card */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>質問の回答方式を選択</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Mode A: Quick / Situation Choices */}
                <div
                  onClick={() => { soundManager.playClick(); setTestMode('quick'); }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                    testMode === 'quick'
                      ? 'bg-indigo-950/80 border-indigo-400 shadow-lg ring-2 ring-indigo-500/50'
                      : 'glass-card border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-indigo-400" />
                      <span>場面で選ぶ（5つの選択肢）</span>
                    </span>
                    {testMode === 'quick' && <CheckCircle2 className="w-4 h-4 text-indigo-300" />}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    具体的な日常シーン（5択）の中から、自分に一番近い行動パターンを選びます。
                  </p>
                </div>

                {/* Mode B: Gradient / Degree Scale */}
                <div
                  onClick={() => { soundManager.playClick(); setTestMode('gradient'); }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                    testMode === 'gradient'
                      ? 'bg-purple-950/80 border-purple-400 shadow-lg ring-2 ring-purple-500/50'
                      : 'glass-card border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>当てはまり度で選ぶ（5段階）</span>
                    </span>
                    {testMode === 'gradient' && <CheckCircle2 className="w-4 h-4 text-purple-300" />}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    「とてもそう思う」〜「全く思わない」の5段階で、気持ちの当てはまり度を選びます。
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Birth Date Input */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>生年月日</span>
                </span>
                <span className="text-[11px] text-indigo-300 font-medium bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                  {zodiac.signJP} ({zodiac.element}属性)
                </span>
              </label>

              <div className="space-y-2">
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => handleNativeDateChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 text-center font-medium shadow-inner min-h-[42px]"
                />

                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={birthYear}
                    onChange={(e) => handleDropdownChange(Number(e.target.value), birthMonth, birthDay)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 text-center font-medium min-h-[38px]"
                  >
                    {years.map(y => (
                      <option key={y} value={y}>{y}年</option>
                    ))}
                  </select>

                  <select
                    value={birthMonth}
                    onChange={(e) => handleDropdownChange(birthYear, Number(e.target.value), birthDay)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 text-center font-medium min-h-[38px]"
                  >
                    {months.map(m => (
                      <option key={m} value={m}>{m}月</option>
                    ))}
                  </select>

                  <select
                    value={birthDay}
                    onChange={(e) => handleDropdownChange(birthYear, birthMonth, Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 text-center font-medium min-h-[38px]"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d}日</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Dominant Hand Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Hand className="w-4 h-4 text-indigo-400" />
                <span>利き手</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DOMINANT_HAND_OPTIONS.map((hand) => {
                  const isSelected = profile.dominantHand === hand.id;
                  return (
                    <button
                      key={hand.id}
                      type="button"
                      onClick={() => { soundManager.playClick(); setProfile({ ...profile, dominantHand: hand.id }); }}
                      className={`py-2.5 px-3 rounded-xl border text-xs text-center transition-all flex items-center justify-center gap-1.5 font-medium min-h-[42px] ${
                        isSelected
                          ? 'bg-indigo-600/50 border-indigo-400 text-white shadow-lg'
                          : 'glass-card border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span>{hand.label}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Color Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>直感で惹かれる色</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = profile.auraColor === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => { soundManager.playClick(); setProfile({ ...profile, auraColor: color.id }); }}
                      className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all min-h-[50px] ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-400 shadow-lg text-white font-bold'
                          : 'glass-card border-slate-800 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-white/20 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] sm:text-[11px] font-medium leading-none truncate w-full">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Precision Options Accordion Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => { soundManager.playClick(); setShowPrecisionOptions(!showPrecisionOptions); }}
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-950/50 border border-indigo-500/30 hover:border-indigo-400 text-indigo-200 text-xs font-bold flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>【精密診断オプション】詳細データ設定（任意）</span>
                </div>
                {showPrecisionOptions ? <ChevronUp className="w-4 h-4 text-indigo-300" /> : <ChevronDown className="w-4 h-4 text-indigo-300" />}
              </button>

              {showPrecisionOptions && (
                <div className="space-y-4 pt-4 text-xs animate-fade-in">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    出生地・現在の恋愛ステータスを入力すると、占星術およびAI分析プロンプトの精度が飛躍的にアップします。
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Birth Place */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        <span>出生地（都道府県）</span>
                      </label>
                      <select
                        value={profile.birthPlace || '指定なし/不明'}
                        onChange={(e) => setProfile({ ...profile, birthPlace: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 min-h-[38px]"
                      >
                        {PREFECTURES.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    {/* Relationship Status */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300 flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-pink-400" />
                        <span>現在の恋愛ステータス</span>
                      </label>
                      <select
                        value={profile.relationshipStatus || '指定なし'}
                        onChange={(e) => setProfile({ ...profile, relationshipStatus: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 min-h-[38px]"
                      >
                        {RELATIONSHIP_OPTIONS.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleStartQuestions}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[52px] border border-amber-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>質問に進む ({testMode === 'gradient' ? '5段階評価・全25問' : '場面選択・全25問'})</span>
            <ArrowRight className="w-4 h-4 text-indigo-200" />
          </button>
        </div>
      )}

      {/* PHASE 2: 25 QUESTIONS */}
      {phase === 'questions' && (
        <div className="w-full flex-1 flex flex-col justify-between my-2 space-y-4 z-10">
          {/* Progress Header */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-medium flex items-center gap-1">
                <span>{currentQ.categoryLabel}</span>
                <span className="text-[10px] text-slate-400">({testMode === 'gradient' ? '5段階評価' : '場面選択'})</span>
              </span>
              <span className="font-bold text-indigo-400 tracking-wider">
                質問 {currentQuestionIndex + 1} <span className="text-slate-500">/ 25</span>
              </span>
            </div>

            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div key={currentQ.id} className="glass-panel rounded-3xl p-5 sm:p-7 my-auto space-y-5 border border-white/10 shadow-2xl relative overflow-hidden animate-fade-in">

            {/* Mode A: QUICK 5 SITUATION CHOICES */}
            {testMode === 'quick' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>場面シチュエーション質問</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
                    {currentQ.question}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    あなたの日常の行動に最も近い選択肢を1つ選んでください：
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {currentQ.choices.map((choice) => {
                    const isSelected = answers[currentQ.id] === choice.id;
                    return (
                      <button
                        key={`${currentQ.id}-${choice.id}`}
                        type="button"
                        disabled={isTransitioning}
                        onClick={() => handleSelectAnswer(currentQ.id, choice.id)}
                        className={`w-full p-3 sm:p-3.5 rounded-2xl text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between group min-h-[46px] ${
                          isSelected
                            ? 'bg-indigo-900/80 border-indigo-400 text-white font-semibold shadow-lg'
                            : 'glass-card border-slate-800/80 text-slate-200 hover:border-indigo-400/50 hover:bg-slate-800/80'
                        }`}
                      >
                        <span className="leading-relaxed pr-2">{choice.text}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? 'border-indigo-400 bg-indigo-400 text-slate-950' : 'border-slate-600 group-hover:border-indigo-400'
                        }`}>
                          {isSelected ? <CheckCircle2 className="w-3.5 h-3.5 fill-indigo-400 text-slate-950" /> : <div className="w-1 h-1 rounded-full bg-transparent group-hover:bg-indigo-400/50" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mode B: GRADIENT 5-POINT DEGREE SCALE */}
            {testMode === 'gradient' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>当てはまり度診断（5段階評価）</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/90 via-purple-950/80 to-slate-900/90 border border-amber-400/40 text-indigo-100 shadow-inner space-y-1">
                    <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>診断メッセージ</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-yellow-100 leading-relaxed">
                      「{currentQ.statement}」
                    </h3>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 font-medium">
                  この考えや行動パターンは、日常のあなたにどれくらい当てはまりますか？
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {GRADIENT_SCALE_OPTIONS.map((scaleOpt) => {
                    const isSelected = answers[currentQ.id] === scaleOpt.id;
                    return (
                      <button
                        key={`${currentQ.id}-grad-${scaleOpt.id}`}
                        type="button"
                        disabled={isTransitioning}
                        onClick={() => handleSelectAnswer(currentQ.id, scaleOpt.id)}
                        className={`w-full p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-between ${scaleOpt.bg} ${
                          isSelected ? 'ring-2 ring-amber-300 shadow-xl scale-[1.01]' : 'opacity-90 hover:opacity-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{scaleOpt.emoji}</span>
                          <span>{scaleOpt.label}</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-amber-300 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>{testMode === 'gradient' ? '直感の5段階で当てはまる度合いを選択' : '直感で最も近い状況を選んでください'}</span>
            <span className="font-mono">進捗: {progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-[10px] sm:text-xs text-slate-500 pt-2 font-normal">
        PERSONALITY ASSESSMENT · ANALYTICS SYSTEM
      </div>
    </div>
  );
};
