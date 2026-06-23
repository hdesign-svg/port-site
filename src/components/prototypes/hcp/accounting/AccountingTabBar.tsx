"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ACCOUNTING_TAB_LABELS,
  ACCOUNTING_TABS,
  type AccountingTab,
} from "./accountingTabs";
import {
  hcpColors,
  hcpLayout,
  hcpModuleTabActiveIndicatorSx,
  hcpModuleTabInactiveHoverSx,
  hcpModuleTabItemSx,
  hcpModuleTabLabelSx,
  hcpModuleTabListSx,
} from "../hcpTheme";

type AccountingTabBarProps = {
  activeTab: AccountingTab;
  reviewCount: number;
  onTabChange: (tab: AccountingTab) => void;
};

export function AccountingTabBar({
  activeTab,
  reviewCount,
  onTabChange,
}: AccountingTabBarProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        role="tablist"
        aria-label="Accounting views"
        sx={hcpModuleTabListSx}
      >
        {ACCOUNTING_TABS.map((tab) => {
          const label = ACCOUNTING_TAB_LABELS[tab];
          const isActive = tab === activeTab;
          const showReviewCount = tab === "toReview" && reviewCount > 0;

          return (
            <Box
              key={tab}
              component="span"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onTabChange(tab);
                }
              }}
              sx={{
                ...hcpModuleTabItemSx,
                ...(!isActive ? hcpModuleTabInactiveHoverSx : {}),
                pb: `${hcpLayout.tabLabelToIndicator}px`,
              }}
            >
              <Box
                component="span"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}
              >
                <Typography variant="tabLabel" sx={hcpModuleTabLabelSx(isActive)}>
                  {label}
                </Typography>
                {showReviewCount ? (
                  <Typography
                    component="span"
                    variant="tabLabel"
                    sx={{
                      ...hcpModuleTabLabelSx(isActive),
                      color: isActive ? hcpColors.textSecondary : hcpColors.textMuted,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ({reviewCount})
                  </Typography>
                ) : null}
              </Box>
              {isActive ? (
                <Box aria-hidden sx={hcpModuleTabActiveIndicatorSx} />
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
