export const EXPENSES_TABS = ["Overview", "Transactions", "Cards", "Bills"] as const;

export type ExpensesTab = (typeof EXPENSES_TABS)[number];

/** Table/chart zone titles — one word; describe the view, not the tab label */
export const EXPENSES_ZONE_TITLES = {
  transactions: "History",
  cards: "Cardholders",
  bills: "Payables",
} as const;

export function isExpensesTab(value: string): value is ExpensesTab {
  return EXPENSES_TABS.includes(value as ExpensesTab);
}
