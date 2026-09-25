"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";

interface ResultsCelebrationProps {
  onComplete?: () => void;
  /** Optional override for preview mode */
  isReducedMotionOverride?: boolean;
}

// CPC Brand Palette strictly defined (Orange, Amber/Gold, Cyan, Blue, White)
const CPC_PALETTE = [
  "#f97316", // CPC Orange
  "#ff6b00", // Vibrant Orange
  "#f59e0b", // Amber / Gold
  "#fbbf24", // Light Gold
  "#06b6d4", // Cyan
  "#22d3ee", // Vibrant Cyan
  "#3b82f6", // Royal Blue
  "#60a5fa", // Sky Blue
  "#ffffff", // Bright White
];

type ParticleShape = "rect" | "strip" | "circle";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: ParticleShape;
  size: number;
  opacity: number;
  gravity: number;
  drag: number;
}

export default function ResultsCelebration({
  onComplete,
  isReducedMotionOverride,
}: ResultsCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<"ready" | "title">("ready");
  const [isReducedMotion] = useState(() => {
    if (isReducedMotionOverride !== undefined) return isReducedMotionOverride;
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const animFrameRef = useRef<number | null>(null);

  const handleFinish = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  // Text transition timer (0s -> "RESULTS ARE READY." -> 1.2s -> "🎉 CPC ENTRANCE TEST RESULTS 2026" -> 3.6s finish)
  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setPhase("title");
    }, 1200);

    const finishTimer = setTimeout(() => {
      handleFinish();
    }, 3800);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(finishTimer);
    };
  }, [handleFinish]);

  // Particle System Canvas Animation
  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle responsive canvas resize
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create energetic but lightweight particle system (approx 80 particles total)
    const particles: Particle[] = [];
    const shapes: ParticleShape[] = ["rect", "strip", "circle"];

    // 1. Burst from Left Side
    for (let i = 0; i < 30; i++) {
      const angle = (Math.random() * 45 + 15) * (Math.PI / 180); // 15 to 60 deg upward right
      const speed = Math.random() * 12 + 10;
      particles.push({
        x: width * 0.05,
        y: height * 0.8,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: CPC_PALETTE[Math.floor(Math.random() * CPC_PALETTE.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 6 + 6,
        opacity: 1,
        gravity: 0.22,
        drag: 0.98,
      });
    }

    // 2. Burst from Right Side
    for (let i = 0; i < 30; i++) {
      const angle = (Math.random() * 45 + 120) * (Math.PI / 180); // 120 to 165 deg upward left
      const speed = Math.random() * 12 + 10;
      particles.push({
        x: width * 0.95,
        y: height * 0.8,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: CPC_PALETTE[Math.floor(Math.random() * CPC_PALETTE.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 6 + 6,
        opacity: 1,
        gravity: 0.22,
        drag: 0.98,
      });
    }

    // 3. Smaller Burst from Top Center
    for (let i = 0; i < 20; i++) {
      const speed = Math.random() * 6 + 4;
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 100,
        y: height * 0.1,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: Math.random() * speed + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        color: CPC_PALETTE[Math.floor(Math.random() * CPC_PALETTE.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 5 + 5,
        opacity: 1,
        gravity: 0.18,
        drag: 0.985,
      });
    }

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Fade particles out toward end of celebration (after 2.5s)
      const globalFade = elapsed > 2.5 ? Math.max(0, 1 - (elapsed - 2.5) / 1.1) : 1;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.rotation += p.rotationSpeed;

        const currentOpacity = p.opacity * globalFade;
        if (currentOpacity <= 0) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
        } else if (p.shape === "strip") {
          ctx.fillRect(-p.size / 4, -p.size, p.size / 2, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (elapsed < 3.8) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isReducedMotion]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/95 backdrop-blur-sm p-4 overflow-hidden pointer-events-none select-none"
      role="dialog"
      aria-label="CPC Entrance Test Results 2026 Celebration"
    >
      {/* Particle Canvas Layer */}
      {!isReducedMotion && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10 h-full w-full"
        />
      )}

      {/* Subtle Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-gradient-to-tr from-amber-500/20 via-sky-500/10 to-orange-500/20 blur-[100px] pointer-events-none" />

      {/* Center Reveal Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-xl mx-auto pointer-events-auto">
        <AnimatePresence mode="wait">
          {phase === "ready" ? (
            <motion.div
              key="ready-phase"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-amber-400">
                <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
                <span>FINAL EVALUATION COMPLETE</span>
              </div>
              <h2 className="font-mono text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                RESULTS ARE READY.
              </h2>
            </motion.div>
          ) : (
            <motion.div
              key="title-phase"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-sky-300">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span>OFFICIAL ANNOUNCEMENT</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-300 to-amber-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                  🎉 CPC ENTRANCE TEST RESULTS
                </h1>
                <div className="font-mono text-2xl sm:text-4xl font-black tracking-widest text-amber-400 pt-1">
                  2026
                </div>
              </div>

              <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md pt-2">
                COMPETITIVE PROGRAMMING CLUB • VTU BELAGAVI
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
