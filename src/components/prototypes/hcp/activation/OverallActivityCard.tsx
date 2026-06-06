"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { ActivityTimeRangeMenu } from "./ActivityTimeRangeMenu";
import {
  CHART_HEIGHT,
  ChartCardShell,
  chartCardFigureSx,
  chartPlotBottomMargin,
  chartSx,
  formatAxisValue,
  visuallyHiddenSx,
} from "./activityChartShared";
import {
  getFilteredActivityData,
  getTimeRangeLabel,
  type ActivityTimeRange,
} from "./activityTimeRange";
import { hcpActivityChartCardBodySx, hcpColors, hcpContentSpacing, hcpLayout } from "../hcpTheme";

const activityChartSummary =
  "Grouped bar chart of monthly deposits and spending for a small home service business with about eight employees.";

const activityLegendItems = [
  { label: "Deposits", color: hcpColors.chartDeposit },
  { label: "Spending", color: hcpColors.chartSpending },
] as const;

function ActivityChartLegend() {
  return (
    <Box
      component="ul"
      aria-hidden
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
        listStyle: "none",
        m: 0,
        p: 0,
        mb: `${hcpContentSpacing.chartLegendGap}px`,
      }}
    >
      {activityLegendItems.map((item) => (
        <Box
          component="li"
          key={item.label}
          sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
        >
          <Box
            aria-hidden
            sx={{
              width: 12,
              height: 12,
              borderRadius: `${hcpLayout.controlRadius}px`,
              bgcolor: item.color,
              flexShrink: 0,
            }}
          />
          <Typography variant="body2" sx={{ fontSize: 12, color: hcpColors.textPrimary }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function OverallActivityChart({ timeRange }: { timeRange: ActivityTimeRange }) {
  const { months, deposits, spending } = getFilteredActivityData(timeRange);
  const rangeLabel = getTimeRangeLabel(timeRange);

  return (
    <Box
      component="figure"
      aria-labelledby="overall-activity-chart-title overall-activity-chart-desc"
      sx={chartCardFigureSx}
    >
      <Typography id="overall-activity-chart-title" component="figcaption" sx={visuallyHiddenSx}>
        Activity by month
      </Typography>
      <Typography id="overall-activity-chart-desc" component="p" sx={visuallyHiddenSx}>
        {activityChartSummary} Time range: {rangeLabel}. Showing {months.length} month
        {months.length === 1 ? "" : "s"}.
      </Typography>
      <ActivityChartLegend />
      <BarChart
        height={CHART_HEIGHT}
        skipAnimation
        margin={{ left: 0, right: 0, top: 8, bottom: chartPlotBottomMargin }}
        xAxis={[
          {
            scaleType: "band",
            data: months,
            position: "bottom",
            height: "auto",
            tickPlacement: "extremities",
            tickLabelPlacement: "middle",
            tickInterval: months,
            tickLabelInterval: () => true,
            tickSize: 8,
            categoryGapRatio: 0.28,
            barGapRatio: 0.2,
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
            data: deposits,
            label: "Deposits",
            color: hcpColors.chartDeposit,
          },
          {
            id: "spending",
            data: spending,
            label: "Spending",
            color: hcpColors.chartSpending,
          },
        ]}
        grid={{ horizontal: true, vertical: false }}
        borderRadius={hcpLayout.controlRadius}
        sx={chartSx}
      />
    </Box>
  );
}

export function OverallActivityCard({
  timeRange,
  onTimeRangeChange,
}: {
  timeRange: ActivityTimeRange;
  onTimeRangeChange: (next: ActivityTimeRange) => void;
}) {
  return (
    <ChartCardShell
      title="Activity"
      headerAside={<ActivityTimeRangeMenu timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />}
      bodySx={hcpActivityChartCardBodySx}
    >
      <OverallActivityChart timeRange={timeRange} />
    </ChartCardShell>
  );
}
