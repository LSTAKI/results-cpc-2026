"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SelectionBanner() {
  const selectedCount = 25;
  const totalCount = 108;
  const percentage = Math.round((selectedCount / totalCount) * 100);

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
        {/* Subtle top accent border gradient */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                OFFICIAL SELECTION ANNOUNCEMENT
              </span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-mono text-4xl sm:text-5xl font-black text-white tracking-tight">
                25 <span className="text-amber-400">SELECTED</span>
              </span>
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                out of <strong className="text-slate-200">108</strong> Candidates
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-xl">
              Congratulations to all qualified students. Selection was determined strictly by score hierarchy in the 2026 Entrance Test.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t border-slate-800 md:border-t-0">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-left md:text-right">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-300/80">
                SELECTION CUTOFF
              </span>
              <span className="font-mono text-xl font-extrabold text-amber-400">
                65 MARKS
              </span>
            </div>

            <div className="text-left md:text-right font-mono text-xs text-slate-400">
              Intake Ratio: <span className="font-bold text-sky-400">{percentage}%</span> ({selectedCount}/{totalCount} seats)
            </div>
          </div>
        </div>

        {/* Thin Progress Accent Line */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Roster Allocation</span>
            <span>25 / 108 Candidates (23%)</span>
          </div>
          <div className="h-1 w-full rounded-full bg-slate-950 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

