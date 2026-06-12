export const ACCOUNTING_TABS = ["toReview", "all", "reports"] as const;

export type AccountingTab = (typeof ACCOUNTING_TABS)[number];

export type AccountingFlowFilter = "all" | "out" | "in";

export const ACCOUNTING_TAB_LABELS: Record<AccountingTab, string> = {
  toReview: "To review",
  all: "All",
  reports: "Reports",
};

export function isAccountingTab(value: string): value is AccountingTab {
  return ACCOUNTING_TABS.includes(value as AccountingTab);
}

export function isAccountingTransactionTab(
  tab: AccountingTab,
): tab is Extract<AccountingTab, "toReview" | "all"> {
  return tab === "toReview" || tab === "all";
}
