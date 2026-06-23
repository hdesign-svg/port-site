import type { AccountingCategory, AccountingTransactionRow } from "../hcp/accounting/accountingTransactionData";
import { buildReviewGroups } from "../hcp/accounting/accountingReviewGroups";
import type { AccountingPeriod } from "../hcp/accounting/accountingPeriods";
import { getReviewQueueTransactions } from "../hcp/accounting/accountingReadiness";

export type CloseView = "home" | "resolve" | "ledger" | "reports";

export function getCloseStats(transactions: AccountingTransactionRow[], period: AccountingPeriod) {
  const periodRows = transactions.filter((row) => row.date.startsWith(period.prefix));
  const reviewQueue = getReviewQueueTransactions(transactions, period);
  const groups = buildReviewGroups(transactions, period);
  const categorized = periodRows.filter((row) => row.category !== null).length;
  const total = periodRows.length;
  const progress = total === 0 ? 100 : Math.round((categorized / total) * 100);

  return {
    periodRows,
    reviewQueue,
    groups,
    reviewCount: reviewQueue.length,
    groupCount: groups.length,
    categorized,
    total,
    progress,
    taxReady: reviewQueue.length === 0 && total > 0,
  };
}

export function formatCloseMoney(amount: number, isDeposit: boolean) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);

  return isDeposit ? `+${formatted}` : formatted;
}

export function formatCloseDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function applyCategoryToGroup(
  transactions: AccountingTransactionRow[],
  transactionIds: string[],
  category: AccountingCategory,
): AccountingTransactionRow[] {
  const idSet = new Set(transactionIds);
  return transactions.map((row) => (idSet.has(row.id) ? { ...row, category } : row));
}
