"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { type ReactNode } from "react";
import { hcpColors, hcpFontWeight, hcpLayout, hcpRadius } from "./hcpTheme";

export type HcpSegmentOption<T extends string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
};

type HcpSegmentControlProps<T extends string> = {
  value: T;
  options: HcpSegmentOption<T>[];
  onChange: (value: T) => void;
  "aria-label": string;
};

/** In-card mode switch — muted track, white selected segment (Mobbin-style) */
export const hcpSegmentControlGroupSx = {
  borderRadius: hcpRadius.control,
  bgcolor: hcpColors.segmentTrack,
  p: 0.25,
  gap: 0.25,
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,
    borderRadius: `${hcpLayout.controlRadius - 2}px !important`,
    mx: 0,
  },
} as const;

export const hcpSegmentControlButtonSx = {
  textTransform: "none",
  fontWeight: hcpFontWeight.regular,
  fontSize: "0.75rem",
  lineHeight: 1.33,
  color: hcpColors.textSecondary,
  px: 1.25,
  py: 0.5,
  minHeight: 28,
  border: "none",
  boxShadow: "none",
  "&.Mui-selected": {
    bgcolor: hcpColors.paper,
    color: hcpColors.textPrimary,
    fontWeight: hcpFontWeight.semibold,
    boxShadow: "0 1px 2px rgba(33, 33, 33, 0.08)",
    "&:hover": {
      bgcolor: hcpColors.paper,
    },
  },
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, 0.45)",
  },
  "&.Mui-disabled": {
    color: hcpColors.textDisabled,
  },
} as const;

export function HcpSegmentControl<T extends string>({
  value,
  options,
  onChange,
  "aria-label": ariaLabel,
}: HcpSegmentControlProps<T>) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      aria-label={ariaLabel}
      onChange={(_event, next: T | null) => {
        if (next) {
          onChange(next);
        }
      }}
      sx={hcpSegmentControlGroupSx}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          aria-label={option["aria-label"]}
          sx={hcpSegmentControlButtonSx}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
