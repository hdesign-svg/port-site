"use client";

import { ArrowsClockwise } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccountingPeriodMenu } from "./AccountingPeriodMenu";
import type { AccountingPeriod } from "./accountingPeriods";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { ACCOUNTING_SYNC_SUMMARY } from "./accountingReadiness";
import { HcpStatusTag } from "../HcpStatusTag";
import { hcpColors, hcpContentSpacing, hcpIcon } from "../hcpTheme";

type AccountingPageHeaderProps = {
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  onPeriodChange: (period: AccountingPeriod) => void;
};

export function AccountingPageHeader({
  period,
  transactions,
  onPeriodChange,
}: AccountingPageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        mb: `${hcpContentSpacing.pageHeaderStack}px`,
      }}
    >
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexShrink: 0 }}>
        <HcpStatusTag
          label={ACCOUNTING_SYNC_SUMMARY}
          tone="neutral"
          icon={<ArrowsClockwise size={hcpIcon.xs} aria-hidden />}
        />
        <AccountingPeriodMenu
          period={period}
          transactions={transactions}
          onPeriodChange={onPeriodChange}
        />
      </Box>
    </Box>
  );
}
