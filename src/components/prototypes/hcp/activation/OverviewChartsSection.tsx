"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useMemo, useState } from "react";
import { HcpAnalyticsView, HcpChartPanel, HcpDataContainer } from "../analytics";
import { ActivityTimeRangeMenu } from "./ActivityTimeRangeMenu";
import {
  CHART_HEIGHT,
  chartCardFigureSx,
  chartPlotBottomMargin,
  chartSx,
  formatAxisValue,
  formatCurrency,
  visuallyHiddenSx,
} from "./activityChartShared";
import {
  DEFAULT_TIME_RANGE,
  getFilteredActivityData,
  getFilteredSpendingCategories,
  getTimeRangeLabel,
  type ActivityTimeRange,
} from "./activityTimeRange";
import { hcpColors, hcpContentSpacing, hcpLayout } from "../hcpTheme";

const OVERVIEW_LENSES = ["spending", "deposits", "netFlow"] as const;
type OverviewLens = (typeof OVERVIEW_LENSES)[number];

const LENS_COLORS: Record<OverviewLens, string> = {
  spending: hcpColors.chartSpending,
  deposits: hcpColors.chartDeposit,
  netFlow: hcpColors.primary,
};

function SingleSeriesBarChart({
  months,
  data,
  color,
}: {
  months: string[];
  data: number[];
  color: string;
}) {
  return (
    <BarChart
      height={CHART_HEIGHT}
      skipAnimation
      margin={{ left: 0, right: 0, top: 8, bottom: chartPlotBottomMargin }}
      xAxis={[
        {
          scaleType: "band",
          data: months,
          tickLabelStyle: { fontSize: 12, fill: hcpColors.chartTickLabel },
        },
      ]}
      yAxis={[
        {
          width: "auto",
          valueFormatter: formatAxisValue,
          tickLabelStyle: { fontSize: 12, fill: hcpColors.chartTickLabel },
        },
      ]}
      series={[{ id: "series", data, color }]}
      grid={{ horizontal: true, vertical: false }}
      borderRadius={hcpLayout.controlRadius}
      sx={chartSx}
    />
  );
}

function NetFlowLineChart({ months, deposits, spending }: { months: string[]; deposits: number[]; spending: number[] }) {
  const netFlow = deposits.map((deposit, index) => deposit - spending[index]);

  return (
    <LineChart
      height={CHART_HEIGHT}
      skipAnimation
      margin={{ left: 0, right: 0, top: 8, bottom: chartPlotBottomMargin }}
      xAxis={[
        {
          scaleType: "point",
          data: months,
          tickLabelStyle: { fontSize: 12, fill: hcpColors.chartTickLabel },
        },
      ]}
      yAxis={[
        {
          width: "auto",
          valueFormatter: formatAxisValue,
          tickLabelStyle: { fontSize: 12, fill: hcpColors.chartTickLabel },
        },
      ]}
      series={[
        {
          id: "netFlow",
          data: netFlow,
          color: hcpColors.primary,
          showMark: false,
          curve: "linear",
        },
      ]}
      grid={{ horizontal: true, vertical: false }}
      sx={chartSx}
    />
  );
}

function OverviewChartBody({ lens, timeRange }: { lens: OverviewLens; timeRange: ActivityTimeRange }) {
  const { months, deposits, spending } = getFilteredActivityData(timeRange);
  const rangeLabel = getTimeRangeLabel(timeRange);
  const chartLabel =
    lens === "spending" ? "Monthly spending" : lens === "deposits" ? "Monthly deposits" : "Net cash flow";

  return (
    <Box
      component="figure"
      aria-labelledby="overview-chart-title overview-chart-desc"
      sx={chartCardFigureSx}
    >
      <Typography id="overview-chart-title" component="figcaption" sx={visuallyHiddenSx}>
        {chartLabel}
      </Typography>
      <Typography id="overview-chart-desc" component="p" sx={visuallyHiddenSx}>
        {chartLabel}. Time range: {rangeLabel}.
      </Typography>
      {lens === "spending" ? (
        <SingleSeriesBarChart months={months} data={spending} color={LENS_COLORS.spending} />
      ) : null}
      {lens === "deposits" ? (
        <SingleSeriesBarChart months={months} data={deposits} color={LENS_COLORS.deposits} />
      ) : null}
      {lens === "netFlow" ? (
        <NetFlowLineChart months={months} deposits={deposits} spending={spending} />
      ) : null}
    </Box>
  );
}

function SpendBreakdownBody({ timeRange }: { timeRange: ActivityTimeRange }) {
  const categories = getFilteredSpendingCategories(timeRange);
  const maxAmount = Math.max(...categories.map((category) => category.amount), 1);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {categories.map((category) => (
        <Box key={category.label}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {category.label}
            </Typography>
            <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
              {formatCurrency(category.amount)}
            </Typography>
          </Box>
          <Box
            sx={{
              height: 28,
              borderRadius: 1,
              bgcolor: hcpColors.chartSpendingTrack,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${(category.amount / maxAmount) * 100}%`,
                bgcolor: category.color,
                borderRadius: 1,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function OverviewChartsSection() {
  const [timeRange, setTimeRange] = useState<ActivityTimeRange>(DEFAULT_TIME_RANGE);
  const [lens, setLens] = useState<OverviewLens>("spending");

  const activityData = useMemo(() => getFilteredActivityData(timeRange), [timeRange]);
  const totalSpending = useMemo(
    () => activityData.spending.reduce((sum, value) => sum + value, 0),
    [activityData.spending],
  );
  const totalDeposits = useMemo(
    () => activityData.deposits.reduce((sum, value) => sum + value, 0),
    [activityData.deposits],
  );
  const netFlow = totalDeposits - totalSpending;

  const stripItems = useMemo(
    () => [
      { value: "spending" as const, label: "Spending", metric: formatCurrency(totalSpending) },
      { value: "deposits" as const, label: "Deposits", metric: formatCurrency(totalDeposits) },
      { value: "netFlow" as const, label: "Net flow", metric: formatCurrency(netFlow) },
    ],
    [netFlow, totalDeposits, totalSpending],
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: `${hcpContentSpacing.blockGap}px` }}>
      <HcpAnalyticsView
        leading={
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Account overview
          </Typography>
        }
        actions={<ActivityTimeRangeMenu timeRange={timeRange} onTimeRangeChange={setTimeRange} />}
      >
        <HcpChartPanel
          value={lens}
          items={stripItems}
          onChange={setLens}
          stripAriaLabel="Activity metrics"
        >
          <OverviewChartBody lens={lens} timeRange={timeRange} />
        </HcpChartPanel>
      </HcpAnalyticsView>

      <HcpAnalyticsView
        leading={
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Spend by category
          </Typography>
        }
        actions={<ActivityTimeRangeMenu timeRange={timeRange} onTimeRangeChange={setTimeRange} />}
      >
        <HcpDataContainer
          sx={{
            px: `${hcpContentSpacing.surfaceInsetX}px`,
            py: `${hcpContentSpacing.surfaceInsetY}px`,
          }}
        >
          <SpendBreakdownBody timeRange={timeRange} />
        </HcpDataContainer>
      </HcpAnalyticsView>
    </Box>
  );
}
