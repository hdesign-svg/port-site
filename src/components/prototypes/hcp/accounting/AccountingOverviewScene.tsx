"use client";

import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { AccountingLedgerTab } from "./AccountingLedgerTab";
import { AccountingPageHeader } from "./AccountingPageHeader";
import { AccountingReadinessTab } from "./AccountingReadinessTab";
import { AccountingReportsTab } from "./AccountingReportsTab";
import { AccountingTabBar } from "./AccountingTabBar";
import { AccountingToReviewTab } from "./AccountingToReviewTab";
import type { AccountingTab } from "./accountingTabs";
import { DEFAULT_ACCOUNTING_PERIOD, type AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import type { AccountingCategoryRule } from "./accountingCategoryRules";
import { accountingTransactions as initialTransactions } from "./accountingTransactionData";
import {
  hcpColors,
  hcpModuleScrollRootSx,
} from "../hcpTheme";
import { useHcpAccountingReviewCount } from "../HcpAppShell";

export function AccountingScene() {
  const [activeTab, setActiveTab] = useState<AccountingTab>("readiness");
  const [selectedPeriod, setSelectedPeriod] = useState<AccountingPeriod>(DEFAULT_ACCOUNTING_PERIOD);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [categoryRules, setCategoryRules] = useState<AccountingCategoryRule[]>([]);
  const [requestReviewFocus, setRequestReviewFocus] = useState(false);

  const currentPeriodReviewCount = useMemo(
    () => getReviewQueueTransactions(transactions, DEFAULT_ACCOUNTING_PERIOD).length,
    [transactions],
  );

  useHcpAccountingReviewCount(currentPeriodReviewCount);

  const openToReview = (period: AccountingPeriod, focus = false) => {
    setSelectedPeriod(period);
    setActiveTab("toReview");
    if (focus) {
      setRequestReviewFocus(true);
    }
  };

  const openLedger = (period: AccountingPeriod) => {
    setSelectedPeriod(period);
    setActiveTab("ledger");
  };

  return (
    <Box
      sx={{
        ...hcpModuleScrollRootSx,
        bgcolor: hcpColors.background,
      }}
    >
      <AccountingPageHeader
        tabs={
          <AccountingTabBar
            activeTab={activeTab}
            reviewCount={currentPeriodReviewCount}
            onTabChange={setActiveTab}
          />
        }
      />

      {activeTab === "readiness" ? (
        <AccountingReadinessTab
          transactions={transactions}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          onOpenToReview={openToReview}
          onOpenLedger={openLedger}
          onOpenReports={(period) => {
            setSelectedPeriod(period);
            setActiveTab("reports");
          }}
        />
      ) : null}

      {activeTab === "toReview" ? (
        <AccountingToReviewTab
          period={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          transactions={transactions}
          categoryRules={categoryRules}
          onTransactionsChange={setTransactions}
          onCategoryRulesChange={setCategoryRules}
          requestReviewFocus={requestReviewFocus}
          onReviewFocusHandled={() => setRequestReviewFocus(false)}
        />
      ) : null}

      {activeTab === "ledger" ? (
        <AccountingLedgerTab
          period={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          transactions={transactions}
          categoryRules={categoryRules}
          onTransactionsChange={setTransactions}
          onCategoryRulesChange={setCategoryRules}
          onReviewNow={() => openToReview(selectedPeriod, true)}
        />
      ) : null}

      {activeTab === "reports" ? (
        <AccountingReportsTab
          transactions={transactions}
          period={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          onReviewNow={() => openToReview(selectedPeriod, true)}
        />
      ) : null}
    </Box>
  );
}

/** @deprecated Use AccountingScene */
export function AccountingOverviewScene() {
  return <AccountingScene />;
}
