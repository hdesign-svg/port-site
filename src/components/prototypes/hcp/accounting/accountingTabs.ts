export const ACCOUNTING_TABS = ["all", "reports"] as const;

export type AccountingTab = (typeof ACCOUNTING_TABS)[number];

export type AccountingFlowFilter = "all" | "out" | "in";

export const ACCOUNTING_FLOW_FILTERS: { id: AccountingFlowFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "out", label: "Money out" },
  { id: "in", label: "Money in" },
];

export const ACCOUNTING_TAB_LABELS: Record<AccountingTab, string> = {
  all: "Transactions",
  reports: "Reports",
};

/** Card zone titles inside Accounting tabs — describe the view, not the tab label */
export const ACCOUNTING_ZONE_TITLES = {
  review: "Review",
  register: "Register",
  summary: "Summary",
  profitAndLoss: "Profit & loss",
  netProfit: "Net profit",
  moneyIn: "Money in",
  moneyOut: "Money out",
} as const;

export function isAccountingTab(value: string): value is AccountingTab {
  return ACCOUNTING_TABS.includes(value as AccountingTab);
}

export function isTransactionsTab(tab: AccountingTab): tab is "all" {
  return tab === "all";
}
