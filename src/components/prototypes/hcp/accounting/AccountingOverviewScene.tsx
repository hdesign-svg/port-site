"use client";

import Box from "@mui/material/Box";
import { useState } from "react";
import { AccountingPageHeader } from "./AccountingPageHeader";
import { AccountingReportsTab } from "./AccountingReportsTab";
import { AccountingTabBar } from "./AccountingTabBar";
import { AccountingTransactionsTab } from "./AccountingTransactionsTab";
import type { AccountingTab } from "./accountingTabs";
import { isAccountingTransactionTab } from "./accountingTabs";
import {
  accountingTransactions as initialTransactions,
  countReviewTransactions,
} from "./accountingTransactionData";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

export function AccountingScene() {
  const [activeTab, setActiveTab] = useState<AccountingTab>("toReview");
  const [transactions, setTransactions] = useState(initialTransactions);

  const reviewCount = countReviewTransactions(transactions);
  const totalCount = transactions.length;

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
          <AccountingTabBar
            activeTab={activeTab}
            reviewCount={reviewCount}
            totalCount={totalCount}
            onTabChange={setActiveTab}
          />
        </Box>
      </Box>

      {isAccountingTransactionTab(activeTab) ? (
        <AccountingTransactionsTab
          activeView={activeTab}
          transactions={transactions}
          onTransactionsChange={setTransactions}
        />
      ) : null}
      {activeTab === "reports" ? <AccountingReportsTab /> : null}
    </Box>
  );
}

/** @deprecated Use AccountingScene */
export function AccountingOverviewScene() {
  return <AccountingScene />;
}
