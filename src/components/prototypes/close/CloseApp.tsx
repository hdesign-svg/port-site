"use client";

import { useMemo, useState } from "react";
import { DEFAULT_ACCOUNTING_PERIOD } from "../hcp/accounting/accountingPeriods";
import { accountingTransactions as seedTransactions } from "../hcp/accounting/accountingTransactionData";
import type { AccountingTransactionRow } from "../hcp/accounting/accountingTransactionData";
import { CloseHomeView } from "./CloseHomeView";
import { CloseLedgerView } from "./CloseLedgerView";
import { CloseNav } from "./CloseNav";
import { CloseReportsView } from "./CloseReportsView";
import { CloseResolveView } from "./CloseResolveView";
import { getCloseStats, type CloseView } from "./closeUtils";
import "./close.css";

export function CloseApp() {
  const period = DEFAULT_ACCOUNTING_PERIOD;
  const [view, setView] = useState<CloseView>("home");
  const [transactions, setTransactions] = useState<AccountingTransactionRow[]>(seedTransactions);

  const stats = useMemo(() => getCloseStats(transactions, period), [period, transactions]);

  const handleNavigate = (next: CloseView) => {
    if (next === "resolve" && stats.reviewCount === 0) {
      setView("home");
      return;
    }
    setView(next);
  };

  return (
    <div className="close-root">
      <CloseNav
        view={view}
        onNavigate={handleNavigate}
        reviewCount={stats.reviewCount}
        taxReady={stats.taxReady}
      />

      {view === "home" ? (
        <CloseHomeView
          periodLabel={period.label}
          progress={stats.progress}
          reviewCount={stats.reviewCount}
          groupCount={stats.groupCount}
          categorized={stats.categorized}
          total={stats.total}
          taxReady={stats.taxReady}
          onResolve={() => setView("resolve")}
          onLedger={() => setView("ledger")}
          onReports={() => setView("reports")}
        />
      ) : null}

      {view === "resolve" ? (
        <CloseResolveView
          groups={stats.groups}
          transactions={transactions}
          onCategorize={setTransactions}
          onDone={() => setView("home")}
        />
      ) : null}

      {view === "ledger" ? <CloseLedgerView rows={stats.periodRows} /> : null}

      {view === "reports" ? (
        <CloseReportsView transactions={transactions} period={period} taxReady={stats.taxReady} />
      ) : null}
    </div>
  );
}
