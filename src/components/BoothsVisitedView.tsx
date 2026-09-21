import React, { useState } from 'react';
import {
  Handshake,
  Building2,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Paperclip,
  Clock,
  Send,
  ExternalLink,
  ChevronRight,
  Bookmark,
} from 'lucide-react';

export const BoothsVisitedView: React.FC = () => {
  const [followUpSent, setFollowUpSent] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftText, setDraftText] = useState(
    `Hi Sarah,\n\nGreat talking about the payments infra role at booth B-14 earlier today! I really enjoyed hearing how the ledger team handles sub-millisecond reconciliation during flash sales.\n\nAs mentioned, I’ve attached my updated resume and linked my repo demonstrating high-concurrency event pipelines. Looking forward to staying connected!\n\nBest,\nAlex Chen`
  );

  return (
    <div className="flex flex-col gap-4 pb-20 animate-in fade-in duration-200">
      {/* Hero / Momentum Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#e2e7ff] p-4 shadow-sm border border-[#c7c4d8]/40">
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[10px] font-bold uppercase tracking-wider mb-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006e4b]" />
              Post-Fair Momentum
            </div>
            <h2 className="font-bold text-lg text-[#131b2e] font-['Plus_Jakarta_Sans']">
              Connections &amp; Follow-Ups
            </h2>
            <p className="text-xs text-[#464555] mt-0.5">
              3 recruiters scanned your pass today. Lock in your next steps while
              conversations are fresh.
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#4f46e5] text-white flex items-center justify-center shrink-0 shadow-md">
            <Handshake className="w-5 h-5" />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 relative z-10">
          <div className="flex flex-col p-2.5 rounded-xl bg-white shadow-xs border border-[#eaedff]">
            <div className="flex items-center gap-1 text-[#3525cd]">
              <Building2 className="w-3.5 h-3.5" />
              <span className="font-bold text-base font-['Plus_Jakarta_Sans']">3</span>
            </div>
            <span className="text-[11px] text-[#464555] mt-0.5">Companies Met</span>
          </div>

          <div className="flex flex-col p-2.5 rounded-xl bg-white shadow-xs border border-[#eaedff]">
            <div className="flex items-center gap-1 text-[#006e4b]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-bold text-base font-['Plus_Jakarta_Sans']">2</span>
            </div>
            <span className="text-[11px] text-[#464555] mt-0.5">Follow-Ups Due</span>
          </div>

          <div className="flex flex-col p-2.5 rounded-xl bg-white shadow-xs border border-[#eaedff]">
            <div className="flex items-center gap-1 text-[#5b598c]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-bold text-base font-['Plus_Jakarta_Sans']">1</span>
            </div>
            <span className="text-[11px] text-[#464555] mt-0.5">Interview Invite</span>
          </div>
        </div>
      </div>

      {/* AI Smart Follow-Up Generator Box */}
      <div className="relative overflow-hidden rounded-2xl bg-[#4f46e5] text-white p-4 shadow-md">
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-white text-[#4f46e5] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <Sparkles className="w-4 h-4 fill-[#4f46e5]" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-xs font-['Plus_Jakarta_Sans']">
                Smart Follow-Up Assistant
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase">
                AI Drafted
              </span>
            </div>
            <p className="text-xs text-white/90 mt-1 leading-relaxed">
              FairLink auto-generated 3 custom thank-you drafts mentioning key
              topics from your booth visits.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setShowDraftModal(true)}
                className="px-3 py-1.5 rounded-lg bg-white text-[#4f46e5] hover:bg-[#faf8ff] text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                Review All Drafts (2 min)
              </button>
              <span className="text-[11px] text-white/80 flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                2 files linked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booths Visited List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans']">
            Booths You Visited (3 Today)
          </h3>
          <span className="text-xs text-[#5b598c] font-medium">Sorted by Time</span>
        </div>

        {/* Booth 1: Stripe */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4f46e5] text-white font-bold flex items-center justify-center text-sm font-['Plus_Jakarta_Sans']">
                S
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans']">
                    Stripe
                  </h4>
                  <span className="text-xs text-[#5b598c]">Booth B-14</span>
                </div>
                <p className="text-xs text-[#464555]">
                  Sarah Jenkins (Lead Tech Recruiter)
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[11px] font-bold">
              Follow-Up Recommended
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#5b598c]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Today at 2:15 PM
            </span>
            <span>•</span>
            <span>~12 min chat</span>
            <span>•</span>
            <span className="font-semibold text-[#3525cd]">Payments Infra</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setShowDraftModal(true)}
              disabled={followUpSent}
              className={`flex-1 h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                followUpSent
                  ? 'bg-[#006e4b] text-white'
                  : 'bg-[#3525cd] hover:bg-[#4f46e5] text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {followUpSent ? '✓ Follow-Up Sent!' : 'Send Tailored Follow-Up'}
              </span>
            </button>
            <button className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#464555] flex items-center justify-center hover:bg-[#dae2fd]">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Booth 2: Datadog */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5b598c] text-white font-bold flex items-center justify-center text-sm font-['Plus_Jakarta_Sans']">
                DD
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans']">
                    Datadog
                  </h4>
                  <span className="text-xs text-[#5b598c]">Booth A-08</span>
                </div>
                <p className="text-xs text-[#464555]">
                  Marcus Vance (Staff Engineer)
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#181445] text-[11px] font-bold">
              Take-Home Screen Received
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e]">
            <span className="font-bold text-[#5b598c]">Marcus's Note:</span> "Loved
            your distributed systems project. Check the assessment link for the
            next step!"
          </div>
        </div>
      </div>

      {/* Follow-Up Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-4 shadow-2xl border border-[#eaedff] space-y-3">
            <div className="flex items-center justify-between border-b border-[#eaedff] pb-2">
              <h3 className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans']">
                Review Follow-Up · Sarah Jenkins (Stripe)
              </h3>
              <button
                onClick={() => setShowDraftModal(false)}
                className="w-7 h-7 rounded-full bg-[#eaedff] flex items-center justify-center text-[#464555]"
              >
                ✕
              </button>
            </div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={6}
              className="w-full p-2.5 rounded-xl border border-[#dae2fd] text-xs text-[#131b2e] focus:outline-none focus:ring-1 focus:ring-[#3525cd]"
            />
            <button
              onClick={() => {
                setFollowUpSent(true);
                setShowDraftModal(false);
              }}
              className="w-full h-11 rounded-xl bg-[#3525cd] text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Send via FairLink Direct</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
