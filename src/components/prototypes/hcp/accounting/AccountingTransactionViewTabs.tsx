"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ACCOUNTING_TRANSACTION_VIEW_LABELS,
  type AccountingTransactionView,
} from "./accountingTabs";
import { hcpColors, hcpFontWeight, hcpLayout } from "../hcpTheme";

type AccountingTransactionViewTabsProps = {
  activeView: AccountingTransactionView;
  reviewCount: number;
  totalCount: number;
  onViewChange: (view: AccountingTransactionView) => void;
};

export function AccountingTransactionViewTabs({
  activeView,
  reviewCount,
  totalCount,
  onViewChange,
}: AccountingTransactionViewTabsProps) {
  const tabs: { id: AccountingTransactionView; count: number }[] = [
    { id: "uncategorized", count: reviewCount },
    { id: "all", count: totalCount },
  ];

  return (
    <Box sx={{ position: "relative", mb: 2 }}>
      <Box
        role="tablist"
        aria-label="Transaction views"
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: `${hcpLayout.tabLabelGap}px`,
        }}
      >
        {tabs.map(({ id, count }) => {
          const label = ACCOUNTING_TRANSACTION_VIEW_LABELS[id];
          const isActive = id === activeView;

          return (
            <Box
              key={id}
              component="span"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onViewChange(id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onViewChange(id);
                }
              }}
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                pb: `${hcpLayout.tabLabelToIndicator}px`,
                cursor: "pointer",
                ...(!isActive
                  ? {
                      "&:hover": {
                        bgcolor: hcpColors.borderSubtle,
                      },
                    }
                  : {}),
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
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 20,
                  height: 20,
                  px: 0.75,
                  borderRadius: 999,
                  fontSize: "0.75rem",
                  fontWeight: hcpFontWeight.semibold,
                  fontVariantNumeric: "tabular-nums",
                  bgcolor: isActive ? hcpColors.primaryLight : hcpColors.surfaceMuted,
                  color: isActive ? hcpColors.primaryDark : hcpColors.textSecondary,
                }}
              >
                {count}
              </Box>
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
        }}
      />
    </Box>
  );
}
