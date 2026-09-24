"use client";

import Image from "next/image";
import { useState } from "react";
import { Terminal } from "lucide-react";

export default function Navbar() {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#030712]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Left: Official CPC Logo & Institution Branding */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-950 p-0.5 border border-white/10 shadow-sm">
            {!imgError ? (
              <Image
                src="/cpc-logo.png"
                alt="CPC Logo"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              <Terminal className="h-4 w-4 text-orange-400" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                CPC
              </span>
              <span className="hidden text-xs text-slate-600 sm:inline">•</span>
              <span className="hidden text-xs font-semibold text-slate-200 sm:inline">
                Competitive Programming Club
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              Visvesvaraya Technological University, Belagavi
            </p>
          </div>
        </div>

        {/* Right: RESULTS 2026 Badge */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400 border border-orange-500/20 bg-orange-500/10 px-3 py-1 rounded-md">
            RESULTS 2026
          </span>
        </div>
      </div>
    </header>
  );
}
