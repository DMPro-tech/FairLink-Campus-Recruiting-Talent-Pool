import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { ApplicationStats } from '../types.js';

interface RecruiterHeaderTileProps {
  stats: ApplicationStats;
  onResetPool: () => void;
  isResetting?: boolean;
}

export const RecruiterHeaderTile: React.FC<RecruiterHeaderTileProps> = ({
  stats,
  onResetPool,
  isResetting = false,
}) => {
  const percentage = stats.total > 0 ? Math.round((stats.evaluated / stats.total) * 100) : 0;

  return (
    <div className="bg-[#f2f3ff] rounded-2xl p-4 shadow-sm border border-[#eaedff]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#4f46e5] text-white flex items-center justify-center font-bold text-base font-['Plus_Jakarta_Sans'] shrink-0 shadow-sm">
            S
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-lg text-[#131b2e] truncate font-['Plus_Jakarta_Sans'] leading-tight">
              Stripe Campus Recruiting
            </h1>
            <p className="text-xs text-[#5b598c] truncate mt-0.5">
              Stanford Fair Pool · Fall 2025
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#005338]"></span>
            <span>{stats.total} Leads</span>
          </div>

          <button
            onClick={onResetPool}
            disabled={isResetting}
            title="Reset Talent Pool to original demo state"
            className="w-7 h-7 rounded-lg bg-white/70 hover:bg-white text-[#5b598c] hover:text-[#131b2e] flex items-center justify-center transition-colors border border-[#dae2fd]"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Quick Triage Progress Sparkline */}
      <div className="mt-3 pt-3 border-t border-[#dae2fd]/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <CheckCircle2 className="w-4 h-4 text-[#006e4b] shrink-0" />
          <span className="text-xs text-[#464555]">Review Status:</span>
          <span className="text-xs font-bold text-[#131b2e]">
            {stats.evaluated} Evaluated
          </span>
          <span className="text-[11px] text-[#5b598c]">({percentage}%)</span>
        </div>

        <div className="w-28 sm:w-36 bg-[#dae2fd] rounded-full h-2 overflow-hidden shrink-0">
          <div
            className="bg-[#3525cd] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
