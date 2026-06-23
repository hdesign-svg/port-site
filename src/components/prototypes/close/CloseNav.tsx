"use client";

import Link from "next/link";
import type { CloseView } from "./closeUtils";

const nav: { id: CloseView; label: string }[] = [
  { id: "home", label: "Close" },
  { id: "resolve", label: "Resolve" },
  { id: "ledger", label: "Ledger" },
  { id: "reports", label: "Reports" },
];

type CloseNavProps = {
  view: CloseView;
  onNavigate: (view: CloseView) => void;
  reviewCount: number;
  taxReady: boolean;
};

export function CloseNav({ view, onNavigate, reviewCount, taxReady }: CloseNavProps) {
  return (
    <header className="close-rise flex items-center justify-between gap-6 border-b border-[var(--close-line)] px-6 py-4 lg:px-10">
      <div className="flex items-center gap-8">
        <div>
          <p className="font-[family-name:var(--font-fraunces)] text-xl tracking-tight">Close</p>
          <p className="text-xs text-[var(--close-muted)]">Self-serve books</p>
        </div>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => {
            const active = view === item.id;
            const badge =
              item.id === "resolve" && reviewCount > 0 ? reviewCount : item.id === "home" && taxReady ? "✓" : null;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[var(--close-ink)] text-[var(--close-paper-elevated)]"
                    : "text-[var(--close-muted)] hover:bg-black/[0.04] hover:text-[var(--close-ink)]"
                }`}
              >
                {item.label}
                {badge ? (
                  <span
                    className={`ml-1.5 inline-flex min-w-[1.25rem] justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums ${
                      active ? "bg-white/20" : "bg-[var(--close-accent-soft)] text-[var(--close-accent)]"
                    }`}
                  >
                    {badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>
      <Link
        href="/prototypes/hcp"
        className="text-xs text-[var(--close-muted)] underline-offset-2 hover:text-[var(--close-ink)] hover:underline"
      >
        HCP prototype
      </Link>
    </header>
  );
}
