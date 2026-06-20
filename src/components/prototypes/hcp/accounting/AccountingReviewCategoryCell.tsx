"use client";

import { CaretDown } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  getSimilarReviewTransactionIds,
  upsertCategoryRule,
  type AccountingCategoryRule,
} from "./accountingCategoryRules";
import {
  AccountingCategoryPickerPopover,
  type CategoryPickerApplyInput,
} from "./AccountingCategoryPickerPopover";
import { applyReviewGroup, getReviewMetaForRow } from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { getHcpContextPanelPlacement, type HcpAnchoredPlacement } from "../hcpPopoverPlacement";
import { hcpColors, hcpLayout } from "../hcpTheme";

const categoryTriggerSx = {
  width: "100%",
  pointerEvents: "auto",
  "& .MuiOutlinedInput-root": {
    minHeight: hcpLayout.chromeControlHeight,
    cursor: "pointer",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: hcpColors.borderControl,
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    minHeight: hcpLayout.chromeControlHeight - 2,
    py: 0,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    color: hcpColors.textPrimary,
    cursor: "pointer",
  },
  "& .MuiSelect-select.MuiSelect-displayEmpty": {
    color: hcpColors.textMuted,
  },
};

type ReviewCategoryCellProps = {
  row: AccountingTransactionRow;
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  isReviewContext: boolean;
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

export function ReviewCategoryCell({
  row,
  transactions,
  period,
  categoryRules,
  isReviewContext,
  onTransactionsChange,
  onCategoryRulesChange,
}: ReviewCategoryCellProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<HcpAnchoredPlacement | null>(null);
  const placeholder = "Choose category";

  const updatePlacement = useCallback(() => {
    if (!triggerRef.current) {
      return;
    }

    setPlacement(getHcpContextPanelPlacement(triggerRef.current));
  }, []);

  const handleOpen = (event: MouseEvent) => {
    event.stopPropagation();
    updatePlacement();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open, updatePlacement]);

  const resolveTransactionIds = (scope: CategoryPickerApplyInput["scope"]) => {
    if (scope === "similar") {
      return getSimilarReviewTransactionIds(transactions, period, row);
    }

    if (scope === "always") {
      const inQueue = getReviewQueueTransactions(transactions, period).some(
        (queued) => queued.id === row.id,
      );
      if (isReviewContext && inQueue) {
        return getSimilarReviewTransactionIds(transactions, period, row);
      }
    }

    return [row.id];
  };

  const handleApply = ({ category, scope }: CategoryPickerApplyInput) => {
    const meta = getReviewMetaForRow(row);
    const transactionIds = resolveTransactionIds(scope);
    const applyToFuture = scope === "always";

    onTransactionsChange(
      applyReviewGroup(transactions, {
        transactionIds,
        category,
        applyToFuture,
        ruleMatch: meta.ruleMatch,
      }),
    );

    if (applyToFuture) {
      onCategoryRulesChange(
        upsertCategoryRule(categoryRules, {
          ruleMatch: meta.ruleMatch,
          category,
          label: meta.label,
        }),
      );
    }
  };

  const handleRemoveRule = (ruleMatch: string) => {
    onCategoryRulesChange(
      categoryRules.filter((rule) => rule.ruleMatch.toUpperCase() !== ruleMatch.toUpperCase()),
    );
  };

  return (
    <>
      <Box
        ref={triggerRef}
        sx={{ width: "100%" }}
        onClick={(event) => event.stopPropagation()}
      >
        <FormControl size="small" fullWidth sx={categoryTriggerSx}>
          <Select
            open={false}
            value={row.category ?? ""}
            displayEmpty
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onClick={handleOpen}
            IconComponent={(props) => <CaretDown {...props} size={16} weight="bold" />}
            renderValue={(selected) => {
              if (!selected) {
                return placeholder;
              }

              return selected;
            }}
          />
        </FormControl>
      </Box>

      <AccountingCategoryPickerPopover
        anchorEl={triggerRef.current}
        open={open}
        placement={placement}
        onClose={handleClose}
        row={row}
        transactions={transactions}
        period={period}
        categoryRules={categoryRules}
        isReviewContext={isReviewContext}
        onApply={handleApply}
        onRemoveRule={handleRemoveRule}
      />
    </>
  );
}
