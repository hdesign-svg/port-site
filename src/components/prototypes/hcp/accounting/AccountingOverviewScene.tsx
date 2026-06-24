"use client";

import Box from "@mui/material/Box";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AccountingPageHeader } from "./AccountingPageHeader";
import { AccountingReportsTab } from "./AccountingReportsTab";
import { AccountingTabBar } from "./AccountingTabBar";
import { AccountingTransactionsTab } from "./AccountingTransactionsTab";
import type { AccountingTab } from "./accountingTabs";
import { isTransactionsTab } from "./accountingTabs";
import { DEFAULT_ACCOUNTING_PERIOD, type AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import type { AccountingCategoryRule } from "./accountingCategoryRules";
import { accountingTransactions as initialTransactions } from "./accountingTransactionData";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";
import { useHcpAccountingReviewCount } from "../HcpAppShell";

function getInitialAccountingTab(searchParams: URLSearchParams): AccountingTab {
  return searchParams.get("tab") === "reports" ? "reports" : "all";
}

export function AccountingScene() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AccountingTab>(() =>
    getInitialAccountingTab(searchParams),
  );
  const [selectedPeriod, setSelectedPeriod] = useState<AccountingPeriod>(DEFAULT_ACCOUNTING_PERIOD);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [categoryRules, setCategoryRules] = useState<AccountingCategoryRule[]>([]);

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
          categoryRules={categoryRules}
          onTransactionsChange={setTransactions}
          onCategoryRulesChange={setCategoryRules}
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
