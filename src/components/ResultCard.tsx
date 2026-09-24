"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trophy,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Heart,
  Activity,
  ArrowRight,
} from "lucide-react";
import { StudentResult } from "@/types/results";

interface ResultCardProps {
  student: StudentResult | null;
  onClose: () => void;
  bypassSuspense?: boolean;
}

const SUSPENSE_STEPS = [
  { message: "Preparing your result...", bpm: 60, progress: 12 },
  { message: "Checking your answers...", bpm: 72, progress: 26 },
  { message: "Calculating your rank...", bpm: 84, progress: 42 },
  { message: "Comparing with 108 other candidates...", bpm: 96, progress: 58 },
  { message: "Checking selection status...", bpm: 108, progress: 74 },
  { message: "Consulting the competitive programming gods...", bpm: 120, progress: 88 },
  { message: "Okay... this is serious.", bpm: 128, progress: 96 },
  { message: "Your result is ready!", bpm: 135, progress: 100 },
];

export default function ResultCard({
  student,
  onClose,
  bypassSuspense = false,
}: ResultCardProps) {
  const [phase, setPhase] = useState<"suspense" | "revealed">("suspense");
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  // Reset phase and timer when a new student is selected
  useEffect(() => {
    if (!student) return;

    if (isReducedMotion.current || bypassSuspense) {
      setPhase("revealed");
      return;
    }

    setPhase("suspense");
    setStepIndex(0);

    let currentStep = 0;
    const intervalMs = 600; // ~4.8s total duration

    const runSequence = () => {
      timerRef.current = setInterval(() => {
        currentStep += 1;
        if (currentStep < SUSPENSE_STEPS.length) {
          setStepIndex(currentStep);
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase("revealed");
        }
      }, intervalMs);
    };

    runSequence();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [student, bypassSuspense]);

  // Close or skip on Escape/Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (phase === "suspense") {
          handleSkip();
        } else {
          onClose();
        }
      } else if (e.key === "Enter" && phase === "suspense") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, onClose]);

  if (!student) return null;

  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("revealed");
  };

  const handleCopyLink = () => {
    const text = `CPC Entrance Test 2026 Result:\nStudent: ${student.name}\nBranch: ${student.branch}\nRank: #${student.rank}\nMarks: ${student.marks}/100\nSelection Status: ${student.selected ? "SELECTED (Top 25)" : "NOT SELECTED"}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentStepData = SUSPENSE_STEPS[stepIndex] || SUSPENSE_STEPS[SUSPENSE_STEPS.length - 1];

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Dark Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={phase === "suspense" ? handleSkip : onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* PHASE 1: SUSPENSE REVEAL OVERLAY */}
        {phase === "suspense" && (
          <motion.div
            key="suspense-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-sky-500/30 bg-[#070c1b] p-6 sm:p-8 shadow-2xl text-center"
            role="dialog"
            aria-modal="true"
            aria-label="Result reveal in progress"
          >
            {/* Top Bar: CPC Branding & Skip Button */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2 text-left">
                <span className="rounded-md bg-sky-950 px-2.5 py-1 text-xs font-mono font-bold text-sky-400 border border-sky-800/40">
                  CPC
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  ENTRANCE TEST RESULTS 2026
                </span>
              </div>

              {/* Skip Button */}
              <button
                onClick={handleSkip}
                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/90 px-3.5 py-1.5 text-xs font-bold text-sky-300 hover:bg-sky-600 hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-label="Skip suspense reveal"
              >
                Skip <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Heartbeat Visual & Fictional BPM Counter */}
            <div className="my-8 flex flex-col items-center justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 60 / currentStepData.bpm,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-rose-500/20 blur-md"
                />
                
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 60 / currentStepData.bpm,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30 text-white"
                >
                  <Heart className="h-8 w-8 fill-current" />
                </motion.div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-1 border border-slate-800 text-slate-300">
                <Activity className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                <span className="font-mono text-sm font-black text-rose-300">
                  {currentStepData.bpm} BPM
                </span>
              </div>
            </div>

            {/* Cycling Suspense Message */}
            <div className="h-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStepData.message}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-semibold text-slate-200 sm:text-base"
                >
                  {currentStepData.message}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress Indicator Bar */}
            <div className="mt-6 w-full rounded-full bg-slate-900 p-1 border border-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-rose-500 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${currentStepData.progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* PHASE 2: REVEALED OFFICIAL RESULT CARD */}
        {phase === "revealed" && (
          <motion.div
            key="revealed-modal"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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

            {/* Action Buttons */}
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
        )}
      </div>
    </AnimatePresence>
  );
}
