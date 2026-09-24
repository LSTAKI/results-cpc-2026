"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, Target, Calendar } from "lucide-react";

export default function Stats() {
  const statsList = [
    {
      value: "109",
      label: "Students Appeared",
      icon: Users,
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
    },
    {
      value: "25",
      label: "Students Selected",
      icon: UserCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
    },
    {
      value: "66",
      label: "Marks at Selection Cutoff",
      icon: Target,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      value: "2026",
      label: "Entrance Test",
      icon: Calendar,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statsList.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`flex flex-col justify-between rounded-xl border p-4 backdrop-blur-sm ${stat.bg}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-white sm:text-3xl">
                  {stat.value}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900/90 shadow-inner ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-300">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
