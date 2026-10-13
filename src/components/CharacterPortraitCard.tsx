import React from 'react';
import { Award, Sparkles, Shield, Zap, Flame, Star, Crown } from 'lucide-react';
import { PersonalityResult } from '../data/results';

interface CharacterPortraitCardProps {
  personality: PersonalityResult;
  size?: 'normal' | 'large';
}

export const CharacterPortraitCard: React.FC<CharacterPortraitCardProps> = ({
  personality,
  size = 'normal',
}) => {
  const { avatar, themeColor, categoryTag, tagline, name, symbolEmoji } = personality;
  const isLarge = size === 'large';

  return (
    <div className={`relative rounded-[28px] p-1 bg-gradient-to-b ${personality.gradientBg} border-2 border-white/20 shadow-2xl overflow-hidden group transition-all duration-300 hover:border-amber-400/60`}>
      {/* Dynamic Background Glow Rays */}
      <div
        className="absolute -top-16 -left-16 w-60 h-60 rounded-full blur-3xl opacity-50 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />
      <div
        className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* Inner Card Content with Glassmorphic Texture */}
      <div className="relative bg-slate-950/85 backdrop-blur-2xl rounded-[24px] p-5 sm:p-7 flex flex-col items-center text-center space-y-4 overflow-hidden border border-white/10">
        
        {/* Top Rarity & Category Header */}
        <div className="w-full flex items-center justify-between px-2">
          <div className="flex items-center gap-1 text-amber-300">
            {Array.from({ length: avatar.rarityStars || 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300 drop-shadow-sm" />
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-400/40 shadow-md">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-black tracking-wider text-amber-200">
              {categoryTag}
            </span>
          </div>
        </div>

        {/* Central Character Portrait Visual Frame */}
        <div className="relative my-2 group">
          {/* Outer Halo Rings */}
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-amber-400/30 animate-spin-slow pointer-events-none" />
          <div
            className="absolute -inset-1 rounded-full blur-md opacity-70 animate-pulse pointer-events-none"
            style={{ backgroundColor: themeColor }}
          />

          {/* Character Main Canvas Avatar Container */}
          <div
            className={`relative ${isLarge ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-24 h-24 sm:w-28 sm:h-28'} rounded-3xl ${avatar.avatarBg} p-2 shadow-2xl flex items-center justify-center border-2 border-white/50 transform group-hover:scale-105 transition-all duration-300`}
          >
            {/* Glossy Inner Specular Layer */}
            <div className="w-full h-full rounded-[22px] bg-slate-950/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/25 rounded-full blur-md rotate-45 pointer-events-none" />
              
              {/* Character Main Symbol Emoji */}
              <span className={`${isLarge ? 'text-6xl sm:text-7xl' : 'text-5xl sm:text-6xl'} drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] select-none transform transition-transform group-hover:scale-110`}>
                {symbolEmoji}
              </span>

              {/* Sparkle Badges */}
              <Sparkles className="w-4 h-4 text-yellow-300 absolute top-2 right-2 animate-bounce" />
              <Flame className="w-4 h-4 text-amber-400 absolute bottom-2 left-2 opacity-90" />
            </div>
          </div>

          {/* Character Archetype Title Emblem Badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 text-[11px] sm:text-xs font-black px-4 py-1 rounded-full shadow-2xl border border-amber-200/50 flex items-center gap-1.5 whitespace-nowrap z-20 tracking-wider">
            <Award className="w-3.5 h-3.5 text-slate-950 shrink-0" />
            <span>{avatar.badgeTitle}</span>
          </div>
        </div>

        {/* Character Title & Catchphrase */}
        <div className="pt-3 space-y-1.5 z-10 max-w-md">
          <h2 className={`${isLarge ? 'text-2xl sm:text-3xl font-black' : 'text-xl sm:text-2xl font-bold'} text-white tracking-tight leading-tight drop-shadow-md`}>
            {name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed italic">
            「{tagline}」
          </p>
        </div>

        {/* Trait Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-[10px] text-slate-300">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-indigo-500/30 flex items-center gap-1 font-bold">
            <Shield className="w-3 h-3 text-indigo-400" />
            <span>主軸: {
              {
                leader: 'リーダー (牽引者)',
                analyst: 'アナリスト (分析者)',
                creator: 'クリエイター (創作者)',
                supporter: 'サポーター (支援者)',
                realist: 'リアリスト (現実派)',
                idealist: 'アイデアイスト (理想家)',
                individual: 'インディビジュアル (独自派)',
                harmonizer: 'ハーモナイザー (調和者)',
              }[personality.primaryTrait] || personality.primaryTrait
            }</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 flex items-center gap-1 font-bold">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>補助: {
              {
                leader: 'リーダー (牽引者)',
                analyst: 'アナリスト (分析者)',
                creator: 'クリエイター (創作者)',
                supporter: 'サポーター (支援者)',
                realist: 'リアリスト (現実派)',
                idealist: 'アイデアイスト (理想家)',
                individual: 'インディビジュアル (独自派)',
                harmonizer: 'ハーモナイザー (調和者)',
              }[personality.secondaryTrait] || personality.secondaryTrait
            }</span>
          </span>
        </div>

      </div>
    </div>
  );
};
