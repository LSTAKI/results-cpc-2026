"use client";

import { useEffect, useRef, forwardRef } from "react";
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
      return `Showing ${filteredCount} selected students`;
    }
    if (statusFilter === "not-selected") {
      return `Showing ${filteredCount} not selected students`;
    }
    return `Showing ${filteredCount} results`;
  };

  return (
    <div id="search-section" className="flex flex-col gap-4">
      {/* Prominent Search Header */}
      <div>
        <h3 className="text-lg font-bold text-white sm:text-xl">
          Find Your Result
        </h3>
        <p className="text-xs text-slate-400">
          Search by student name or filter by selection status and branch.
        </p>
      </div>

      {/* Status Filter Tabs: ALL | SELECTED | NOT SELECTED */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onStatusFilterChange("all")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
            statusFilter === "all"
              ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
          }`}
        >
          All Results ({totalCount})
        </button>
        <button
          onClick={() => onStatusFilterChange("selected")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
            statusFilter === "selected"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-emerald-300"
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Selected (25)
        </button>
        <button
          onClick={() => onStatusFilterChange("not-selected")}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
            statusFilter === "not-selected"
              ? "bg-slate-700 text-white shadow-md shadow-slate-700/20"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <XCircle className="h-3.5 w-3.5" />
          Not Selected (84)
        </button>
      </div>

      {/* Search Input Row & Dropdown Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            ref={ref}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Enter your name..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-10 pr-20 text-sm text-white placeholder-slate-500 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
            aria-label="Find your result by student name"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1.5">
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                /
              </kbd>
            )}
          </div>
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
              className="rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-200 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="ALL">All Branches</option>
              {availableBranches.map((b) => (
                <option key={b} value={b}>
                  {b}
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
              className="rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-200 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="rank-asc">Rank: Low → High</option>
              <option value="rank-desc">Rank: High → Low</option>
              <option value="marks-desc">Marks: High → Low</option>
              <option value="marks-asc">Marks: Low → High</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count Indicator */}
      <div
        aria-live="polite"
        className="flex items-center justify-between text-xs font-mono text-slate-400"
      >
        <div>
          <span className="font-bold text-sky-400">{getResultCountText()}</span>
          {(searchQuery || selectedBranch !== "ALL" || statusFilter !== "all") && (
            <span className="ml-1 text-slate-500">(filtered)</span>
          )}
        </div>

        {(searchQuery || selectedBranch !== "ALL" || statusFilter !== "all") && (
          <button
            onClick={() => {
              onSearchChange("");
              onBranchChange("ALL");
              onStatusFilterChange("all");
            }}
            className="text-[11px] font-sans font-medium text-sky-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
