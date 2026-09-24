"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { StudentResult } from "@/types/results";

interface TopPerformersProps {
  topPerformers: StudentResult[];
  onSelectStudent: (student: StudentResult) => void;
}

export default function TopPerformers({
  topPerformers,
  onSelectStudent,
}: TopPerformersProps) {
  // Extract Rank 1, Rank 2, Rank 3
  const rank1 = topPerformers.find((s) => s.rank === 1);
  const rank2 = topPerformers.find((s) => s.rank === 2);
  const rank3 = topPerformers.find((s) => s.rank === 3);

  const top3List = [
    { student: rank1, badge: "🥇 Rank 1", color: "border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-amber-950/20 text-amber-300", badgeBg: "bg-amber-400 text-amber-950" },
    { student: rank2, badge: "🥈 Rank 2", color: "border-slate-300/30 bg-gradient-to-b from-slate-300/10 to-slate-900/40 text-slate-200", badgeBg: "bg-slate-200 text-slate-950" },
    { student: rank3, badge: "🥉 Rank 3", color: "border-amber-700/40 bg-gradient-to-b from-amber-700/10 to-slate-950/40 text-amber-400", badgeBg: "bg-amber-700 text-amber-100" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Top Performers
          </h2>
          <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
            Recognizing the top three highest achieving candidates of the CPC Entrance Test 2026.
          </p>
        </div>
      </div>

      {/* Grid of Top 3 Performers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {top3List.map(({ student, badge, color, badgeBg }) => {
          if (!student) return null;
          return (
            <motion.div
              key={`${student.rank}-${student.name}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectStudent(student)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectStudent(student);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${badge}: ${student.name}, Branch ${student.branch}, Marks ${student.marks}`}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border ${color} p-5 shadow-lg backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-sky-400`}
            >
              <div className="flex items-start justify-between">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${badgeBg}`}>
                  {badge}
                </span>
                <div className="text-right">
                  <span className="text-2xl font-black">
                    {student.marks}
                  </span>
                  <span className="text-xs opacity-75"> / 100</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-white transition-colors">
                  {student.name}
                </h3>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="inline-block rounded-md bg-slate-900/90 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 border border-slate-700/60">
                    {student.branch}
                  </span>
                  <span className="flex items-center text-xs font-medium opacity-90 group-hover:translate-x-0.5 transition-transform">
                    View Card <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
