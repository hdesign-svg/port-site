"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReviewGroup } from "../hcp/accounting/accountingReviewGroups";
import {
  ACCOUNTING_CATEGORIES,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "../hcp/accounting/accountingTransactionData";
import { getReviewGroupTransactions } from "../hcp/accounting/accountingReviewGroups";
import { applyCategoryToGroup, formatCloseDate, formatCloseMoney } from "./closeUtils";

type CloseResolveViewProps = {
  groups: ReviewGroup[];
  transactions: AccountingTransactionRow[];
  onCategorize: (transactions: AccountingTransactionRow[]) => void;
  onDone: () => void;
};

export function CloseResolveView({ groups, transactions, onCategorize, onDone }: CloseResolveViewProps) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [pickedCategory, setPickedCategory] = useState<AccountingCategory | null>(null);

  const group = groups[index];
  const groupRows = useMemo(
    () => (group ? getReviewGroupTransactions(transactions, group) : []),
    [group, transactions],
  );

  useEffect(() => {
    setPickedCategory(null);
    setExiting(false);
  }, [group?.id]);

  useEffect(() => {
    if (groups.length === 0) {
      onDone();
    } else if (index >= groups.length) {
      setIndex(Math.max(0, groups.length - 1));
    }
  }, [groups.length, index, onDone]);

  if (!group || groupRows.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="font-[family-name:var(--font-fraunces)] text-3xl">All caught up</p>
          <button type="button" onClick={onDone} className="mt-6 text-sm underline">
            Back to Close
          </button>
        </div>
      </div>
    );
  }

  const suggested = group.suggestedCategories.slice(0, 3);
  const rest = ACCOUNTING_CATEGORIES.filter((c) => !suggested.includes(c));

  const apply = (category: AccountingCategory) => {
    setPickedCategory(category);
    setExiting(true);
    const ids = groupRows.map((row) => row.id);
    window.setTimeout(() => {
      onCategorize(applyCategoryToGroup(transactions, ids, category));
      setIndex((current) => current + 1);
    }, 280);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--close-muted)]">Resolve</p>
          <p className="mt-1 text-sm tabular-nums text-[var(--close-muted)]">
            {index + 1} of {groups.length}
          </p>
        </div>
        <div className="flex gap-1.5">
          {groups.map((item, dotIndex) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all ${
                dotIndex === index ? "w-8 bg-[var(--close-accent)]" : dotIndex < index ? "w-1.5 bg-[var(--close-success)]" : "w-1.5 bg-[var(--close-line)]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className={`flex-1 ${exiting ? "close-card-out" : "close-card-in"}`} key={group.id}>
        <div className="rounded-[2rem] border border-[var(--close-line)] bg-[var(--close-paper-elevated)] p-8 shadow-[var(--close-shadow)]">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--close-muted)]">Vendor group</p>
          <h2 className="mt-2 font-[family-name:var(--font-fraunces)] text-4xl tracking-tight">{group.label}</h2>
          <p className="mt-2 text-[var(--close-muted)]">
            {groupRows.length} transaction{groupRows.length === 1 ? "" : "s"} · one category applies to all
          </p>

          <ul className="mt-8 space-y-3 border-t border-[var(--close-line)] pt-6">
            {groupRows.map((row) => (
              <li key={row.id} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{row.description}</p>
                  <p className="text-xs text-[var(--close-muted)]">
                    {formatCloseDate(row.date)} · {row.account}
                  </p>
                </div>
                <p
                  className={`shrink-0 text-sm tabular-nums ${
                    row.isDeposit ? "text-[var(--close-success)]" : "text-[var(--close-accent)]"
                  }`}
                >
                  {formatCloseMoney(row.amount, row.isDeposit)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-[var(--close-muted)]">Pick a category</p>
            <div className="flex flex-wrap gap-2">
              {suggested.map((category) => (
                <button
                  key={category}
                  type="button"
                  disabled={exiting}
                  onClick={() => apply(category)}
                  className={`rounded-full border px-4 py-2.5 text-sm transition ${
                    pickedCategory === category
                      ? "border-[var(--close-ink)] bg-[var(--close-ink)] text-white"
                      : "border-[var(--close-line)] bg-white hover:border-[var(--close-ink)]/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-[var(--close-muted)]">More categories</summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {rest.map((category) => (
                  <button
                    key={category}
                    type="button"
                    disabled={exiting}
                    onClick={() => apply(category)}
                    className="rounded-full border border-[var(--close-line)] bg-white px-3 py-2 text-xs hover:border-[var(--close-ink)]/30"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-[var(--close-muted)]">
        Choosing a category moves this group into your ledger instantly.
      </p>
    </div>
  );
}
