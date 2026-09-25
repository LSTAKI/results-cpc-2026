"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import ResultsCelebration from "@/components/ResultsCelebration";

interface InitialLoadingScreenProps {
  onComplete: () => void;
}

export default function InitialLoadingScreen({
  onComplete,
}: InitialLoadingScreenProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [cpcTeamBypassAvailable, setCpcTeamBypassAvailable] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isReducedMotion = useRef(false);

  // Directly bypass loading screen & celebration (e.g. CPC Team bypass button or keyboard shortcut)
  const handleBypass = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsCelebrating(false);
    onComplete();
  }, [onComplete]);

  // Handle normal enter results button (triggers celebration if at >=85s, or completes if already celebrating)
  const handleEnterResults = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isCelebrating) {
      onComplete();
    } else {
      setIsCelebrating(true);
    }
  }, [isCelebrating, onComplete]);

  // Handle celebration auto-completion
  const handleCelebrationComplete = useCallback(() => {
    setIsCelebrating(false);
    onComplete();
  }, [onComplete]);

  // Check reduced motion & CPC Team session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReducedMotion.current) {
        setIsCelebrating(true);
        return;
      }

      // Check if CPC Team session cookie/flag exists
      const hasCpcTeamSession = document.cookie.includes("cpc_team_session=authenticated");
      if (hasCpcTeamSession) {
        setTimeout(() => setCpcTeamBypassAvailable(true), 0);
      }
    }
  }, []);

  // Main 90-second timeline timer
  useEffect(() => {
    if (isReducedMotion.current) return;

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= 85 && !isCelebrating) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsCelebrating(true);
          return 85;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCelebrating]);

  // Keyboard shortcut listener (Ctrl+Shift+C for CPC Team unlock, Enter/Space/Escape active at >= 85s)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CPC Team shortcut (Ctrl + Shift + C) to bypass intro without celebration
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        handleBypass();
        return;
      }

      // At >= 85s, Enter, Space, or Escape enters results
      if (elapsedSeconds >= 85 || isCelebrating) {
        if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
          e.preventDefault();
          handleEnterResults();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [elapsedSeconds, isCelebrating, handleBypass, handleEnterResults]);

  // Determine Timeline Stage based on elapsedSeconds (0 to 85s)
  const getStageContent = () => {
    const s = elapsedSeconds;

    if (s < 10) {
      return {
        stageTitle: "STAGE 01 • INITIALIZATION",
        mainTitle: "Initializing Entrance Test Results...",
        subDetail: "Establishing secure link to VTU Belagavi CPC Repository",
        badge: "SYSTEM READY",
        bpm: 60,
        heartScale: 1.0,
      };
    } else if (s < 20) {
      return {
        stageTitle: "STAGE 02 • DATA LOADING",
        mainTitle: "Loading candidate scorecards...",
        subDetail: "108 CANDIDATE RECORDS LOADED",
        badge: "108 RECORDS",
        bpm: Math.min(72, 60 + Math.round((s - 10) * 1.2)),
        heartScale: 1.05,
      };
    } else if (s < 30) {
      const subMsgs = [
        "Processing response keys...",
        "Validating candidate test submissions...",
        "Cross-checking score vectors...",
      ];
      const msg = subMsgs[Math.floor((s - 20) / 3.4) % subMsgs.length];
      return {
        stageTitle: "STAGE 03 • SUBMISSION ANALYSIS",
        mainTitle: "Analyzing test submissions...",
        subDetail: msg,
        badge: "DATA VALIDATED",
        bpm: Math.min(84, 72 + Math.round((s - 20) * 1.2)),
        heartScale: 1.1,
      };
    } else if (s < 40) {
      return {
        stageTitle: "STAGE 04 • RANKING CALCULATION",
        mainTitle: "Calculating competition rankings...",
        subDetail: "Ordering score hierarchy from Rank #01 to #108...",
        badge: "RANKING IN PROGRESS",
        bpm: Math.min(96, 84 + Math.round((s - 30) * 1.2)),
        heartScale: 1.15,
      };
    } else if (s < 50) {
      return {
        stageTitle: "STAGE 05 • VERIFICATION",
        mainTitle: "Verifying official scores...",
        subDetail: "108 CANDIDATES VERIFIED ACCORDING TO CPC STANDARDS",
        badge: "VERIFIED",
        bpm: Math.min(108, 96 + Math.round((s - 40) * 1.2)),
        heartScale: 1.2,
      };
    } else if (s < 60) {
      return {
        stageTitle: "STAGE 06 • SELECTION INTAKE",
        mainTitle: "Determining club selection...",
        subDetail: "25 INTAKE SEATS • SELECTION CUTOFF: 65 MARKS",
        badge: "25 SEATS",
        bpm: Math.min(120, 108 + Math.round((s - 50) * 1.2)),
        heartScale: 1.25,
      };
    } else if (s < 70) {
      const msgs = [
        "Ranking finalized.",
        "Selection cutoff locked at 65 marks.",
        "Top 25 candidate roster compiled.",
      ];
      const sub = msgs[Math.floor((s - 60) / 3.4) % msgs.length];
      return {
        stageTitle: "STAGE 07 • SELECTION FINALIZATION",
        mainTitle: "Finalizing selection roster...",
        subDetail: sub,
        badge: "CRITERIA VERIFIED",
        bpm: Math.min(128, 120 + Math.round((s - 60) * 0.8)),
        heartScale: 1.3,
      };
    } else if (s < 80) {
      const suspenseMsgs = [
        "25 SELECTED CANDIDATES.",
        "Selection finalized.",
        "Official results ready.",
        "Preparing leaderboard reveal...",
      ];
      const sub = suspenseMsgs[Math.floor((s - 70) / 2.5) % suspenseMsgs.length];
      return {
        stageTitle: "STAGE 08 • FINAL SUSPENSE",
        mainTitle: sub,
        subDetail: "Top 25 roster locked • Official scores compiled",
        badge: "SELECTION FINALIZED",
        bpm: Math.min(135, 128 + Math.round((s - 70) * 0.7)),
        heartScale: 1.4,
      };
    } else {
      return {
        stageTitle: "STAGE 09 • FINAL AUDIT",
        mainTitle: "Scores finalized.",
        subDetail: "Final scorecards locked in local memory",
        badge: "100% COMPLETE",
        bpm: 75,
        heartScale: 1.1,
      };
    }
  };

  const stage = getStageContent();
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / 85) * 100));

  // If in celebration phase, show the party-popper celebration overlay
  if (isCelebrating) {
    return <ResultsCelebration onComplete={handleCelebrationComplete} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="initial-90s-loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#030712] p-4 sm:p-6 text-slate-100 selection:bg-amber-500/30 select-none bg-tech-grid min-h-[100dvh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="CPC Entrance Test Results 2026 Opening Announcement"
      >
        {/* Subtle Radial Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

        {/* Top Header: Official CPC Branding & Optional Bypass */}
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 p-1">
              <Image
                src="/cpc-logo.png"
                alt="CPC Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-mono text-xs sm:text-base font-black tracking-wider text-white truncate">
                COMPETITIVE PROGRAMMING CLUB
              </h1>
              <p className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase truncate">
                VTU BELAGAVI • RESULTS 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-400">
              ENTRANCE TEST 2026
            </span>

            {/* CPC Team Bypass Button */}
            {cpcTeamBypassAvailable && (
              <button
                onClick={handleBypass}
                className="inline-flex items-center gap-1.5 rounded border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-1 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-xs font-bold text-emerald-400 hover:bg-emerald-900 transition-all shrink-0 min-h-[36px]"
                title="CPC Team Bypass"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                SKIP (CPC TEAM)
              </button>
            )}
          </div>
        </div>

        {/* Center Main Stage Content */}
        <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center text-center my-auto py-6">
          {/* Stage Badge Header */}
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-slate-800 bg-slate-900 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-400">
            <span>{stage.stageTitle}</span>
          </div>

          {/* Pulsing Heartbeat Visual */}
          <div className="relative my-4 flex h-28 w-28 items-center justify-center">
            <motion.div
              animate={{
                scale: [1, stage.heartScale * 1.2, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 60 / stage.bpm,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl"
            />

            <motion.div
              animate={{
                scale: [1, stage.heartScale, 1],
              }}
              transition={{
                duration: 60 / stage.bpm,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl shadow-amber-500/20 text-slate-950"
            >
              <Heart className="h-10 w-10 fill-current" />
            </motion.div>
          </div>

          {/* BPM Counter Display */}
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-1 border border-slate-800 text-slate-300">
            <Activity className="h-4 w-4 text-amber-400 animate-pulse" />
            <span className="font-mono text-sm font-black text-amber-400">
              {stage.bpm}
            </span>
            <span className="text-[10px] font-mono uppercase text-slate-500">
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
                className="text-xl sm:text-2xl font-black text-white tracking-tight"
              >
                {stage.mainTitle}
              </motion.h2>
            </AnimatePresence>
            <p className="mt-1 text-xs font-mono text-slate-400">
              {stage.subDetail}
            </p>
          </div>

          {/* Progress Bar & Elapsed Seconds Counter */}
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>PROGRESS: {progressPercent}%</span>
              <span>{elapsedSeconds}s / 85s</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400 transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Area: ENTER RESULTS Button */}
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-slate-800 pt-4">
          <div className="text-xs font-mono text-slate-500">
            {elapsedSeconds >= 80 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> REVEAL READY — PRESS ENTER TO CONTINUATION
              </span>
            ) : (
              <span>OFFICIAL CPC COMPETITION RESULTS ANNOUNCEMENT • 2026</span>
            )}
          </div>

          <AnimatePresence>
            {elapsedSeconds >= 80 ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleEnterResults}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 font-mono text-xs font-black text-slate-950 shadow-lg hover:bg-amber-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 animate-pulse"
                aria-label="Enter results portal"
              >
                ENTER RESULTS PORTAL <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <div className="h-9 font-mono text-xs text-slate-500 flex items-center">
                <span>STAGE {Math.min(9, Math.floor(elapsedSeconds / 9.5) + 1)} / 9 IN PROGRESS...</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


