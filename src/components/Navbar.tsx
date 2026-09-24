"use client";

import Image from "next/image";
import { useState } from "react";
import { Terminal, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#040711]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-sky-500/30 bg-slate-900 shadow-md shadow-sky-500/5">
            {!imgError ? (
              <Image
                src="/cpc-logo.png"
                alt="CPC Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain p-1"
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              <div className="flex items-center justify-center font-mono text-xs font-bold text-sky-400">
                <Terminal className="h-4 w-4 text-sky-400" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-tight text-white sm:text-lg">
                CPC
              </span>
              <span className="hidden text-xs text-slate-500 sm:inline">•</span>
              <span className="hidden text-xs font-semibold tracking-wide text-slate-200 sm:inline">
                Competitive Programming Club
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 sm:text-xs">
              Visvesvaraya Technological University, Belagavi
            </p>
          </div>
        </div>

        {/* Right: Live Status Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/25 bg-sky-950/40 px-3 py-1 text-xs font-semibold text-sky-300 shadow-inner">
            <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
            <span>Results 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
}
