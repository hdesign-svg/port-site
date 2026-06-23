import { ACCOUNTING_PERIODS, ACCOUNTING_TAX_YEAR_LABEL, type AccountingPeriod } from "./accountingPeriods";
import type { AccountingTransactionRow } from "./accountingTransactionData";

export const REVIEW_WINDOW_DAYS = 30;

function daysBeforeAnchor(date: string, anchorDate: string) {
  const anchorMs = new Date(`${anchorDate}T12:00:00`).getTime();
  const rowMs = new Date(`${date}T12:00:00`).getTime();
  return Math.floor((anchorMs - rowMs) / (1000 * 60 * 60 * 24));
}

export function isInAccountingPeriod(row: AccountingTransactionRow, period: AccountingPeriod) {
  return row.date.startsWith(period.prefix);
}

export function isInReviewWindow(row: AccountingTransactionRow, period: AccountingPeriod) {
  if (!period.isCurrent) {
    return false;
  }

  if (row.category !== null) {
    return false;
  }

  if (!isInAccountingPeriod(row, period)) {
    return false;
  }

  return daysBeforeAnchor(row.date, period.anchorDate) <= REVIEW_WINDOW_DAYS;
}

export function getReviewQueueTransactions(
  rows: AccountingTransactionRow[],
  period: AccountingPeriod,
) {
  return rows.filter((row) => isInReviewWindow(row, period));
}

export type AccountingReadiness = {
  periodLabel: string;
  readyPercent: number;
  needsYouCount: number;
  sortedCount: number;
  periodTotal: number;
};

export type AccountingPeriodStatus = "ready" | "needs_review";

export function getAccountingPeriodStatus(
  rows: AccountingTransactionRow[],
  period: AccountingPeriod,
): AccountingPeriodStatus {
  const needsYouCount = getReviewQueueTransactions(rows, period).length;
  if (needsYouCount > 0) {
    return "needs_review";
  }

  const periodRows = rows.filter((row) => isInAccountingPeriod(row, period));
  const hasUncategorized = periodRows.some((row) => row.category === null);
  return hasUncategorized ? "needs_review" : "ready";
}

export function getAccountingPeriodReviewCount(
  rows: AccountingTransactionRow[],
  period: AccountingPeriod,
) {
  return getReviewQueueTransactions(rows, period).length;
}

export function getAccountingReadiness(
  rows: AccountingTransactionRow[],
  period: AccountingPeriod,
): AccountingReadiness {
  const periodRows = rows.filter((row) => isInAccountingPeriod(row, period));
  const sortedCount = periodRows.filter((row) => row.category !== null).length;
  const periodTotal = periodRows.length;
  const readyPercent = periodTotal === 0 ? 100 : Math.round((sortedCount / periodTotal) * 100);
  const needsYouCount = getReviewQueueTransactions(rows, period).length;

  return {
    periodLabel: period.label,
    readyPercent,
    needsYouCount,
    sortedCount,
    periodTotal,
  };
}

export type AccountingPeriodSummary = {
  period: AccountingPeriod;
  readiness: AccountingReadiness;
  status: AccountingPeriodStatus;
  reviewCount: number;
};

export type TaxYearReadiness = {
  label: string;
  readyPercent: number;
  sortedCount: number;
  periodTotal: number;
  needsYouCount: number;
  periodsReady: number;
  periodsTotal: number;
  periodSummaries: AccountingPeriodSummary[];
};

export function getTaxYearReadiness(rows: AccountingTransactionRow[]): TaxYearReadiness {
  const periodSummaries = ACCOUNTING_PERIODS.map((period) => ({
    period,
    readiness: getAccountingReadiness(rows, period),
    status: getAccountingPeriodStatus(rows, period),
    reviewCount: getAccountingPeriodReviewCount(rows, period),
  }));

  const sortedCount = periodSummaries.reduce((sum, item) => sum + item.readiness.sortedCount, 0);
  const periodTotal = periodSummaries.reduce((sum, item) => sum + item.readiness.periodTotal, 0);
  const needsYouCount = periodSummaries.reduce((sum, item) => sum + item.reviewCount, 0);
  const periodsReady = periodSummaries.filter((item) => item.status === "ready").length;
  const readyPercent = periodTotal === 0 ? 100 : Math.round((sortedCount / periodTotal) * 100);

  return {
    label: ACCOUNTING_TAX_YEAR_LABEL,
    readyPercent,
    sortedCount,
    periodTotal,
    needsYouCount,
    periodsReady,
    periodsTotal: ACCOUNTING_PERIODS.length,
    periodSummaries,
  };
}
