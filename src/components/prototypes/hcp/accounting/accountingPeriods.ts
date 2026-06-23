export type AccountingPeriod = {
  prefix: string;
  label: string;
  shortLabel: string;
  anchorDate: string;
  isCurrent: boolean;
};

export const ACCOUNTING_PERIODS: AccountingPeriod[] = [
  {
    prefix: "2025-10",
    label: "October 2025",
    shortLabel: "Oct. 2025",
    anchorDate: "2025-10-30",
    isCurrent: true,
  },
  {
    prefix: "2025-09",
    label: "September 2025",
    shortLabel: "Sep. 2025",
    anchorDate: "2025-09-30",
    isCurrent: false,
  },
  {
    prefix: "2025-08",
    label: "August 2025",
    shortLabel: "Aug. 2025",
    anchorDate: "2025-08-31",
    isCurrent: false,
  },
  {
    prefix: "2025-07",
    label: "July 2025",
    shortLabel: "Jul. 2025",
    anchorDate: "2025-07-31",
    isCurrent: false,
  },
  {
    prefix: "2025-06",
    label: "June 2025",
    shortLabel: "Jun. 2025",
    anchorDate: "2025-06-30",
    isCurrent: false,
  },
  {
    prefix: "2025-05",
    label: "May 2025",
    shortLabel: "May 2025",
    anchorDate: "2025-05-31",
    isCurrent: false,
  },
];

export const DEFAULT_ACCOUNTING_PERIOD = ACCOUNTING_PERIODS[0];

export const ACCOUNTING_TAX_YEAR_LABEL = "2025 tax year";
