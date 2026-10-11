import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, User, Calendar, Hand, Palette, CheckCircle2 } from 'lucide-react';
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

  // Birthdate state (Year, Month, Day)
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    birthdate: '2000-01-01',
    dominantHand: 'right',
    auraColor: 'red',
  });

  // Sync YYYY-MM-DD string whenever birthYear/Month/Day change
  useEffect(() => {
    const formattedMonth = String(birthMonth).padStart(2, '0');
    const formattedDay = String(birthDay).padStart(2, '0');
    const dateStr = `${birthYear}-${formattedMonth}-${formattedDay}`;
    setProfile(prev => ({ ...prev, birthdate: dateStr }));
  }, [birthYear, birthMonth, birthDay]);

  // Questions state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const zodiac = getZodiacInfo(profile.birthdate);

  const handleStartQuestions = () => {
    soundManager.playClick();
    setPhase('questions');
  };

  const handleSelectChoice = (questionId: number, choiceId: string) => {
    soundManager.playClick();
    const updatedAnswers = { ...answers, [questionId]: choiceId };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 150);
    } else {
      // Completed all 25 questions!
      setTimeout(() => {
        onComplete(profile, updatedAnswers);
      }, 200);
    }
  };

  const handlePrevQuestion = () => {
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
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-6 max-w-xl mx-auto text-slate-100">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between py-2 z-20">
        <button
          onClick={phase === 'questions' ? handlePrevQuestion : onBackToHome}
          className="p-2 rounded-full glass-card hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 text-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <span>{phase === 'questions' ? '前へ' : 'トップ'}</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span>{phase === 'profile' ? 'ステップ 1 : プロフィール' : `ステップ 2 : 質問 ${currentQuestionIndex + 1} / 25`}</span>
        </div>
      </div>

      {/* PHASE 1: PROFILE SETUP */}
      {phase === 'profile' && (
        <div className="w-full flex-1 flex flex-col justify-center my-4 space-y-6 animate-fade-in z-10">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white">プロフィールの入力</h2>
            <p className="text-xs text-slate-300">
              生年月日、利き手、好きな色を選択してください。
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-5 border border-white/10">
            {/* 1. Birth Date Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>生年月日</span>
                </span>
                <span className="text-[11px] text-indigo-300 flex items-center gap-1 font-normal">
                  <User className="w-3 h-3 text-indigo-400" />
                  <span>{zodiac.signJP}</span>
                </span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 text-center font-medium"
                >
                  {years.map(y => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>

                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 text-center font-medium"
                >
                  {months.map(m => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>

                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 text-center font-medium"
                >
                  {days.map(d => (
                    <option key={d} value={d}>{d}日</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Dominant Hand Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
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
                      className={`py-2.5 px-3 rounded-xl border text-xs text-center transition-all flex items-center justify-center gap-1.5 font-medium ${
                        isSelected
                          ? 'bg-indigo-600/40 border-indigo-400 text-white shadow-md'
                          : 'glass-card border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span>{hand.label}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Color Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>直感で惹かれる色</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = profile.auraColor === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => { soundManager.playClick(); setProfile({ ...profile, auraColor: color.id }); }}
                      className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                        isSelected
                          ? 'bg-white/10 border-indigo-400 shadow-md font-semibold text-white'
                          : 'glass-card border-slate-800 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-sm border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[11px] truncate">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuestions}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-base shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>質問に進む（全25問）</span>
            <ArrowRight className="w-5 h-5 text-indigo-200" />
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
          <div className="glass-panel rounded-2xl p-6 my-auto space-y-6 border border-white/10 shadow-2xl relative overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* 4 Choices */}
            <div className="space-y-3 pt-2">
              {currentQ.choices.map((choice) => {
                const isSelected = answers[currentQ.id] === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(currentQ.id, choice.id)}
                    className={`w-full p-4 rounded-xl text-left text-sm transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-indigo-900/60 border-indigo-400 text-white font-semibold shadow-lg'
                        : 'glass-card border-slate-800 text-slate-200 hover:border-indigo-400/50 hover:bg-slate-800/80'
                    }`}
                  >
                    <span className="leading-snug pr-2">{choice.text}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? 'border-indigo-400 bg-indigo-400 text-slate-950' : 'border-slate-600 group-hover:border-indigo-400'
                    }`}>
                      {isSelected ? <CheckCircle2 className="w-4 h-4 fill-indigo-400 text-slate-950" /> : <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-indigo-400/50" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>直感で当てはまるものを選んでください</span>
            <span className="font-mono">進捗: {progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-[10px] text-slate-500 pt-2 font-normal">
        PERSONALITY DIAGNOSIS · ANALYSIS SYSTEM
      </div>
    </div>
  );
};
