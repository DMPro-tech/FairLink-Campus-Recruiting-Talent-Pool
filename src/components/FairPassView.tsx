import React, { useState } from 'react';
import {
  QrCode,
  Radio,
  Copy,
  Check,
  Share2,
  FileText,
  Volume2,
  ExternalLink,
  ShieldCheck,
  Play,
  Pause,
  RefreshCw,
} from 'lucide-react';

export const FairPassView: React.FC = () => {
  const [isNfc, setIsNfc] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 pb-20 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl text-[#131b2e] font-['Plus_Jakarta_Sans']">
            Your Fair Pass &amp; Digital Resume
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse" />
            Live Pass
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#5b598c] mt-1">
          <RefreshCw className="w-3.5 h-3.5 text-[#006e4b]" />
          <span>Last synced 12m ago via LinkedIn &amp; GitHub</span>
        </div>
      </div>

      {/* Digital Pass Card */}
      <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#3525cd] via-[#4f46e5] to-[#5b598c] text-white shadow-xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#6ffbbe]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-white/30 shadow-md">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmLxL2Z9yb_mjF-PBqiz_d4uaKIbcWF-dq4p8kgktRTMn4C40e2EwfVXEmZXO2XAS88kqWVDGrco1xPrnllU5tCZn5uipbsGXv-8qYnEyFmDq9cAbmbwiSGQiTquaqdv-gwYSRhK-XPyJ01CHBeJ-esBMt8ppcFwQvF6iT4l7XrSdbbb2ZH_cT_u6O9GLI5MEgZSFE0m_NBAQRSTSk-FN4h_gMWmSi_fPQua38X4HOsalxW5ZlE29ZnQ"
                  alt="Maya Lin"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#6ffbbe] ring-2 ring-[#3525cd]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-white font-['Plus_Jakarta_Sans']">
                    Maya Lin
                  </span>
                  <span className="text-[#6ffbbe] text-xs font-bold">✓</span>
                </div>
                <span className="text-xs text-white/80 block">
                  B.S. CS &amp; HCI, Stanford '25
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase backdrop-blur-xs">
                    Tier 1 Honors
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold backdrop-blur-xs">
                    Pass #409
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsNfc(!isNfc)}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              title="Toggle NFC Beam"
            >
              <Radio className="w-4 h-4" />
            </button>
          </div>

          {/* QR / NFC Container */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-md text-[#131b2e]">
            {isNfc ? (
              <div className="py-8 flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] animate-bounce">
                  <Radio className="w-8 h-8 text-[#3525cd]" />
                </div>
                <div>
                  <div className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Hold Near Recruiter Device
                  </div>
                  <div className="text-xs text-[#5b598c]">
                    NFC Beam Active &amp; Transmitting Dossier
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-44 h-44 p-2 bg-white rounded-xl shadow-inner flex items-center justify-center">
                  <QrCode className="w-36 h-36 text-[#3525cd]" />
                </div>
                <span className="text-[11px] text-[#5b598c] font-semibold">
                  Scan for Instant Resume &amp; Portfolio Dossier
                </span>
              </div>
            )}
          </div>

          {/* Card Button Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNfc(!isNfc)}
              className="flex-1 h-10 px-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center gap-1.5 text-xs font-semibold text-white transition-all"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{isNfc ? 'Switch to Scannable QR' : 'Switch to NFC Beam'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="h-10 px-3.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center gap-1.5 text-xs font-semibold text-white transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verified Channels */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs text-[#131b2e] font-['Plus_Jakarta_Sans']">
              Verified Portfolio &amp; Channels
            </span>
            <ShieldCheck className="w-4 h-4 text-[#006e4b]" />
          </div>
          <span className="text-xs font-semibold text-[#3525cd]">Re-sync</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4 text-[#3525cd]" />
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">LinkedIn</span>
                <span className="text-[11px] text-[#5b598c]">linkedin.com/in/mayalin-cs</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#777587]" />
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#006e4b]" />
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">
                  GitHub (42 repos)
                </span>
                <span className="text-[11px] text-[#5b598c]">github.com/mayalin</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#777587]" />
          </div>
        </div>
      </div>
    </div>
  );
};
