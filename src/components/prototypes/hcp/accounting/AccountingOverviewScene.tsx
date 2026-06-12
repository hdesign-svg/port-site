"use client";

import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { AccountingPageHeader } from "./AccountingPageHeader";
import { AccountingReadinessStrip } from "./AccountingReadinessStrip";
import { AccountingReportsTab } from "./AccountingReportsTab";
import { AccountingTabBar } from "./AccountingTabBar";
import { AccountingTransactionsTab } from "./AccountingTransactionsTab";
import type { AccountingTab } from "./accountingTabs";
import { isAccountingTransactionTab } from "./accountingTabs";
import { getAccountingReadiness } from "./accountingReadiness";
import { accountingTransactions as initialTransactions } from "./accountingTransactionData";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

export function AccountingScene() {
  const [activeTab, setActiveTab] = useState<AccountingTab>("toReview");
  const [transactions, setTransactions] = useState(initialTransactions);

  const readiness = useMemo(() => getAccountingReadiness(transactions), [transactions]);

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
          <AccountingPageHeader />
          <AccountingReadinessStrip readiness={readiness} />
          <AccountingTabBar
            activeTab={activeTab}
            showReviewDot={readiness.needsYouCount > 0}
            onTabChange={setActiveTab}
          />
        </Box>
      </Box>

      {isAccountingTransactionTab(activeTab) ? (
        <AccountingTransactionsTab
          activeView={activeTab}
          transactions={transactions}
          onTransactionsChange={setTransactions}
          readiness={readiness}
        />
      ) : null}
      {activeTab === "reports" ? (
        <AccountingReportsTab transactions={transactions} readiness={readiness} />
      ) : null}
    </Box>
  );
}

/** @deprecated Use AccountingScene */
export function AccountingOverviewScene() {
  return <AccountingScene />;
}
