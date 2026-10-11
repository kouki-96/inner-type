import { useState, useEffect } from 'react';
import { TopScreen } from './components/TopScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { AllTypesModal } from './components/AllTypesModal';
import { HistoryModal } from './components/HistoryModal';
import { UserProfile, calculateDiagnosis, DiagnosisResult } from './lib/diagnosisLogic';
import { PersonalityResult } from './data/results';
import { soundManager } from './lib/soundEffects';

type ScreenState = 'top' | 'question' | 'loading' | 'result';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('top');
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  // Modals state
  const [isAllTypesOpen, setIsAllTypesOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sound state
  const [isMuted, setIsMuted] = useState(false);

  // History state saved in localStorage
  const [history, setHistory] = useState<DiagnosisResult[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('personality_diagnosis_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleQuestionsComplete = (profile: UserProfile, answers: Record<number, string>) => {
    const calculated = calculateDiagnosis(profile, answers);
    setDiagnosisResult(calculated);
    setScreen('loading');

    // Save to history
    try {
      const updatedHistory = [calculated, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      localStorage.setItem('personality_diagnosis_history', JSON.stringify(updatedHistory));
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('personality_diagnosis_history');
    } catch {
      // Ignore
    }
  };

  // Preview type from AllTypesModal
  const handleSelectTypeDetail = (personality: PersonalityResult) => {
    const mockProfile: UserProfile = { birthdate: '2000-01-01', dominantHand: 'right', auraColor: 'red' };
    const mockResult: DiagnosisResult = {
      profile: mockProfile,
      zodiac: { signJP: '牡羊座', element: '火' },
      traitScores: { leader: 20, analyst: 10, creator: 10, supporter: 10, realist: 10, idealist: 10, individual: 10, harmonizer: 10 },
      traitPercentages: { leader: 20, analyst: 10, creator: 10, supporter: 10, realist: 10, idealist: 10, individual: 10, harmonizer: 10 },
      primaryTrait: personality.primaryTrait,
      secondaryTrait: personality.secondaryTrait,
      matchedPersonality: personality,
      customStatus: personality.status,
      aiPromptText: `【本格性格診断・プロファイル分析データ】
診断された性格タイプ: ${personality.name} (${personality.categoryTag})
キャッチコピー: 「${personality.tagline}」
強み: ${personality.description.strengths}
注意点: ${personality.description.weaknesses}
人間関係: ${personality.description.relationship}
AIへのお願い: 上記プロファイルを元にアドバイスと具体的なキャリア・人間関係のアクションプランを提示してください。`,
      timestamp: new Date().toISOString(),
    };
    setDiagnosisResult(mockResult);
    setScreen('result');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-slate-950 opacity-90 pointer-events-none" />
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-900/20 blur-3xl animate-aura pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-900/15 blur-3xl animate-aura pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* Main Screen Router */}
      <main className="relative z-10">
        {screen === 'top' && (
          <TopScreen
            onStart={() => setScreen('question')}
            onOpenHistory={() => setIsHistoryOpen(true)}
            onOpenAllTypes={() => setIsAllTypesOpen(true)}
            hasHistory={history.length > 0}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {screen === 'question' && (
          <QuestionScreen
            onComplete={handleQuestionsComplete}
            onBackToHome={() => setScreen('top')}
          />
        )}

        {screen === 'loading' && (
          <LoadingScreen
            onFinished={() => setScreen('result')}
          />
        )}

        {screen === 'result' && diagnosisResult && (
          <ResultScreen
            result={diagnosisResult}
            onRestart={() => setScreen('top')}
            onOpenAllTypes={() => setIsAllTypesOpen(true)}
          />
        )}
      </main>

      {/* MODALS */}
      {isAllTypesOpen && (
        <AllTypesModal
          onClose={() => setIsAllTypesOpen(false)}
          onSelectType={handleSelectTypeDetail}
        />
      )}

      {isHistoryOpen && (
        <HistoryModal
          history={history}
          onClose={() => setIsHistoryOpen(false)}
          onSelectHistory={(item) => {
            setDiagnosisResult(item);
            setScreen('result');
          }}
          onClearHistory={handleClearHistory}
        />
      )}
    </div>
  );
}
