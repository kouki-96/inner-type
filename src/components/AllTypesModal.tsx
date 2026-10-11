import React, { useState } from 'react';
import { X, BookOpen, ChevronRight, Search } from 'lucide-react';
import { PERSONALITY_TYPES, PersonalityResult } from '../data/results';
import { soundManager } from '../lib/soundEffects';

interface AllTypesModalProps {
  onClose: () => void;
  onSelectType: (type: PersonalityResult) => void;
}

export const AllTypesModal: React.FC<AllTypesModalProps> = ({ onClose, onSelectType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeDetail, setSelectedTypeDetail] = useState<PersonalityResult | null>(null);

  const allTypes = Object.values(PERSONALITY_TYPES);

  const filteredTypes = allTypes.filter(type => {
    return searchQuery === '' ||
      type.name.includes(searchQuery) ||
      type.categoryTag.includes(searchQuery) ||
      type.tagline.includes(searchQuery);
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] glass-panel rounded-3xl p-5 sm:p-7 space-y-5 border border-indigo-500/40 relative flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-slate-100">全8種類の性格タイプ一覧</h2>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="キーワードで性格タイプを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400"
          />
        </div>

        {/* Types Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTypes.map(type => (
              <div
                key={type.id}
                onClick={() => { soundManager.playClick(); setSelectedTypeDetail(type); }}
                className="glass-card p-3.5 rounded-2xl cursor-pointer hover:border-indigo-400/50 hover:scale-[1.01] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl shrink-0">{type.symbolEmoji}</div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-indigo-300 font-semibold">
                      {type.categoryTag}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {type.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{type.tagline}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Detail Sub-modal */}
        {selectedTypeDetail && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-lg z-60 flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel rounded-3xl p-6 space-y-4 border border-indigo-500/50 relative max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setSelectedTypeDetail(null)}
                className="absolute top-4 right-4 p-1 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 pt-2">
                <div className="text-5xl">{selectedTypeDetail.symbolEmoji}</div>
                <span className="text-xs text-indigo-300 font-bold">{selectedTypeDetail.categoryTag}</span>
                <h3 className="text-xl font-bold text-white">{selectedTypeDetail.name}</h3>
                <p className="text-xs text-slate-300">「{selectedTypeDetail.tagline}」</p>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-200">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-indigo-300">【全体特徴】</span>
                  <p>{selectedTypeDetail.description.overview}</p>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-emerald-300">【強み】</span>
                  <p>{selectedTypeDetail.description.strengths}</p>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-amber-300">【注意点】</span>
                  <p>{selectedTypeDetail.description.weaknesses}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onSelectType(selectedTypeDetail);
                  setSelectedTypeDetail(null);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1"
              >
                <span>このタイプを結果画面で見る</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
