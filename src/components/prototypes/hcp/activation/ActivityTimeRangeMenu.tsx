"use client";

import { CaretDown } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { months } from "./activityChartShared";
import {
  ACTIVITY_TIME_PRESETS,
  createCustomTimeRange,
  getTimeRangeLabel,
  getTimeRangeShortLabel,
  isCustomSelected,
  isPresetSelected,
  type ActivityTimeRange,
} from "./activityTimeRange";
import { hcpChromeActionButtonSx, hcpColors, hcpFontWeight, hcpIcon, hcpLayout } from "../hcpTheme";

export function ActivityTimeRangeMenu({
  timeRange,
  onTimeRangeChange,
}: {
  timeRange: ActivityTimeRange;
  onTimeRangeChange: (next: ActivityTimeRange) => void;
}) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [triggerEl, setTriggerEl] = useState<null | HTMLElement>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customStart, setCustomStart] = useState(0);
  const [customEnd, setCustomEnd] = useState(months.length - 1);

  const menuOpen = Boolean(menuAnchor);
  const shortLabel = getTimeRangeShortLabel(timeRange);
  const accessibleLabel = getTimeRangeLabel(timeRange);

  const openCustomRange = () => {
    if (timeRange.kind === "custom") {
      setCustomStart(timeRange.startIndex);
      setCustomEnd(timeRange.endIndex);
    } else {
      setCustomStart(0);
      setCustomEnd(months.length - 1);
    }
    setMenuAnchor(null);
    setCustomOpen(true);
  };

  const applyCustomRange = () => {
    onTimeRangeChange(createCustomTimeRange(customStart, customEnd));
    setCustomOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        aria-haspopup="listbox"
        aria-expanded={menuOpen || customOpen ? "true" : undefined}
        aria-controls={menuOpen ? "overall-activity-time-range-menu" : undefined}
        aria-label={`Activity time range, ${accessibleLabel}`}
        onClick={(event) => {
          setTriggerEl(event.currentTarget);
          setMenuAnchor(event.currentTarget);
        }}
        endIcon={<CaretDown size={hcpIcon.sm} weight="regular" />}
        sx={hcpChromeActionButtonSx}
      >
        {shortLabel}
      </Button>

      <Menu
        id="overall-activity-time-range-menu"
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              minWidth: 188,
              border: `1px solid ${hcpColors.border}`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            },
          },
        }}
      >
        {ACTIVITY_TIME_PRESETS.map((preset) => (
          <MenuItem
            key={preset}
            selected={isPresetSelected(timeRange, preset)}
            onClick={() => {
              onTimeRangeChange({ kind: "preset", preset });
              setMenuAnchor(null);
            }}
            sx={{ py: 1 }}
          >
            <Typography variant="body2">{preset}</Typography>
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          selected={isCustomSelected(timeRange)}
          onClick={() => openCustomRange()}
          sx={{ py: 1 }}
        >
          <Typography variant="body2">Custom range…</Typography>
        </MenuItem>
      </Menu>

      <Popover
        open={customOpen}
        anchorEl={triggerEl}
        onClose={() => setCustomOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              p: 2,
              width: 280,
              border: `1px solid ${hcpColors.border}`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            },
          },
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold, mb: 1.5 }}>
          Custom range
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
          Demo data available Apr–Sep.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="custom-range-start-label">From</InputLabel>
            <Select
              labelId="custom-range-start-label"
              label="From"
              value={customStart}
              onChange={(event) => {
                const nextStart = Number(event.target.value);
                setCustomStart(nextStart);
                if (customEnd < nextStart) {
                  setCustomEnd(nextStart);
                }
              }}
              sx={{ borderRadius: `${hcpLayout.controlRadius}px` }}
            >
              {months.map((month, index) => (
                <MenuItem key={month} value={index}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel id="custom-range-end-label">To</InputLabel>
            <Select
              labelId="custom-range-end-label"
              label="To"
              value={customEnd}
              onChange={(event) => setCustomEnd(Number(event.target.value))}
              sx={{ borderRadius: `${hcpLayout.controlRadius}px` }}
            >
              {months.map((month, index) => (
                <MenuItem key={month} value={index} disabled={index < customStart}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, pt: 0.5 }}>
            <Button size="small" onClick={() => setCustomOpen(false)}>
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={applyCustomRange}>
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
