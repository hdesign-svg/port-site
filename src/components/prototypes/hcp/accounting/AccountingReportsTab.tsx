"use client";

import { FileArrowDown } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { AccountingTabPanel } from "./AccountingTabPanel";
import type { AccountingPeriod } from "./accountingPeriods";
import {
  buildProfitAndLossReport,
  formatReportCurrency,
} from "./accountingReportsData";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { hcpColors, hcpFontWeight, hcpIcon, hcpRadius, hcpSecondaryButtonSx } from "../hcpTheme";

type AccountingReportsTabProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
};

function ReportRow({
  label,
  amount,
  emphasize = false,
  indent = false,
  labelWeight = "regular",
  amountColor,
}: {
  label: string;
  amount: number;
  emphasize?: boolean;
  indent?: boolean;
  labelWeight?: "regular" | "semibold";
  amountColor?: string;
}) {
  const labelVariant = emphasize ? "body1" : "body2";
  const labelSx = {
    fontWeight: labelWeight === "semibold" ? hcpFontWeight.semibold : hcpFontWeight.regular,
    pl: indent ? 2 : 0,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        py: emphasize ? 0.25 : 0,
      }}
    >
      <Typography variant={labelVariant} sx={labelSx}>
        {label}
      </Typography>
      <Typography
        variant={labelVariant}
        sx={{
          fontWeight: labelWeight === "semibold" ? hcpFontWeight.semibold : hcpFontWeight.regular,
          fontVariantNumeric: "tabular-nums",
          color: amountColor ?? hcpColors.textPrimary,
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

  const netProfitColor =
    report.netProfit >= 0 ? hcpColors.successMain : hcpColors.spending;

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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: hcpFontWeight.semibold }}>
            Profit & loss
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<FileArrowDown size={hcpIcon.sm} />}
            sx={{
              borderRadius: hcpRadius.control,
              ...hcpSecondaryButtonSx,
              flexShrink: 0,
            }}
          >
            Export PDF
          </Button>
        </Box>

        <Box sx={{ px: 3, py: 3 }}>
          <Box
            sx={{
              pb: 2.5,
              mb: 2.5,
              borderBottom: `1px solid ${hcpColors.borderSubtle}`,
            }}
          >
            <ReportRow
              label="Net profit"
              amount={report.netProfit}
              emphasize
              labelWeight="semibold"
              amountColor={netProfitColor}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
            <ReportRow
              label="Income"
              amount={report.totalIncome}
              labelWeight="semibold"
            />

            {report.expenses.length > 0 ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: hcpFontWeight.semibold,
                    color: hcpColors.textSecondary,
                    mt: 1.25,
                    mb: 0.25,
                  }}
                >
                  Expenses
                </Typography>
                {report.expenses.map((line) => (
                  <ReportRow
                    key={line.label}
                    label={line.label}
                    amount={line.amount}
                    indent
                  />
                ))}
                <Box
                  sx={{
                    pt: 1.25,
                    mt: 0.5,
                    borderTop: `1px solid ${hcpColors.borderSubtle}`,
                  }}
                >
                  <ReportRow
                    label="Total expenses"
                    amount={report.totalExpenses}
                    labelWeight="semibold"
                  />
                </Box>
              </>
            ) : (
              <ReportRow
                label="Expenses"
                amount={report.totalExpenses}
                labelWeight="semibold"
              />
            )}
          </Box>
        </Box>
      </Box>
    </AccountingTabPanel>
  );
}
