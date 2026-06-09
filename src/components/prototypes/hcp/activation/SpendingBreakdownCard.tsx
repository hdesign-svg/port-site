"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ChartCardShell,
  chartCardFigureSx,
  formatCurrency,
  visuallyHiddenSx,
} from "./activityChartShared";
import {
  getFilteredSpendingCategories,
  getTimeRangeLabel,
  type ActivityTimeRange,
} from "./activityTimeRange";
import { hcpChartCardBodySx, hcpColors, hcpContentSpacing, hcpLayout } from "../hcpTheme";

const breakdownBarHeight = 28;
const breakdownBarRadius = hcpLayout.controlRadius / 2;

const breakdownSummary =
  "Horizontal bars showing spending by category for the selected period. Bar length is relative to the largest category.";

function SpendingBreakdownChart({ timeRange }: { timeRange: ActivityTimeRange }) {
  const categories = getFilteredSpendingCategories(timeRange);
  const rangeLabel = getTimeRangeLabel(timeRange);
  const maxAmount = Math.max(...categories.map((category) => category.amount), 1);

  return (
    <Box
      component="figure"
      aria-labelledby="spending-breakdown-chart-title spending-breakdown-chart-desc"
      sx={{
        ...chartCardFigureSx,
        gap: `${hcpContentSpacing.inset}px`,
      }}
    >
      <Typography id="spending-breakdown-chart-title" component="figcaption" sx={visuallyHiddenSx}>
        Spending breakdown by category
      </Typography>
      <Typography id="spending-breakdown-chart-desc" component="p" sx={visuallyHiddenSx}>
        {breakdownSummary} Time range: {rangeLabel}.
      </Typography>

      {categories.map((category) => (
        <Box key={category.label}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {category.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{ flexShrink: 0, fontVariantNumeric: "tabular-nums" }}
            >
              {formatCurrency(category.amount)}
            </Typography>
          </Box>
          <Box
            sx={{
              height: breakdownBarHeight,
              borderRadius: `${breakdownBarRadius}px`,
              bgcolor: hcpColors.chartSpendingTrack,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${(category.amount / maxAmount) * 100}%`,
                bgcolor: category.color,
                borderRadius: `${breakdownBarRadius}px`,
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
    <ChartCardShell title="Spending breakdown" bodySx={hcpChartCardBodySx}>
      <SpendingBreakdownChart timeRange={timeRange} />
    </ChartCardShell>
  );
}
