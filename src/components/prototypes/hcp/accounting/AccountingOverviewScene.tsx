"use client";

import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { AccountingPageHeader } from "./AccountingPageHeader";
import { AccountingReportsTab } from "./AccountingReportsTab";
import { AccountingTabBar } from "./AccountingTabBar";
import { AccountingTransactionsTab } from "./AccountingTransactionsTab";
import type { AccountingTab } from "./accountingTabs";
import { isAccountingTransactionTab } from "./accountingTabs";
import { DEFAULT_ACCOUNTING_PERIOD, type AccountingPeriod } from "./accountingPeriods";
import { getAccountingReadiness, getReviewQueueTransactions } from "./accountingReadiness";
import { accountingTransactions as initialTransactions } from "./accountingTransactionData";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

export function AccountingScene() {
  const [activeTab, setActiveTab] = useState<AccountingTab>("toReview");
  const [selectedPeriod, setSelectedPeriod] = useState<AccountingPeriod>(DEFAULT_ACCOUNTING_PERIOD);
  const [transactions, setTransactions] = useState(initialTransactions);

  const readiness = useMemo(
    () => getAccountingReadiness(transactions, selectedPeriod),
    [transactions, selectedPeriod],
  );

  const currentPeriodReviewCount = useMemo(
    () => getReviewQueueTransactions(transactions, DEFAULT_ACCOUNTING_PERIOD).length,
    [transactions],
  );

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: hcpColors.background,
      }}
    >
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: hcpColors.background,
          ...hcpPageHeaderZoneSx,
        }}
      >
        <Box sx={hcpContentHeaderSx}>
          <AccountingPageHeader
            period={selectedPeriod}
            transactions={transactions}
            onPeriodChange={setSelectedPeriod}
            tabs={
              <AccountingTabBar
                activeTab={activeTab}
                showReviewDot={currentPeriodReviewCount > 0}
                onTabChange={setActiveTab}
              />
            }
          />
        </Box>
      </Box>

      {isAccountingTransactionTab(activeTab) ? (
        <AccountingTransactionsTab
          activeView={activeTab}
          period={selectedPeriod}
          transactions={transactions}
          onTransactionsChange={setTransactions}
          readiness={readiness}
          onViewReports={() => setActiveTab("reports")}
          onSwitchToTransactions={() => setActiveTab("all")}
        />
      ) : null}
      {activeTab === "reports" ? (
        <AccountingReportsTab transactions={transactions} period={selectedPeriod} />
      ) : null}
    </Box>
  );
}

/** @deprecated Use AccountingScene */
export function AccountingOverviewScene() {
  return <AccountingScene />;
}
