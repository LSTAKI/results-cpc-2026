"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const statsList = [
    { value: "109", label: "Candidates", detail: "Appeared" },
    { value: "25", label: "Selected", detail: "Members", highlight: true },
    { value: "65", label: "Cutoff", detail: "Marks", accent: true },
    { value: "2026", label: "Test", detail: "Cycle" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-white/[0.08] bg-[#070b16] py-5 px-6 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-2 divide-y divide-white/[0.08] sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex flex-col items-center justify-center p-3 text-center sm:px-4"
            >
              <span
                className={`font-mono text-3xl font-black sm:text-4xl tracking-tight ${
                  stat.highlight
                    ? "text-emerald-400"
                    : stat.accent
                    ? "text-orange-400"
                    : "text-white"
                }`}
              >
                {stat.value}
              </span>
              <div className="mt-1 flex items-center gap-1">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-200">
                  {stat.label}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {stat.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
