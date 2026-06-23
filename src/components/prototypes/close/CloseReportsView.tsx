"use client";

import { ACCOUNTING_REPORT_BUSINESS_NAME, buildProfitAndLossReport } from "../hcp/accounting/accountingReportsData";
import type { AccountingTransactionRow } from "../hcp/accounting/accountingTransactionData";
import type { AccountingPeriod } from "../hcp/accounting/accountingPeriods";

type CloseReportsViewProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  taxReady: boolean;
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function CloseReportsView({ transactions, period, taxReady }: CloseReportsViewProps) {
  const report = buildProfitAndLossReport(transactions, period);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 lg:px-10">
      <div className="close-rise mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--close-muted)]">Reports</p>
          <h1 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl">Profit & loss</h1>
          <p className="mt-2 text-sm text-[var(--close-muted)]">{report.periodLabel}</p>
        </div>
        <button
          type="button"
          disabled={!taxReady}
          className="rounded-2xl bg-[var(--close-ink)] px-5 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Download PDF
        </button>
      </div>

      {!taxReady ? (
        <p className="close-rise mb-6 rounded-2xl border border-[var(--close-accent)] bg-[var(--close-accent-soft)] px-4 py-3 text-sm text-[var(--close-accent)]">
          Finish resolving uncategorized transactions before exporting.
        </p>
      ) : null}

      <article className="close-rise close-stagger-1 rounded-[2rem] border border-[var(--close-line)] bg-[var(--close-paper-elevated)] p-10 shadow-[var(--close-shadow)]">
        <header className="border-b border-[var(--close-line)] pb-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--close-muted)]">Statement</p>
          <h2 className="mt-2 font-[family-name:var(--font-fraunces)] text-2xl">{ACCOUNTING_REPORT_BUSINESS_NAME}</h2>
          <p className="text-sm text-[var(--close-muted)]">{report.periodLabel}</p>
        </header>

        <section className="mt-8 space-y-8">
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-[var(--close-muted)]">Income</h3>
            <ul className="mt-3 space-y-2">
              {report.income.map((line) => (
                <li key={line.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-[var(--close-muted)]">{line.label}</span>
                  <span className="tabular-nums">{money(line.amount)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex justify-between border-t border-[var(--close-line)] pt-3 text-sm font-semibold">
              <span>Total income</span>
              <span className="tabular-nums">{money(report.totalIncome)}</span>
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-[var(--close-muted)]">Expenses</h3>
            <ul className="mt-3 space-y-2">
              {report.expenses.map((line) => (
                <li key={line.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-[var(--close-muted)]">{line.label}</span>
                  <span className="tabular-nums">{money(line.amount)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex justify-between border-t border-[var(--close-line)] pt-3 text-sm font-semibold">
              <span>Total expenses</span>
              <span className="tabular-nums">{money(report.totalExpenses)}</span>
            </p>
          </div>
        </section>

        <footer className="mt-10 flex items-center justify-between border-t border-[var(--close-line)] pt-6">
          <span className="font-[family-name:var(--font-fraunces)] text-xl">Net profit</span>
          <span className="font-[family-name:var(--font-fraunces)] text-2xl tabular-nums text-[var(--close-success)]">
            {money(report.netProfit)}
          </span>
        </footer>
      </article>
    </div>
  );
}
