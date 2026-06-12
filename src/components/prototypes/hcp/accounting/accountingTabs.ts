export const ACCOUNTING_TABS = ["Transactions", "Reports"] as const;

export type AccountingTab = (typeof ACCOUNTING_TABS)[number];

export type AccountingTransactionView = "uncategorized" | "all";

export type AccountingFlowFilter = "all" | "out" | "in";

export const ACCOUNTING_TRANSACTION_VIEW_LABELS: Record<AccountingTransactionView, string> = {
  uncategorized: "Uncategorized",
  all: "All transactions",
};

export function isAccountingTab(value: string): value is AccountingTab {
  return ACCOUNTING_TABS.includes(value as AccountingTab);
}
