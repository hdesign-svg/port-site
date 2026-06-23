"use client";

import { useMemo, useState } from "react";
import type { AccountingTransactionRow } from "../hcp/accounting/accountingTransactionData";
import { formatCloseDate, formatCloseMoney } from "./closeUtils";

type CloseLedgerViewProps = {
  rows: AccountingTransactionRow[];
};

export function CloseLedgerView({ rows }: CloseLedgerViewProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) =>
      [row.description, row.account, row.category ?? ""].join(" ").toLowerCase().includes(normalized),
    );
  }, [query, rows]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
      <div className="close-rise mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--close-muted)]">Ledger</p>
          <h1 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl">All transactions</h1>
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search merchants, accounts…"
          className="w-full max-w-sm rounded-2xl border border-[var(--close-line)] bg-[var(--close-paper-elevated)] px-4 py-3 text-sm outline-none ring-[var(--close-accent)] focus:ring-2 sm:w-72"
        />
      </div>

      <div className="close-rise close-stagger-1 overflow-hidden rounded-3xl border border-[var(--close-line)] bg-[var(--close-paper-elevated)]">
        <div className="grid grid-cols-[0.9fr_1.6fr_0.7fr_1fr] gap-4 border-b border-[var(--close-line)] px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-[var(--close-muted)]">
          <span>Date</span>
          <span>Transaction</span>
          <span className="text-right">Amount</span>
          <span>Category</span>
        </div>
        <ul className="max-h-[65vh] overflow-auto">
          {filtered.map((row) => (
            <li
              key={row.id}
              className="grid grid-cols-[0.9fr_1.6fr_0.7fr_1fr] gap-4 border-b border-[var(--close-line)] px-5 py-4 text-sm last:border-b-0 hover:bg-black/[0.02]"
            >
              <span className="tabular-nums text-[var(--close-muted)]">{formatCloseDate(row.date)}</span>
              <span className="min-w-0">
                <span className="block truncate font-medium">{row.description}</span>
                <span className="block truncate text-xs text-[var(--close-muted)]">{row.account}</span>
              </span>
              <span
                className={`text-right tabular-nums ${
                  row.isDeposit ? "text-[var(--close-success)]" : "text-[var(--close-ink)]"
                }`}
              >
                {formatCloseMoney(row.amount, row.isDeposit)}
              </span>
              <span className={row.category ? "" : "italic text-[var(--close-muted)]"}>
                {row.category ?? "Uncategorized"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
