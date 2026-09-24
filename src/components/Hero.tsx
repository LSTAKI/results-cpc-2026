"use client";

import { motion } from "framer-motion";
import { Search, Code2, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onFindMyResultClick: () => void;
}

export default function Hero({ onFindMyResultClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-8 sm:pt-16 sm:pb-14">
      {/* Background Faint Glows */}
      <div className="pointer-events-none absolute inset-0 hero-glow-orange opacity-80 -z-10" />
      <div className="pointer-events-none absolute inset-0 hero-glow-cyan opacity-60 -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* LEFT: Editorial Heading & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start space-y-4"
          >
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 rounded-sm border border-orange-500/30 bg-orange-950/30 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-400">
              <Code2 className="h-3.5 w-3.5 text-orange-400" />
              <span>CPC • ENTRANCE TEST</span>
            </div>

            {/* Huge Editorial Display Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl uppercase leading-none font-sans">
                ENTRANCE <br />
                <span className="text-slate-100">TEST RESULTS</span>
              </h1>
              <span className="block font-mono text-4xl font-black text-orange-500 sm:text-6xl tracking-tight">
                2026
              </span>
            </div>

            {/* Subtitle */}
            <div className="border-l-2 border-orange-500/80 pl-3.5 text-xs sm:text-sm text-slate-300">
              <p className="font-bold text-white">Competitive Programming Club</p>
              <p className="text-slate-400">Visvesvaraya Technological University, Belagavi</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Official entrance test ranks and cohort selection announcement.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onFindMyResultClick}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-orange-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all focus-ring"
              >
                <Search className="h-4 w-4" />
                <span>FIND MY RESULT</span>
                <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Stylized Competition Data Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090e1a]/90 p-6 shadow-2xl backdrop-blur-md">
              {/* Technical Grid Motifs */}
              <div className="absolute top-3 right-3 font-mono text-[10px] text-slate-600">
                &lt; / &gt; RANK_BOARD_2026
              </div>

              <div className="space-y-6">
                {/* 25 Selected Stat Showcase */}
                <div className="border-b border-white/[0.08] pb-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-5xl font-black text-orange-400">
                      25
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 rounded">
                      INTAKE
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs font-bold uppercase tracking-wider text-white">
                    SELECTED MEMBERS
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Qualifying cutoff at 66 Marks
                  </p>
                </div>

                {/* 109 Candidates Showcase */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-3xl font-bold text-slate-200 block">
                      109
                    </span>
                    <span className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Candidates Evaluated
                    </span>
                  </div>
                  <div className="text-right font-mono text-xs text-sky-400">
                    <span className="block font-bold">100% VERIFIED</span>
                    <span className="text-[10px] text-slate-500">VTU BELAGAVI</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
