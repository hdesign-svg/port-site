export const ACCOUNTING_CATEGORIES = [
  "Equipment & Tools",
  "Contractors & Subcontractors",
  "Materials & Supplies",
  "Software & Subscriptions",
  "Auto & Transportation",
] as const;

export type AccountingCategory = (typeof ACCOUNTING_CATEGORIES)[number];

export type AccountingTransactionRow = {
  id: string;
  date: string;
  account: string;
  description: string;
  amount: number;
  isDeposit: boolean;
  category: AccountingCategory | null;
};

export const accountingTransactions: AccountingTransactionRow[] = [
  {
    id: "txn-1",
    date: "2025-10-29",
    account: "Chase checking x1233",
    description: "Home Depot - Tools & Supplies",
    amount: 142.87,
    isDeposit: false,
    category: null,
  },
  {
    id: "txn-2",
    date: "2025-10-28",
    account: "Wells Fargo checking x1233",
    description: "Starbucks - Team Coffee Meeting",
    amount: 18.45,
    isDeposit: false,
    category: null,
  },
  {
    id: "txn-3",
    date: "2025-10-22",
    account: "Chase checking x1233",
    description: "Client Payment - Invoice #1234",
    amount: 2500,
    isDeposit: true,
    category: null,
  },
  {
    id: "txn-4",
    date: "2025-10-25",
    account: "Chase checking x1233",
    description: "Ferguson Supply - Plumbing Parts",
    amount: 89.32,
    isDeposit: false,
    category: "Equipment & Tools",
  },
  {
    id: "txn-5",
    date: "2025-10-24",
    account: "Wells Fargo checking x1233",
    description: "ABC Contractors - HVAC Install",
    amount: 1250,
    isDeposit: false,
    category: "Contractors & Subcontractors",
  },
  {
    id: "txn-6",
    date: "2025-10-23",
    account: "Chase checking x1233",
    description: "Sherwin-Williams - Paint & Supplies",
    amount: 234.56,
    isDeposit: false,
    category: "Materials & Supplies",
  },
  {
    id: "txn-7",
    date: "2025-10-21",
    account: "Wells Fargo checking x1233",
    description: "Adobe Creative Cloud",
    amount: 54.99,
    isDeposit: false,
    category: "Software & Subscriptions",
  },
  {
    id: "txn-8",
    date: "2025-10-20",
    account: "Chase checking x1233",
    description: "Chevron - Fleet Fuel",
    amount: 67.89,
    isDeposit: false,
    category: "Auto & Transportation",
  },
  {
    id: "txn-9",
    date: "2025-10-19",
    account: "Wells Fargo checking x1233",
    description: "Grainger - Safety Equipment",
    amount: 312.4,
    isDeposit: false,
    category: "Equipment & Tools",
  },
  {
    id: "txn-10",
    date: "2025-10-18",
    account: "Chase checking x1233",
    description: "Client Payment - Invoice #1189",
    amount: 1800,
    isDeposit: true,
    category: "Materials & Supplies",
  },
];

export function formatAccountingDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function formatAccountingAmount(amount: number, isDeposit: boolean) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return isDeposit ? `+${formatted}` : formatted;
}

export function isUncategorized(row: AccountingTransactionRow) {
  return row.category === null;
}

export function countReviewTransactions(rows: AccountingTransactionRow[]) {
  return rows.filter(isUncategorized).length;
}

export function countCategorizedTransactions(rows: AccountingTransactionRow[]) {
  return rows.filter((row) => !isUncategorized(row)).length;
}
