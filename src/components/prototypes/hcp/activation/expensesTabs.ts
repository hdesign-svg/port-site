export const EXPENSES_TABS = ["Overview", "Transactions", "Cards", "Bill Pay"] as const;

export type ExpensesTab = (typeof EXPENSES_TABS)[number];

export function isExpensesTab(value: string): value is ExpensesTab {
  return EXPENSES_TABS.includes(value as ExpensesTab);
}
