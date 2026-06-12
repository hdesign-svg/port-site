import type { AccountingTransactionRow } from "./accountingTransactionData";

export const ACCOUNTING_PERIOD_LABEL = "October 2025";
export const ACCOUNTING_PERIOD_PREFIX = "2025-10";
export const REVIEW_WINDOW_DAYS = 30;

const PERIOD_ANCHOR = new Date("2025-10-30T12:00:00");

function daysBeforeAnchor(date: string) {
  const anchorMs = PERIOD_ANCHOR.getTime();
  const rowMs = new Date(`${date}T12:00:00`).getTime();
  return Math.floor((anchorMs - rowMs) / (1000 * 60 * 60 * 24));
}

export function isInAccountingPeriod(row: AccountingTransactionRow) {
  return row.date.startsWith(ACCOUNTING_PERIOD_PREFIX);
}

export function isInReviewWindow(row: AccountingTransactionRow) {
  if (row.category !== null) {
    return false;
  }

  return daysBeforeAnchor(row.date) <= REVIEW_WINDOW_DAYS;
}

export function getReviewQueueTransactions(rows: AccountingTransactionRow[]) {
  return rows.filter(isInReviewWindow);
}

export type AccountingReadiness = {
  periodLabel: string;
  readyPercent: number;
  needsYouCount: number;
  sortedCount: number;
  periodTotal: number;
};

export function getAccountingReadiness(rows: AccountingTransactionRow[]): AccountingReadiness {
  const periodRows = rows.filter(isInAccountingPeriod);
  const sortedCount = periodRows.filter((row) => row.category !== null).length;
  const periodTotal = periodRows.length;
  const readyPercent = periodTotal === 0 ? 100 : Math.round((sortedCount / periodTotal) * 100);
  const needsYouCount = getReviewQueueTransactions(rows).length;

  return {
    periodLabel: ACCOUNTING_PERIOD_LABEL,
    readyPercent,
    needsYouCount,
    sortedCount,
    periodTotal,
  };
}
