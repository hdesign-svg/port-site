"use client";

import Box from "@mui/material/Box";
import { useState } from "react";
import { AccountingPageHeader } from "./AccountingPageHeader";
import { AccountingReportsTab } from "./AccountingReportsTab";
import { AccountingTabBar } from "./AccountingTabBar";
import { AccountingTransactionsTab } from "./AccountingTransactionsTab";
import type { AccountingTab } from "./accountingTabs";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

export function AccountingScene() {
  const [activeTab, setActiveTab] = useState<AccountingTab>("Transactions");

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
          <AccountingPageHeader activeTab={activeTab} />
          <AccountingTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </Box>
      </Box>

      {activeTab === "Transactions" ? <AccountingTransactionsTab /> : null}
      {activeTab === "Reports" ? <AccountingReportsTab /> : null}
    </Box>
  );
}

/** @deprecated Use AccountingScene */
export function AccountingOverviewScene() {
  return <AccountingScene />;
}
