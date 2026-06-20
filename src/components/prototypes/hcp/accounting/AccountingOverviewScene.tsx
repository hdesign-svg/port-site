"use client";

import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { AccountingPageHeader } from "./AccountingPageHeader";
import { AccountingReportsTab } from "./AccountingReportsTab";
import { AccountingTabBar } from "./AccountingTabBar";
import { AccountingTransactionsTab } from "./AccountingTransactionsTab";
import type { AccountingTab } from "./accountingTabs";
import { isTransactionsTab } from "./accountingTabs";
import { DEFAULT_ACCOUNTING_PERIOD, type AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import { accountingTransactions as initialTransactions } from "./accountingTransactionData";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";
import { useHcpAccountingReviewCount } from "../HcpAppShell";

export function AccountingScene() {
  const [activeTab, setActiveTab] = useState<AccountingTab>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<AccountingPeriod>(DEFAULT_ACCOUNTING_PERIOD);
  const [transactions, setTransactions] = useState(initialTransactions);

  const currentPeriodReviewCount = useMemo(
    () => getReviewQueueTransactions(transactions, DEFAULT_ACCOUNTING_PERIOD).length,
    [transactions],
  );

  useHcpAccountingReviewCount(currentPeriodReviewCount);

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
                reviewCount={currentPeriodReviewCount}
                onTabChange={setActiveTab}
              />
            }
          />
        </Box>
      </Box>

      {isTransactionsTab(activeTab) ? (
        <AccountingTransactionsTab
          period={selectedPeriod}
          transactions={transactions}
          onTransactionsChange={setTransactions}
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
