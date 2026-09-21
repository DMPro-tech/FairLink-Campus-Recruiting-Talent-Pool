import React from 'react';
import { BadgeCheck, QrCode, MessageSquare, Users } from 'lucide-react';

export type AppTab = 'talent-pool' | 'scanner' | 'booths' | 'fair-pass';

interface BottomNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-white/90 backdrop-blur-xl shadow-[0_-8px_24px_-4px_rgba(15,23,42,0.06)] border-t border-[#eaedff]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {/* Fair Pass */}
        <button
          onClick={() => onSelectTab('fair-pass')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-14 transition-colors ${
            currentTab === 'fair-pass'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#464555] hover:text-[#131b2e]'
          }`}
        >
          <BadgeCheck className="w-5 h-5" />
          <span className="text-[11px] tracking-tight">Fair Pass</span>
        </button>

        {/* Scanner */}
        <button
          onClick={() => onSelectTab('scanner')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-14 transition-colors ${
            currentTab === 'scanner'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#464555] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <QrCode className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#3525cd]" />
          </div>
          <span className="text-[11px] tracking-tight">Scanner</span>
        </button>

        {/* Booths & Chats */}
        <button
          onClick={() => onSelectTab('booths')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-14 transition-colors ${
            currentTab === 'booths'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#464555] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-[#3525cd] text-white text-[9px] font-bold leading-tight">
              3
            </span>
          </div>
          <span className="text-[11px] tracking-tight">Booths</span>
        </button>

        {/* Talent Pool (Primary Screen) */}
        <button
          onClick={() => onSelectTab('talent-pool')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-14 transition-colors ${
            currentTab === 'talent-pool'
              ? 'text-[#3525cd] font-bold'
              : 'text-[#464555] hover:text-[#131b2e]'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[11px] tracking-tight">Talent Pool</span>
        </button>
      </div>
    </nav>
  );
};
