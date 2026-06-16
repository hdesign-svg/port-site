export const ACCOUNTING_TABS = ["toReview", "all", "reports"] as const;

export type AccountingTab = (typeof ACCOUNTING_TABS)[number];

export type AccountingFlowFilter = "all" | "out" | "in";

export const ACCOUNTING_FLOW_FILTERS: { id: AccountingFlowFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "out", label: "Money out" },
  { id: "in", label: "Money in" },
];

export const ACCOUNTING_TAB_LABELS: Record<AccountingTab, string> = {
  toReview: "To review",
  all: "Transactions",
  reports: "Reports",
};

/** Card zone titles inside Accounting tabs — describe the view, not the tab label */
export const ACCOUNTING_ZONE_TITLES = {
  review: "Review",
  register: "Register",
  profitAndLoss: "Profit & loss",
} as const;

export function isAccountingTab(value: string): value is AccountingTab {
  return ACCOUNTING_TABS.includes(value as AccountingTab);
}

export function isAccountingTransactionTab(
  tab: AccountingTab,
): tab is Extract<AccountingTab, "toReview" | "all"> {
  return tab === "toReview" || tab === "all";
}
