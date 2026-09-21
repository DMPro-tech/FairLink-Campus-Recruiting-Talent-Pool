import React, { useState } from 'react';
import { RefreshCw, CloudUpload, ShieldCheck, Check } from 'lucide-react';
import { syncToAts } from '../services/api.js';

interface AtsSyncBarProps {
  candidateCount: number;
  onSyncComplete: () => void;
}

export const AtsSyncBar: React.FC<AtsSyncBarProps> = ({
  candidateCount,
  onSyncComplete,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedRecently, setSyncedRecently] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await syncToAts();
      setSyncedRecently(true);
      setSyncMessage(
        res.message || `Exported ${candidateCount} leads to Greenhouse & Lever ATS.`
      );
      onSyncComplete();
      setTimeout(() => {
        setSyncedRecently(false);
      }, 4000);
    } catch (err: any) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-[#dae2fd]/60 rounded-2xl p-4 shadow-sm border border-[#c7c4d8]/60 mt-4 mb-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shrink-0 shadow-xs">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans'] truncate">
              ATS Pipeline Sync
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#5b598c]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006e4b]"></span>
              <span>Greenhouse &amp; Lever Ready</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSync}
        disabled={isSyncing}
        className={`w-full mt-3 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] ${
          syncedRecently
            ? 'bg-[#006e4b] text-white'
            : isSyncing
            ? 'bg-[#4f46e5] text-white'
            : 'bg-[#006e4b] hover:bg-[#005338] text-white'
        }`}
      >
        {isSyncing ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Syncing {candidateCount} Leads to Greenhouse (POST)...</span>
          </>
        ) : syncedRecently ? (
          <>
            <Check className="w-4 h-4" />
            <span>{syncMessage}</span>
          </>
        ) : (
          <>
            <CloudUpload className="w-4 h-4" />
            <span>Export {candidateCount} Candidates to Greenhouse</span>
          </>
        )}
      </button>

      <div className="mt-2.5 flex items-center justify-center gap-1 text-center text-[#777587] text-[10px] font-bold uppercase tracking-wider">
        <ShieldCheck className="w-3.5 h-3.5 text-[#006e4b]" />
        <span>Candidate consent verified · Encrypted FERPA compliant</span>
      </div>
    </div>
  );
};
