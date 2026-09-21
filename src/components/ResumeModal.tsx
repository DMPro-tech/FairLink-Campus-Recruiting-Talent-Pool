import React, { useState } from 'react';
import { FileText, X, Download, Save, Star, Check } from 'lucide-react';
import { ApplicationRecord } from '../types.js';

interface ResumeModalProps {
  candidate: ApplicationRecord | null;
  onClose: () => void;
  onUpdateCandidate: (
    id: string,
    updates: Partial<ApplicationRecord>
  ) => Promise<void>;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  candidate,
  onClose,
  onUpdateCandidate,
}) => {
  if (!candidate) return null;

  const [notes, setNotes] = useState(candidate.notes);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await onUpdateCandidate(candidate.id, { notes });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#eaedff]">
        {/* Header */}
        <div className="p-4 bg-[#eaedff] flex items-center justify-between border-b border-[#dae2fd]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#3525cd] text-white flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-[#131b2e] truncate font-['Plus_Jakarta_Sans']">
                {candidate.candidateName} · Dossier
              </h3>
              <p className="text-xs text-[#5b598c] truncate">
                {candidate.school} · {candidate.assets.resumeFileName || 'Resume.pdf'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#dae2fd] text-[#464555] hover:bg-[#c7c4d8] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-[#131b2e] bg-[#faf8ff]">
          {/* Quick Match & Priority Strip */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#eaedff] shadow-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#3525cd] text-white text-[11px] font-bold">
                {candidate.matchScore}% Match
              </span>
              <span className="text-xs font-semibold text-[#131b2e]">
                {candidate.gpa.toFixed(2)} GPA
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[11px] font-bold">
              {candidate.sentimentStatus}
            </span>
          </div>

          {/* Experience & Leadership */}
          <div className="bg-white p-3.5 rounded-xl border border-[#eaedff] shadow-xs">
            <div className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans'] mb-1">
              Experience &amp; Leadership
            </div>
            <div className="text-[#5b598c] font-medium text-xs">
              Summer SWE Intern · High-Throughput Distributed Systems
            </div>
            <p className="mt-1.5 text-[#464555] leading-relaxed">
              Architected multi-region transactional queue fallback reduction
              system, slashing peak timeout rates and optimizing memory allocators.
            </p>
          </div>

          {/* Education & Honors */}
          <div className="bg-white p-3.5 rounded-xl border border-[#eaedff] shadow-xs">
            <div className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans'] mb-1">
              Education &amp; Honors
            </div>
            <div className="text-[#5b598c] font-medium text-xs">
              {candidate.school} · {candidate.degree}, Class of '{candidate.gradYear}
            </div>
            <p className="mt-1 text-[#464555]">
              Dean's Honor List (All Semesters) · ACM Chapter Officer &amp; Teaching Assistant
            </p>
          </div>

          {/* Core Competencies */}
          <div className="bg-white p-3.5 rounded-xl border border-[#eaedff] shadow-xs">
            <div className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans'] mb-2">
              Core Competencies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Distributed Storage',
                'Go',
                'Rust',
                'Kafka',
                'TypeScript',
                'React',
                'Docker',
                'gRPC',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-[#eaedff] text-[#3525cd] rounded-md text-[11px] font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Recruiter Notes (Updates via PUT /api/applications/:id) */}
          <div className="bg-white p-3.5 rounded-xl border border-[#eaedff] shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-xs text-[#131b2e]">
                Recruiter Scratchpad (HTTP PUT)
              </label>
              {saveSuccess && (
                <span className="text-[11px] text-[#006e4b] flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3" /> Saved to API
                </span>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add rapid debrief notes or interview recommendations..."
              className="w-full p-2.5 rounded-lg bg-[#faf8ff] text-[#131b2e] border border-[#dae2fd] text-xs focus:outline-none focus:ring-1 focus:ring-[#3525cd]"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSaveNotes}
                disabled={isSaving || notes === candidate.notes}
                className="px-3 py-1.5 rounded-lg bg-[#3525cd] text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-[#4f46e5] disabled:opacity-50 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Update Notes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 bg-[#eaedff] flex items-center justify-end gap-2 border-t border-[#dae2fd]">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-white text-[#131b2e] hover:bg-[#f2f3ff] text-xs font-semibold border border-[#c7c4d8] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert(`Verified PDF Dossier downloaded for ${candidate.candidateName}!`);
            }}
            className="px-4 py-2 rounded-xl bg-[#3525cd] text-white hover:bg-[#4f46e5] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Verified PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
