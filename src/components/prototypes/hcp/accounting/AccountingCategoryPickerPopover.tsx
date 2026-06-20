"use client";

import { CaretLeft } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import {
  findCategoryRule,
  getSimilarReviewTransactionIds,
  type AccountingCategoryRule,
} from "./accountingCategoryRules";
import { getReviewMetaForRow } from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import {
  ACCOUNTING_CATEGORIES,
  formatAccountingAmount,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import {
  hcpColors,
  hcpFontWeight,
  hcpLayout,
  hcpPrimaryButtonSx,
  hcpSecondaryButtonSx,
} from "../hcpTheme";
import type { HcpAnchoredPlacement } from "../hcpPopoverPlacement";

export type CategorizeScope = "this" | "similar" | "always";

export type CategoryPickerApplyInput = {
  category: AccountingCategory;
  scope: CategorizeScope;
};

type PickerStep = "pick" | "scope";

type AccountingCategoryPickerPopoverProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  placement: HcpAnchoredPlacement | null;
  onClose: () => void;
  row: AccountingTransactionRow;
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  isReviewContext: boolean;
  onApply: (input: CategoryPickerApplyInput) => void;
  onRemoveRule: (ruleMatch: string) => void;
};

function formatRuleMatchLabel(ruleMatch: string) {
  if (ruleMatch.length <= 24) {
    return ruleMatch;
  }

  return `${ruleMatch.slice(0, 24)}…`;
}

