"use client";

import Box from "@mui/material/Box";
import { useState } from "react";
import { OverallActivityCard } from "./OverallActivityCard";
import { SpendingBreakdownCard } from "./SpendingBreakdownCard";
import { DEFAULT_TIME_RANGE, type ActivityTimeRange } from "./activityTimeRange";
import { hcpContentBlockStackSx } from "../hcpTheme";

export function OverviewChartsSection() {
  const [timeRange, setTimeRange] = useState<ActivityTimeRange>(DEFAULT_TIME_RANGE);

  return (
    <Box sx={hcpContentBlockStackSx}>
      <OverallActivityCard timeRange={timeRange} onTimeRangeChange={setTimeRange} />
      <SpendingBreakdownCard timeRange={timeRange} />
    </Box>
  );
}
