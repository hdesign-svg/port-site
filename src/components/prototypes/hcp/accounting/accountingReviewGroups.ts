import type { AccountingCategory, AccountingTransactionRow } from "./accountingTransactionData";
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

function getGroupMeta(row: AccountingTransactionRow): GroupMeta {
  const description = row.description.toUpperCase();

  if (description.includes("AMAZON")) {
    return {
      id: "amazon",
      label: "Amazon purchases",
      ruleMatch: "AMAZON",
      suggestedCategories: ["Materials & Supplies", "Equipment & Tools", "Software & Subscriptions"],
    };
  }

  if (description.includes("COSTCO")) {
    return {
      id: "costco",
      label: "Costco purchases",
      ruleMatch: "COSTCO",
      suggestedCategories: ["Materials & Supplies", "Meals & Entertainment"],
    };
  }

  if (description.includes("ZELLE") || description.includes("VENMO")) {
    return {
      id: "peer-payment",
      label: "Payments to people",
      ruleMatch: "ZELLE",
      suggestedCategories: ["Contractors & Subcontractors", "Payroll & Benefits"],
    };
  }

  if (description.includes("DEPOSIT") || row.isDeposit) {
    return {
      id: "deposit",
      label: "Unmatched deposits",
      ruleMatch: "DEPOSIT",
      suggestedCategories: ["Service Revenue"],
    };
  }

  return {
    id: `misc-${row.id}`,
    label: "Uncategorized activity",
    ruleMatch: row.description.slice(0, 16).toUpperCase(),
    suggestedCategories: ["Materials & Supplies", "Contractors & Subcontractors", "Equipment & Tools"],
  };
}

export function buildReviewGroups(transactions: AccountingTransactionRow[]): ReviewGroup[] {
  const queue = getReviewQueueTransactions(transactions);
  const groups = new Map<string, ReviewGroup>();

  for (const row of queue) {
    const meta = getGroupMeta(row);
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
