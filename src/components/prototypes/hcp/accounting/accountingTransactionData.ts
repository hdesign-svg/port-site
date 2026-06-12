export const ACCOUNTING_CATEGORIES = [
  "Service Revenue",
  "Materials & Supplies",
  "Equipment & Tools",
  "Contractors & Subcontractors",
  "Auto & Transportation",
  "Software & Subscriptions",
  "Payroll & Benefits",
  "Insurance",
  "Utilities & Phone",
  "Meals & Entertainment",
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

const ACCOUNTS = {
  checking: "Chase Business Checking ···1233",
  card: "Chase Ink Business ···8812",
  amex: "Amex Business ···4401",
} as const;

const IMPORT_ANCHOR = new Date("2025-10-30T12:00:00");

function dateDaysAgo(daysAgo: number) {
  const date = new Date(IMPORT_ANCHOR);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function money(base: number, seed: number, spread = 0.35) {
  const variance = base * spread;
  const offset = ((seed * 17) % 100) / 100 - 0.5;
  return Math.round((base + variance * offset) * 100) / 100;
}

type TransactionDraft = Omit<AccountingTransactionRow, "id">;

function buildCategorizedHistory(): TransactionDraft[] {
  const rows: TransactionDraft[] = [];
  let seed = 0;

  const push = (row: TransactionDraft) => {
    rows.push(row);
    seed += 1;
  };

  // HCP-matched client payments — highest-confidence auto-sort
  for (let i = 0; i < 48; i += 1) {
    push({
      date: dateDaysAgo(8 + i * 4),
      account: ACCOUNTS.checking,
      description: `HCP Payment — Invoice #${2100 + i}`,
      amount: money(1850, seed, 0.55),
      isDeposit: true,
      category: "Service Revenue",
    });
  }

  // Recurring supply-house runs (rules + merchant enrichment)
  const supplyRuns = [
    { vendor: "THE HOME DEPOT #4621", category: "Materials & Supplies" as const, base: 186 },
    { vendor: "FERGUSON ENT #882", category: "Materials & Supplies" as const, base: 412 },
    { vendor: "SHERWIN-WILLIAMS #4521", category: "Materials & Supplies" as const, base: 248 },
    { vendor: "GRAINGER INC #204", category: "Equipment & Tools" as const, base: 329 },
    { vendor: "AIRGAS USA", category: "Materials & Supplies" as const, base: 94 },
  ];

  for (let week = 0; week < 26; week += 1) {
    const template = supplyRuns[week % supplyRuns.length];
    push({
      date: dateDaysAgo(3 + week * 7 + (week % 3)),
      account: week % 4 === 0 ? ACCOUNTS.amex : ACCOUNTS.card,
      description: template.vendor,
      amount: money(template.base, seed),
      isDeposit: false,
      category: template.category,
    });
  }

  // Fleet fuel — frequent, high confidence
  for (let i = 0; i < 36; i += 1) {
    push({
      date: dateDaysAgo(2 + i * 5),
      account: i % 2 === 0 ? ACCOUNTS.card : ACCOUNTS.amex,
      description: i % 3 === 0 ? "CHEVRON 204891" : "SHELL OIL 574021",
      amount: money(72, seed, 0.45),
      isDeposit: false,
      category: "Auto & Transportation",
    });
  }

  // Subcontractor payouts
  const subs = [
    "ABC HVAC SUBCONTRACTORS",
    "RIVERA ELECTRIC LLC",
    "PREMIER DRYWALL INC",
    "NORTHSTAR ROOFING",
  ];

  for (let i = 0; i < 32; i += 1) {
    push({
      date: dateDaysAgo(11 + i * 6),
      account: ACCOUNTS.checking,
      description: subs[i % subs.length],
      amount: money(1450, seed, 0.5),
      isDeposit: false,
      category: "Contractors & Subcontractors",
    });
  }

  // Biweekly payroll via Gusto
  for (let i = 0; i < 13; i += 1) {
    push({
      date: dateDaysAgo(6 + i * 14),
      account: ACCOUNTS.checking,
      description: "GUSTO PAYROLL ACH",
      amount: money(18420, seed, 0.08),
      isDeposit: false,
      category: "Payroll & Benefits",
    });
  }

  // Monthly fixed costs
  const monthlyFixed: { description: string; category: AccountingCategory; base: number }[] = [
    { description: "STATE FARM BUSINESS INS", category: "Insurance", base: 486 },
    { description: "NEXT INSURANCE WORKERS COMP", category: "Insurance", base: 312 },
    { description: "SPECTRUM BUSINESS INTERNET", category: "Utilities & Phone", base: 189 },
    { description: "VERIZON WIRELESS BUSINESS", category: "Utilities & Phone", base: 246 },
    { description: "HOUSECALL PRO SUBSCRIPTION", category: "Software & Subscriptions", base: 169 },
    { description: "INTUIT QUICKBOOKS ONLINE", category: "Software & Subscriptions", base: 90 },
    { description: "ADOBE CREATIVE CLOUD", category: "Software & Subscriptions", base: 54.99 },
    { description: "COMPANY CAM PRO", category: "Software & Subscriptions", base: 34 },
  ];

  for (let month = 0; month < 6; month += 1) {
    for (const item of monthlyFixed) {
      push({
        date: dateDaysAgo(4 + month * 30 + (month % 2)),
        account: month % 2 === 0 ? ACCOUNTS.card : ACCOUNTS.checking,
        description: item.description,
        amount: money(item.base, seed, 0.05),
        isDeposit: false,
        category: item.category,
      });
    }
  }

  // Tool purchases & equipment
  const equipment = [
    "MILWAUKEE TOOL DIRECT",
    "DEWALT SERVICE PARTS",
    "RIDGID FACTORY STORE",
    "HILTI INC",
  ];

  for (let i = 0; i < 28; i += 1) {
    push({
      date: dateDaysAgo(15 + i * 9),
      account: ACCOUNTS.amex,
      description: equipment[i % equipment.length],
      amount: money(540, seed, 0.6),
      isDeposit: false,
      category: "Equipment & Tools",
    });
  }

  // Additional matched revenue deposits (partial ACH batches)
  for (let i = 0; i < 25; i += 1) {
    push({
      date: dateDaysAgo(5 + i * 8),
      account: ACCOUNTS.checking,
      description: `HCP Payment — Invoice #${1980 + i}`,
      amount: money(920, seed, 0.65),
      isDeposit: true,
      category: "Service Revenue",
    });
  }

  // More supply runs to reflect heavy field purchasing
  for (let i = 0; i < 21; i += 1) {
    const template = supplyRuns[i % supplyRuns.length];
    push({
      date: dateDaysAgo(18 + i * 6),
      account: i % 2 === 0 ? ACCOUNTS.card : ACCOUNTS.amex,
      description: template.vendor,
      amount: money(template.base, seed, 0.5),
      isDeposit: false,
      category: template.category,
    });
  }

  // Occasional team meals — categorized when receipt matched in Expenses
  for (let i = 0; i < 11; i += 1) {
    push({
      date: dateDaysAgo(20 + i * 12),
      account: ACCOUNTS.card,
      description: "CHIPOTLE ONLINE #8842",
      amount: money(86, seed, 0.35),
      isDeposit: false,
      category: "Meals & Entertainment",
    });
  }

  return rows;
}

function buildReviewQueue(): TransactionDraft[] {
  const ambiguousExpenses: TransactionDraft[] = [
    {
      date: dateDaysAgo(1),
      account: ACCOUNTS.amex,
      description: "AMAZON MKTPLACE*2K4J9 AMZN.COM/BILL",
      amount: 127.43,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(1),
      account: ACCOUNTS.card,
      description: "COSTCO WHSE #1247",
      amount: 284.17,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(2),
      account: ACCOUNTS.checking,
      description: "ZELLE PAYMENT TO J. RIVERA",
      amount: 350,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(2),
      account: ACCOUNTS.checking,
      description: "DEPOSIT — MOBILE #8842",
      amount: 980,
      isDeposit: true,
      category: null,
    },
    {
      date: dateDaysAgo(3),
      account: ACCOUNTS.card,
      description: "WM SUPERCENTER #0442",
      amount: 64.28,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(3),
      account: ACCOUNTS.checking,
      description: "ACH DEBIT MERCHANT SVCS",
      amount: 42.18,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(4),
      account: ACCOUNTS.checking,
      description: "CHECK #2187",
      amount: 500,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(4),
      account: ACCOUNTS.amex,
      description: "LOWES #00934",
      amount: 156.92,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(5),
      account: ACCOUNTS.card,
      description: "SQ *UNKNOWN MERCHANT",
      amount: 38.5,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(5),
      account: ACCOUNTS.checking,
      description: "WIRE IN — REF 8847291",
      amount: 4200,
      isDeposit: true,
      category: null,
    },
    {
      date: dateDaysAgo(6),
      account: ACCOUNTS.card,
      description: "TST* MAIN ST CAFE",
      amount: 47.82,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(6),
      account: ACCOUNTS.checking,
      description: "VENMO *PAYMENT",
      amount: 125,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(7),
      account: ACCOUNTS.amex,
      description: "IC* INSTACART",
      amount: 93.14,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(7),
      account: ACCOUNTS.checking,
      description: "ATM WITHDRAWAL CHASE #442",
      amount: 200,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(8),
      account: ACCOUNTS.card,
      description: "PAYPAL *TRANSFER",
      amount: 275,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(9),
      account: ACCOUNTS.checking,
      description: "DEPOSIT — REF 992841",
      amount: 1650,
      isDeposit: true,
      category: null,
    },
    {
      date: dateDaysAgo(10),
      account: ACCOUNTS.amex,
      description: "AMAZON WEB SERVICES",
      amount: 118.44,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(11),
      account: ACCOUNTS.card,
      description: "THE HOME DEPOT #4621",
      amount: 412.08,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(12),
      account: ACCOUNTS.checking,
      description: "POS DEBIT — GENERIC",
      amount: 89.99,
      isDeposit: false,
      category: null,
    },
    {
      date: dateDaysAgo(13),
      account: ACCOUNTS.amex,
      description: "COSTCO WHSE #1247",
      amount: 156.33,
      isDeposit: false,
      category: null,
    },
  ];

  const backfillTemplates = [
    { description: "AMAZON MKTPLACE*8FJ2A AMZN.COM/BILL", account: ACCOUNTS.amex, base: 74 },
    { description: "ZELLE PAYMENT TO CREW LEAD", account: ACCOUNTS.checking, base: 180 },
    { description: "LOWES #00934", account: ACCOUNTS.card, base: 132 },
    { description: "DEPOSIT — MOBILE #7710", account: ACCOUNTS.checking, base: 740, isDeposit: true },
    { description: "WM SUPERCENTER #0442", account: ACCOUNTS.card, base: 58 },
    { description: "ACH DEBIT MERCHANT SVCS", account: ACCOUNTS.checking, base: 39 },
    { description: "SQ *FIELD SUPPLIES", account: ACCOUNTS.card, base: 64 },
    { description: "CHECK #2194", account: ACCOUNTS.checking, base: 425 },
    { description: "TST* CORNER DELI", account: ACCOUNTS.amex, base: 41 },
    { description: "VENMO *PAYMENT", account: ACCOUNTS.checking, base: 95 },
    { description: "WIRE IN — REF 7712044", account: ACCOUNTS.checking, base: 3100, isDeposit: true },
    { description: "PAYPAL *TRANSFER", account: ACCOUNTS.card, base: 210 },
  ];

  const backfill: TransactionDraft[] = [];

  for (let i = 0; i < 32; i += 1) {
    const template = backfillTemplates[i % backfillTemplates.length];
    const isDeposit = template.isDeposit ?? false;

    backfill.push({
      date: dateDaysAgo(14 + i * 4),
      account: template.account,
      description: template.description,
      amount: money(template.base, i, 0.4),
      isDeposit,
      category: null,
    });
  }

  return [...ambiguousExpenses, ...backfill];
}

function buildAccountingTransactions(): AccountingTransactionRow[] {
  const categorized = buildCategorizedHistory();
  const review = buildReviewQueue();

  const combined = [...categorized, ...review].sort((left, right) => {
    const leftTime = new Date(`${left.date}T12:00:00`).getTime();
    const rightTime = new Date(`${right.date}T12:00:00`).getTime();
    return rightTime - leftTime;
  });

  return combined.map((row, index) => ({
    ...row,
    id: `txn-${String(index + 1).padStart(3, "0")}`,
  }));
}

export const accountingTransactions = buildAccountingTransactions();

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

/** Mirrors post-Plaid import funnel — raw feed vs what lands in the register */
export const ACCOUNTING_IMPORT_STATS = {
  rawImported: 412,
  transfersExcluded: 38,
  autoCategorized: countCategorizedTransactions(accountingTransactions),
  toReview: countReviewTransactions(accountingTransactions),
  totalVisible: accountingTransactions.length,
} as const;
