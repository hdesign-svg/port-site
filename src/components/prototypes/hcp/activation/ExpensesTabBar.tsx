"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { EXPENSES_TABS, type ExpensesTab } from "./expensesTabs";
import { hcpColors, hcpFontWeight, hcpLayout } from "../hcpTheme";

type ExpensesTabBarProps = {
  activeTab: ExpensesTab;
  onTabChange: (tab: ExpensesTab) => void;
};

export function ExpensesTabBar({ activeTab, onTabChange }: ExpensesTabBarProps) {
  const [hoveredTab, setHoveredTab] = useState<ExpensesTab | null>(null);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        role="tablist"
        aria-label="Expenses views"
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: `${hcpLayout.tabLabelGap}px`,
        }}
      >
        {EXPENSES_TABS.map((label) => {
          const isActive = label === activeTab;

          return (
            <Box
              key={label}
              component="span"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(label)}
              onMouseEnter={() => setHoveredTab(label)}
              onMouseLeave={() => setHoveredTab(null)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onTabChange(label);
                }
              }}
              sx={{
                position: "relative",
                display: "inline-flex",
                flexDirection: "column",
                pb: `${hcpLayout.tabLabelToIndicator}px`,
                flexShrink: 0,
                cursor: "pointer",
                background: "none",
                backgroundColor: "transparent",
                WebkitTapHighlightColor: "transparent",
                "&:hover, &:focus, &:active, &:focus-visible": {
                  background: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <Typography
                variant="tabLabel"
                sx={{
                  color: isActive ? hcpColors.textPrimary : hcpColors.textMuted,
                  fontWeight:
                    isActive || hoveredTab === label
                      ? hcpFontWeight.semibold
                      : hcpFontWeight.regular,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Typography>
              {isActive ? (
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: hcpLayout.tabIndicatorWidth,
                    bgcolor: hcpColors.primary,
                    zIndex: 1,
                  }}
                />
              ) : null}
            </Box>
          );
        })}
      </Box>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "1px",
          bgcolor: hcpColors.border,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
