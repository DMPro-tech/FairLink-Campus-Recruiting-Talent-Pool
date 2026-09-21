import React, { useState } from 'react';
import {
  X,
  Flashlight,
  Keyboard,
  CheckCircle2,
  QrCode,
  Sparkles,
  Play,
  Pause,
  Star,
  Code2,
  Share2,
  Trash2,
  Radio,
} from 'lucide-react';
import { SentimentStatus, CreateApplicationDTO } from '../types.js';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLead: (dto: CreateApplicationDTO) => Promise<void>;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onSaveLead,
}) => {
  if (!isOpen) return null;

  const [torchOn, setTorchOn] = useState(false);
  const [selectedSentiment, setSelectedSentiment] =
    useState<SentimentStatus>('fast-track');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [candidateName, setCandidateName] = useState('Maya Lin');
  const [school, setSchool] = useState('Stanford University');
  const [roleSeeking, setRoleSeeking] = useState(
    'Frontend Engineer / Full-Stack New Grad'
  );
  const [notes, setNotes] = useState(
    'Spoke about distributed graph query engine project. Very articulate, strong system design instincts!'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [manualMode, setManualMode] = useState(false);

  const handleConfirmSave = async () => {
    setIsSaving(true);
    try {
      await onSaveLead({
        candidateName,
        school,
        roleSeeking,
        notes,
        sentimentStatus: selectedSentiment,
        gpa: 3.92,
        specialization: 'Systems Architecture',
        matchScore: 98,
        priority: selectedSentiment === 'fast-track',
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1200);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextScan = () => {
    // Rotate to a sample new candidate for scanning
    setCandidateName('Kai Nakamura');
    setSchool('UC Berkeley');
    setRoleSeeking('Core Infrastructure / Cloud Platform');
    setNotes('Exceptional knowledge of eBPF kernel hooks and Linux networking.');
    setSelectedSentiment('tech-screen');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/80 backdrop-blur-sm flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#faf8ff] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#eaedff]">
        {/* Top Bar */}
        <div className="p-3.5 bg-[#eaedff] flex items-center justify-between border-b border-[#dae2fd]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006e4b] animate-ping" />
            <span className="font-bold text-xs text-[#131b2e] font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
              Recruiter Live Scanner · Booth #B-14
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#dae2fd] text-[#464555] hover:bg-[#c7c4d8] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4">
          {/* Simulated Viewfinder */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#283044] shadow-inner flex flex-col justify-between p-3">
            {/* Ambient fair backdrop */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, #4f46e5 0%, #1e1b4b 100%)',
              }}
            />

            {/* Top Viewfinder Controls */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131b2e]/80 text-white text-[10px] font-bold tracking-wider uppercase">
                <Radio className="w-3 h-3 text-[#6ffbbe] animate-pulse" />
                <span>NFC Auto-Read Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTorchOn(!torchOn)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    torchOn ? 'bg-[#6ffbbe] text-[#002113]' : 'bg-[#131b2e]/70 text-white'
                  }`}
                  title="Toggle Torch"
                >
                  <Flashlight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setManualMode(!manualMode)}
                  className="px-2.5 h-8 rounded-full bg-[#131b2e]/70 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Manual</span>
                </button>
              </div>
            </div>

            {/* Reticle / Locked Target */}
            <div className="relative z-10 self-center w-36 h-36 flex items-center justify-center">
              {/* Corner guides */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#6ffbbe] rounded-tl-lg shadow-[0_0_10px_rgba(111,251,190,0.8)]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#6ffbbe] rounded-tr-lg shadow-[0_0_10px_rgba(111,251,190,0.8)]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#6ffbbe] rounded-bl-lg shadow-[0_0_10px_rgba(111,251,190,0.8)]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#6ffbbe] rounded-br-lg shadow-[0_0_10px_rgba(111,251,190,0.8)]" />

              {/* Laser beam */}
              <div className="absolute inset-x-1 h-0.5 bg-[#6ffbbe] shadow-[0_0_12px_3px_rgba(111,251,190,0.9)] animate-pulse" />

              {/* ID locked chip */}
              <div className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg bg-[#131b2e]/90 text-white shadow-md border border-[#6ffbbe]/40">
                <div className="flex items-center gap-1 text-[#6ffbbe] text-xs font-bold">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>ID Locked</span>
                </div>
                <span className="text-[10px] text-white/80">{candidateName}</span>
              </div>
            </div>

            {/* Hint */}
            <div className="relative z-10 flex items-center justify-between text-white/90 text-[11px]">
              <span>Tap candidate fair card to back of device</span>
              <span className="font-bold text-[#6ffbbe] tracking-wider uppercase text-[10px]">
                Fast Capture
              </span>
            </div>
          </div>

          {/* Lead Captured Dossier Form */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6ffbbe]/30 text-[#005338] text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006e4b] animate-pulse" />
                <span>New Lead Detected</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-bold">
                98% Fit
              </span>
            </div>

            {/* Candidate Identity */}
            {manualMode ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Candidate Name"
                  className="w-full h-9 px-3 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#131b2e]"
                />
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="University"
                  className="w-full h-9 px-3 rounded-lg border border-[#dae2fd] text-xs text-[#131b2e]"
                />
                <input
                  type="text"
                  value={roleSeeking}
                  onChange={(e) => setRoleSeeking(e.target.value)}
                  placeholder="Role Seeking"
                  className="w-full h-9 px-3 rounded-lg border border-[#dae2fd] text-xs text-[#131b2e]"
                />
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-base text-[#131b2e] font-['Plus_Jakarta_Sans']">
                  {candidateName}
                </h3>
                <p className="text-xs text-[#5b598c]">{school} · May '25</p>
                <div className="mt-1.5 p-2 rounded-lg bg-[#f2f3ff] text-xs font-medium text-[#131b2e]">
                  Seeking: <span className="font-bold text-[#3525cd]">{roleSeeking}</span>
                </div>
              </div>
            )}

            {/* Recruiter Sentiment Triage Pills */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                  Recruiter Sentiment Triage
                </label>
                <span className="text-[10px] text-[#5b598c] font-semibold">
                  Direct API Sync
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  {
                    id: 'fast-track',
                    label: 'Fast-Track Interview',
                    icon: <Star className="w-3.5 h-3.5 fill-current" />,
                  },
                  {
                    id: 'tech-screen',
                    label: 'Needs Technical Screen',
                    icon: <Code2 className="w-3.5 h-3.5" />,
                  },
                  {
                    id: 'culture-fit',
                    label: 'Great Culture Fit',
                    icon: <Sparkles className="w-3.5 h-3.5" />,
                  },
                  {
                    id: 'infra-team',
                    label: 'Refer to Infra Team',
                    icon: <Share2 className="w-3.5 h-3.5" />,
                  },
                ].map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() =>
                      setSelectedSentiment(tag.id as SentimentStatus)
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      selectedSentiment === tag.id
                        ? 'bg-[#3525cd] text-white shadow-sm'
                        : 'bg-[#eaedff] text-[#464555] hover:bg-[#dae2fd]'
                    }`}
                  >
                    {tag.icon}
                    <span>{tag.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Memo Snippet */}
            <div className="p-2.5 rounded-xl bg-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-7 h-7 rounded-full bg-[#3525cd] text-white flex items-center justify-center shrink-0"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  )}
                </button>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#131b2e] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse" />
                    <span>0:24 booth memo attached</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5 h-2.5">
                    {[1, 2.5, 1.2, 3, 2, 2.8, 1, 2.2, 1.4].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 bg-[#3525cd] rounded-full ${
                          isPlayingAudio ? 'animate-pulse' : ''
                        }`}
                        style={{ height: `${h * 3}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button className="text-[#5b598c] hover:text-[#ba1a1a] p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Booth Scratchpad Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#464555] mb-1">
                Booth Scratchpad Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded-xl bg-[#faf8ff] text-xs text-[#131b2e] border border-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#3525cd]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleConfirmSave}
                disabled={isSaving}
                className="w-full h-12 rounded-xl bg-[#006e4b] hover:bg-[#005338] text-white flex items-center justify-center gap-2 font-bold text-sm shadow-md active:scale-[0.98] transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSaving
                    ? 'Saving to Backend API (POST)...'
                    : saveSuccess
                    ? '✓ Lead Saved to Talent Pool!'
                    : 'Confirm & Save Lead (HTTP POST)'}
                </span>
              </button>

              <button
                onClick={handleNextScan}
                className="w-full h-10 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <QrCode className="w-4 h-4 text-[#3525cd]" />
                <span>Next Candidate Scan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
