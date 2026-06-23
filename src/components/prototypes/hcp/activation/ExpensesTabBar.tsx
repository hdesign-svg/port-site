"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EXPENSES_TABS, type ExpensesTab } from "./expensesTabs";
import {
  hcpColors,
  hcpLayout,
  hcpModuleTabActiveIndicatorSx,
  hcpModuleTabInactiveHoverSx,
  hcpModuleTabItemSx,
  hcpModuleTabLabelSx,
  hcpModuleTabListSx,
} from "../hcpTheme";

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
        sx={hcpModuleTabListSx}
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
                ...hcpModuleTabItemSx,
                ...(!isActive ? hcpModuleTabInactiveHoverSx : {}),
                pb: `${hcpLayout.tabLabelToIndicator}px`,
              }}
            >
              <Typography variant="tabLabel" sx={hcpModuleTabLabelSx(isActive)}>
                {label}
              </Typography>
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
