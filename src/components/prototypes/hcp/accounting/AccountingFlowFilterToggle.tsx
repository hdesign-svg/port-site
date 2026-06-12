"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { AccountingFlowFilter } from "./accountingTabs";
import { hcpColors, hcpFontWeight, hcpRadius } from "../hcpTheme";

const FLOW_FILTERS: { id: AccountingFlowFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "out", label: "Money Out" },
  { id: "in", label: "Money In" },
];

type AccountingFlowFilterToggleProps = {
  value: AccountingFlowFilter;
  onChange: (value: AccountingFlowFilter) => void;
};

export function AccountingFlowFilterToggle({ value, onChange }: AccountingFlowFilterToggleProps) {
  return (
    <Box
      role="group"
      aria-label="Filter by money flow"
      sx={{
        display: "inline-flex",
        p: 0.25,
        bgcolor: hcpColors.surfaceMuted,
        borderRadius: hcpRadius.control,
        flexShrink: 0,
      }}
    >
      {FLOW_FILTERS.map(({ id, label }) => {
        const isActive = value === id;

        return (
          <Box
            key={id}
            component="button"
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            sx={{
              border: "none",
              cursor: "pointer",
              font: "inherit",
              px: 1.25,
              py: 0.625,
              borderRadius: `${Number.parseInt(hcpRadius.control, 10) - 2}px`,
              bgcolor: isActive ? hcpColors.textPrimary : "transparent",
              color: isActive ? hcpColors.paper : hcpColors.textSecondary,
              fontSize: "0.875rem",
              fontWeight: isActive ? hcpFontWeight.semibold : hcpFontWeight.regular,
              lineHeight: 1.43,
              transition: "background-color 150ms ease, color 150ms ease",
            }}
          >
            {label}
          </Box>
        );
      })}
    </Box>
  );
}
