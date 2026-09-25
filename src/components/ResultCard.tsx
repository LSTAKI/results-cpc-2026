"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trophy,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { StudentResult } from "@/types/results";

interface ResultCardProps {
  student: StudentResult | null;
  onClose: () => void;
}

export default function ResultCard({ student, onClose }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!student) return null;

  const handleCopyLink = () => {
    const text = `CPC ENTRANCE TEST 2026 RESULT CERTIFICATE\nCandidate: ${student.name}\nBranch: ${student.branch}\nRank: #${student.rank}\nMarks: ${student.marks}/100\nStatus: ${student.selected ? "SELECTED (Top 25 Roster)" : "NOT SELECTED"}\nSelection Cutoff: 65 Marks`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTop3 = student.rank <= 3;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Dark Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Official Result Certificate Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl border bg-slate-950 p-5 sm:p-8 shadow-2xl ${
            student.selected
              ? "border-amber-500/40 shadow-amber-500/10"
              : "border-slate-800 shadow-sky-500/5"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-modal-title"
        >
          {/* Subtle Top Accent Bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 ${
              student.selected
                ? "bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400"
                : "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800"
            }`}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
            aria-label="Close result card modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Certificate Header Branding */}
          <div className="text-center space-y-1 pb-4 border-b border-slate-800/80">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
              COMPETITIVE PROGRAMMING CLUB • VTU BELAGAVI
            </span>
            <h1 className="font-mono text-xs font-semibold tracking-wider text-slate-400">
              ENTRANCE TEST 2026 • OFFICIAL RESULT SCORECARD
            </h1>
          </div>

          {/* Status Banner */}
          <div className="my-5 text-center">
            {student.selected ? (
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 text-emerald-400">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-sm font-black tracking-widest uppercase">
                  STATUS: ADMITTED & SELECTED
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-slate-300">
                <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                  STATUS: COMPLETED (NON-SELECTED)
                </span>
              </div>
            )}
          </div>

          {/* Candidate Primary Identity Block */}
          <div className="space-y-1 text-center py-2">
            <span className="font-mono text-xs font-bold text-amber-400">
              RANK #{String(student.rank).padStart(2, "0")}
            </span>
            <h2
              id="student-modal-title"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase"
            >
              {student.name}
            </h2>
            <div className="pt-1">
              <span className="font-mono text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                BRANCH: {student.branch}
              </span>
            </div>
          </div>

          {/* Score & Ranking Details Grid */}
          <div className="my-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                OFFICIAL RANK
              </span>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                {isTop3 && <Trophy className="h-5 w-5 text-amber-400" />}
                <span className="font-mono text-3xl font-black text-white">
                  #{student.rank}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                TOTAL MARKS
              </span>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-mono text-3xl font-black text-sky-400">
                  {student.marks}
                </span>
                <span className="font-mono text-xs text-slate-500">/ 100</span>
              </div>
            </div>
          </div>

          {/* Official Remarks Footer */}
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/30 p-4 text-center font-sans text-xs">
            {student.selected ? (
              <div className="space-y-1 text-emerald-300">
                <p className="font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Qualified for CPC Roster 2026
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  Cutoff benchmark of 65 marks achieved. Welcome to the Competitive Programming Club!
                </p>
              </div>
            ) : (
              <div className="space-y-1 text-slate-300">
                <p className="font-semibold flex items-center justify-center gap-1 text-slate-400">
                  <XCircle className="h-4 w-4 text-slate-500" />
                  Entrance Test Evaluation Complete
                </p>
                <p className="text-[11px] text-slate-400">
                  Thank you for participating in the 2026 CPC Entrance Test. Keep practicing your problem-solving skills!
                </p>
              </div>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleCopyLink}
              className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 py-3 px-4 font-mono text-xs font-bold text-slate-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-sky-400 min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  COPIED SUMMARY
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  COPY RESULT CERTIFICATE
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl bg-amber-500 py-3 px-6 font-mono text-xs font-black text-slate-950 hover:bg-amber-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]"
            >
              DONE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

