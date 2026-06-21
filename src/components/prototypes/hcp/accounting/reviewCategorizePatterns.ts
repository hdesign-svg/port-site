export const REVIEW_CATEGORIZE_PATTERNS = ["A", "B", "C"] as const;

export type ReviewCategorizePattern = (typeof REVIEW_CATEGORIZE_PATTERNS)[number];

export const REVIEW_CATEGORIZE_PATTERN_LABELS: Record<
  ReviewCategorizePattern,
  { short: string; description: string }
> = {
  A: {
    short: "A · Grouped table",
    description: "Register table — zebra group headers with one category chip each.",
  },
  B: {
    short: "B · Group first",
    description: "Review by vendor group — categorize the cluster, not each row.",
  },
  C: {
    short: "C · Focus panel",
    description: "Select a row — categorize in a side panel with context.",
  },
};

export const DEFAULT_REVIEW_CATEGORIZE_PATTERN: ReviewCategorizePattern = "A";

/** @deprecated Use ReviewCategorizePattern */
export type CategoryPickerPattern = ReviewCategorizePattern;
