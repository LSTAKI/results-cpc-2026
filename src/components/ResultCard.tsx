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
    const text = `CPC Entrance Test 2026 Result:\nStudent: ${student.name}\nBranch: ${student.branch}\nRank: #${student.rank}\nMarks: ${student.marks}/100\nSelection Status: ${student.selected ? "SELECTED (Top 25)" : "NOT SELECTED"}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTop3 = student.rank <= 3;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Dark Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Official Result Card Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`relative w-full max-w-md overflow-hidden rounded-3xl border p-6 sm:p-7 shadow-2xl bg-[#090e1c] ${
            student.selected
              ? "border-emerald-500/50 shadow-emerald-500/10"
              : "border-slate-700/80 shadow-sky-500/5"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-modal-title"
        >
          {/* Subtle Festive Confetti Accents for Selected */}
          {student.selected && (
            <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-32 w-64 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-2xl animate-pulse" />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close result card modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header Status Announcement */}
          <div className="mb-4 text-center">
            {student.selected ? (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-emerald-300 shadow-md">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <span className="text-base font-black tracking-wide">
                  🎉 YOU&apos;RE SELECTED
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/80 border border-slate-700/60 px-4 py-2 text-slate-200">
                <span className="text-sm font-bold tracking-wide text-slate-300">
                  RESULT PUBLISHED
                </span>
              </div>
            )}
          </div>

          {/* Student Name & Branch */}
          <div className="border-b border-slate-800/80 pb-4 text-center">
            <h2
              id="student-modal-title"
              className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
            >
              {student.name}
            </h2>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xs text-slate-400">Branch:</span>
              <span className="rounded-md bg-slate-900 px-3 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-200 border border-slate-800">
                {student.branch}
              </span>
            </div>
          </div>

          {/* Rank & Marks Grid */}
          <div className="my-5 grid grid-cols-2 gap-3.5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rank #{student.rank}
              </span>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                {isTop3 && <Trophy className="h-5 w-5 text-amber-400" />}
                <span className="text-3xl font-black text-white">
                  #{student.rank}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Marks
              </span>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-3xl font-black text-sky-400">
                  {student.marks}
                </span>
              </div>
            </div>
          </div>

          {/* Status Message & Tone */}
          <div className="mb-5">
            {student.selected ? (
              <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-emerald-950/40 p-3.5 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center shadow-inner">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold">SELECTED</span>
                </div>
                <p className="mt-1 text-slate-200 font-medium">
                  Welcome to the Competitive Programming Club.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-900/90 p-3.5 border border-slate-800 text-slate-300 text-xs font-medium text-center">
                <div className="flex items-center gap-1.5">
                  <XCircle className="h-4 w-4 text-slate-500" />
                  <span className="font-semibold text-slate-400">NOT SELECTED</span>
                </div>
                <p className="mt-1 text-slate-400">
                  Thank you for participating in the CPC Entrance Test.
                </p>
              </div>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 px-4 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  Copied Summary
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Result Summary
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-sky-600 py-2.5 px-5 text-xs font-bold text-white hover:bg-sky-500 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
