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
    <div className="relative min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 py-6 sm:py-10 max-w-2xl mx-auto text-slate-100">
      {/* Sound Toggle & Top Actions */}
      <div className="w-full flex items-center justify-between gap-2 py-2 z-20">
        <button
          onClick={onToggleMute}
          className="p-2 sm:p-2.5 rounded-full glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs shrink-0"
          title={isMuted ? '音声をオンにする' : '音声をオフにする'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
          <span className="hidden xs:inline sm:inline">{isMuted ? '消音' : 'サウンドON'}</span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAllTypes}
            className="p-2 sm:p-2.5 rounded-xl glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-medium"
          >
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="whitespace-nowrap">全24タイプ</span>
          </button>

          {hasHistory && (
            <button
              onClick={onOpenHistory}
              className="p-2 sm:p-2.5 rounded-xl glass-card hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-medium relative"
            >
              <History className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="whitespace-nowrap">診断履歴</span>
              <span className="w-2 h-2 rounded-full bg-indigo-400 absolute top-1 right-1 animate-pulse" />
            </button>
          )}
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="w-full my-auto py-6 sm:py-10 flex flex-col items-center text-center space-y-6 sm:space-y-8 z-10 animate-fade-in">
        {/* Emblem Badge */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-500 p-0.5 shadow-2xl animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
              <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-300 animate-spin-slow" />
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 absolute top-3 right-3 animate-bounce" />
            </div>
          </div>
          <div className="absolute -bottom-2 bg-gradient-to-r from-amber-600 via-indigo-900 to-purple-900 border border-amber-400/50 text-amber-200 text-[10px] sm:text-xs font-bold px-3.5 py-0.5 rounded-full shadow-lg tracking-wider whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>占い × 性格診断</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3 max-w-lg px-2">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-[11px] sm:text-xs font-semibold">
            🔮 西洋占星術（12星座・エレメント） × 行動心理学 融合鑑定
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            占い <span className="text-amber-400">×</span> 性格診断
          </h1>
          <p className="text-xs sm:text-base text-slate-300 font-normal leading-relaxed">
            生年月日・12星座の守護エレメント・直感カラーと全25問の行動心理テストを融合。<br className="hidden sm:inline" />
            あなたの宿命・本質・強み・適職・対人＆恋愛の相性を精密鑑定します。
          </p>
        </div>

        {/* Features Pills */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md pt-1 sm:pt-2">
          <div className="glass-panel p-2.5 sm:p-3 rounded-2xl text-center border border-white/10 space-y-1">
            <Sparkles className="w-4 h-4 text-amber-400 mx-auto" />
            <div className="text-[11px] sm:text-xs font-bold text-slate-200">12星座・占星術</div>
            <div className="text-[10px] text-slate-400">属性＆直感カラー</div>
          </div>
          <div className="glass-panel p-2.5 sm:p-3 rounded-2xl text-center border border-white/10 space-y-1">
            <Shield className="w-4 h-4 text-indigo-400 mx-auto" />
            <div className="text-[11px] sm:text-xs font-bold text-slate-200">全25問心理テスト</div>
            <div className="text-[10px] text-slate-400">行動パターン解析</div>
          </div>
          <div className="glass-panel p-2.5 sm:p-3 rounded-2xl text-center border border-white/10 space-y-1">
            <Zap className="w-4 h-4 text-cyan-400 mx-auto" />
            <div className="text-[11px] sm:text-xs font-bold text-slate-200">全24タイプ鑑定</div>
            <div className="text-[10px] text-slate-400">詳細相性＆AI解説</div>
          </div>
        </div>

        {/* Start Button */}
        <div className="w-full max-w-md pt-2 sm:pt-4">
          <button
            onClick={() => { soundManager.playClick(); onStart(); }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-base sm:text-lg shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group border border-amber-400/30 min-h-[52px]"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span>占い × 性格診断をはじめる（無料）</span>
            <ArrowRight className="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-[10px] sm:text-xs text-slate-500 font-normal tracking-wider">
        ASTROLOGY & PSYCHOLOGICAL PERSONALITY ASSESSMENT
      </div>
    </div>
  );
};
