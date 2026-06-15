import type { AccountingPeriod } from "./accountingPeriods";
import type { AccountingTransactionRow } from "./accountingTransactionData";

export const ACCOUNTING_SYNC_SUMMARY = "2h ago";
export const ACCOUNTING_SYNC_DETAIL = "Chase & Amex · last synced 2 hours ago";
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
