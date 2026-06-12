import type { AccountingCategory, AccountingTransactionRow } from "./accountingTransactionData";
import { ACCOUNTING_PERIOD_PREFIX } from "./accountingReadiness";

export type ProfitAndLossLine = {
  label: string;
  amount: number;
  indent?: boolean;
};

export type ProfitAndLossReport = {
  periodLabel: string;
  income: ProfitAndLossLine[];
  expenses: ProfitAndLossLine[];
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
};

const INCOME_CATEGORY = "Service Revenue" as const;

function isIncomeRow(row: AccountingTransactionRow) {
  return row.isDeposit || row.category === INCOME_CATEGORY;
}

export function buildProfitAndLossReport(
  rows: AccountingTransactionRow[],
  periodLabel: string,
): ProfitAndLossReport {
  const periodRows = rows.filter(
    (row) => row.date.startsWith(ACCOUNTING_PERIOD_PREFIX) && row.category !== null,
  );

  const incomeTotal = periodRows
    .filter(isIncomeRow)
    .reduce((sum, row) => sum + row.amount, 0);

  const expenseTotals = new Map<AccountingCategory, number>();

  for (const row of periodRows) {
    if (isIncomeRow(row) || !row.category) {
      continue;
    }

    expenseTotals.set(row.category, (expenseTotals.get(row.category) ?? 0) + row.amount);
  }

  const expenses = [...expenseTotals.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([label, amount]) => ({ label, amount, indent: true }));

  const totalExpenses = expenses.reduce((sum, line) => sum + line.amount, 0);

  return {
    periodLabel,
    income: [{ label: "Service revenue", amount: incomeTotal }],
    expenses,
    totalIncome: incomeTotal,
    totalExpenses,
    netProfit: incomeTotal - totalExpenses,
  };
}

export function formatReportCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
