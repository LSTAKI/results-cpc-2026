"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { StudentResult } from "@/types/results";

interface SelectedMembersProps {
  selectedStudents: StudentResult[];
  onSelectStudent: (student: StudentResult) => void;
}

export default function SelectedMembers({
  selectedStudents,
  onSelectStudent,
}: SelectedMembersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Strictly filter to guarantee rank <= 25 and selected === true
  const strict25Selected = selectedStudents
    .filter((s) => s.selected && s.rank <= 25)
    .sort((a, b) => a.rank - b.rank);

  const initialShowCount = 6;
  const displayedMembers = isExpanded
    ? strict25Selected
    : strict25Selected.slice(0, initialShowCount);

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900/40 p-5 shadow-xl backdrop-blur-md">
        {/* Header & Subtitle */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <UserCheck className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Selected Members
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-300 sm:text-sm">
              The 25 students selected for the Competitive Programming Club.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/40">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              25 Members
            </span>
          </div>
        </div>

        {/* Selected Members Grid */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {displayedMembers.map((student) => (
            <motion.div
              key={`selected-member-${student.rank}-${student.name}`}
              whileHover={{ y: -2 }}
              onClick={() => onSelectStudent(student)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectStudent(student);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Selected Member ${student.name}, Rank ${student.rank}, Branch ${student.branch}, Marks ${student.marks}`}
              className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 transition-all hover:border-emerald-500/50 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400">
                  Rank #{student.rank}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
                  SELECTED
                </span>
              </div>

              <div className="mt-2.5">
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {student.name}
                </h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="rounded bg-slate-950 px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 border border-slate-800">
                    {student.branch}
                  </span>
                  <span className="font-mono text-xs font-bold text-sky-400">
                    {student.marks} <span className="text-[10px] font-normal text-slate-500">marks</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toggle Expand / Collapse Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show All 25 Selected Members <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
