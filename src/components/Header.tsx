import React from 'react';
import { Activity, QrCode, Terminal } from 'lucide-react';

interface HeaderProps {
  onOpenInspector: () => void;
  onOpenScanner: () => void;
  pendingLogCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInspector,
  onOpenScanner,
  pendingLogCount,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="max-w-2xl mx-auto h-16 px-4 sm:px-5 flex items-center justify-between gap-3">
        {/* Logo & Event Tag */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-xl bg-[#3525cd] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            FL
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-[#131b2e] tracking-tight truncate font-['Plus_Jakarta_Sans']">
                FairLink
              </span>
              <span className="hidden xs:inline-block text-[#464555] text-xs">•</span>
              <span className="text-xs font-semibold text-[#5b598c] truncate hidden xs:inline-block">
                Talent Pool
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-[10px] font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006e4b] animate-pulse"></span>
                Fall Tech Fair '25
              </span>
            </div>
          </div>
        </div>

        {/* Right Tools: API Inspector Toggle & Recruiter Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Scanner shortcut */}
          <button
            onClick={onOpenScanner}
            className="h-9 px-2.5 rounded-lg bg-[#eaedff] text-[#3525cd] hover:bg-[#dae2fd] transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Open Booth Scanner"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Scan Lead</span>
          </button>

          {/* HTTP Request Flow Inspector Toggle */}
          <button
            onClick={onOpenInspector}
            className="h-9 px-2.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] hover:bg-[#e2e7ff] border border-[#dae2fd] transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Open Express HTTP Flow Inspector"
          >
            <Terminal className="w-4 h-4 text-[#3525cd]" />
            <span className="font-mono text-[11px] font-semibold text-[#3525cd]">
              API
            </span>
            {pendingLogCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#006e4b]"></span>
            )}
          </button>

          {/* Recruiter Avatar */}
          <div className="relative flex items-center justify-center">
            <img
              alt="Sarah Jenkins (Recruiter)"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c7c4d8]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsm_5d3ysVqThcpSxHvmM4WkxcQypEEtw8SDERbmmbkKElSQf7RqxJ6ZWT7adZJS-K4v9m8jKZ1eLgIWeYyze8JgU50dDtcjV1vpBi57T3KvC4XDJJRnCSbJqdzwXSMal7FxpzdB251btVEcBQOJDRMvE1We3K_Ubq6CrcM8EqliclUc6__VuCJm_w0-0Otzco00W-BiXtEVxYbMQwCZO30aEFAyroQJpzKtkfO9JduZV87k95Y_WA9w"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4edea3] ring-2 ring-[#faf8ff]"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
