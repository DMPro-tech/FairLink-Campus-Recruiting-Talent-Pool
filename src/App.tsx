/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.js';
import { RecruiterHeaderTile } from './components/RecruiterHeaderTile.js';
import { FilterBar } from './components/FilterBar.js';
import { CandidateCard } from './components/CandidateCard.js';
import { ResumeModal } from './components/ResumeModal.js';
import { ScannerModal } from './components/ScannerModal.js';
import { AtsSyncBar } from './components/AtsSyncBar.js';
import { HttpInspectorDrawer } from './components/HttpInspectorDrawer.js';
import { BoothsVisitedView } from './components/BoothsVisitedView.js';
import { FairPassView } from './components/FairPassView.js';
import { BottomNav, AppTab } from './components/BottomNav.js';
import {
  ApplicationRecord,
  ApplicationStats,
  StatusFilter,
  SortOption,
  CreateApplicationDTO,
} from './types.js';
import {
  fetchApplications,
  updateApplication,
  createApplication,
  resetTalentPool,
  subscribeHttpLogs,
} from './services/api.js';
import { Users, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('talent-pool');
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [stats, setStats] = useState<ApplicationStats>({
    total: 28,
    priority: 8,
    newGrad: 19,
    intern: 9,
    evaluated: 19,
    fastTrack: 6,
    atsSynced: 0,
  });

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('match-desc');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [selectedCandidate, setSelectedCandidate] =
    useState<ApplicationRecord | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [logCount, setLogCount] = useState<number>(0);

  // Subscribe to HTTP log activity
  useEffect(() => {
    const unsub = subscribeHttpLogs((logs) => {
      setLogCount(logs.length);
    });
    return unsub;
  }, []);

  // Main data loader connected to GET /api/applications?status=...
  const loadApplications = useCallback(
    async (
      status: StatusFilter = statusFilter,
      search: string = searchQuery,
      sort: SortOption = sortOption
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchApplications({ status, search, sort });
        setApplications(response.data);
        if (response.stats) {
          setStats(response.stats);
        }
      } catch (err: any) {
        console.error('Error loading applications:', err);
        setError(err.message || 'Failed to load candidate applications');
      } finally {
        setIsLoading(false);
      }
    },
    [statusFilter, searchQuery, sortOption]
  );

  // Initial load
  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  // Handle status filter change (triggers GET /api/applications?status=...)
  const handleStatusFilterChange = (newStatus: StatusFilter) => {
    setStatusFilter(newStatus);
    loadApplications(newStatus, searchQuery, sortOption);
  };

  // Handle search query change
  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    loadApplications(statusFilter, newSearch, sortOption);
  };

  // Handle sort order change
  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    loadApplications(statusFilter, searchQuery, newSort);
  };

  // Handle candidate update (triggers PUT /api/applications/:id)
  const handleUpdateCandidate = async (
    id: string,
    updates: Partial<ApplicationRecord>
  ) => {
    try {
      const response = await updateApplication(id, updates);
      if (response.data) {
        // Optimistically update list
        setApplications((prev) =>
          prev.map((c) => (c.id === id ? response.data : c))
        );
        // Refresh full stats
        loadApplications(statusFilter, searchQuery, sortOption);
      }
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    }
  };

  // Handle new candidate creation (triggers POST /api/applications)
  const handleCreateCandidate = async (dto: CreateApplicationDTO) => {
    try {
      const response = await createApplication(dto);
      if (response.data) {
        // Prepend new candidate
        setApplications((prev) => [response.data, ...prev]);
        loadApplications(statusFilter, searchQuery, sortOption);
      }
    } catch (err: any) {
      alert(`Creation failed: ${err.message}`);
    }
  };

  // Handle pool reset
  const handleResetPool = async () => {
    setIsResetting(true);
    try {
      const res = await resetTalentPool();
      if (res.data) {
        setApplications(res.data);
        if (res.stats) setStats(res.stats);
        setStatusFilter('all');
        setSearchQuery('');
      }
    } catch (err: any) {
      alert(`Reset failed: ${err.message}`);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased selection:bg-[#c3c0ff] selection:text-[#0f0069]">
      {/* Fixed Header */}
      <Header
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        pendingLogCount={logCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-5 pt-20 pb-24">
        {currentTab === 'talent-pool' && (
          <div className="flex flex-col gap-4">
            {/* Recruiter Information Card */}
            <RecruiterHeaderTile
              stats={stats}
              onResetPool={handleResetPool}
              isResetting={isResetting}
            />

            {/* Filter, Search & Sort Controls */}
            <FilterBar
              status={statusFilter}
              onStatusChange={handleStatusFilterChange}
              search={searchQuery}
              onSearchChange={handleSearchChange}
              sort={sortOption}
              onSortChange={handleSortChange}
              stats={stats}
              isLoading={isLoading}
            />

            {/* Error banner */}
            {error && (
              <div className="p-3.5 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-between text-xs border border-[#ba1a1a]/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => loadApplications()}
                  className="font-bold underline ml-2"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Candidate Pipeline Feed */}
            <div className="flex flex-col gap-3.5 mt-1">
              {isLoading && applications.length === 0 ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3 text-[#777587]">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#3525cd]" />
                  <span className="text-xs font-semibold">
                    Querying Express API (/api/applications)...
                  </span>
                </div>
              ) : applications.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-[#eaedff] shadow-xs space-y-2">
                  <Users className="w-10 h-10 text-[#c7c4d8] mx-auto" />
                  <h3 className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans']">
                    No candidates found
                  </h3>
                  <p className="text-xs text-[#5b598c] max-w-xs mx-auto">
                    No candidate records match the current status filter (
                    <span className="font-semibold text-[#3525cd]">
                      {statusFilter}
                    </span>
                    ) or search query.
                  </p>
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setSearchQuery('');
                      loadApplications('all', '', sortOption);
                    }}
                    className="mt-2 px-3 py-1.5 rounded-lg bg-[#3525cd] text-white text-xs font-bold shadow-xs hover:bg-[#4f46e5] transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                applications.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onOpenResume={(cand) => setSelectedCandidate(cand)}
                    onUpdateCandidate={handleUpdateCandidate}
                  />
                ))
              )}
            </div>

            {/* Bottom ATS Pipeline Sync */}
            {applications.length > 0 && (
              <AtsSyncBar
                candidateCount={applications.length}
                onSyncComplete={() => loadApplications()}
              />
            )}
          </div>
        )}

        {currentTab === 'scanner' && (
          <div className="pt-2">
            <ScannerModal
              isOpen={true}
              onClose={() => setCurrentTab('talent-pool')}
              onSaveLead={async (dto) => {
                await handleCreateCandidate(dto);
                setCurrentTab('talent-pool');
              }}
            />
          </div>
        )}

        {currentTab === 'booths' && <BoothsVisitedView />}

        {currentTab === 'fair-pass' && <FairPassView />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Resume Dossier Popover Modal */}
      {selectedCandidate && (
        <ResumeModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdateCandidate={handleUpdateCandidate}
        />
      )}

      {/* Standalone Scanner Modal (when triggered via header) */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSaveLead={handleCreateCandidate}
      />

      {/* Express HTTP Inspector Drawer */}
      <HttpInspectorDrawer
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        onTriggerRefresh={() => loadApplications()}
      />
    </div>
  );
}
