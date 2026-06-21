import type { AccountingCategory, AccountingTransactionRow } from "./accountingTransactionData";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";

export type ReviewGroup = {
  id: string;
  label: string;
  ruleMatch: string;
  transactionIds: string[];
  suggestedCategories: AccountingCategory[];
};

type GroupMeta = {
  id: string;
  label: string;
  ruleMatch: string;
  suggestedCategories: AccountingCategory[];
};

function normalizeVendorKey(description: string) {
  const upper = description.toUpperCase();

  if (upper.includes("AMAZON")) {
    return "AMAZON";
  }

  if (upper.includes("COSTCO")) {
    return "COSTCO";
  }

  return upper.replace(/[^A-Z0-9]+/g, " ").trim().slice(0, 24) || upper.slice(0, 24);
}

function vendorLabelForKey(vendorKey: string) {
  if (vendorKey === "AMAZON") {
    return "Amazon purchases";
  }

  if (vendorKey === "COSTCO") {
    return "Costco purchases";
  }

  return vendorKey;
}

function suggestedCategoriesForVendor(vendorKey: string): AccountingCategory[] {
  if (vendorKey === "AMAZON") {
    return ["Materials & Supplies", "Equipment & Tools", "Software & Subscriptions"];
  }

  if (vendorKey === "COSTCO") {
    return ["Materials & Supplies", "Meals & Entertainment"];
  }

  if (vendorKey.includes("ZELLE") || vendorKey.includes("VENMO")) {
    return ["Contractors & Subcontractors", "Payroll & Benefits"];
  }

  if (vendorKey.includes("DEPOSIT")) {
    return ["Service Revenue"];
  }

  return ["Materials & Supplies", "Contractors & Subcontractors", "Equipment & Tools"];
}

export function getReviewMetaForRow(row: AccountingTransactionRow): GroupMeta {
  const vendorKey = normalizeVendorKey(row.description);

  return {
    id: `vendor-${vendorKey.toLowerCase().replace(/\s+/g, "-")}`,
    label: vendorLabelForKey(vendorKey),
    ruleMatch: vendorKey,
    suggestedCategories: suggestedCategoriesForVendor(vendorKey),
  };
}

export function buildReviewGroups(
  transactions: AccountingTransactionRow[],
  period: AccountingPeriod,
): ReviewGroup[] {
  const queue = getReviewQueueTransactions(transactions, period);
  const groups = new Map<string, ReviewGroup>();

  for (const row of queue) {
    const meta = getReviewMetaForRow(row);
    const existing = groups.get(meta.id);

    if (existing) {
      existing.transactionIds.push(row.id);
      continue;
    }

    groups.set(meta.id, {
      id: meta.id,
      label: meta.label,
      ruleMatch: meta.ruleMatch,
      transactionIds: [row.id],
      suggestedCategories: meta.suggestedCategories,
    });
  }

  return [...groups.values()];
}

export type ApplyReviewGroupInput = {
  transactionIds: string[];
  category: AccountingCategory;
  applyToFuture: boolean;
  ruleMatch: string;
};

export function applyReviewGroup(
  transactions: AccountingTransactionRow[],
  input: ApplyReviewGroupInput,
): AccountingTransactionRow[] {
  const idSet = new Set(input.transactionIds);
  const match = input.ruleMatch.toUpperCase();

  return transactions.map((row) => {
    if (idSet.has(row.id)) {
      return { ...row, category: input.category };
    }

    if (
      input.applyToFuture &&
      row.category === null &&
      row.description.toUpperCase().includes(match)
    ) {
      return { ...row, category: input.category };
    }

    return row;
  });
}

export function getReviewGroupTransactions(
  transactions: AccountingTransactionRow[],
  group: ReviewGroup,
) {
  const idSet = new Set(group.transactionIds);
  return transactions.filter((row) => idSet.has(row.id));
}
