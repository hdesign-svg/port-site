"use client";

import { CaretDown } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useRef, useState } from "react";
import {
  hcpColors,
  hcpContentCardInsetSx,
  hcpContentSpacing,
  hcpFontWeight,
  hcpIcon,
  hcpLayout,
  hcpSpacing,
} from "../hcpTheme";

type ActivityView = "overall" | "breakdown";

const TIME_RANGES = ["Past 6 months", "Past 3 months", "Year to date"] as const;

const CHART_HEIGHT = 320;

const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"] as const;

/**
 * ~8-person home service shop — modest market, not a $1M+/mo operation.
 * Deposits ≈ customer payments in; spending ≈ payroll-heavy opex (~$48–58K/mo).
 */
const deposits = [68_200, 58_400, 62_100, 74_800, 61_200, 52_600];
const spending = [54_800, 51_200, 53_600, 57_400, 49_100, 47_800];

/** Past 6 months spend mix (~$314K out) */
const spendingCategories = [
  { label: "Payroll & labor", amount: 168_000, color: hcpColors.chartSpending },
  { label: "Materials & supplies", amount: 72_000, color: hcpColors.primaryDark },
  { label: "Subcontractors", amount: 28_000, color: hcpColors.chartDeposit },
  { label: "Fuel & fleet", amount: 18_000, color: hcpColors.textMuted },
  { label: "Software & fees", amount: 8_000, color: hcpColors.borderInput },
  { label: "Other", amount: 20_000, color: hcpColors.avatar },
] as const;

const chartSx = {
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

function formatAxisValue(value: number | null) {
  if (value == null) return "";
  if (value === 0) return "$0";
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function ActivityChartControls({
  view,
  timeRange,
  onViewChange,
  onTimeRangeChange,
}: {
  view: ActivityView;
  timeRange: (typeof TIME_RANGES)[number];
  onViewChange: (next: ActivityView) => void;
  onTimeRangeChange: (event: SelectChangeEvent) => void;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={view}
        onChange={(_, next) => {
          if (next) onViewChange(next);
        }}
        aria-label="Activity view"
      >
        <ToggleButton value="overall">Overall activity</ToggleButton>
        <ToggleButton value="breakdown">Spending breakdown</ToggleButton>
      </ToggleButtonGroup>

      <Select
        value={timeRange}
        onChange={onTimeRangeChange}
        size="small"
        variant="outlined"
        inputProps={{ "aria-label": "Activity time range" }}
        IconComponent={(props) => <CaretDown {...props} size={hcpIcon.sm} />}
        sx={{
          minWidth: 132,
          height: 32,
          bgcolor: hcpColors.paper,
          borderRadius: `${hcpLayout.controlRadius}px`,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: hcpColors.borderControl,
          },
          "& .MuiSelect-select": {
            py: 0.5,
            pl: 1.25,
            pr: "28px !important",
            typography: "body2",
            color: hcpColors.textSecondary,
          },
          "& .MuiSelect-icon": {
            color: hcpColors.textMuted,
            right: 6,
          },
        }}
      >
        {TIME_RANGES.map((range) => (
          <MenuItem key={range} value={range}>
            <Typography variant="body2">{range}</Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

const activityChartSummary =
  "Grouped bar chart of monthly deposits and spending from April through September for a small home service business with about eight employees. Deposits range from roughly 53 to 75 thousand dollars per month; spending from roughly 48 to 57 thousand. July has the highest deposits and spending.";

function useChartPlotHeight(minHeight: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateHeight = () => {
      setHeight(Math.max(minHeight, Math.floor(node.clientHeight)));
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [minHeight]);

  return { containerRef, height };
}

const visuallyHiddenSx = {
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

function OverallActivityChart() {
  const { containerRef, height } = useChartPlotHeight(CHART_HEIGHT);

  return (
    <Box
      ref={containerRef}
      component="figure"
      aria-labelledby="overall-activity-chart-title overall-activity-chart-desc"
      sx={{
        position: "relative",
        m: 0,
        flex: 1,
        minHeight: CHART_HEIGHT,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography id="overall-activity-chart-title" component="figcaption" sx={visuallyHiddenSx}>
        Overall activity by month
      </Typography>
      <Typography id="overall-activity-chart-desc" component="p" sx={visuallyHiddenSx}>
        {activityChartSummary}
      </Typography>
      <BarChart
        height={height}
        skipAnimation
        margin={{ left: 8, right: 12, top: 32, bottom: 40 }}
        xAxis={[
          {
            scaleType: "band",
            data: [...months],
            position: "bottom",
            height: "auto",
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
            tickInterval: [...months],
            tickLabelInterval: () => true,
            tickSize: 8,
            categoryGapRatio: 0.35,
            barGapRatio: 0.12,
            tickLabelStyle: {
              fontSize: 12,
              fill: hcpColors.chartTickLabel,
            },
          },
        ]}
        yAxis={[
          {
            width: "auto",
            tickSize: 8,
            valueFormatter: formatAxisValue,
            tickLabelStyle: {
              fontSize: 12,
              fill: hcpColors.chartTickLabel,
            },
          },
        ]}
        series={[
          {
            id: "deposits",
            data: [...deposits],
            label: "Deposits",
            color: hcpColors.chartDeposit,
          },
          {
            id: "spending",
            data: [...spending],
            label: "Spending",
            color: hcpColors.chartSpending,
          },
        ]}
        grid={{ horizontal: true, vertical: false }}
        borderRadius={hcpLayout.controlRadius / 2}
        slotProps={{
          legend: {
            direction: "horizontal",
            position: { vertical: "top", horizontal: "start" },
          },
        }}
        sx={{ ...chartSx, flex: 1, minHeight: 0 }}
      />
    </Box>
  );
}

function SpendingBreakdownChart() {
  const maxAmount = Math.max(...spendingCategories.map((item) => item.amount));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 1,
        flex: 1,
        minHeight: CHART_HEIGHT,
      }}
    >
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
              borderRadius: `${hcpLayout.controlRadius / 2}px`,
              bgcolor: hcpColors.surfaceMuted,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${(category.amount / maxAmount) * 100}%`,
                bgcolor: category.color,
                borderRadius: `${hcpLayout.controlRadius / 2}px`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function OverallActivityCard() {
  const [view, setView] = useState<ActivityView>("overall");
  const [timeRange, setTimeRange] = useState<(typeof TIME_RANGES)[number]>("Past 6 months");

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        minHeight: 0,
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
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
          ...hcpContentCardInsetSx,
          py: `${hcpContentSpacing.cardHeaderPy}px`,
          borderBottom: `1px solid ${hcpColors.borderSubtle}`,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: hcpFontWeight.semibold, pt: 0.25 }}>
          Overall activity
        </Typography>

        <ActivityChartControls
          view={view}
          timeRange={timeRange}
          onViewChange={setView}
          onTimeRangeChange={(event) => setTimeRange(event.target.value as (typeof TIME_RANGES)[number])}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          ...hcpContentCardInsetSx,
          pt: `${hcpSpacing.xs}px`,
          pb: `${hcpContentSpacing.inset}px`,
        }}
      >
        {view === "overall" ? <OverallActivityChart /> : <SpendingBreakdownChart />}
      </Box>
    </Box>
  );
}
