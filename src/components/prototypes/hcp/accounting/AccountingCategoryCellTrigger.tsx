"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import type { MouseEvent } from "react";
import type { AccountingCategory } from "./accountingTransactionData";
import { hcpColors } from "../hcpTheme";

const EMPTY_CATEGORY_LABEL = "Uncategorized";

const chipSx = {
  maxWidth: "100%",
  height: 28,
  fontSize: "0.8125rem",
  borderRadius: 9999,
  transition: "background-color 150ms ease, border-color 150ms ease",
  "& .MuiChip-label": {
    px: 1.25,
  },
} as const;

type AccountingCategoryCellTriggerProps = {
  category: AccountingCategory | null;
  hasRule: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLElement>) => void;
};

function RuleHint({ hasRule }: { hasRule: boolean }) {
  if (!hasRule) {
    return null;
  }

  return (
    <Typography
      component="span"
      variant="caption"
      sx={{ color: hcpColors.primary, fontSize: "0.6875rem", flexShrink: 0 }}
    >
      Rule
    </Typography>
  );
}

export function AccountingCategoryCellTrigger({
  category,
  hasRule,
  onClick,
  onMouseDown,
}: AccountingCategoryCellTriggerProps) {
  const isEmpty = category === null;

  return (
    <Box
      component="button"
      type="button"
      aria-label={category ? `Category, ${category}` : `Choose category, ${EMPTY_CATEGORY_LABEL.toLowerCase()}`}
      aria-haspopup="dialog"
      onClick={onClick}
      onMouseDown={onMouseDown}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        maxWidth: "100%",
        minWidth: 0,
        border: 0,
        bgcolor: "transparent",
        p: 0,
        m: 0,
        font: "inherit",
        cursor: "pointer",
        "&:hover .category-chip": {
          bgcolor: isEmpty ? "rgba(33, 33, 33, 0.04)" : hcpColors.paper,
          borderColor: hcpColors.borderInput,
          boxShadow: isEmpty ? "none" : "0 1px 2px rgba(33, 33, 33, 0.06)",
        },
      }}
    >
      <Chip
        component="span"
        className="category-chip"
        label={category ?? EMPTY_CATEGORY_LABEL}
        size="small"
        sx={{
          ...chipSx,
          fontStyle: isEmpty ? "italic" : "normal",
          color: isEmpty ? hcpColors.textMuted : hcpColors.textPrimary,
          bgcolor: isEmpty ? "transparent" : hcpColors.paper,
          border: isEmpty
            ? `1px dashed ${hcpColors.borderControl}`
            : `1px solid ${hcpColors.borderControl}`,
        }}
      />
      <RuleHint hasRule={hasRule} />
    </Box>
  );
}
