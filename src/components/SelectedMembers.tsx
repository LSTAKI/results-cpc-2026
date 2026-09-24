"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
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

  const initialShowCount = 8;
  const displayedMembers = isExpanded
    ? strict25Selected
    : strict25Selected.slice(0, initialShowCount);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
        {/* Header & Subtitle */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                QUALIFIED ROSTER • 2026
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Selected Members Roster
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Official list of 25 students admitted to the Competitive Programming Club.
            </p>
          </div>

          <div className="shrink-0 pt-2 sm:pt-0">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-bold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              25 MEMBERS ADMITTED
            </span>
          </div>
        </div>

        {/* Selected Members Roster Rows */}
        <div className="mt-4 divide-y divide-slate-800/80">
          {displayedMembers.map((student, idx) => (
            <motion.div
              key={`selected-roster-${student.rank}-${student.name}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => onSelectStudent(student)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectStudent(student);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Selected Member ${student.name}, Rank #${student.rank}, Branch ${student.branch}, Marks ${student.marks}`}
              className="group relative flex items-center justify-between py-3.5 px-3 transition-all hover:bg-slate-800/40 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              {/* Hover Left Accent Indicator Line */}
              <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex items-center gap-4 min-w-0">
                {/* Rank Number */}
                <span className="font-mono text-sm font-black text-emerald-400 w-10 shrink-0">
                  #{String(student.rank).padStart(2, "0")}
                </span>

                {/* Candidate Name */}
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-100 truncate group-hover:text-emerald-300 transition-colors">
                    {student.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {/* Branch Badge */}
                <span className="font-mono text-[11px] font-bold uppercase text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  {student.branch}
                </span>

                {/* Marks */}
                <span className="font-mono text-sm font-extrabold text-sky-400 w-12 text-right group-hover:scale-105 transition-transform">
                  {student.marks} <span className="text-[10px] font-normal text-slate-500">pts</span>
                </span>

                {/* Status indicator */}
                <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                  <CheckCircle2 className="h-3 w-3" /> SELECTED
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toggle Expand / Collapse Button */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-5 py-2.5 font-mono text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-sky-400"
          >
            {isExpanded ? (
              <>
                SHOW TOP 8 ONLY <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                VIEW FULL ROSTER (ALL 25 MEMBERS) <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

