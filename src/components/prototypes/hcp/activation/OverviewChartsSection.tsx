"use client";

import { CaretDown } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { OverallActivityCard } from "./OverallActivityCard";
import { SpendingBreakdownCard } from "./SpendingBreakdownCard";
import { TIME_RANGES, type ActivityTimeRange } from "./activityChartShared";
import {
  hcpColors,
  hcpContentBlockStackSx,
  hcpContentHeaderSx,
  hcpFontWeight,
  hcpIcon,
} from "../hcpTheme";

function ActivityTimeRangeMenu({
  timeRange,
  onTimeRangeChange,
}: {
  timeRange: ActivityTimeRange;
  onTimeRangeChange: (next: ActivityTimeRange) => void;
}) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  return (
    <>
      <Button
        variant="text"
        size="small"
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "overview-time-range-menu" : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
        endIcon={<CaretDown size={hcpIcon.sm} color={hcpColors.textMuted} />}
        sx={{
          minWidth: 0,
          px: 0.5,
          py: 0.25,
          color: hcpColors.textSecondary,
          fontWeight: hcpFontWeight.regular,
          typography: "body2",
          "&:hover": { bgcolor: "transparent", color: hcpColors.textPrimary },
        }}
      >
        {timeRange}
      </Button>
      <Menu
        id="overview-time-range-menu"
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              minWidth: 168,
              border: `1px solid ${hcpColors.border}`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            },
          },
        }}
      >
        {TIME_RANGES.map((range) => (
          <MenuItem
            key={range}
            selected={range === timeRange}
            onClick={() => {
              onTimeRangeChange(range);
              setAnchor(null);
            }}
            sx={{ py: 1 }}
          >
            <Typography variant="body2">{range}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export function OverviewChartsSection() {
  const [timeRange, setTimeRange] = useState<ActivityTimeRange>("Past 6 months");

  return (
    <Box
      sx={{
        ...hcpContentHeaderSx,
        ...hcpContentBlockStackSx,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", flexShrink: 0 }}>
        <ActivityTimeRangeMenu timeRange={timeRange} onTimeRangeChange={setTimeRange} />
      </Box>

      <OverallActivityCard timeRange={timeRange} />
      <SpendingBreakdownCard timeRange={timeRange} />
    </Box>
  );
}
