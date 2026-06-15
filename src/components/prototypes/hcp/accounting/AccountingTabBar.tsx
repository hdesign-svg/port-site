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
} from "../hcpTheme";

type AccountingTabBarProps = {
  activeTab: AccountingTab;
  showReviewDot: boolean;
  onTabChange: (tab: AccountingTab) => void;
};

export function AccountingTabBar({
  activeTab,
  showReviewDot,
  onTabChange,
}: AccountingTabBarProps) {
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
        {ACCOUNTING_TABS.map((tab) => {
          const label = ACCOUNTING_TAB_LABELS[tab];
          const isActive = tab === activeTab;
          const showDot = tab === "toReview" && showReviewDot && !isActive;

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
                alignItems: "center",
                gap: 0.75,
                pb: `${hcpLayout.tabLabelToIndicator}px`,
              }}
            >
              <Typography variant="tabLabel" sx={hcpModuleTabLabelSx(isActive)}>
                {label}
              </Typography>
              {showDot ? (
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: hcpColors.primary,
                    flexShrink: 0,
                  }}
                />
              ) : null}
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
