"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ActivityTimeRange } from "./activityChartShared";
import {
  ChartCardShell,
  formatCurrency,
  spendingCategories,
  visuallyHiddenSx,
} from "./activityChartShared";
import { hcpColors, hcpFontWeight, hcpLayout } from "../hcpTheme";

const breakdownChartSummary =
  "Horizontal bar chart of spending by category for the selected period. Payroll and labor is the largest category at about 168 thousand dollars over six months.";

function SpendingBreakdownChart({ timeRange }: { timeRange: ActivityTimeRange }) {
  const maxAmount = Math.max(...spendingCategories.map((item) => item.amount));

  return (
    <Box
      component="figure"
      aria-labelledby="spending-breakdown-chart-title spending-breakdown-chart-desc"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 1,
        m: 0,
      }}
    >
      <Typography id="spending-breakdown-chart-title" component="figcaption" sx={visuallyHiddenSx}>
        Spending breakdown by category
      </Typography>
      <Typography id="spending-breakdown-chart-desc" component="p" sx={visuallyHiddenSx}>
        {breakdownChartSummary} Time range: {timeRange}.
      </Typography>
      {spendingCategories.map((category) => (
        <Box key={category.label}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {category.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{ flexShrink: 0, fontWeight: hcpFontWeight.semibold, fontVariantNumeric: "tabular-nums" }}
            >
              {formatCurrency(category.amount)}
            </Typography>
          </Box>
          <Box
            sx={{
              height: 6,
              borderRadius: `${hcpLayout.controlRadius}px`,
              bgcolor: hcpColors.surfaceMuted,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${(category.amount / maxAmount) * 100}%`,
                bgcolor: category.color,
                borderRadius: `${hcpLayout.controlRadius}px`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function SpendingBreakdownCard({ timeRange }: { timeRange: ActivityTimeRange }) {
  return (
    <ChartCardShell title="Spending breakdown">
      <SpendingBreakdownChart timeRange={timeRange} />
    </ChartCardShell>
  );
}
