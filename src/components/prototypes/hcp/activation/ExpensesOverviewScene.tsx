"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpContentHeaderSx, hcpContentPageSx, hcpFontWeight, hcpLayout } from "../hcpTheme";

const tabs = [
  { label: "Overview", active: true },
  { label: "Transactions" },
  { label: "Cards" },
  { label: "Bill Pay" },
] as const;

export function ExpensesOverviewScene() {
  return (
    <Box sx={{ flex: 1, minHeight: 0, overflow: "auto", bgcolor: hcpColors.background }}>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: hcpColors.background,
          pt: `${hcpLayout.tabBlockMarginTop}px`,
          pb: `${hcpLayout.tabBlockMarginBottom}px`,
        }}
      >
        <Box sx={hcpContentHeaderSx}>
          <Box sx={{ position: "relative" }}>
            <Box
              role="tablist"
              aria-label="Expenses views"
              sx={{
                display: "flex",
                alignItems: "stretch",
                flexWrap: "wrap",
                gap: `${hcpLayout.tabLabelGap}px`,
              }}
            >
              {tabs.map((tab) => {
                const isActive = "active" in tab && tab.active;

                return (
                  <Box
                    key={tab.label}
                    role="tab"
                    aria-selected={isActive}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-start",
                      pb: `${hcpLayout.tabLabelToIndicator}px`,
                    }}
                  >
                    <Typography
                      variant="navLabel"
                      sx={{
                        color: isActive ? hcpColors.textPrimary : hcpColors.textMuted,
                        fontWeight: isActive ? hcpFontWeight.semibold : hcpFontWeight.regular,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tab.label}
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
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          ...hcpContentPageSx,
          pb: `${hcpLayout.contentPageMargin}px`,
        }}
      >
        {/* Core content sections build here */}
      </Box>
    </Box>
  );
}

/** @deprecated Use ExpensesOverviewScene */
export const EnrolledOverviewScene = ExpensesOverviewScene;
