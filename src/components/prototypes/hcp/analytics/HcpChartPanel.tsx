"use client";

import Box from "@mui/material/Box";
import { type ReactNode } from "react";
import { hcpContentSpacing } from "../hcpTheme";
import { HcpDataContainer } from "./HcpDataContainer";
import { HcpMetricStrip, type HcpMetricStripItem } from "./HcpMetricStrip";

type HcpChartPanelProps<T extends string> = {
  value: T;
  items: HcpMetricStripItem<T>[];
  onChange: (value: T) => void;
  stripAriaLabel: string;
  children: ReactNode;
};

/** Metric strip + chart in one container (X Video / Overview pattern). */
export function HcpChartPanel<T extends string>({
  value,
  items,
  onChange,
  stripAriaLabel,
  children,
}: HcpChartPanelProps<T>) {
  return (
    <HcpDataContainer>
      <HcpMetricStrip
        value={value}
        items={items}
        onChange={onChange}
        aria-label={stripAriaLabel}
      />
      <Box
        sx={{
          px: `${hcpContentSpacing.surfaceInsetX}px`,
          py: `${hcpContentSpacing.surfaceInsetY}px`,
        }}
      >
        {children}
      </Box>
    </HcpDataContainer>
  );
}
