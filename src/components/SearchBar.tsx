"use client";

import { useEffect, forwardRef } from "react";
import { Search, X, Filter, ArrowUpDown, CheckCircle2, XCircle } from "lucide-react";
import { SortOption, StatusFilter } from "@/types/results";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  availableBranches: string[];
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  filteredCount: number;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  {
    searchQuery,
    onSearchChange,
    selectedBranch,
    onBranchChange,
    availableBranches,
    statusFilter,
    onStatusFilterChange,
    sortOption,
    onSortChange,
    totalCount,
    filteredCount,
  },
  ref
) {
  // Focus search box when '/' key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "SELECT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        if (ref && typeof ref !== "function" && ref.current) {
          ref.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ref]);

  const getResultCountText = () => {
    if (statusFilter === "selected") {
      return `Showing ${filteredCount} selected candidates`;
    }
    if (statusFilter === "not-selected") {
      return `Showing ${filteredCount} non-selected candidates`;
    }
    return `Showing ${filteredCount} of ${totalCount} candidates`;
  };

  return (
    <div id="search-section" className="space-y-4">
      {/* Prominent Search Section Header */}
      <div>
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
          RANKING DATABASE SEARCH
        </h3>
        <h2 className="text-2xl font-black text-white tracking-tight sm:text-3xl">
          FIND YOUR RESULT
        </h2>
      </div>

      {/* Primary Search Input Box */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          ref={ref}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by student name..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-3.5 pl-12 pr-24 text-base text-white placeholder-slate-500 shadow-inner focus:border-sky-500/80 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all font-sans"
          aria-label="Find your result by student name"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
          {searchQuery ? (
            <button
              onClick={() => onSearchChange("")}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block rounded border border-slate-800 bg-slate-950 px-2 py-1 text-[10px] font-mono font-semibold text-slate-400">
              PRESS /
            </kbd>
          )}
        </div>
      </div>

      {/* Control Row: Status Tabs + Branch & Sort Dropdowns */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-1">
        {/* Filter Tabs: ALL | SELECTED | NOT SELECTED */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => onStatusFilterChange("all")}
            className={`px-3 py-1.5 font-mono text-xs font-bold rounded transition-all ${
              statusFilter === "all"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ALL ({totalCount})
          </button>
          <button
            onClick={() => onStatusFilterChange("selected")}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold rounded transition-all ${
              statusFilter === "selected"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            SELECTED (25)
          </button>
          <button
            onClick={() => onStatusFilterChange("not-selected")}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold rounded transition-all ${
              statusFilter === "not-selected"
                ? "bg-slate-800 text-slate-200 border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <XCircle className="h-3.5 w-3.5" />
            NOT SELECTED (84)
          </button>
        </div>

        {/* Dropdowns: Branch Filter & Sort Select */}
        <div className="flex items-center gap-2.5">
          {/* Branch Dropdown */}
          <div className="relative">
            <label htmlFor="branch-select" className="sr-only">
              Filter by Branch
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <select
              id="branch-select"
              value={selectedBranch}
              onChange={(e) => onBranchChange(e.target.value)}
              className="rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-8 font-mono text-xs font-semibold text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="ALL">ALL BRANCHES</option>
              {availableBranches.map((b) => (
                <option key={b} value={b}>
                  BRANCH: {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <label htmlFor="sort-select" className="sr-only">
              Sort results
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-8 font-mono text-xs font-semibold text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="rank-asc">SORT: RANK ↑</option>
              <option value="rank-desc">SORT: RANK ↓</option>
              <option value="marks-desc">SORT: MARKS ↓</option>
              <option value="marks-asc">SORT: MARKS ↑</option>
              <option value="name-asc">SORT: NAME A-Z</option>
              <option value="name-desc">SORT: NAME Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count & Reset Filters */}
      <div
        aria-live="polite"
        className="flex items-center justify-between font-mono text-xs text-slate-400 pt-1"
      >
        <div>
          <span className="font-semibold text-sky-400">{getResultCountText()}</span>
          {(searchQuery || selectedBranch !== "ALL" || statusFilter !== "all") && (
            <span className="ml-1.5 text-slate-500">(Active Filter)</span>
          )}
        </div>

        {(searchQuery || selectedBranch !== "ALL" || statusFilter !== "all") && (
          <button
            onClick={() => {
              onSearchChange("");
              onBranchChange("ALL");
              onStatusFilterChange("all");
            }}
            className="text-[11px] font-mono text-amber-400 hover:underline"
          >
            CLEAR FILTERS
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBar;

