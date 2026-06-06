"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import type { ActivityTimeRange } from "./activityChartShared";
import {
  CHART_HEIGHT,
  ChartCardShell,
  chartSx,
  deposits,
  formatAxisValue,
  months,
  spending,
  visuallyHiddenSx,
} from "./activityChartShared";
import { hcpColors, hcpLayout } from "../hcpTheme";

const activityChartSummary =
  "Grouped bar chart of monthly deposits and spending from April through September for a small home service business with about eight employees. Deposits range from roughly 53 to 75 thousand dollars per month; spending from roughly 48 to 57 thousand. July has the highest deposits and spending.";

function OverallActivityChart({ timeRange }: { timeRange: ActivityTimeRange }) {
  return (
    <Box
      component="figure"
      aria-labelledby="overall-activity-chart-title overall-activity-chart-desc"
      sx={{
        position: "relative",
        m: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography id="overall-activity-chart-title" component="figcaption" sx={visuallyHiddenSx}>
        Overall activity by month
      </Typography>
      <Typography id="overall-activity-chart-desc" component="p" sx={visuallyHiddenSx}>
        {activityChartSummary} Time range: {timeRange}.
      </Typography>
      <BarChart
        height={CHART_HEIGHT}
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
        borderRadius={hcpLayout.controlRadius}
        slotProps={{
          legend: {
            direction: "horizontal",
            position: { vertical: "top", horizontal: "start" },
          },
        }}
        sx={chartSx}
      />
    </Box>
  );
}

export function OverallActivityCard({ timeRange }: { timeRange: ActivityTimeRange }) {
  return (
    <ChartCardShell title="Overall activity">
      <OverallActivityChart timeRange={timeRange} />
    </ChartCardShell>
  );
}
