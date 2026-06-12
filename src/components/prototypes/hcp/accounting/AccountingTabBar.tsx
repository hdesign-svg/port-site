"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ACCOUNTING_TABS, type AccountingTab } from "./accountingTabs";
import { hcpColors, hcpFontWeight, hcpLayout } from "../hcpTheme";

type AccountingTabBarProps = {
  activeTab: AccountingTab;
  onTabChange: (tab: AccountingTab) => void;
};

export function AccountingTabBar({ activeTab, onTabChange }: AccountingTabBarProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        role="tablist"
        aria-label="Accounting views"
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: `${hcpLayout.tabLabelGap}px`,
        }}
      >
        {ACCOUNTING_TABS.map((label) => {
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
