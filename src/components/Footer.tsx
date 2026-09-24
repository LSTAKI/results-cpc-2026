"use client";

import Image from "next/image";
import { useState } from "react";
import { Terminal, Shield } from "lucide-react";

interface FooterProps {
  onOpenAdminAccess?: () => void;
}

export default function Footer({ onOpenAdminAccess }: FooterProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-[#03060d] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          {/* Organization Info */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-sky-500/20 bg-slate-900 shadow-sm">
              {!imgError ? (
                <Image
                  src="/cpc-logo.png"
                  alt="CPC Logo"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain p-1"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Terminal className="h-4 w-4 text-sky-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Competitive Programming Club
              </h3>
              <p className="text-xs text-slate-400">
                Visvesvaraya Technological University, Belagavi
              </p>
            </div>
          </div>

          {/* Event Badge, Copyright, and CPC Team Bypass Access */}
          <div className="flex flex-col items-center sm:items-end gap-1 text-center sm:text-right">
            <p className="font-mono text-xs font-semibold text-sky-400">
              CPC Entrance Test 2026
            </p>
            <p className="text-xs text-slate-500">
              © 2026 Competitive Programming Club, VTU Belagavi. All rights reserved.
            </p>
            
            {/* CPC Team Button Access */}
            {onOpenAdminAccess && (
              <button
                onClick={onOpenAdminAccess}
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-sky-400 transition-colors focus:outline-none"
                title="CPC Team Preview Mode (Shortcut: Ctrl + Shift + C)"
              >
                <Shield className="h-3 w-3" />
                <span>CPC Team</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
