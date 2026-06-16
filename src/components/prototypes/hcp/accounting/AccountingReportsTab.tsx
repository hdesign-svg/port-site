"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import {
  HcpTableToolbarIconButton,
  HcpTableZoneHeader,
} from "../HcpTableChrome";
import { HcpSurfaceCard } from "../HcpSurfaceCard";
import { AccountingTabPanel } from "./AccountingTabPanel";
import type { AccountingPeriod } from "./accountingPeriods";
import {
  buildProfitAndLossReport,
  formatReportCurrency,
} from "./accountingReportsData";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { ACCOUNTING_ZONE_TITLES } from "./accountingTabs";
import {
  hcpColors,
  hcpContentSpacing,
  hcpFontWeight,
  hcpIcon,
} from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

type AccountingReportsTabProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
};

type ReportRowTone = "subtotal" | "detail";

function reportRowTypography(tone: ReportRowTone) {
  if (tone === "subtotal") {
    return {
      variant: hcpTypographyRoles.bodySecondary as "body2",
      labelWeight: hcpFontWeight.semibold,
      labelColor: hcpColors.textPrimary,
      amountColor: hcpColors.textPrimary,
    };
  }

  return {
    variant: hcpTypographyRoles.bodySecondary as "body2",
    labelWeight: hcpFontWeight.regular,
    labelColor: hcpColors.textSecondary,
    amountColor: hcpColors.textPrimary,
  };
}

function ReportRow({
  label,
  amount,
  tone,
}: {
  label: string;
  amount: number;
  tone: ReportRowTone;
}) {
  const typography = reportRowTypography(tone);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography
        variant={typography.variant}
        sx={{
          fontWeight: typography.labelWeight,
          color: typography.labelColor,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant={typography.variant}
        sx={{
          fontWeight: typography.labelWeight,
          fontVariantNumeric: "tabular-nums",
          color: typography.amountColor,
          flexShrink: 0,
        }}
      >
        {formatReportCurrency(amount)}
      </Typography>
    </Box>
  );
}

function ReportGroupLabel({ children }: { children: string }) {
  return (
    <Typography
      variant={hcpTypographyRoles.captionBold}
      component="div"
      sx={{ color: hcpColors.textSecondary }}
    >
      {children}
    </Typography>
  );
}

function NetProfitHero({ amount }: { amount: number }) {
  const isPositive = amount >= 0;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 2,
      }}
    >
      <Typography variant={hcpTypographyRoles.labelSecondary} color="text.secondary">
        Net profit
      </Typography>
      <Typography
        variant={hcpTypographyRoles.metricValue}
        sx={{
          fontVariantNumeric: "tabular-nums",
          color: isPositive ? hcpColors.successMain : hcpColors.textPrimary,
          flexShrink: 0,
        }}
      >
        {formatReportCurrency(amount)}
      </Typography>
    </Box>
  );
}

export function AccountingReportsTab({ transactions, period }: AccountingReportsTabProps) {
  const report = useMemo(
    () => buildProfitAndLossReport(transactions, period),
    [transactions, period],
  );

  return (
    <AccountingTabPanel>
      <HcpSurfaceCard
        toolbarLeading={
          <HcpTableZoneHeader
            label={ACCOUNTING_ZONE_TITLES.profitAndLoss}
            detail={period.label}
          />
        }
        toolbarActions={
          <HcpTableToolbarIconButton tooltip="Export PDF" aria-label="Export PDF">
            <DownloadSimple size={hcpIcon.md} weight="regular" />
          </HcpTableToolbarIconButton>
        }
        bodySx={{ pt: 0, pb: `${hcpContentSpacing.surfaceInsetY}px`, px: `${hcpContentSpacing.surfaceInsetX}px` }}
      >
        <Box
          sx={{
            pt: `${hcpContentSpacing.surfaceInsetY}px`,
            pb: `${hcpContentSpacing.inset}px`,
            mb: `${hcpContentSpacing.blockGap}px`,
            borderBottom: `1px solid ${hcpColors.borderSubtle}`,
          }}
        >
          <NetProfitHero amount={report.netProfit} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: `${hcpContentSpacing.inset}px`,
          }}
        >
          <ReportRow label="Income" amount={report.totalIncome} tone="subtotal" />

          {report.expenses.length > 0 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${hcpContentSpacing.inset}px`,
                }}
              >
                <ReportGroupLabel>Expenses</ReportGroupLabel>
                {report.expenses.map((line) => (
                  <ReportRow key={line.label} label={line.label} amount={line.amount} tone="detail" />
                ))}
              </Box>
              <Box
                sx={{
                  pt: `${hcpContentSpacing.inset}px`,
                  borderTop: `1px solid ${hcpColors.borderSubtle}`,
                }}
              >
                <ReportRow label="Total expenses" amount={report.totalExpenses} tone="subtotal" />
              </Box>
            </>
          ) : (
            <ReportRow label="Expenses" amount={report.totalExpenses} tone="subtotal" />
          )}
        </Box>
      </HcpSurfaceCard>
    </AccountingTabPanel>
  );
}
