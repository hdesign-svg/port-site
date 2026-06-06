"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type ReactNode } from "react";
import {
  hcpColors,
  hcpContentCardInsetSx,
  hcpContentSpacing,
  hcpFontWeight,
  hcpLayout,
  hcpSpacing,
} from "../hcpTheme";

export const TIME_RANGES = ["Past 6 months", "Past 3 months", "Year to date"] as const;
export type ActivityTimeRange = (typeof TIME_RANGES)[number];

export const CHART_HEIGHT = 320;

export const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"] as const;

/** ~8-person home service shop — deposits vs payroll-heavy spend (~$48–58K/mo out) */
export const deposits = [68_200, 58_400, 62_100, 74_800, 61_200, 52_600];
export const spending = [54_800, 51_200, 53_600, 57_400, 49_100, 47_800];

/** Past 6 months spend mix (~$314K out) */
export const spendingCategories = [
  { label: "Payroll & labor", amount: 168_000, color: hcpColors.chartSpending },
  { label: "Materials & supplies", amount: 72_000, color: hcpColors.primaryDark },
  { label: "Subcontractors", amount: 28_000, color: hcpColors.chartDeposit },
  { label: "Fuel & fleet", amount: 18_000, color: hcpColors.textMuted },
  { label: "Software & fees", amount: 8_000, color: hcpColors.borderInput },
  { label: "Other", amount: 20_000, color: hcpColors.avatar },
] as const;

export const chartSx = {
  width: "100%",
  "& .MuiChartsLegend-label": {
    fontSize: 12,
    fill: hcpColors.textPrimary,
    fontFamily: "inherit",
  },
  "& .MuiChartsGrid-horizontalLine": {
    stroke: hcpColors.chartGrid,
    strokeDasharray: "5 5",
  },
  "& .MuiChartsGrid-verticalLine": {
    display: "none",
  },
  "& .MuiChartsAxis-line": {
    stroke: hcpColors.chartAxis,
    strokeWidth: 1,
  },
  "& .MuiChartsAxis-tick": {
    stroke: hcpColors.chartAxis,
    strokeWidth: 1,
  },
  "& .MuiChartsAxis-tickLabel": {
    fontFamily: "inherit",
    fill: hcpColors.chartTickLabel,
  },
  "& .MuiBarElement-root": {
    transition: "none !important",
  },
} as const;

export const visuallyHiddenSx = {
  position: "absolute",
  width: 1,
  height: 1,
  p: 0,
  m: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

export function formatAxisValue(value: number | null) {
  if (value == null) return "";
  if (value === 0) return "$0";
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ChartCardShell({
  title,
  children,
  headerAside,
}: {
  title: string;
  children: ReactNode;
  headerAside?: ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: hcpColors.paper,
        border: `1px solid ${hcpColors.border}`,
        borderRadius: `${hcpLayout.controlRadius}px`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          ...hcpContentCardInsetSx,
          py: `${hcpContentSpacing.cardHeaderPy}px`,
          borderBottom: `1px solid ${hcpColors.borderSubtle}`,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: hcpFontWeight.semibold }}>
          {title}
        </Typography>
        {headerAside}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ...hcpContentCardInsetSx,
          pt: `${hcpSpacing.xs}px`,
          pb: `${hcpContentSpacing.inset}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
