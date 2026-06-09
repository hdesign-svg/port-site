"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ExpensesCardsTab } from "./ExpensesCardsTab";
import { ExpensesPageHeader } from "./ExpensesPageHeader";
import { ExpensesTabBar } from "./ExpensesTabBar";
import { ExpensesTabPanel } from "./ExpensesTabPanel";
import { ExpensesTransactionsTab } from "./ExpensesTransactionsTab";
import { OverviewChartsSection } from "./OverviewChartsSection";
import type { ExpensesTab } from "./expensesTabs";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpLayout,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

function ExpensesOverviewTab() {
  return (
    <ExpensesTabPanel>
      <OverviewChartsSection />
    </ExpensesTabPanel>
  );
}

function ExpensesPlaceholderTab({ label }: { label: string }) {
  return (
    <ExpensesTabPanel>
      <Box
        sx={{
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
    </ExpensesTabPanel>
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
          <ExpensesPageHeader />
          <ExpensesTabBar activeTab={activeTab} onTabChange={onTabChange} />
        </Box>
      </Box>

      {activeTab === "Overview" ? <ExpensesOverviewTab /> : null}
      {activeTab === "Transactions" ? <ExpensesTransactionsTab /> : null}
      {activeTab === "Cards" ? <ExpensesCardsTab /> : null}
      {activeTab === "Bill Pay" ? <ExpensesPlaceholderTab label="Bill Pay" /> : null}
    </Box>
  );
}

/** @deprecated Use ExpensesScene */
export function ExpensesOverviewScene() {
  return <ExpensesScene activeTab="Overview" onTabChange={() => undefined} />;
}
