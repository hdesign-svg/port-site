"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { AccountingPeriodMenu } from "./AccountingPeriodMenu";
import type { AccountingPeriod } from "./accountingPeriods";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import {
  hcpColors,
  hcpModulePageHeaderSx,
  hcpModulePageHeaderTabsSx,
  hcpModulePageHeaderTitleRowSx,
} from "../hcpTheme";

type AccountingPageHeaderProps = {
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  onPeriodChange: (period: AccountingPeriod) => void;
  tabs: ReactNode;
};

export function AccountingPageHeader({
  period,
  transactions,
  onPeriodChange,
  tabs,
}: AccountingPageHeaderProps) {
  return (
    <Box sx={hcpModulePageHeaderSx}>
      <Box sx={hcpModulePageHeaderTitleRowSx}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: hcpColors.textPrimary,
            minWidth: 0,
          }}
        >
          Accounting
        </Typography>

        <AccountingPeriodMenu
          period={period}
          transactions={transactions}
          onPeriodChange={onPeriodChange}
        />
      </Box>

      <Box sx={hcpModulePageHeaderTabsSx}>{tabs}</Box>
    </Box>
  );
}
