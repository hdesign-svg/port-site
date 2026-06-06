import { deposits, months, spending, spendingCategories } from "./activityChartShared";

/** Demo data ends in September — treat as the current month in the prototype. */
export const CURRENT_MONTH_INDEX = months.length - 1;

export const ACTIVITY_TIME_PRESETS = [
  "This month",
  "Last month",
  "Last 3 months",
  "Last quarter",
  "Year to date",
  "Past 6 months",
] as const;

export type ActivityTimePreset = (typeof ACTIVITY_TIME_PRESETS)[number];

export type ActivityTimeRange =
  | { kind: "preset"; preset: ActivityTimePreset }
  | { kind: "custom"; startIndex: number; endIndex: number };

export const DEFAULT_TIME_RANGE: ActivityTimeRange = {
  kind: "preset",
  preset: "Past 6 months",
};

function indicesFromStart(count: number) {
  const start = Math.max(0, CURRENT_MONTH_INDEX - count + 1);
  return Array.from({ length: CURRENT_MONTH_INDEX - start + 1 }, (_, offset) => start + offset);
}

function presetIndices(preset: ActivityTimePreset): number[] {
  switch (preset) {
    case "This month":
      return [CURRENT_MONTH_INDEX];
    case "Last month":
      return [CURRENT_MONTH_INDEX - 1];
    case "Last 3 months":
      return indicesFromStart(3);
    case "Last quarter":
      // Q2 (Apr–Jun) when current month is September.
      return [0, 1, 2];
    case "Year to date":
      return Array.from({ length: CURRENT_MONTH_INDEX + 1 }, (_, index) => index);
    case "Past 6 months":
      return Array.from({ length: months.length }, (_, index) => index);
  }
}

export function getMonthIndices(timeRange: ActivityTimeRange): number[] {
  if (timeRange.kind === "preset") {
    return presetIndices(timeRange.preset);
  }

  const startIndex = Math.min(timeRange.startIndex, timeRange.endIndex);
  const endIndex = Math.max(timeRange.startIndex, timeRange.endIndex);
  return Array.from({ length: endIndex - startIndex + 1 }, (_, offset) => startIndex + offset);
}

export function getTimeRangeLabel(timeRange: ActivityTimeRange): string {
  if (timeRange.kind === "preset") {
    return timeRange.preset;
  }

  const startIndex = Math.min(timeRange.startIndex, timeRange.endIndex);
  const endIndex = Math.max(timeRange.startIndex, timeRange.endIndex);
  return `${months[startIndex]} – ${months[endIndex]}`;
}

const PRESET_SHORT_LABELS: Record<ActivityTimePreset, string> = {
  "This month": months[CURRENT_MONTH_INDEX],
  "Last month": months[CURRENT_MONTH_INDEX - 1],
  "Last 3 months": "3 mo",
  "Last quarter": "Q2",
  "Year to date": "YTD",
  "Past 6 months": "6 mo",
};

/** Compact label for the card header control. */
export function getTimeRangeShortLabel(timeRange: ActivityTimeRange): string {
  if (timeRange.kind === "preset") {
    return PRESET_SHORT_LABELS[timeRange.preset];
  }

  const startIndex = Math.min(timeRange.startIndex, timeRange.endIndex);
  const endIndex = Math.max(timeRange.startIndex, timeRange.endIndex);
  if (startIndex === endIndex) {
    return months[startIndex];
  }
  return `${months[startIndex]}–${months[endIndex]}`;
}

export function isPresetSelected(timeRange: ActivityTimeRange, preset: ActivityTimePreset) {
  return timeRange.kind === "preset" && timeRange.preset === preset;
}

export function isCustomSelected(timeRange: ActivityTimeRange) {
  return timeRange.kind === "custom";
}

export function getFilteredActivityData(timeRange: ActivityTimeRange) {
  const indices = getMonthIndices(timeRange);

  return {
    months: indices.map((index) => months[index]),
    deposits: indices.map((index) => deposits[index]),
    spending: indices.map((index) => spending[index]),
  };
}

export function getFilteredSpendingCategories(timeRange: ActivityTimeRange) {
  const selectedMonths = getMonthIndices(timeRange).length;
  const scale = selectedMonths / months.length;

  return spendingCategories.map((category) => ({
    ...category,
    amount: Math.round(category.amount * scale),
  }));
}

export function createCustomTimeRange(startIndex: number, endIndex: number): ActivityTimeRange {
  return {
    kind: "custom",
    startIndex: Math.min(startIndex, endIndex),
    endIndex: Math.max(startIndex, endIndex),
  };
}
