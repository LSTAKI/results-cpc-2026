"use client";

import { motion } from "framer-motion";
import { Search, UserCheck } from "lucide-react";

interface HeroProps {
  onFindMyResultClick: () => void;
}

export default function Hero({ onFindMyResultClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-6 sm:pt-14 sm:pb-10">
      {/* Glow Backdrop */}
      <div className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-[320px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-600/15 via-indigo-600/10 to-emerald-600/15 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
              RESULTS LIVE
            </span>
          </div>

          {/* Main Heading & Secondary Year */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              CPC Entrance Test Results
            </h1>
            <span className="mt-1 block font-mono text-2xl font-black text-sky-400 sm:text-4xl">
              2026
            </span>
          </div>

          {/* Selection Announcement Pill */}
          <div className="inline-flex items-center gap-2 rounded-xl bg-sky-950/60 px-4 py-2 border border-sky-500/30 text-sky-200 text-xs sm:text-sm font-semibold shadow-inner">
            <UserCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>25 students selected for the Competitive Programming Club</span>
          </div>

          {/* Subtitle */}
          <div className="text-xs font-semibold text-slate-300 sm:text-sm">
            <p className="font-bold text-white">Competitive Programming Club</p>
            <p className="text-slate-400">Visvesvaraya Technological University, Belagavi</p>
          </div>

          {/* Supporting Text */}
          <p className="max-w-xl text-xs text-slate-400 sm:text-sm">
            The results of the CPC Entrance Test 2026 are officially published.
          </p>

          {/* CTA: Find My Result */}
          <div className="pt-2">
            <button
              onClick={onFindMyResultClick}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-sky-600/25 hover:bg-sky-500 hover:shadow-sky-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <Search className="h-4 w-4" />
              Find My Result
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
