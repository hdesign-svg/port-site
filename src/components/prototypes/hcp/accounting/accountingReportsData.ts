import type { AccountingPeriod } from "./accountingPeriods";
import type { AccountingCategory, AccountingTransactionRow } from "./accountingTransactionData";

/** Prototype business name — centered on the report title block */
export const ACCOUNTING_REPORT_BUSINESS_NAME = "Summit Home Services";

export type ProfitAndLossLine = {
  label: string;
  amount: number;
};

export type ProfitAndLossReport = {
  periodLabel: string;
  periodShortLabel: string;
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
  period: AccountingPeriod,
): ProfitAndLossReport {
  const periodRows = rows.filter(
    (row) => row.date.startsWith(period.prefix) && row.category !== null,
  );

  const incomeTotals = new Map<string, number>();

  for (const row of periodRows) {
    if (!isIncomeRow(row) || !row.category) {
      continue;
    }

    incomeTotals.set(row.category, (incomeTotals.get(row.category) ?? 0) + row.amount);
  }

  const income = [...incomeTotals.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([label, amount]) => ({ label, amount }));

  const incomeTotal = income.reduce((sum, line) => sum + line.amount, 0);

  const expenseTotals = new Map<AccountingCategory, number>();

  for (const row of periodRows) {
    if (isIncomeRow(row) || !row.category) {
      continue;
    }

    expenseTotals.set(row.category, (expenseTotals.get(row.category) ?? 0) + row.amount);
  }

  const expenses = [...expenseTotals.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([label, amount]) => ({ label, amount }));

  const totalExpenses = expenses.reduce((sum, line) => sum + line.amount, 0);

  return {
    periodLabel: period.label,
    periodShortLabel: period.shortLabel,
    income,
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
