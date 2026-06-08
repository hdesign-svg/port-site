export type ExpensesTransactionRow = {
  id: string;
  date: string;
  description: string;
  descriptionMeta?: string;
  method: string;
  category: string;
  amount: number;
  isDeposit?: boolean;
};

export const expensesTransactions: ExpensesTransactionRow[] = [
  {
    id: "1",
    date: "2025-06-02",
    description: "Amazon Retail",
    descriptionMeta: "Variety stores",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 89.45,
  },
  {
    id: "2",
    date: "2025-06-02",
    description: "Security Data Supply Of B",
    descriptionMeta: "Computers Peripherals And Software",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 237.89,
  },
  {
    id: "3",
    date: "2025-06-02",
    description: "Idaho State Insurance Fun",
    descriptionMeta: "Government Services",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 54.32,
  },
  {
    id: "4",
    date: "2025-06-02",
    description: "Inbound transfer",
    descriptionMeta: "One Time",
    method: "Choice Financial Group x3254",
    category: "Deposit",
    amount: 54.32,
    isDeposit: true,
  },
  {
    id: "5",
    date: "2025-06-01",
    description: "Cash deposit",
    descriptionMeta: "One Time",
    method: "Choice Financial Group x3254",
    category: "Deposit",
    amount: 456.12,
    isDeposit: true,
  },
  {
    id: "6",
    date: "2025-06-01",
    description: "Home Depot",
    descriptionMeta: "Home supply warehouse stores",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 124.0,
  },
  {
    id: "7",
    date: "2025-05-31",
    description: "Shell Oil",
    descriptionMeta: "Service stations",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 68.15,
  },
  {
    id: "8",
    date: "2025-05-30",
    description: "QuickBooks Online",
    descriptionMeta: "Software",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 35.0,
  },
  {
    id: "9",
    date: "2025-05-29",
    description: "Grainger Industrial Supply",
    descriptionMeta: "Industrial supplies",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 412.6,
  },
  {
    id: "10",
    date: "2025-05-28",
    description: "Payroll — May 28",
    descriptionMeta: "ACH debit",
    method: "Choice Financial Group x3254",
    category: "Payroll",
    amount: 4280.0,
  },
  {
    id: "11",
    date: "2025-05-27",
    description: "Lowe's Companies",
    descriptionMeta: "Building materials",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 186.42,
  },
  {
    id: "12",
    date: "2025-05-27",
    description: "Customer payment — Invoice #1042",
    descriptionMeta: "ACH credit",
    method: "Choice Financial Group x3254",
    category: "Deposit",
    amount: 1850.0,
    isDeposit: true,
  },
  {
    id: "13",
    date: "2025-05-26",
    description: "Ferguson Enterprises",
    descriptionMeta: "Plumbing supplies",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 329.17,
  },
  {
    id: "14",
    date: "2025-05-25",
    description: "Google Workspace",
    descriptionMeta: "Software subscription",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 72.0,
  },
  {
    id: "15",
    date: "2025-05-24",
    description: "Chevron",
    descriptionMeta: "Fuel",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 94.8,
  },
  {
    id: "16",
    date: "2025-05-23",
    description: "Inbound transfer",
    descriptionMeta: "Operating account",
    method: "Choice Financial Group x3254",
    category: "Deposit",
    amount: 2500.0,
    isDeposit: true,
  },
  {
    id: "17",
    date: "2025-05-22",
    description: "State Farm Insurance",
    descriptionMeta: "Insurance premium",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 218.5,
  },
  {
    id: "18",
    date: "2025-05-21",
    description: "Sunbelt Rentals",
    descriptionMeta: "Equipment rental",
    method: "accountName x9126",
    category: "Card purchase",
    amount: 156.75,
  },
  {
    id: "19",
    date: "2025-05-20",
    description: "Payroll — May 20",
    descriptionMeta: "ACH debit",
    method: "Choice Financial Group x3254",
    category: "Payroll",
    amount: 4280.0,
  },
  {
    id: "20",
    date: "2025-05-19",
    description: "Customer payment — Invoice #1039",
    descriptionMeta: "Wire transfer",
    method: "Choice Financial Group x3254",
    category: "Deposit",
    amount: 3200.0,
    isDeposit: true,
  },
];

export function formatTransactionAmount(amount: number, isDeposit?: boolean) {
  const formatted = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return isDeposit ? formatted : formatted;
}

export function formatTransactionDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
