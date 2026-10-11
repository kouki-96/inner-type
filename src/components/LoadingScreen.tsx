import React, { useEffect, useState } from 'react';
import { UserCheck, Compass } from 'lucide-react';
import { soundManager } from '../lib/soundEffects';

interface LoadingScreenProps {
  onFinished: () => void;
}

const MESSAGES = [
  '生年月日・プロフィールの基礎分析中...',
  '25問の回答データを分析中...',
  '思考・行動パターンの特性を計算中...',
  '診断結果（性格タイプ）を集計中...'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    soundManager.playMysticChime();

    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev < MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);

    const timer = setTimeout(() => {
      soundManager.playRevealFanfare();
      onFinished();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinished]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 max-w-xl mx-auto text-slate-100">
      {/* Central Clean Spinner */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="w-36 h-36 rounded-full glass-panel border border-indigo-500/30 flex items-center justify-center relative shadow-xl">
          <div
            className="absolute inset-2 border-2 border-dashed border-indigo-400/50 rounded-full animate-spin"
            style={{ animationDuration: '8s' }}
          />

          <div className="flex flex-col items-center justify-center space-y-2 z-10">
            <Compass className="w-10 h-10 text-indigo-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Progress Status Message */}
      <div className="text-center space-y-4 max-w-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs">
          <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>性格分析レポート作成中</span>
        </div>

        <h2 className="text-xl font-bold text-white min-h-[48px] flex items-center justify-center">
          {MESSAGES[msgIndex]}
        </h2>

        {/* Progress bar indicator */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {MESSAGES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === msgIndex
                  ? 'w-6 bg-indigo-400'
                  : idx < msgIndex
                  ? 'w-2 bg-indigo-600'
                  : 'w-2 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
