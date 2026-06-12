"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { AccountingTabPanel } from "./AccountingTabPanel";
import {
  buildProfitAndLossReport,
  formatReportCurrency,
} from "./accountingReportsData";
import type { AccountingReadiness } from "./accountingReadiness";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { hcpColors, hcpFontWeight, hcpRadius } from "../hcpTheme";

type AccountingReportsTabProps = {
  transactions: AccountingTransactionRow[];
  readiness: AccountingReadiness;
};

function ReportSection({
  title,
  lines,
  totalLabel,
  totalAmount,
  emphasizeTotal = false,
}: {
  title: string;
  lines: { label: string; amount: number; indent?: boolean }[];
  totalLabel: string;
  totalAmount: number;
  emphasizeTotal?: boolean;
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: hcpFontWeight.semibold,
          color: hcpColors.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          fontSize: "0.75rem",
          mb: 1.5,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {lines.map((line) => (
          <Box
            key={line.label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              pl: line.indent ? 2 : 0,
            }}
          >
            <Typography variant="body2">{line.label}</Typography>
            <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
              {formatReportCurrency(line.amount)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mt: 1.5,
          pt: 1.5,
          borderTop: `1px solid ${hcpColors.borderSubtle}`,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
          {totalLabel}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: hcpFontWeight.semibold,
            fontVariantNumeric: "tabular-nums",
            color: emphasizeTotal && totalAmount >= 0 ? hcpColors.successMain : hcpColors.textPrimary,
          }}
        >
          {formatReportCurrency(totalAmount)}
        </Typography>
      </Box>
    </Box>
  );
}

export function AccountingReportsTab({ transactions, readiness }: AccountingReportsTabProps) {
  const report = useMemo(
    () => buildProfitAndLossReport(transactions, readiness.periodLabel),
    [transactions, readiness.periodLabel],
  );

  return (
    <AccountingTabPanel>
      <Box
        sx={{
          bgcolor: hcpColors.paper,
          border: `1px solid ${hcpColors.border}`,
          borderRadius: hcpRadius.control,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${hcpColors.borderSubtle}`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: hcpFontWeight.semibold, mb: 0.5 }}>
            Profit & loss
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {report.periodLabel} · {readiness.readyPercent}% of transactions categorized
          </Typography>
        </Box>

        <Box sx={{ px: 3, py: 3 }}>
          <ReportSection
            title="Income"
            lines={report.income}
            totalLabel="Total income"
            totalAmount={report.totalIncome}
          />

          <ReportSection
            title="Expenses"
            lines={report.expenses}
            totalLabel="Total expenses"
            totalAmount={report.totalExpenses}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              pt: 2,
              borderTop: `2px solid ${hcpColors.border}`,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: hcpFontWeight.semibold }}>
              Net profit
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: hcpFontWeight.semibold,
                fontVariantNumeric: "tabular-nums",
                color: report.netProfit >= 0 ? hcpColors.successMain : hcpColors.spending,
              }}
            >
              {formatReportCurrency(report.netProfit)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </AccountingTabPanel>
  );
}
