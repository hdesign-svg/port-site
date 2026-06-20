import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import { getReviewMetaForRow } from "./accountingReviewGroups";
import type { AccountingCategory, AccountingTransactionRow } from "./accountingTransactionData";

export type AccountingCategoryRule = {
  id: string;
  ruleMatch: string;
  category: AccountingCategory;
  label: string;
};

export function findCategoryRule(
  rules: AccountingCategoryRule[],
  ruleMatch: string,
): AccountingCategoryRule | undefined {
  const normalized = ruleMatch.toUpperCase();
  return rules.find((rule) => rule.ruleMatch.toUpperCase() === normalized);
}

export function upsertCategoryRule(
  rules: AccountingCategoryRule[],
  input: Omit<AccountingCategoryRule, "id"> & { id?: string },
): AccountingCategoryRule[] {
  const normalized = input.ruleMatch.toUpperCase();
  const existingIndex = rules.findIndex((rule) => rule.ruleMatch.toUpperCase() === normalized);

  const nextRule: AccountingCategoryRule = {
    id: input.id ?? (existingIndex >= 0 ? rules[existingIndex].id : normalized.toLowerCase()),
    ruleMatch: input.ruleMatch,
    category: input.category,
    label: input.label,
  };

  if (existingIndex >= 0) {
    return rules.map((rule, index) => (index === existingIndex ? nextRule : rule));
  }

  return [...rules, nextRule];
}

export function removeCategoryRule(
  rules: AccountingCategoryRule[],
  ruleMatch: string,
): AccountingCategoryRule[] {
  const normalized = ruleMatch.toUpperCase();
  return rules.filter((rule) => rule.ruleMatch.toUpperCase() !== normalized);
}

export function getSimilarReviewTransactionIds(
  transactions: AccountingTransactionRow[],
  period: AccountingPeriod,
  row: AccountingTransactionRow,
): string[] {
  const groupId = getReviewMetaForRow(row).id;
  return getReviewQueueTransactions(transactions, period)
    .filter((candidate) => getReviewMetaForRow(candidate).id === groupId)
    .map((candidate) => candidate.id);
}

export function getStragglerUncategorizedCount(
  transactions: AccountingTransactionRow[],
  period: AccountingPeriod,
): number {
  const periodRows = transactions.filter((row) => row.date.startsWith(period.prefix));
  return periodRows.filter(
    (row) =>
      row.category === null &&
      !getReviewQueueTransactions(transactions, period).some((queued) => queued.id === row.id),
  ).length;
}
