export interface StudentResult {
  rank: number;
  name: string;
  branch: string;
  marks: number;
  selected: boolean;
}

export type StatusFilter = "all" | "selected" | "not-selected";

export type SortOption =
  | "rank-asc"
  | "rank-desc"
  | "marks-desc"
  | "marks-asc"
  | "name-asc"
  | "name-desc";
