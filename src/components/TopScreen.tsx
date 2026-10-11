import React from 'react';
import { Sparkles, Compass, Volume2, VolumeX, History, BookOpen, Shield, Zap, ArrowRight } from 'lucide-react';
import { soundManager } from '../lib/soundEffects';

interface TopScreenProps {
  onStart: () => void;
  onOpenHistory: () => void;
  onOpenAllTypes: () => void;
  hasHistory: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TopScreen: React.FC<TopScreenProps> = ({
  onStart,
  onOpenHistory,
  onOpenAllTypes,
  hasHistory,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 max-w-xl mx-auto text-slate-100">
      {/* Sound Toggle & Top Actions */}
      <div className="w-full flex items-center justify-between py-2 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-full glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs"
            title={isMuted ? '音声をオンにする' : '音声をオフにする'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
            <span className="hidden sm:inline">{isMuted ? '消音中' : 'サウンドON'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAllTypes}
            className="p-2.5 rounded-xl glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-medium"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>全タイプ一覧</span>
          </button>

          {hasHistory && (
            <button
              onClick={onOpenHistory}
              className="p-2.5 rounded-xl glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-medium relative"
            >
              <History className="w-4 h-4 text-indigo-400" />
              <span>診断履歴</span>
              <span className="w-2 h-2 rounded-full bg-indigo-400 absolute top-1 right-1 animate-pulse" />
            </button>
          )}
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="w-full my-auto py-8 flex flex-col items-center text-center space-y-6 z-10 animate-fade-in">
        {/* Emblem Badge */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-500 p-0.5 shadow-2xl animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
              <Compass className="w-12 h-12 text-indigo-300 animate-spin-slow" />
              <Sparkles className="w-5 h-5 text-amber-300 absolute top-3 right-3 animate-bounce" />
            </div>
          </div>
          <div className="absolute -bottom-2 bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-[11px] font-bold px-3 py-0.5 rounded-full shadow-lg tracking-wider">
            24 TYPES DIAGNOSIS
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            本格性格タイプ診断
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            全25問の行動特性・心理テストで、あなたの本質、強み、注意点、対人関係の相性を精密に導き出します。
          </p>
        </div>

        {/* Features Pills */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-sm pt-2">
          <div className="glass-panel p-2.5 rounded-xl text-center border border-white/5 space-y-1">
            <Shield className="w-4 h-4 text-indigo-400 mx-auto" />
            <div className="text-[11px] font-bold text-slate-200">全25問テスト</div>
            <div className="text-[10px] text-slate-400">行動パターン解析</div>
          </div>
          <div className="glass-panel p-2.5 rounded-xl text-center border border-white/5 space-y-1">
            <Zap className="w-4 h-4 text-indigo-400 mx-auto" />
            <div className="text-[11px] font-bold text-slate-200">全24タイプ</div>
            <div className="text-[10px] text-slate-400">精密性格分類</div>
          </div>
          <div className="glass-panel p-2.5 rounded-xl text-center border border-white/5 space-y-1">
            <Sparkles className="w-4 h-4 text-indigo-400 mx-auto" />
            <div className="text-[11px] font-bold text-slate-200">AIプロンプト</div>
            <div className="text-[10px] text-slate-400">深掘りアドバイス</div>
          </div>
        </div>

        {/* Start Button */}
        <div className="w-full max-w-sm pt-4">
          <button
            onClick={() => { soundManager.playClick(); onStart(); }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 text-white font-bold text-base shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group border border-indigo-400/30"
          >
            <span>診断を開始する</span>
            <ArrowRight className="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-[10px] text-slate-500 font-normal tracking-wider">
        PSYCHOLOGICAL ASSESSMENT & PERSONALITY SYSTEM
      </div>
    </div>
  );
};
