import React from 'react';
import { UserCheck, Compass, History, BookOpen, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { soundManager } from '../lib/soundEffects';

interface TopScreenProps {
  onStart: () => void;
  onOpenHistory: () => void;
  onOpenAllTypes: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  historyCount: number;
}

export const TopScreen: React.FC<TopScreenProps> = ({
  onStart,
  onOpenHistory,
  onOpenAllTypes,
  historyCount,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 max-w-xl mx-auto text-slate-100">
      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between py-2 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-md">
            <UserCheck className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm text-slate-200">本格性格診断</span>
        </div>

        {historyCount > 0 && (
          <button
            onClick={() => { soundManager.playClick(); onOpenHistory(); }}
            className="px-3 py-1.5 rounded-xl glass-card hover:bg-slate-800 text-xs text-slate-300 flex items-center gap-1.5 transition-all"
          >
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span>過去の履歴 ({historyCount})</span>
          </button>
        )}
      </header>

      {/* Main Hero Section */}
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center my-6 z-10 space-y-6">
        {/* Emblem Badge */}
        <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-xl flex items-center justify-center relative">
          <Compass className="w-12 h-12 text-indigo-400" />
        </div>

        {/* Main Title Block */}
        <div className="space-y-3 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>全25問 · 心理・行動パターン分析</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            本格性格診断
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            日常の行動や思考に関する25の質問から、あなたの基本的な性格タイプ、強み、対人関係の傾向を分かりやすく分析します。
          </p>
        </div>

        {/* Start Button */}
        <div className="w-full max-w-xs pt-2">
          <button
            onClick={() => { soundManager.playClick(); onStart(); }}
            className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 text-indigo-200 fill-indigo-200" />
            <span className="tracking-wider">診断をはじめられる</span>
            <ChevronRight className="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-2 w-full pt-4 text-xs text-slate-400 border-t border-white/10">
          <div className="glass-card p-2.5 rounded-xl flex flex-col items-center gap-1 text-center">
            <span className="text-indigo-400 font-bold">25 QUESTIONS</span>
            <span className="text-[11px]">25の日常質問</span>
          </div>
          <div className="glass-card p-2.5 rounded-xl flex flex-col items-center gap-1 text-center">
            <span className="text-blue-400 font-bold">5 PARAMETERS</span>
            <span className="text-[11px]">5つの行動指標</span>
          </div>
          <div className="glass-card p-2.5 rounded-xl flex flex-col items-center gap-1 text-center">
            <span className="text-emerald-400 font-bold">AI REPORT</span>
            <span className="text-[11px]">AIアドバイス</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full z-10 pt-2 flex flex-col items-center gap-3">
        <button
          onClick={() => { soundManager.playClick(); onOpenAllTypes(); }}
          className="text-xs text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full hover:bg-white/5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>全20種類の性格タイプ一覧を見る</span>
        </button>

        <p className="text-[10px] text-slate-500 font-normal">
          © PERSONALITY DIAGNOSIS · ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
};
