"use client";

import { SearchX, ChevronRight, ArrowUp, ArrowDown, CheckCircle2, XCircle } from "lucide-react";
import { StudentResult, SortOption } from "@/types/results";

interface ResultsTableProps {
  results: StudentResult[];
  searchQuery: string;
  selectedBranch?: string;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSelectStudent: (student: StudentResult) => void;
  onResetFilters: () => void;
}

export default function ResultsTable({
  results,
  searchQuery,
  sortOption,
  onSortChange,
  onSelectStudent,
  onResetFilters,
}: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="my-8 flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-bold text-white font-mono">
          NO MATCHING RESULTS FOUND
        </h3>
        <p className="mt-1 max-w-sm text-xs text-slate-400">
          {searchQuery
            ? `No student matching "${searchQuery}" was found.`
            : `No candidate records found.`}
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 font-mono text-xs font-semibold text-amber-400 hover:bg-slate-700 transition-all"
        >
          RESET FILTERS
        </button>
      </div>
    );
  }

  const renderSelectionBadge = (selected: boolean) => {
    if (selected) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded">
          <CheckCircle2 className="h-3 w-3" />
          SELECTED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-slate-500 bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded">
        <XCircle className="h-3 w-3 text-slate-600" />
        NOT SELECTED
      </span>
    );
  };

  const renderHighlightedName = (name: string, query: string) => {
    if (!query.trim()) return name;
    const parts = name.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-500/25 text-amber-300 font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleHeaderSort = (column: "rank" | "marks" | "name") => {
    if (column === "rank") {
      onSortChange(sortOption === "rank-asc" ? "rank-desc" : "rank-asc");
    } else if (column === "marks") {
      onSortChange(sortOption === "marks-desc" ? "marks-asc" : "marks-desc");
    } else if (column === "name") {
      onSortChange(sortOption === "name-asc" ? "name-desc" : "name-asc");
    }
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-950 font-mono text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="py-4 px-6 font-bold w-24">
                <button
                  onClick={() => handleHeaderSort("rank")}
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  RANK
                  {sortOption === "rank-asc" && <ArrowUp className="h-3 w-3 text-amber-400" />}
                  {sortOption === "rank-desc" && <ArrowDown className="h-3 w-3 text-amber-400" />}
                </button>
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                <button
                  onClick={() => handleHeaderSort("name")}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  CANDIDATE
                  {sortOption === "name-asc" && <ArrowUp className="h-3 w-3 text-sky-400" />}
                  {sortOption === "name-desc" && <ArrowDown className="h-3 w-3 text-sky-400" />}
                </button>
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                BRANCH
              </th>
              <th scope="col" className="py-4 px-6 font-bold text-right w-28">
                <button
                  onClick={() => handleHeaderSort("marks")}
                  className="ml-auto flex items-center gap-1 hover:text-sky-400 transition-colors"
                >
                  MARKS
                  {sortOption === "marks-desc" && <ArrowDown className="h-3 w-3 text-sky-400" />}
                  {sortOption === "marks-asc" && <ArrowUp className="h-3 w-3 text-sky-400" />}
                </button>
              </th>
              <th scope="col" className="py-4 px-6 font-bold text-center w-36">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {results.map((student, index) => (
              <tr
                key={`${student.rank}-${student.name}-${index}`}
                onClick={() => onSelectStudent(student)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectStudent(student);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Student ${student.name}, Rank #${student.rank}, Branch ${student.branch}, Marks ${student.marks}, Selection ${student.selected ? "Selected" : "Not Selected"}`}
                className={`group cursor-pointer transition-colors focus:outline-none ${
                  student.selected
                    ? "hover:bg-slate-800/60 bg-slate-900/30"
                    : "hover:bg-slate-800/40"
                }`}
              >
                <td className="py-3.5 px-6 whitespace-nowrap font-mono font-bold text-amber-400 group-hover:text-amber-300">
                  #{String(student.rank).padStart(2, "0")}
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-slate-100 group-hover:text-sky-300 transition-colors font-semibold">
                  <div className="flex items-center gap-2.5">
                    <span>{renderHighlightedName(student.name, searchQuery)}</span>
                  </div>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap">
                  <span className="font-mono text-xs font-bold uppercase text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {student.branch}
                  </span>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono font-black text-sky-400 group-hover:scale-105 transition-transform">
                  <span className="text-base">{student.marks}</span>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-center">
                  {renderSelectionBadge(student.selected)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card/Row View */}
      <div className="block sm:hidden divide-y divide-slate-800/80">
        {results.map((student, index) => (
          <div
            key={`mobile-${student.rank}-${student.name}-${index}`}
            onClick={() => onSelectStudent(student)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectStudent(student);
              }
            }}
            tabIndex={0}
            role="button"
            className="flex items-center justify-between p-4 cursor-pointer focus:outline-none hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-amber-400">
                #{student.rank}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {renderHighlightedName(student.name, searchQuery)}
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {student.branch}
                  </span>
                  {renderSelectionBadge(student.selected)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right font-mono">
                <span className="text-base font-bold text-sky-400">
                  {student.marks}
                </span>
                <span className="text-[10px] text-slate-500 block">pts</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

