"use client";

import type { AccountingPeriod } from "../hcp/accounting/accountingPeriods";

type CloseHomeViewProps = {
  periodLabel: string;
  progress: number;
  reviewCount: number;
  groupCount: number;
  categorized: number;
  total: number;
  taxReady: boolean;
  onResolve: () => void;
  onLedger: () => void;
  onReports: () => void;
};

function ProgressRing({ value }: { value: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-36 w-36">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128" aria-hidden>
        <circle cx="64" cy="64" r={radius} fill="none" stroke="var(--close-line)" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={value === 100 ? "var(--close-success)" : "var(--close-accent)"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-[family-name:var(--font-fraunces)] text-3xl tabular-nums">{value}%</span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--close-muted)]">closed</span>
      </div>
    </div>
  );
}

export function CloseHomeView({
  periodLabel,
  progress,
  reviewCount,
  groupCount,
  categorized,
  total,
  taxReady,
  onResolve,
  onLedger,
  onReports,
}: CloseHomeViewProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
      <div className="close-rise mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--close-muted)]">Closing</p>
        <h1 className="mt-2 font-[family-name:var(--font-fraunces)] text-4xl tracking-tight md:text-5xl">
          {periodLabel}
        </h1>
        <p className="mt-3 max-w-xl text-[var(--close-muted)]">
          {taxReady
            ? "Your books are categorized and ready for tax prep. Download reports anytime."
            : "We sorted most of your bank feed. You only decide what we couldn't confidently label."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="close-rise close-stagger-1 rounded-3xl border border-[var(--close-line)] bg-[var(--close-paper-elevated)] p-8 shadow-[var(--close-shadow)]">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <ProgressRing value={progress} />
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--close-muted)]">Auto-sorted</p>
                <p className="font-[family-name:var(--font-fraunces)] text-2xl tabular-nums">{categorized}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--close-muted)]">Needs you</p>
                <p className="font-[family-name:var(--font-fraunces)] text-2xl tabular-nums text-[var(--close-accent)]">
                  {reviewCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--close-muted)]">Total in period</p>
                <p className="font-[family-name:var(--font-fraunces)] text-2xl tabular-nums">{total}</p>
              </div>
            </div>
          </div>

          {taxReady ? (
            <div className="close-stamp mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--close-success)] bg-[var(--close-success-soft)] px-5 py-4">
              <span className="text-2xl">◉</span>
              <div>
                <p className="font-medium text-[var(--close-success)]">Tax ready</p>
                <p className="text-sm text-[var(--close-muted)]">Every transaction has a category for this period.</p>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onResolve}
              className="mt-8 w-full rounded-2xl bg-[var(--close-ink)] px-6 py-4 text-left text-[var(--close-paper-elevated)] transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:min-w-[280px]"
            >
              <p className="text-xs uppercase tracking-[0.14em] opacity-70">Primary action</p>
              <p className="mt-1 font-[family-name:var(--font-fraunces)] text-2xl">
                Resolve {groupCount} group{groupCount === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-sm opacity-80">{reviewCount} transactions · focus mode</p>
            </button>
          )}
        </section>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={onLedger}
            className="close-rise close-stagger-2 rounded-3xl border border-[var(--close-line)] bg-[var(--close-paper-elevated)] p-6 text-left transition hover:border-[var(--close-ink)]/20"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--close-muted)]">Ledger</p>
            <p className="mt-2 font-[family-name:var(--font-fraunces)] text-xl">All transactions</p>
            <p className="mt-2 text-sm text-[var(--close-muted)]">Search, verify, recategorize one-offs.</p>
          </button>
          <button
            type="button"
            onClick={onReports}
            className="close-rise close-stagger-3 rounded-3xl border border-[var(--close-line)] bg-[var(--close-paper-elevated)] p-6 text-left transition hover:border-[var(--close-ink)]/20"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--close-muted)]">Reports</p>
            <p className="mt-2 font-[family-name:var(--font-fraunces)] text-xl">Profit & loss</p>
            <p className="mt-2 text-sm text-[var(--close-muted)]">Preview and download for your CPA.</p>
          </button>
          <div className="close-rise close-stagger-4 rounded-3xl border border-dashed border-[var(--close-line)] p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--close-muted)]">Connected</p>
            <p className="mt-2 text-sm">Chase Business · Amex · Checking</p>
            <p className="mt-1 text-xs text-[var(--close-muted)]">via Plaid · synced 2h ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