export function AccountingCategoryPickerPopover({
  anchorEl,
  open,
  placement,
  onClose,
  row,
  transactions,
  period,
  categoryRules,
  isReviewContext,
  onApply,
  onRemoveRule,
}: AccountingCategoryPickerPopoverProps) {
  const [step, setStep] = useState<PickerStep>("pick");
  const [selectedCategory, setSelectedCategory] = useState<AccountingCategory | null>(null);
  const [scope, setScope] = useState<CategorizeScope>("this");

  const meta = getReviewMetaForRow(row);
  const existingRule = findCategoryRule(categoryRules, meta.ruleMatch);
  const similarIds = useMemo(
    () => getSimilarReviewTransactionIds(transactions, period, row),
    [period, row, transactions],
  );
  const inReviewQueue = getReviewQueueTransactions(transactions, period).some(
    (queued) => queued.id === row.id,
  );

  useEffect(() => {
    if (!open) {
      setStep("pick");
      setSelectedCategory(null);
      setScope("this");
    }
  }, [open]);

  const suggestedCategories = useMemo(() => {
    const suggestions = meta.suggestedCategories.filter((category) => category !== row.category);
    if (existingRule && !suggestions.includes(existingRule.category)) {
      return [existingRule.category, ...suggestions].slice(0, 3);
    }
    return suggestions;
  }, [existingRule, meta.suggestedCategories, row.category]);

  const otherCategories = useMemo(() => {
    const excluded = new Set(suggestedCategories);
    if (row.category) {
      excluded.add(row.category);
    }
    return ACCOUNTING_CATEGORIES.filter((category) => !excluded.has(category));
  }, [row.category, suggestedCategories]);

  const showSimilarScope = isReviewContext && inReviewQueue && similarIds.length > 1;
  const showAlwaysScope = meta.id !== `misc-${row.id}`;

  const handlePickCategory = (category: AccountingCategory) => {
    setSelectedCategory(category);
    setScope("this");
    setStep("scope");
  };

  const handleApply = () => {
    if (!selectedCategory) {
      return;
    }

    onApply({ category: selectedCategory, scope });
    onClose();
  };

  return (
    <Popover
      open={open && placement != null}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={placement?.anchorPosition}
      transformOrigin={placement?.transformOrigin ?? { vertical: "top", horizontal: "right" }}
      marginThreshold={16}
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            p: 2,
            width: placement?.width ?? 340,
            maxHeight: placement?.maxHeight ?? 420,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: `1px solid ${hcpColors.border}`,
            borderRadius: `${hcpLayout.controlRadius}px`,
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
          },
        },
      }}
    >
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold, mb: 0.5 }}>
          {step === "pick" ? "Choose category" : "Apply category"}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {row.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
          {formatAccountingAmount(row.amount, row.isDeposit)}
        </Typography>
      </Box>

      {existingRule ? (
        <Box
          sx={{
            mb: 1.5,
            px: 1.25,
            py: 1,
            borderRadius: 1,
            bgcolor: "rgba(14, 111, 190, 0.06)",
            border: `1px solid rgba(14, 111, 190, 0.12)`,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25 }}>
            Saved rule
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 0 }}>
              &ldquo;{formatRuleMatchLabel(existingRule.ruleMatch)}&rdquo; → {existingRule.category}
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={() => onRemoveRule(existingRule.ruleMatch)}
              sx={{ flexShrink: 0, minWidth: 0, px: 0.5 }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ) : null}

      {step === "pick" ? (
        <Box sx={{ overflow: "auto", minHeight: 0, flex: 1 }}>
          {suggestedCategories.length > 0 ? (
            <>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                Suggested
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.5 }}>
                {suggestedCategories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    size="small"
                    clickable
                    onClick={() => handlePickCategory(category)}
                    sx={{
                      height: 28,
                      fontSize: "0.8125rem",
                      bgcolor: hcpColors.paper,
                      border: `1px solid ${hcpColors.borderControl}`,
                      "&:hover": {
                        bgcolor: "rgba(33, 33, 33, 0.04)",
                      },
                    }}
                  />
                ))}
              </Box>
              <Divider sx={{ mb: 1.5 }} />
            </>
          ) : null}

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            All categories
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
            {otherCategories.map((category) => (
              <Button
                key={category}
                variant="text"
                onClick={() => handlePickCategory(category)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  color: hcpColors.textPrimary,
                  px: 1,
                  py: 0.75,
                  minHeight: 0,
                }}
              >
                {category}
              </Button>
            ))}
            {row.category && !suggestedCategories.includes(row.category) ? (
              <Button
                variant="text"
                onClick={() => handlePickCategory(row.category!)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  color: hcpColors.textPrimary,
                  px: 1,
                  py: 0.75,
                  minHeight: 0,
                }}
              >
                {row.category}
              </Button>
            ) : null}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
            <IconButton
              size="small"
              aria-label="Back to category list"
              onClick={() => setStep("pick")}
              sx={{ ml: -0.5 }}
            >
              <CaretLeft size={16} weight="bold" />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
              {selectedCategory}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            Apply to
          </Typography>

          <RadioGroup value={scope} onChange={(_, value) => setScope(value as CategorizeScope)}>
            <FormControlLabel
              value="this"
              control={<Radio size="small" />}
              label={
                <Typography variant="body2">
                  {existingRule ? "This transaction only" : "This transaction only"}
                </Typography>
              }
              sx={{ alignItems: "flex-start", mx: 0, mb: 0.5 }}
            />
            {showSimilarScope ? (
              <FormControlLabel
                value="similar"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    This + {similarIds.length - 1} similar in queue
                  </Typography>
                }
                sx={{ alignItems: "flex-start", mx: 0, mb: 0.5 }}
              />
            ) : null}
            {showAlwaysScope ? (
              <FormControlLabel
                value="always"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    {existingRule
                      ? `Update rule: always categorize "${formatRuleMatchLabel(meta.ruleMatch)}"`
                      : `Always categorize "${formatRuleMatchLabel(meta.ruleMatch)}"`}
                  </Typography>
                }
                sx={{ alignItems: "flex-start", mx: 0 }}
              />
            ) : null}
          </RadioGroup>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2, pt: 1 }}>
            <Button variant="outlined" onClick={onClose} sx={hcpSecondaryButtonSx}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApply} sx={hcpPrimaryButtonSx}>
              Apply
            </Button>
          </Box>
        </Box>
      )}
    </Popover>
  );
}
