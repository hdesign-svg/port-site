"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type SxProps, type Theme } from "@mui/material/styles";
import { type ReactNode } from "react";
import {
  hcpColors,
  hcpChartCardBodySx,
  hcpChartCardHeaderSx,
  hcpContentSpacing,
  hcpFontWeight,
  hcpLayout,
} from "../hcpTheme";

export const CHART_HEIGHT = 320;

/** Shared figure wrapper — matches rhythm across chart cards */
export const chartCardFigureSx = {
  position: "relative",
  m: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
} as const;

export const chartPlotBottomMargin = hcpContentSpacing.chartPlotBottom;

export const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"] as const;

/** ~8-person home service shop — deposits vs payroll-heavy spend (~$48–58K/mo out) */
export const deposits = [68_200, 58_400, 62_100, 74_800, 61_200, 52_600];
export const spending = [54_800, 51_200, 53_600, 57_400, 49_100, 47_800];

/** Spending breakdown — tints of chartSpending (money out), darkest = largest category */
const spendingCategoryBlueShades = [
  hcpColors.chartSpending,
  "rgba(43, 108, 184, 0.88)",
  "rgba(43, 108, 184, 0.72)",
  "rgba(43, 108, 184, 0.58)",
  "rgba(43, 108, 184, 0.44)",
  "rgba(43, 108, 184, 0.32)",
] as const;

/** Past 6 months spend mix (~$314K out) */
export const spendingCategories = [
  { label: "Payroll & labor", amount: 168_000, color: spendingCategoryBlueShades[0] },
  { label: "Materials & supplies", amount: 72_000, color: spendingCategoryBlueShades[1] },
  { label: "Subcontractors", amount: 28_000, color: spendingCategoryBlueShades[2] },
  { label: "Fuel & fleet", amount: 18_000, color: spendingCategoryBlueShades[3] },
  { label: "Software & fees", amount: 8_000, color: spendingCategoryBlueShades[4] },
  { label: "Other", amount: 20_000, color: spendingCategoryBlueShades[5] },
] as const;

export const chartSx = {
  width: "100%",
  "& .MuiChartsLegend-root": {
    display: "none",
  },
  "& .MuiChartsAxis-root": {
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
  },
  "& .MuiChartsGrid-horizontalLine": {
    stroke: hcpColors.chartGrid,
    strokeDasharray: "5 5",
  },
  "& .MuiChartsGrid-verticalLine": {
    display: "none",
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
  bodySx,
}: {
  title: string;
  children: ReactNode;
  headerAside?: ReactNode;
  bodySx?: SxProps<Theme>;
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
          ...hcpChartCardHeaderSx,
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
          ...(bodySx ?? hcpChartCardBodySx),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
