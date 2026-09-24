"use client";

import { motion } from "framer-motion";
import { Trophy, ChevronRight } from "lucide-react";
import { StudentResult } from "@/types/results";

interface TopPerformersProps {
  topPerformers: StudentResult[];
  onSelectStudent: (student: StudentResult) => void;
}

export default function TopPerformers({
  topPerformers,
  onSelectStudent,
}: TopPerformersProps) {
  const rank1 = topPerformers.find((s) => s.rank === 1);
  const rank2 = topPerformers.find((s) => s.rank === 2);
  const rank3 = topPerformers.find((s) => s.rank === 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-400" />
            <h2 className="text-xl font-bold tracking-tight text-white uppercase sm:text-2xl font-sans">
              Top Performers
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
            Recognizing the top three highest achieving candidates of the CPC Entrance Test 2026.
          </p>
        </div>
      </div>

      {/* Editorial Podium Layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end">
        {/* RANK 1 (Center / Visually Dominant) - Mobile Order 1 */}
        {rank1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => onSelectStudent(rank1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectStudent(rank1);
              }
            }}
            tabIndex={0}
            role="button"
            className="group cursor-pointer rounded-2xl border-2 border-orange-500/60 bg-gradient-to-b from-orange-500/15 via-[#0b101d] to-[#080d19] p-5 sm:p-6 shadow-2xl shadow-orange-500/10 order-1 lg:order-2 lg:col-span-4 lg:-translate-y-2 hover:border-orange-400 transition-all focus-ring"
          >
            <div className="flex items-start justify-between border-b border-orange-500/30 pb-3">
              <span className="font-mono text-xs font-black text-orange-950 uppercase tracking-widest bg-orange-400 px-3 py-1 rounded shadow-sm flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5" /> #01 RANK 1
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-black text-orange-400">
                {rank1.marks} <span className="text-xs font-normal text-slate-400">marks</span>
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-extrabold text-white group-hover:text-orange-300 transition-colors">
                {rank1.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                  {rank1.branch}
                </span>
                <span className="flex items-center text-xs font-bold text-orange-400 group-hover:translate-x-0.5 transition-transform">
                  Top Scorer Card <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* RANK 2 (Left / Slightly Smaller) - Mobile Order 2 */}
        {rank2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => onSelectStudent(rank2)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectStudent(rank2);
              }
            }}
            tabIndex={0}
            role="button"
            className="group cursor-pointer rounded-xl border border-slate-700/60 bg-[#080d19] p-5 shadow-lg order-2 lg:order-1 lg:col-span-4 hover:border-slate-400 transition-all focus-ring"
          >
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
              <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest bg-slate-800 px-2.5 py-1 rounded">
                #02 RANK
              </span>
              <span className="font-mono text-2xl font-black text-slate-200">
                {rank2.marks} <span className="text-xs font-normal text-slate-500">marks</span>
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                {rank2.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {rank2.branch}
                </span>
                <span className="flex items-center text-xs font-semibold text-slate-300 group-hover:translate-x-0.5 transition-transform">
                  View Card <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* RANK 3 (Right / Slightly Smaller) - Mobile Order 3 */}
        {rank3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => onSelectStudent(rank3)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectStudent(rank3);
              }
            }}
            tabIndex={0}
            role="button"
            className="group cursor-pointer rounded-xl border border-sky-500/30 bg-[#080d19] p-5 shadow-lg order-3 lg:order-3 lg:col-span-4 hover:border-sky-400 transition-all focus-ring"
          >
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
              <span className="font-mono text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-950 px-2.5 py-1 rounded border border-sky-800/40">
                #03 RANK
              </span>
              <span className="font-mono text-2xl font-black text-sky-400">
                {rank3.marks} <span className="text-xs font-normal text-slate-500">marks</span>
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                {rank3.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {rank3.branch}
                </span>
                <span className="flex items-center text-xs font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                  View Card <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
