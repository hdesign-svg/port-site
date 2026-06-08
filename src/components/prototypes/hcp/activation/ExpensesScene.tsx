"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ExpensesSummaryBar } from "./ExpensesSummaryBar";
import { ExpensesTabBar } from "./ExpensesTabBar";
import {
  ExpensesTransactionsTab,
} from "./ExpensesTransactionsTab";
import { OverviewChartsSection } from "./OverviewChartsSection";
import type { ExpensesTab } from "./expensesTabs";
import {
  hcpColors,
  hcpContentBlockStackSx,
  hcpContentHeaderSx,
  hcpContentSpacing,
  hcpLayout,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

function ExpensesOverviewTab() {
  return (
    <Box
      component="section"
      sx={{
        ...hcpContentBlockStackSx,
        pb: `${hcpContentSpacing.zoneInset}px`,
      }}
    >
      <Box sx={{ ...hcpContentHeaderSx, flexShrink: 0 }}>
        <ExpensesSummaryBar />
      </Box>
      <OverviewChartsSection />
    </Box>
  );
}

function ExpensesPlaceholderTab({ label }: { label: string }) {
  return (
    <Box
      component="section"
      sx={{
        ...hcpContentBlockStackSx,
        pb: `${hcpContentSpacing.zoneInset}px`,
      }}
    >
      <Box
        sx={{
          ...hcpContentHeaderSx,
          bgcolor: hcpColors.paper,
          border: `1px solid ${hcpColors.borderSubtle}`,
          borderRadius: `${hcpLayout.controlRadius}px`,
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Coming soon in the prototype.
        </Typography>
      </Box>
    </Box>
  );
}

type ExpensesSceneProps = {
  activeTab: ExpensesTab;
  onTabChange: (tab: ExpensesTab) => void;
};

export function ExpensesScene({ activeTab, onTabChange }: ExpensesSceneProps) {
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
          <Box
            sx={{
              mb: `${hcpContentSpacing.pageHeaderStack}px`,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ color: hcpColors.textPrimary }}
            >
              Expenses
            </Typography>
          </Box>
          <ExpensesTabBar activeTab={activeTab} onTabChange={onTabChange} />
        </Box>
      </Box>

      {activeTab === "Overview" ? <ExpensesOverviewTab /> : null}
      {activeTab === "Transactions" ? <ExpensesTransactionsTab /> : null}
      {activeTab === "Cards" ? <ExpensesPlaceholderTab label="Cards" /> : null}
      {activeTab === "Bill Pay" ? <ExpensesPlaceholderTab label="Bill Pay" /> : null}
    </Box>
  );
}

/** @deprecated Use ExpensesScene */
export function ExpensesOverviewScene() {
  return <ExpensesScene activeTab="Overview" onTabChange={() => undefined} />;
}
