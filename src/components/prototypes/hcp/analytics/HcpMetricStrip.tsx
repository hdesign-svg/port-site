"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type ReactNode } from "react";
import { hcpColors, hcpFontWeight } from "../hcpTheme";

export type HcpMetricStripItem<T extends string> = {
  value: T;
  label: string;
  metric: ReactNode;
};

type HcpMetricStripProps<T extends string> = {
  value: T;
  items: HcpMetricStripItem<T>[];
  onChange: (value: T) => void;
  "aria-label": string;
};

/** Minimal scorecard row — label + value, active top bar. Attached to chart container top. */
export function HcpMetricStrip<T extends string>({
  value,
  items,
  onChange,
  "aria-label": ariaLabel,
}: HcpMetricStripProps<T>) {
  return (
    <Box
      role="tablist"
      aria-label={ariaLabel}
      sx={{
        display: "flex",
        width: "100%",
        borderBottom: `1px solid ${hcpColors.borderSubtle}`,
      }}
    >
      {items.map((item, index) => {
        const isActive = item.value === value;

        return (
          <Box
            key={item.value}
            component="button"
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onChange(item.value);
              }
            }}
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0.25,
              px: 2.5,
              py: 1.5,
              border: "none",
              borderRight: index < items.length - 1 ? `1px solid ${hcpColors.borderSubtle}` : undefined,
              borderTop: isActive ? `3px solid ${hcpColors.primary}` : "3px solid transparent",
              bgcolor: hcpColors.paper,
              cursor: "pointer",
              font: "inherit",
              textAlign: "left",
              "&:focus-visible": {
                outline: `2px solid ${hcpColors.primary}`,
                outlineOffset: -2,
              },
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.33 }}>
              {item.label}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: hcpFontWeight.semibold,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1.25,
                color: hcpColors.textPrimary,
              }}
            >
              {item.metric}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
