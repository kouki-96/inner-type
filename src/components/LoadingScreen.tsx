import React, { useEffect, useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/soundEffects';

interface LoadingScreenProps {
  onFinished: () => void;
}

const MESSAGES = [
  '生年月日と基本属性の分析中...',
  '25問の行動特性スコアを集計中...',
  '論理・行動・共感・創造・安定度の算出中...',
  '全24タイプから最適な結果を照合中...',
  '総合プロファイルデータを生成中...',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    soundManager.playClick();

    // Progress timer over ~2.8 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 55);

    // Message rotation
    const msgInterval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, [onFinished]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-slate-100 z-10">
      <div className="w-full glass-panel rounded-3xl p-8 flex flex-col items-center text-center space-y-6 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Animated Compass Symbol */}
        <div className="relative my-4">
          <div className="w-24 h-24 rounded-full bg-indigo-950/80 border-2 border-indigo-500/40 flex items-center justify-center relative shadow-2xl">
            <Compass className="w-12 h-12 text-indigo-400 animate-spin-slow" />
            <Sparkles className="w-5 h-5 text-amber-300 absolute top-1 right-1 animate-ping" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 max-w-xs">
          <div className="text-sm font-bold text-indigo-300 tracking-wider h-6 transition-all duration-300">
            {MESSAGES[msgIndex]}
          </div>
          <p className="text-xs text-slate-400">
            回答データを心理モデルと照合しています
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-1.5 pt-2">
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>ANALYZING...</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
