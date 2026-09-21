import React from 'react';
import { Search, X, Star, ArrowUpDown } from 'lucide-react';
import { StatusFilter, SortOption, ApplicationStats } from '../types.js';

interface FilterBarProps {
  status: StatusFilter;
  onStatusChange: (newStatus: StatusFilter) => void;
  search: string;
  onSearchChange: (newSearch: string) => void;
  sort: SortOption;
  onSortChange: (newSort: SortOption) => void;
  stats: ApplicationStats;
  isLoading: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  status,
  onStatusChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  stats,
  isLoading,
}) => {
  const sortLabels: Record<SortOption, string> = {
    'match-desc': 'Match Score (High to Low)',
    'match-asc': 'Match Score (Low to High)',
    'gpa-desc': 'GPA (High to Low)',
    'name-asc': 'Name (A-Z)',
    recent: 'Recently Evaluated',
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#777587] pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by skills, school, or tag..."
          className="w-full h-11 pl-10 pr-9 rounded-xl bg-white text-[#131b2e] placeholder:text-[#777587] text-sm border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 focus:border-[#3525cd] shadow-sm transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-3 text-[#777587] hover:text-[#131b2e] transition-colors p-0.5 rounded-full"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tag Cloud */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* All Leads */}
        <button
          onClick={() => onStatusChange('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
            status === 'all'
              ? 'bg-[#3525cd] text-white shadow-sm'
              : 'bg-[#eaedff] text-[#464555] hover:bg-[#dae2fd]'
          }`}
        >
          <span>All Leads</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              status === 'all' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'
            }`}
          >
            {stats.total}
          </span>
        </button>

        {/* Priority */}
        <button
          onClick={() => onStatusChange('priority')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
            status === 'priority'
              ? 'bg-[#3525cd] text-white shadow-sm'
              : 'bg-[#eaedff] text-[#464555] hover:bg-[#dae2fd]'
          }`}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              status === 'priority' ? 'fill-white text-white' : 'text-[#005338] fill-[#005338]'
            }`}
          />
          <span>Priority</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              status === 'priority'
                ? 'bg-white/20 text-white'
                : 'bg-[#dae2fd] text-[#131b2e]'
            }`}
          >
            {stats.priority}
          </span>
        </button>

        {/* New Grad '25 */}
        <button
          onClick={() => onStatusChange('new-grad')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
            status === 'new-grad'
              ? 'bg-[#3525cd] text-white shadow-sm'
              : 'bg-[#eaedff] text-[#464555] hover:bg-[#dae2fd]'
          }`}
        >
          <span>New Grad '25</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              status === 'new-grad'
                ? 'bg-white/20 text-white'
                : 'bg-[#dae2fd] text-[#131b2e]'
            }`}
          >
            {stats.newGrad}
          </span>
        </button>

        {/* Intern */}
        <button
          onClick={() => onStatusChange('intern')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
            status === 'intern'
              ? 'bg-[#3525cd] text-white shadow-sm'
              : 'bg-[#eaedff] text-[#464555] hover:bg-[#dae2fd]'
          }`}
        >
          <span>Intern</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              status === 'intern'
                ? 'bg-white/20 text-white'
                : 'bg-[#dae2fd] text-[#131b2e]'
            }`}
          >
            {stats.intern}
          </span>
        </button>

        {/* Fast-Track */}
        <button
          onClick={() => onStatusChange('fast-track')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
            status === 'fast-track'
              ? 'bg-[#3525cd] text-white shadow-sm'
              : 'bg-[#eaedff] text-[#464555] hover:bg-[#dae2fd]'
          }`}
        >
          <span>Fast-Track</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              status === 'fast-track'
                ? 'bg-white/20 text-white'
                : 'bg-[#dae2fd] text-[#131b2e]'
            }`}
          >
            {stats.fastTrack}
          </span>
        </button>
      </div>

      {/* Sort Bar Indicator & Backend Query Status */}
      <div className="flex items-center justify-between text-xs text-[#5b598c] pt-0.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <span>Showing ranked candidates</span>
          {isLoading && (
            <span className="inline-block w-2 h-2 rounded-full bg-[#3525cd] animate-ping" />
          )}
        </div>

        <div className="relative group">
          <label htmlFor="sort-select" className="sr-only">Sort candidate pool</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none bg-transparent pr-5 text-xs font-semibold text-[#3525cd] hover:text-[#4f46e5] focus:outline-none cursor-pointer"
          >
            <option value="match-desc">Match Score (High to Low)</option>
            <option value="match-asc">Match Score (Low to High)</option>
            <option value="gpa-desc">GPA (High to Low)</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="recent">Recently Evaluated</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 absolute right-0 top-0.5 text-[#3525cd] pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
