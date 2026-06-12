"use client";

import Typography from "@mui/material/Typography";
import type { AccountingTab } from "./accountingTabs";
import { hcpColors, hcpContentSpacing } from "../hcpTheme";

type AccountingPageHeaderProps = {
  activeTab: AccountingTab;
};

export function AccountingPageHeader({ activeTab }: AccountingPageHeaderProps) {
  return (
    <Typography
      component="h1"
      variant="h4"
      sx={{
        color: hcpColors.textPrimary,
        mb: `${hcpContentSpacing.pageHeaderStack}px`,
      }}
    >
      {activeTab}
    </Typography>
  );
}
