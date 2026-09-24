"use client";

import { SearchX, ChevronRight, User, ArrowUp, ArrowDown, CheckCircle2, XCircle } from "lucide-react";
import { StudentResult, SortOption } from "@/types/results";

interface ResultsTableProps {
  results: StudentResult[];
  searchQuery: string;
  selectedBranch: string;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSelectStudent: (student: StudentResult) => void;
  onResetFilters: () => void;
}

export default function ResultsTable({
  results,
  searchQuery,
  selectedBranch,
  sortOption,
  onSortChange,
  onSelectStudent,
  onResetFilters,
}: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="my-8 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-[#090e1c] p-10 text-center shadow-lg">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/80 text-slate-400">
          <SearchX className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-bold text-white">
          No result found. Check the spelling and try again.
        </h3>
        <p className="mt-1 max-w-sm text-xs text-slate-400">
          {searchQuery
            ? `No student matching "${searchQuery}" was found.`
            : `No student records found.`}
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 rounded-xl bg-sky-600/20 border border-sky-500/30 px-4 py-2 text-xs font-semibold text-sky-300 hover:bg-sky-600/30 transition-all"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  const renderSelectionBadge = (selected: boolean) => {
    if (selected) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          SELECTED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 border border-slate-700/50 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
        <XCircle className="h-3 w-3 text-slate-500" />
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
            <mark key={i} className="bg-sky-500/30 text-sky-200 rounded px-0.5 font-bold">
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
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-[#090e1c] shadow-xl">
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900/90 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="py-3.5 px-6 font-semibold">
                <button
                  onClick={() => handleHeaderSort("rank")}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Rank
                  {sortOption === "rank-asc" && <ArrowUp className="h-3 w-3 text-sky-400" />}
                  {sortOption === "rank-desc" && <ArrowDown className="h-3 w-3 text-sky-400" />}
                </button>
              </th>
              <th scope="col" className="py-3.5 px-6 font-semibold">
                <button
                  onClick={() => handleHeaderSort("name")}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Student
                  {sortOption === "name-asc" && <ArrowUp className="h-3 w-3 text-sky-400" />}
                  {sortOption === "name-desc" && <ArrowDown className="h-3 w-3 text-sky-400" />}
                </button>
              </th>
              <th scope="col" className="py-3.5 px-6 font-semibold">
                Branch
              </th>
              <th scope="col" className="py-3.5 px-6 font-semibold text-right">
                <button
                  onClick={() => handleHeaderSort("marks")}
                  className="ml-auto flex items-center gap-1 hover:text-white transition-colors"
                >
                  Marks
                  {sortOption === "marks-desc" && <ArrowDown className="h-3 w-3 text-sky-400" />}
                  {sortOption === "marks-asc" && <ArrowUp className="h-3 w-3 text-sky-400" />}
                </button>
              </th>
              <th scope="col" className="py-3.5 px-6 font-semibold text-center">
                Selection
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
                aria-label={`Student ${student.name}, Rank ${student.rank}, Branch ${student.branch}, Marks ${student.marks}, Selection ${student.selected ? "Selected" : "Not Selected"}`}
                className={`group cursor-pointer transition-colors focus:outline-none ${
                  student.selected
                    ? "hover:bg-emerald-950/25 bg-emerald-950/10"
                    : "hover:bg-slate-800/60"
                }`}
              >
                <td className="py-3.5 px-6 whitespace-nowrap font-mono font-bold text-slate-200">
                  #{student.rank}
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-white group-hover:text-sky-300 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-300 group-hover:bg-sky-900/50 group-hover:text-sky-300">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <span>{renderHighlightedName(student.name, searchQuery)}</span>
                  </div>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap">
                  <span className="inline-block rounded-md bg-slate-900 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 border border-slate-800">
                    {student.branch}
                  </span>
                </td>
                <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono font-bold text-sky-400">
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

      {/* Mobile Card View */}
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
            className={`flex items-center justify-between p-4 cursor-pointer focus:outline-none transition-colors ${
              student.selected ? "bg-emerald-950/15 hover:bg-emerald-950/30" : "hover:bg-slate-800/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-slate-300">
                #{student.rank}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {renderHighlightedName(student.name, searchQuery)}
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block rounded bg-slate-900 px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 border border-slate-800">
                    {student.branch}
                  </span>
                  {renderSelectionBadge(student.selected)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-base font-bold font-mono text-sky-400">
                  {student.marks}
                </span>
                <span className="text-[10px] text-slate-500 block">marks</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
