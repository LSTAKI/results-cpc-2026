"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface InitialLoadingScreenProps {
  onComplete: () => void;
  onOpenAdminAccess?: () => void;
}

export default function InitialLoadingScreen({
  onComplete,
  onOpenAdminAccess,
}: InitialLoadingScreenProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [cpcTeamBypassAvailable, setCpcTeamBypassAvailable] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isReducedMotion = useRef(false);

  // Check reduced motion & CPC Team session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReducedMotion.current) {
        onComplete();
        return;
      }

      // Check if CPC Team session cookie/flag exists
      const hasCpcTeamSession = document.cookie.includes("cpc_team_session=authenticated");
      if (hasCpcTeamSession) {
        setCpcTeamBypassAvailable(true);
      }
    }
  }, [onComplete]);

  // Main 90-second timeline timer
  useEffect(() => {
    if (isReducedMotion.current) return;

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= 90) {
          if (timerRef.current) clearInterval(timerRef.current);
          onComplete();
          return 90;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onComplete]);

  // Keyboard shortcut listener (Ctrl+Shift+C for CPC Team unlock, Enter/Space/Escape active at >= 85s)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CPC Team shortcut (Ctrl + Shift + C) to bypass intro
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        if (timerRef.current) clearInterval(timerRef.current);
        onComplete();
        return;
      }

      // At >= 85s, Enter, Space, or Escape enters results
      if (elapsedSeconds >= 85) {
        if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
          e.preventDefault();
          handleEnterResults();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [elapsedSeconds, onComplete]);

  const handleEnterResults = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    onComplete();
  };

  // Determine Timeline Stage based on elapsedSeconds (0 to 90s)
  const getStageContent = () => {
    const s = elapsedSeconds;

    if (s < 10) {
      // 00-10s: Stage 1 - CPC Identity & Initialization
      return {
        stageTitle: "STAGE 01 • INITIALIZATION",
        mainTitle: "Initializing CPC Entrance Test Results...",
        subDetail: "Connecting to secure local result repository",
        badge: "SYSTEM READY",
        bpm: 60,
        heartScale: 1.0,
      };
    } else if (s < 20) {
      // 10-20s: Stage 2 - Data Loading
      return {
        stageTitle: "STAGE 02 • DATA LOADING",
        mainTitle: "Loading entrance-test data...",
        subDetail: "109 CANDIDATES EVALUATED",
        badge: "109 RECORDS",
        bpm: Math.min(72, 60 + Math.round((s - 10) * 1.2)),
        heartScale: 1.05,
      };
    } else if (s < 30) {
      // 20-30s: Stage 3 - Submissions Analysis
      const subMsgs = [
        "Processing answer sheets...",
        "Validating submissions...",
        "Checking response data...",
      ];
      const msg = subMsgs[Math.floor((s - 20) / 3.4) % subMsgs.length];
      return {
        stageTitle: "STAGE 03 • SUBMISSION ANALYSIS",
        mainTitle: "Analyzing submissions...",
        subDetail: msg,
        badge: "DATA VALIDATED",
        bpm: Math.min(84, 72 + Math.round((s - 20) * 1.2)),
        heartScale: 1.1,
      };
    } else if (s < 40) {
      // 30-40s: Stage 4 - Rankings Calculation
      return {
        stageTitle: "STAGE 04 • RANKING CALCULATION",
        mainTitle: "Calculating rankings...",
        subDetail: "Determining final ranking structure...",
        badge: "RANKING IN PROGRESS",
        bpm: Math.min(96, 84 + Math.round((s - 30) * 1.2)),
        heartScale: 1.15,
      };
    } else if (s < 50) {
      // 40-50s: Stage 5 - Results Verification
      return {
        stageTitle: "STAGE 05 • VERIFICATION",
        mainTitle: "Verifying results...",
        subDetail: "109 RESULTS VERIFIED",
        badge: "VERIFIED",
        bpm: Math.min(108, 96 + Math.round((s - 40) * 1.2)),
        heartScale: 1.2,
      };
    } else if (s < 60) {
      // 50-60s: Stage 6 - Selection Determination
      return {
        stageTitle: "STAGE 06 • SELECTION INTAKE",
        mainTitle: "Determining selection...",
        subDetail: "25 SEATS • 109 CANDIDATES — Only 25 candidates will be selected.",
        badge: "25 SEATS",
        bpm: Math.min(120, 108 + Math.round((s - 50) * 1.2)),
        heartScale: 1.25,
      };
    } else if (s < 70) {
      // 60-70s: Stage 7 - Finalizing Selection
      const msgs = [
        "Ranking finalized.",
        "Selection criteria verified.",
        "Final candidate list prepared.",
      ];
      const sub = msgs[Math.floor((s - 60) / 3.4) % msgs.length];
      return {
        stageTitle: "STAGE 07 • SELECTION FINALIZATION",
        mainTitle: "Finalizing selection...",
        subDetail: sub,
        badge: "CRITERIA VERIFIED",
        bpm: Math.min(128, 120 + Math.round((s - 60) * 0.8)),
        heartScale: 1.3,
      };
    } else if (s < 80) {
      // 70-80s: Stage 8 - Major Suspense Stage
      const suspenseMsgs = [
        "25 SEATS. 109 CANDIDATES.",
        "Selection finalized.",
        "Do not refresh.",
        "Your result is ready.",
      ];
      const sub = suspenseMsgs[Math.floor((s - 70) / 2.5) % suspenseMsgs.length];
      return {
        stageTitle: "STAGE 08 • FINAL SUSPENSE",
        mainTitle: sub,
        subDetail: "Selection finalized • Official scores compiled",
        badge: "SELECTION FINALIZED",
        bpm: Math.min(135, 128 + Math.round((s - 70) * 0.7)),
        heartScale: 1.4,
      };
    } else if (s < 85) {
      // 80-85s: Stage 9 - Final Check & Pause
      const checkMsgs = ["Everything is ready.", "One final check..."];
      const sub = checkMsgs[Math.floor((s - 80) / 2.5) % checkMsgs.length];
      return {
        stageTitle: "STAGE 09 • FINAL AUDIT",
        mainTitle: sub,
        subDetail: "Final scorecards locked in memory",
        badge: "100% COMPLETE",
        bpm: 75, // stabilized heart beat
        heartScale: 1.1,
      };
    } else {
      // 85-90s: Stage 10 - Final Reveal Preparation & Entry Button
      return {
        stageTitle: "STAGE 10 • READY FOR REVEAL",
        mainTitle: "RESULTS ARE READY.",
        subDetail: "Welcome to the CPC Entrance Test Results 2026.",
        badge: "ENTER PORTAL",
        bpm: 80,
        heartScale: 1.0,
      };
    }
  };

  const stage = getStageContent();
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / 90) * 100));

  return (
    <AnimatePresence>
      <motion.div
        key="initial-90s-loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#040711] p-6 text-slate-100 selection:bg-sky-500/30 select-none"
        role="dialog"
        aria-modal="true"
        aria-label="CPC Entrance Test Results 2026 90-Second Opening Experience"
      >
        {/* Top Header: CPC Branding & Optional CPC Team Bypass */}
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/30 bg-slate-900 text-sky-400 font-mono font-bold text-lg shadow-md shadow-sky-500/5">
              CPC
            </div>
            <div>
              <h1 className="font-mono text-base font-bold tracking-tight text-white sm:text-lg">
                COMPETITIVE PROGRAMMING CLUB
              </h1>
              <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                VTU • BELAGAVI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex rounded-full bg-sky-950 px-3 py-1 font-mono text-xs font-bold text-sky-300 border border-sky-800/40">
              ENTRANCE TEST 2026
            </span>

            {/* CPC Team Bypass Button (Visible if CPC Team session or CPC Team shortcut) */}
            {cpcTeamBypassAvailable && (
              <button
                onClick={handleEnterResults}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900 transition-all shadow-sm"
                title="CPC Team Bypass"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Skip Intro (CPC Team)
              </button>
            )}
          </div>
        </div>

        {/* Center Main Stage Content & Heartbeat Animation */}
        <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center text-center my-auto py-6">
          {/* Stage Badge Header */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-1 border border-slate-800 text-[11px] font-mono font-bold tracking-wider text-sky-400">
            <span>{stage.stageTitle}</span>
          </div>

          {/* Pulsing Heartbeat Visual */}
          <div className="relative my-4 flex h-32 w-32 items-center justify-center">
            {/* Glowing Pulse Aura */}
            <motion.div
              animate={{
                scale: [1, stage.heartScale * 1.2, 1],
                opacity: [0.3, 0.75, 0.3],
              }}
              transition={{
                duration: 60 / stage.bpm,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-rose-500/25 blur-2xl"
            />

            {/* Heart Icon Container */}
            <motion.div
              animate={{
                scale: [1, stage.heartScale, 1],
              }}
              transition={{
                duration: 60 / stage.bpm,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-2xl shadow-rose-500/40 text-white"
            >
              <Heart className="h-12 w-12 fill-current" />
            </motion.div>
          </div>

          {/* Fictional BPM Counter Display */}
          <div className="mt-2 flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-1.5 border border-slate-800 text-slate-300 shadow-inner">
            <Activity className="h-4 w-4 text-rose-400 animate-pulse" />
            <span className="font-mono text-base font-black text-rose-300">
              {stage.bpm}
            </span>
            <span className="text-[10px] font-mono uppercase text-slate-400">
              BPM
            </span>
          </div>

          {/* Main Stage Title & Message */}
          <div className="mt-6 h-16 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={stage.mainTitle}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-extrabold text-white sm:text-2xl"
              >
                {stage.mainTitle}
              </motion.h2>
            </AnimatePresence>
            <p className="mt-1 text-xs font-semibold text-slate-400">
              {stage.subDetail}
            </p>
          </div>

          {/* Progress Bar & Elapsed Seconds Counter */}
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>Timeline Progress: {progressPercent}%</span>
              <span>{elapsedSeconds}s / 90s</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-950 p-0.5 border border-slate-800 shadow-inner overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Area: ENTER RESULTS Button (Appears at >= 85s) */}
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-slate-800/80 pt-4">
          <div className="text-xs font-mono text-slate-500">
            {elapsedSeconds >= 85 ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Ready! Press Enter or click button
              </span>
            ) : (
              <span>Official CPC Results Portal • 2026</span>
            )}
          </div>

          {/* ENTER RESULTS Button appears at >= 85s */}
          <AnimatePresence>
            {elapsedSeconds >= 85 ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleEnterResults}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-sky-600/30 hover:bg-sky-500 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 animate-pulse"
                aria-label="Enter results portal"
              >
                ENTER RESULTS <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <div className="h-10 text-xs font-mono text-slate-600 flex items-center">
                <span>Experiencing Results Reveal (Stage {Math.min(10, Math.floor(elapsedSeconds / 9) + 1)}/10)...</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
