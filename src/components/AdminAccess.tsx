"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, KeyRound, X, Eye, Zap } from "lucide-react";
import { StudentResult } from "@/types/results";

interface AdminAccessProps {
  isOpen: boolean;
  onClose: () => void;
  bypassSuspense: boolean;
  onToggleBypass: (bypass: boolean) => void;
  onPreviewStudent: (student: StudentResult) => void;
  allResults: StudentResult[];
}

export default function AdminAccess({
  isOpen,
  onClose,
  bypassSuspense,
  onToggleBypass,
  onPreviewStudent,
  allResults,
}: AdminAccessProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Listen for Ctrl + Shift + C keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        onClose(); // toggle if already open or trigger parent
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        onToggleBypass(true);
      } else {
        setErrorMsg("Invalid credentials.");
      }
    } catch {
      // Development fallback mode if API is unreachable
      if (password === "cpc2026admin" || process.env.NODE_ENV === "development") {
        setIsAuthenticated(true);
        onToggleBypass(true);
      } else {
        setErrorMsg("Authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const previewSelected = () => {
    const selected = allResults.find((s) => s.selected);
    if (selected) onPreviewStudent(selected);
  };

  const previewNotSelected = () => {
    const notSelected = allResults.find((s) => !s.selected);
    if (notSelected) onPreviewStudent(notSelected);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl border border-sky-500/30 bg-[#090f20] p-5 sm:p-6 shadow-2xl text-slate-100"
          role="dialog"
          aria-label="CPC Team Access Modal"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {!isAuthenticated ? (
            <div>
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <ShieldAlert className="h-5 w-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">
                  CPC TEAM ACCESS
                </h3>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Enter organizer passphrase to access CPC Team Preview mode and bypass suspense testing.
              </p>

              <form onSubmit={handleLogin} className="mt-4 space-y-3">
                <div>
                  <label htmlFor="team-pass" className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <input
                    id="team-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                    required
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-semibold">{errorMsg}</p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-5 py-2 text-xs font-bold text-white hover:bg-sky-500 disabled:opacity-50"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    {loading ? "Authenticating..." : "Unlock"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    CPC TEAM MODE
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  AUTHENTICATED
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {/* Toggle Bypass */}
                <div className="flex items-center justify-between rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Bypass Suspense Reveal
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Skip 5s animation directly to result card
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleBypass(!bypassSuspense)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      bypassSuspense
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {bypassSuspense ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Preview Cards */}
                <div>
                  <span className="text-xs font-bold text-slate-300 block mb-2">
                    Quick Preview Test Cards
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={previewSelected}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/50"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Preview Selected
                    </button>
                    <button
                      onClick={previewNotSelected}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Preview Non-Selected
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-sky-600 px-5 py-2 text-xs font-bold text-white hover:bg-sky-500"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
