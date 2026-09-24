"use client";

import { motion } from "framer-motion";
import { UserCheck, Sparkles } from "lucide-react";

export default function SelectionBanner() {
  const selectedCount = 25;
  const totalCount = 109;
  const percentage = Math.round((selectedCount / totalCount) * 100); // 23%

  return (
    <section className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/30 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/40">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Selection Announcement
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              25 Students Selected
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-300 sm:text-sm">
              Congratulations to the students selected for the Competitive Programming Club.
            </p>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <span className="font-mono text-3xl font-black text-emerald-400">
              25 / 109
            </span>
            <span className="block text-xs font-semibold text-slate-400">
              Selected ({percentage}% intake)
            </span>
          </div>
        </div>

        {/* Visual Progress Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Selection Progress</span>
            <span>25 / 109 seats filled</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-950 p-0.5 border border-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400 shadow-sm shadow-emerald-500/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
