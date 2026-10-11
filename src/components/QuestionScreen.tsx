import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Hand, Palette, CheckCircle2 } from 'lucide-react';
import { QUESTIONS, DOMINANT_HAND_OPTIONS, COLOR_OPTIONS } from '../data/questions';
import { UserProfile, getZodiacInfo } from '../lib/diagnosisLogic';
import { soundManager } from '../lib/soundEffects';

interface QuestionScreenProps {
  onComplete: (profile: UserProfile, answers: Record<number, string>) => void;
  onBackToHome: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  onComplete,
  onBackToHome,
}) => {
  // Phase 1: profile, Phase 2: questions
  const [phase, setPhase] = useState<'profile' | 'questions'>('profile');

  // Birthdate state (YYYY-MM-DD)
  const [dateInput, setDateInput] = useState<string>('2000-01-01');

  // Individual Y, M, D for backup/dropdown sync
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    birthdate: '2000-01-01',
    dominantHand: 'right',
    auraColor: 'red',
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

  // Sync YYYY-MM-DD whenever birthYear/Month/Day change via select
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

  const handleSelectChoice = (questionId: number, choiceId: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    soundManager.playClick();

    const updatedAnswers = { ...answers, [questionId]: choiceId };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    } else {
      setTimeout(() => {
        onComplete(profile, updatedAnswers);
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
    <div className="relative min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 py-6 max-w-xl mx-auto text-slate-100">
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
          <span>{phase === 'profile' ? 'ステップ 1 : プロフィール' : `ステップ 2 : 質問 ${currentQuestionIndex + 1} / 25`}</span>
        </div>
      </div>

      {/* PHASE 1: SIMPLE PROFILE SETUP */}
      {phase === 'profile' && (
        <div className="w-full flex-1 flex flex-col justify-center my-4 space-y-5 animate-fade-in z-10">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">基本プロフィールの設定</h2>
            <p className="text-xs text-slate-400">
              あなたに合った精密な診断を行うための基本項目です
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-4 sm:p-6 space-y-5 border border-white/10 shadow-2xl">
            {/* 1. Birth Date Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>生年月日</span>
                </span>
                <span className="text-[11px] text-indigo-300 font-medium bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                  {zodiac.signJP} ({zodiac.element}属性)
                </span>
              </label>

              {/* Native Date Picker + Dropdown Selectors */}
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

            {/* 2. Dominant Hand Input */}
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

            {/* 3. Color Input */}
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
          </div>

          <button
            onClick={handleStartQuestions}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[50px]"
          >
            <span>質問に進む（全25問）</span>
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
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-medium">
                {currentQ.categoryLabel}
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
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* 5 Choices */}
            <div className="space-y-2 pt-1">
              {currentQ.choices.map((choice) => {
                const isSelected = answers[currentQ.id] === choice.id;
                return (
                  <button
                    key={`${currentQ.id}-${choice.id}`}
                    type="button"
                    disabled={isTransitioning}
                    onClick={() => handleSelectChoice(currentQ.id, choice.id)}
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

          {/* Bottom Bar */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>直感で当てはまるものを選んでください</span>
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
