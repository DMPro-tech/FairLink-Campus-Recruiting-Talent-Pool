import React, { useState } from 'react';
import {
  Zap,
  Star,
  Check,
  FileText,
  Code2,
  Play,
  Pause,
  Calendar,
  Forward,
  Archive,
  BookOpen,
  Share2,
  StickyNote,
  Sparkles,
} from 'lucide-react';
import { ApplicationRecord, SentimentStatus, InterviewStatus } from '../types.js';

interface CandidateCardProps {
  candidate: ApplicationRecord;
  onOpenResume: (candidate: ApplicationRecord) => void;
  onUpdateCandidate: (
    id: string,
    updates: Partial<ApplicationRecord>
  ) => Promise<void>;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onOpenResume,
  onUpdateCandidate,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSentimentPicker, setShowSentimentPicker] = useState(false);
  const [forwardedNotice, setForwardedNotice] = useState(false);

  const handleScheduleInterview = async () => {
    setIsUpdating(true);
    try {
      const nextStatus: InterviewStatus =
        candidate.interviewStatus === 'none'
          ? '1st-round-scheduled'
          : candidate.interviewStatus === '1st-round-scheduled'
          ? 'interview-scheduled'
          : 'none';

      await onUpdateCandidate(candidate.id, {
        interviewStatus: nextStatus,
        evaluated: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSentimentSelect = async (status: SentimentStatus) => {
    setShowSentimentPicker(false);
    setIsUpdating(true);
    try {
      await onUpdateCandidate(candidate.id, {
        sentimentStatus: status,
        evaluated: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleArchive = async () => {
    setIsUpdating(true);
    try {
      const nextSentiment: SentimentStatus =
        candidate.sentimentStatus === 'archived' ? 'fast-track' : 'archived';
      await onUpdateCandidate(candidate.id, {
        sentimentStatus: nextSentiment,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleForward = () => {
    setForwardedNotice(true);
    setTimeout(() => setForwardedNotice(false), 2400);
  };

  const getSentimentBadge = (status: SentimentStatus) => {
    switch (status) {
      case 'fast-track':
        return {
          label: 'Fast-Track Interview',
          bg: 'bg-[#6ffbbe] text-[#002113]',
          icon: <Star className="w-3.5 h-3.5 fill-[#002113]" />,
        };
      case 'tech-screen':
        return {
          label: 'Needs Tech Screen',
          bg: 'bg-[#e3dfff] text-[#181445]',
          icon: <Code2 className="w-3.5 h-3.5" />,
        };
      case 'culture-fit':
        return {
          label: 'Great Culture Fit',
          bg: 'bg-[#e2e7ff] text-[#3525cd]',
          icon: <Sparkles className="w-3.5 h-3.5" />,
        };
      case 'infra-team':
        return {
          label: 'Refer to Infra Team',
          bg: 'bg-[#dae2fd] text-[#131b2e]',
          icon: <Share2 className="w-3.5 h-3.5" />,
        };
      case 'archived':
        return {
          label: 'Archived Lead',
          bg: 'bg-[#f2f3ff] text-[#777587]',
          icon: <Archive className="w-3.5 h-3.5" />,
        };
      default:
        return {
          label: 'Pending Triage',
          bg: 'bg-[#eaedff] text-[#464555]',
          icon: <StickyNote className="w-3.5 h-3.5" />,
        };
    }
  };

  const badge = getSentimentBadge(candidate.sentimentStatus);

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden border ${
        candidate.sentimentStatus === 'archived'
          ? 'border-dashed border-[#c7c4d8] opacity-75'
          : 'border-[#eaedff]'
      }`}
    >
      {/* High Match Ribbon */}
      <div className="absolute top-0 right-0 z-10">
        <div
          className={`px-3 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1 shadow-sm ${
            candidate.matchScore >= 95
              ? 'bg-gradient-to-l from-[#4f46e5] to-[#3525cd] text-white'
              : candidate.matchScore >= 90
              ? 'bg-[#dae2fd] text-[#131b2e]'
              : 'bg-[#eaedff] text-[#464555]'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{candidate.matchScore}% Match</span>
        </div>
      </div>

      {/* Candidate Identity Header */}
      <div className="flex items-start gap-3 pr-24">
        <div className="relative shrink-0">
          <img
            src={candidate.candidateAvatar}
            alt={candidate.candidateName}
            className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#c7c4d8]/40"
          />
          <span className="absolute -bottom-1 -right-1 bg-[#005338] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow-xs">
            ✓
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="font-bold text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans']">
              {candidate.candidateName}
            </h2>
            {candidate.priority && (
              <Star className="w-3.5 h-3.5 fill-[#eab308] text-[#eab308] shrink-0" />
            )}
          </div>
          <p className="text-xs text-[#5b598c] truncate">
            {candidate.school} · {candidate.degree} '{candidate.gradYear}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-semibold text-[#131b2e]">
              {candidate.gpa.toFixed(2)} GPA
            </span>
            <span className="text-[#777587] text-[10px]">•</span>
            <span className="text-xs text-[#5b598c] truncate">
              {candidate.specialization}
            </span>
          </div>
        </div>
      </div>

      {/* Recruiter Tags & Fair Notes */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 relative">
        {/* Sentiment Pill (Clickable to switch via PUT) */}
        <button
          onClick={() => setShowSentimentPicker(!showSentimentPicker)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold hover:opacity-90 active:scale-95 transition-all ${badge.bg}`}
          title="Click to change candidate sentiment tag via PUT /api/applications/:id"
        >
          {badge.icon}
          <span>{badge.label}</span>
        </button>

        {/* Notes Preview Pill */}
        {candidate.notes && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#464555] text-xs max-w-[260px] truncate border border-[#eaedff]">
            <StickyNote className="w-3 h-3 text-[#5b598c] shrink-0" />
            <span className="truncate">Notes: {candidate.notes}</span>
          </span>
        )}

        {/* Sentiment Dropdown Picker */}
        {showSentimentPicker && (
          <div className="absolute top-8 left-0 z-30 bg-white rounded-xl shadow-xl border border-[#eaedff] p-1.5 flex flex-col gap-1 w-52 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2 py-1 text-[11px] font-bold text-[#777587] uppercase">
              Update Triage Tag (HTTP PUT)
            </div>
            {(
              [
                'fast-track',
                'tech-screen',
                'culture-fit',
                'infra-team',
                'pending',
              ] as SentimentStatus[]
            ).map((st) => {
              const b = getSentimentBadge(st);
              return (
                <button
                  key={st}
                  onClick={() => handleSentimentSelect(st)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    candidate.sentimentStatus === st
                      ? 'bg-[#eaedff] text-[#3525cd] font-bold'
                      : 'hover:bg-[#f2f3ff] text-[#131b2e]'
                  }`}
                >
                  {b.icon}
                  <span>{b.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Dossier Previews Box */}
      <div className="mt-3 p-2.5 rounded-xl bg-[#f2f3ff] flex flex-col gap-2 border border-[#eaedff]">
        <div className="flex items-center justify-between text-xs text-[#464555] font-medium">
          <span>Candidate Assets</span>
          <span className="text-[#005338] flex items-center gap-1 font-semibold text-[11px]">
            <Check className="w-3 h-3" />
            Verified Profile
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {/* PDF Resume 1-Click View */}
          <button
            onClick={() => onOpenResume(candidate)}
            className="flex items-center gap-2 p-2 rounded-lg bg-white text-[#131b2e] hover:bg-[#eaedff] transition-colors text-left shadow-xs border border-[#eaedff]"
          >
            <FileText className="w-4 h-4 text-[#3525cd] shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-semibold block truncate">
                PDF Resume
              </span>
              <span className="text-[10px] text-[#5b598c] truncate block">
                1-Click View
              </span>
            </div>
          </button>

          {/* GitHub / Portfolio Link */}
          {candidate.assets.githubUrl ? (
            <a
              href={candidate.assets.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg bg-white text-[#131b2e] hover:bg-[#eaedff] transition-colors text-left shadow-xs border border-[#eaedff]"
            >
              <Code2 className="w-4 h-4 text-[#5b598c] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate">
                  GitHub: {candidate.assets.githubReposCount || 20}+ repos
                </span>
                <span className="text-[10px] text-[#5b598c] truncate block">
                  {candidate.assets.githubSkills || 'Code Portfolio'}
                </span>
              </div>
            </a>
          ) : candidate.assets.arxivPaperUrl ? (
            <a
              href={candidate.assets.arxivPaperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg bg-white text-[#131b2e] hover:bg-[#eaedff] transition-colors text-left shadow-xs border border-[#eaedff]"
            >
              <BookOpen className="w-4 h-4 text-[#3525cd] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate">
                  ArXiv Paper
                </span>
                <span className="text-[10px] text-[#5b598c] truncate block">
                  Published Research
                </span>
              </div>
            </a>
          ) : (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white text-[#131b2e] shadow-xs border border-[#eaedff]">
              <Check className="w-4 h-4 text-[#006e4b] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate">
                  Transcript Verified
                </span>
                <span className="text-[10px] text-[#5b598c] truncate block">
                  GPA: {candidate.gpa.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Audio Pitch Micro-Player (Interactive) */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#e2dfff] text-[#181445] transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-7 h-7 rounded-full bg-[#3525cd] text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-[#4f46e5] transition-all"
              title={isPlayingAudio ? 'Pause pitch memo' : 'Play 30s audio pitch'}
            >
              {isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 fill-white" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              )}
            </button>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">30s Audio Pitch</div>
              <div className="text-[10px] text-[#3323cc] truncate">
                {candidate.assets.audioPitchTitle ||
                  `"Why I'm seeking ${candidate.roleSeeking}"`}
              </div>
            </div>
          </div>

          {/* Animated Waveform sparkline */}
          <div className="flex items-center gap-0.5 h-4 shrink-0 px-2">
            {[2, 3.5, 1.5, 4, 2.5, 3, 1].map((h, i) => (
              <div
                key={i}
                className={`w-0.5 bg-[#3525cd] rounded-full transition-all duration-300 ${
                  isPlayingAudio ? 'animate-pulse' : ''
                }`}
                style={{
                  height: isPlayingAudio ? `${Math.max(h * 3, 4)}px` : `${h * 2}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter Direct Action Bar */}
      <div className="mt-3.5 pt-2 flex items-center justify-between gap-2 border-t border-[#eaedff]">
        {/* Schedule Interview (Triggers PUT to Express Backend) */}
        <button
          onClick={handleScheduleInterview}
          disabled={isUpdating}
          className={`flex-1 h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] ${
            candidate.interviewStatus === '1st-round-scheduled'
              ? 'bg-[#006e4b] text-white hover:bg-[#005338]'
              : candidate.interviewStatus === 'interview-scheduled'
              ? 'bg-[#4f46e5] text-white hover:bg-[#3525cd]'
              : candidate.interviewStatus === 'code-sample-requested'
              ? 'bg-[#e2dfff] text-[#181445] hover:bg-[#c4c1fb]'
              : 'bg-[#3525cd] text-white hover:bg-[#4f46e5]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>
            {candidate.interviewStatus === '1st-round-scheduled'
              ? '1st Round Booked'
              : candidate.interviewStatus === 'interview-scheduled'
              ? 'Interview Scheduled'
              : candidate.interviewStatus === 'code-sample-requested'
              ? 'Sample Requested'
              : 'Schedule 1st Round'}
          </span>
        </button>

        {/* Forward to Hiring Manager */}
        <button
          onClick={handleForward}
          className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#464555] flex items-center justify-center hover:bg-[#dae2fd] transition-colors relative"
          title="Forward Dossier to Hiring Manager"
        >
          <Forward className="w-4 h-4" />
          {forwardedNotice && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#131b2e] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-30 shadow-md">
              Forwarded!
            </span>
          )}
        </button>

        {/* Archive Lead (PUT request) */}
        <button
          onClick={handleToggleArchive}
          disabled={isUpdating}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            candidate.sentimentStatus === 'archived'
              ? 'bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffb4ab]'
              : 'bg-[#eaedff] text-[#777587] hover:text-[#ba1a1a] hover:bg-[#ffdad6]'
          }`}
          title={
            candidate.sentimentStatus === 'archived'
              ? 'Unarchive candidate'
              : 'Archive lead'
          }
        >
          <Archive className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
