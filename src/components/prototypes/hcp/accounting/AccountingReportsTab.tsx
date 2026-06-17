"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type ReactNode, useMemo } from "react";
import { HcpTableToolbarIconButton, hcpTableToolbarActionsSx } from "../HcpTableChrome";
import { AccountingTabPanel } from "./AccountingTabPanel";
import type { AccountingPeriod } from "./accountingPeriods";
import { getAccountingReadiness } from "./accountingReadiness";
import {
  ACCOUNTING_REPORT_BUSINESS_NAME,
  buildProfitAndLossReport,
  formatReportCurrency,
  type ProfitAndLossLine,
} from "./accountingReportsData";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { ACCOUNTING_ZONE_TITLES } from "./accountingTabs";
import {
  hcpColors,
  hcpContentSpacing,
  hcpDataGridToolbarSx,
  hcpFontWeight,
  hcpIcon,
  hcpRadius,
} from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

type AccountingReportsTabProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
};

const REPORT_DOCUMENT_MAX_WIDTH = 704;

const REPORT_ROW_HEIGHT = 36;

const tableRowSx = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(6.5rem, auto)",
  alignItems: "center",
  minHeight: REPORT_ROW_HEIGHT,
  width: "100%",
  px: 2.5,
  boxSizing: "border-box",
  borderBottom: `1px solid ${hcpColors.borderSubtle}`,
} as const;

const amountCellSx = {
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
} as const;

function ReportRow({
  borderTopStrong = false,
  children,
}: {
  borderTopStrong?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        ...tableRowSx,
        ...(borderTopStrong
          ? { borderTop: `1px solid ${hcpColors.border}`, borderBottom: `1px solid ${hcpColors.border}` }
          : undefined),
      }}
    >
      {children}
    </Box>
  );
}

function TableAmount({
  amount,
  emphasis = false,
  positiveAccent = false,
}: {
  amount: number;
  emphasis?: boolean;
  positiveAccent?: boolean;
}) {
  const isPositive = amount >= 0;

  return (
    <Typography
      variant={emphasis ? hcpTypographyRoles.body : hcpTypographyRoles.bodySecondary}
      component="span"
      sx={{
        ...amountCellSx,
        fontWeight: emphasis ? hcpFontWeight.semibold : hcpFontWeight.regular,
        color:
          positiveAccent && isPositive ? hcpColors.successMain : hcpColors.textPrimary,
      }}
    >
      {formatReportCurrency(amount)}
    </Typography>
  );
}

function TableLineRow({ label, amount }: ProfitAndLossLine) {
  return (
    <ReportRow>
      <Typography variant={hcpTypographyRoles.bodySecondary} color="text.secondary" sx={{ pl: 2 }}>
        {label}
      </Typography>
      <TableAmount amount={amount} />
    </ReportRow>
  );
}

type TableSectionProps = {
  title: string;
  lines: ProfitAndLossLine[];
  emptyLabel: string;
  subtotalAmount: number;
};

function TableSection({ title, lines, emptyLabel, subtotalAmount }: TableSectionProps) {
  return (
    <>
      <ReportRow>
        <Typography
          variant={hcpTypographyRoles.bodySecondary}
          sx={{ fontWeight: hcpFontWeight.semibold, color: hcpColors.textPrimary }}
        >
          {title}
        </Typography>
        <Box />
      </ReportRow>

      {lines.length > 0 ? (
        lines.map((line) => <TableLineRow key={line.label} {...line} />)
      ) : (
        <TableLineRow label={emptyLabel} amount={0} />
      )}

      <ReportRow>
        <Typography
          variant={hcpTypographyRoles.bodySecondary}
          sx={{ fontWeight: hcpFontWeight.semibold, color: hcpColors.textPrimary }}
        >
          Total
        </Typography>
        <TableAmount amount={subtotalAmount} emphasis />
      </ReportRow>
    </>
  );
}

export function AccountingReportsTab({ transactions, period }: AccountingReportsTabProps) {
  const report = useMemo(
    () => buildProfitAndLossReport(transactions, period),
    [transactions, period],
  );

  const footerCaption = useMemo(() => {
    const readiness = getAccountingReadiness(transactions, period);
    return `Cash basis · ${readiness.sortedCount} categorized transactions`;
  }, [transactions, period]);

  return (
    <AccountingTabPanel>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          component="article"
          aria-label={`${ACCOUNTING_ZONE_TITLES.profitAndLoss}, ${report.periodLabel}`}
          sx={{
            width: "100%",
            maxWidth: REPORT_DOCUMENT_MAX_WIDTH,
            bgcolor: hcpColors.paper,
            border: `1px solid ${hcpColors.border}`,
            borderRadius: `${hcpRadius.control}px`,
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(33, 33, 33, 0.06)",
          }}
        >
          <Box
            sx={{
              ...hcpDataGridToolbarSx,
              justifyContent: "flex-end",
              borderBottom: `1px solid ${hcpColors.borderSubtle}`,
            }}
          >
            <Box sx={hcpTableToolbarActionsSx}>
              <HcpTableToolbarIconButton tooltip="Export PDF" aria-label="Export PDF">
                <DownloadSimple size={hcpIcon.md} weight="regular" />
              </HcpTableToolbarIconButton>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              px: 2.5,
              pt: 3,
              pb: 2.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: hcpFontWeight.semibold, color: hcpColors.textPrimary }}
            >
              {ACCOUNTING_ZONE_TITLES.profitAndLoss}
            </Typography>
            <Typography variant={hcpTypographyRoles.bodySecondary} color="text.secondary" sx={{ mt: 0.5 }}>
              {ACCOUNTING_REPORT_BUSINESS_NAME}
            </Typography>
            <Typography variant={hcpTypographyRoles.bodySecondary} color="text.secondary">
              {report.periodLabel}
            </Typography>
          </Box>

          <Box sx={{ borderTop: `1px solid ${hcpColors.borderSubtle}` }}>
            <ReportRow>
              <Typography
                variant={hcpTypographyRoles.captionBold}
                color="text.secondary"
                sx={{ textTransform: "none" }}
              >
                Account
              </Typography>
              <Typography
                variant={hcpTypographyRoles.captionBold}
                color="text.secondary"
                sx={{ ...amountCellSx, textTransform: "none" }}
              >
                Total
              </Typography>
            </ReportRow>

            <TableSection
              title={ACCOUNTING_ZONE_TITLES.moneyIn}
              lines={report.income}
              emptyLabel="No income recorded"
              subtotalAmount={report.totalIncome}
            />

            <TableSection
              title={ACCOUNTING_ZONE_TITLES.moneyOut}
              lines={report.expenses}
              emptyLabel="No expenses recorded"
              subtotalAmount={report.totalExpenses}
            />

            <ReportRow borderTopStrong>
              <Typography
                variant={hcpTypographyRoles.body}
                sx={{ fontWeight: hcpFontWeight.semibold, color: hcpColors.textPrimary }}
              >
                {ACCOUNTING_ZONE_TITLES.netProfit}
              </Typography>
              <TableAmount amount={report.netProfit} emphasis positiveAccent />
            </ReportRow>
          </Box>

          <Box
            sx={{
              px: 2.5,
              py: 2,
              borderTop: `1px solid ${hcpColors.borderSubtle}`,
              textAlign: "center",
            }}
          >
            <Typography variant={hcpTypographyRoles.caption} color="text.secondary">
              {footerCaption}
            </Typography>
          </Box>
        </Box>
      </Box>
    </AccountingTabPanel>
  );
}
