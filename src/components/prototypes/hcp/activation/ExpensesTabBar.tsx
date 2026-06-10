"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EXPENSES_TABS, type ExpensesTab } from "./expensesTabs";
import { hcpColors, hcpFontWeight, hcpLayout } from "../hcpTheme";

type ExpensesTabBarProps = {
  activeTab: ExpensesTab;
  onTabChange: (tab: ExpensesTab) => void;
};

export function ExpensesTabBar({ activeTab, onTabChange }: ExpensesTabBarProps) {
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
                bgcolor: "transparent",
                transition: "background-color 150ms ease",
                ...(!isActive
                  ? {
                      "&:hover": {
                        bgcolor: hcpColors.borderSubtle,
                      },
                    }
                  : {}),
                "&:focus-visible": {
                  outline: "none",
                },
              }}
            >
              <Typography
                variant="tabLabel"
                sx={{
                  color: isActive ? hcpColors.textPrimary : hcpColors.textMuted,
                  fontWeight: isActive ? hcpFontWeight.semibold : hcpFontWeight.regular,
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
