"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useMemo, useState, type MouseEvent } from "react";
import { findCategoryRule, type AccountingCategoryRule } from "./accountingCategoryRules";
import { getReviewMetaForRow } from "./accountingReviewGroups";
import {
  ACCOUNTING_CATEGORIES,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import { hcpMenuItemLabelSx, hcpMenuPaperSx } from "../hcpTheme";

type AccountingCategoryMenuProps = {
  row: AccountingTransactionRow;
  categoryRules: AccountingCategoryRule[];
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onSelect: (category: AccountingCategory) => void;
};

export function AccountingCategoryMenu({
  row,
  categoryRules,
  anchorEl,
  open,
  onClose,
  onSelect,
}: AccountingCategoryMenuProps) {
  const meta = getReviewMetaForRow(row);
  const existingRule = findCategoryRule(categoryRules, meta.ruleMatch);

  const suggestedCategories = useMemo(() => {
    const suggestions = meta.suggestedCategories.filter((category) => category !== row.category);
    if (existingRule && !suggestions.includes(existingRule.category)) {
      return [existingRule.category, ...suggestions].slice(0, 3);
    }
    return suggestions;
  }, [existingRule, meta.suggestedCategories, row.category]);

  const restCategories = useMemo(() => {
    const suggestedSet = new Set(suggestedCategories);
    return ACCOUNTING_CATEGORIES.filter((category) => !suggestedSet.has(category));
  }, [suggestedCategories]);

  const handleSelect = (category: AccountingCategory) => {
    onSelect(category);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 240, maxHeight: 360 } } }}
    >
      {suggestedCategories.length > 0 ? (
        <>
          <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Suggested
            </Typography>
          </Box>
          {suggestedCategories.map((category) => (
            <MenuItem key={category} onClick={() => handleSelect(category)} sx={{ py: 0.875 }}>
              <Typography variant="body2" sx={hcpMenuItemLabelSx}>
                {category}
              </Typography>
            </MenuItem>
          ))}
          <Divider sx={{ my: 0.5 }} />
        </>
      ) : null}
      <Box sx={{ px: 1.5, pt: suggestedCategories.length > 0 ? 0.5 : 1, pb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          All categories
        </Typography>
      </Box>
      {restCategories.map((category) => (
        <MenuItem key={category} onClick={() => handleSelect(category)} sx={{ py: 0.875 }}>
          <Typography variant="body2" sx={hcpMenuItemLabelSx}>
            {category}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export function useCategoryMenuAnchor() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return { anchorEl, open: Boolean(anchorEl), openMenu, closeMenu };
}
