"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import InitialLoadingScreen from "@/components/InitialLoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TopPerformers from "@/components/TopPerformers";
import SelectionBanner from "@/components/SelectionBanner";
import SelectedMembers from "@/components/SelectedMembers";
import SearchBar from "@/components/SearchBar";
import ResultsTable from "@/components/ResultsTable";
import ResultCard from "@/components/ResultCard";
import AdminAccess from "@/components/AdminAccess";
import Footer from "@/components/Footer";
import {
  allResults,
  getTopPerformers,
  getSelectedStudents,
  getAvailableBranches,
  filterAndSortResults,
} from "@/lib/results";
import { StudentResult, SortOption, StatusFilter } from "@/types/results";

export default function Home() {
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("rank-asc");
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(
    null
  );

  // Admin / CPC Team Bypass state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Search input ref for focus
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check sessionStorage on mount so intro only plays once per browser session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem("cpc_intro_seen");
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hasSeenIntro === "true" || isReduced) {
        setShowInitialScreen(false);
      }
    }
  }, []);

  const handleInitialComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cpc_intro_seen", "true");
    }
    setShowInitialScreen(false);
  }, []);

  const handleFindMyResultClick = useCallback(() => {
    searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  }, []);

  // Top Performers (Ranks 1, 2, 3)
  const topPerformers = useMemo(() => {
    return getTopPerformers(allResults);
  }, []);

  // Exactly 25 Selected Students
  const selectedStudents = useMemo(() => {
    return getSelectedStudents(allResults);
  }, []);

  // Unique branches
  const availableBranches = useMemo(() => {
    return getAvailableBranches(allResults);
  }, []);

  // Filtered and sorted results for directory table
  const filteredResults = useMemo(() => {
    return filterAndSortResults(
      allResults,
      searchQuery,
      selectedBranch,
      statusFilter,
      sortOption
    );
  }, [searchQuery, selectedBranch, statusFilter, sortOption]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedBranch("ALL");
    setStatusFilter("all");
    setSortOption("rank-asc");
  }, []);

  return (
    <>
      {/* INITIAL OPENING EXPERIENCE (Runs once on website load per session) */}
      {showInitialScreen && (
        <InitialLoadingScreen onComplete={handleInitialComplete} />
      )}

      {/* MAIN RESULTS PORTAL */}
      <div className="flex min-h-screen flex-col justify-between bg-[#040711] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
        <div>
          {/* Navigation Header */}
          <Navbar />

          {/* Hero Section */}
          <Hero onFindMyResultClick={handleFindMyResultClick} />

          {/* Official 4 Key Statistics */}
          <Stats />

          {/* Top Performers Podium (Ranks 1, 2, 3) */}
          <TopPerformers
            topPerformers={topPerformers}
            onSelectStudent={(student) => setSelectedStudent(student)}
          />

          {/* Selection Announcement Section */}
          <SelectionBanner />

          {/* Selected Members Showcase (Exact 25 Ranks) */}
          <SelectedMembers
            selectedStudents={selectedStudents}
            onSelectStudent={(student) => setSelectedStudent(student)}
          />

          {/* Main Results Directory */}
          <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Search Controls */}
            <SearchBar
              ref={searchInputRef}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedBranch={selectedBranch}
              onBranchChange={setSelectedBranch}
              availableBranches={availableBranches}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortOption={sortOption}
              onSortChange={setSortOption}
              totalCount={allResults.length}
              filteredCount={filteredResults.length}
            />

            {/* Directory Results Table & Mobile View */}
            <ResultsTable
              results={filteredResults}
              searchQuery={searchQuery}
              selectedBranch={selectedBranch}
              sortOption={sortOption}
              onSortChange={setSortOption}
              onSelectStudent={(student) => setSelectedStudent(student)}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>

        {/* Student Result Card Modal (Opens directly on click) */}
        <ResultCard
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />

        {/* CPC Team Secure Bypass Modal */}
        <AdminAccess
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          bypassSuspense={false}
          onToggleBypass={() => {}}
          onPreviewStudent={(student) => setSelectedStudent(student)}
          allResults={allResults}
        />

        {/* Footer */}
        <Footer onOpenAdminAccess={() => setIsAdminOpen(true)} />
      </div>
    </>
  );
}
