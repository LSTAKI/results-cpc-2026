import { StudentResult, SortOption, StatusFilter } from "@/types/results";
import rawData from "@/data/results.json";

export const allResults: StudentResult[] = rawData as StudentResult[];

/**
 * Selection Policy Configuration
 * Centralized configurable selection parameters.
 */
export const SELECTION_CONFIG = {
  totalSeats: 25,
  cutoffMarks: 66,
  totalAppeared: 109,
};

/**
 * Returns the first 3 ranked students (Rank 1, Rank 2, Rank 3).
 */
export function getTopPerformers(data: StudentResult[] = allResults): StudentResult[] {
  return data.filter((item) => item.rank <= 3).sort((a, b) => a.rank - b.rank);
}

/**
 * Returns exactly the 25 selected students (selected === true).
 * Ensures Rank 26 is NOT included.
 */
export function getSelectedStudents(data: StudentResult[] = allResults): StudentResult[] {
  return data.filter((item) => item.selected && item.rank <= 25).sort((a, b) => a.rank - b.rank);
}

/**
 * Gets unique branches sorted alphabetically.
 */
export function getAvailableBranches(data: StudentResult[] = allResults): string[] {
  const branches = Array.from(new Set(data.map((item) => item.branch.trim())));
  return branches.sort((a, b) => a.localeCompare(b));
}

/**
 * Filters and sorts results based on search query, branch, status filter, and sort option.
 * Preserves exact authoritative rank field.
 */
export function filterAndSortResults(
  data: StudentResult[],
  searchQuery: string,
  selectedBranch: string,
  statusFilter: StatusFilter,
  sortOption: SortOption
): StudentResult[] {
  let filtered = [...data];

  // Status Filter: ALL | SELECTED | NOT SELECTED
  if (statusFilter === "selected") {
    filtered = filtered.filter((student) => student.selected);
  } else if (statusFilter === "not-selected") {
    filtered = filtered.filter((student) => !student.selected);
  }

  // Branch filter
  if (selectedBranch && selectedBranch !== "ALL") {
    filtered = filtered.filter(
      (student) => student.branch.trim().toLowerCase() === selectedBranch.trim().toLowerCase()
    );
  }

  // Case-insensitive search on student name
  const query = searchQuery.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter((student) =>
      student.name.toLowerCase().includes(query)
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (sortOption) {
      case "rank-asc":
        return a.rank - b.rank;
      case "rank-desc":
        return b.rank - a.rank;
      case "marks-desc":
        if (a.marks !== b.marks) return b.marks - a.marks;
        return a.rank - b.rank;
      case "marks-asc":
        if (a.marks !== b.marks) return a.marks - b.marks;
        return a.rank - b.rank;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return a.rank - b.rank;
    }
  });

  return filtered;
}
