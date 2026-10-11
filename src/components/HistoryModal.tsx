import React from 'react';
import { X, History, Trash2, ArrowRight } from 'lucide-react';
import { DiagnosisResult } from '../lib/diagnosisLogic';
import { soundManager } from '../lib/soundEffects';

interface HistoryModalProps {
  history: DiagnosisResult[];
  onClose: () => void;
  onSelectHistory: (item: DiagnosisResult) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  history,
  onClose,
  onSelectHistory,
  onClearHistory,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md max-h-[80vh] glass-panel rounded-3xl p-6 space-y-4 border border-indigo-500/40 relative flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-100">過去の診断履歴 ({history.length})</h3>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {history.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400">
              まだ保存された診断履歴はありません。
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => { soundManager.playClick(); onSelectHistory(item); onClose(); }}
                className="glass-card p-3.5 rounded-2xl cursor-pointer hover:border-indigo-400/50 hover:scale-[1.01] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl shrink-0">{item.matchedPersonality.symbolEmoji}</div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-indigo-300">
                      {new Date(item.timestamp).toLocaleDateString('ja-JP')}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {item.matchedPersonality.name}
                    </h4>
                    <p className="text-[10px] text-slate-400">{item.matchedPersonality.categoryTag}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="pt-2 border-t border-white/10 flex justify-end shrink-0">
            <button
              onClick={() => { soundManager.playClick(); onClearHistory(); }}
              className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:text-rose-100 text-xs flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>履歴をクリア</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
