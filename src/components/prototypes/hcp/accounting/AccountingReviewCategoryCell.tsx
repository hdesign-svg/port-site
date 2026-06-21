"use client";

import Box from "@mui/material/Box";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { AccountingCategoryCellTrigger } from "./AccountingCategoryCellTrigger";
import {
  AccountingCategoryPickerPopover,
  getCategoryPickerPopoverHeight,
  type CategoryPickerApplyInput,
} from "./AccountingCategoryPickerPopover";
import { findCategoryRule, upsertCategoryRule, type AccountingCategoryRule } from "./accountingCategoryRules";
import { applyReviewGroup, getReviewMetaForRow } from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { getHcpContextPanelPlacement, type HcpAnchoredPlacement } from "../hcpPopoverPlacement";

type ReviewCategoryCellProps = {
  row: AccountingTransactionRow;
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

/** Category cell for the full register — uses a simple single-step popover. */
export function ReviewCategoryCell({
  row,
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: ReviewCategoryCellProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<HcpAnchoredPlacement | null>(null);
  const meta = getReviewMetaForRow(row);
  const hasRule = Boolean(findCategoryRule(categoryRules, meta.ruleMatch));

  const updatePlacement = useCallback(() => {
    if (!triggerRef.current) {
      return;
    }

    setPlacement(
      getHcpContextPanelPlacement(triggerRef.current, {
        estimatedHeight: getCategoryPickerPopoverHeight(Boolean(hasRule)),
      }),
    );
  }, [hasRule]);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    updatePlacement();
    setOpen(true);
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

  const handleApply = ({ category, scope }: CategoryPickerApplyInput) => {
    const transactionIds = scope === "this" ? [row.id] : [row.id];
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

  return (
    <>
      <Box ref={triggerRef} sx={{ width: "100%" }} onClick={(event) => event.stopPropagation()}>
        <AccountingCategoryCellTrigger
          category={row.category}
          hasRule={hasRule}
          onClick={handleOpen}
          onMouseDown={(event) => event.stopPropagation()}
        />
      </Box>

      <AccountingCategoryPickerPopover
        anchorEl={triggerRef.current}
        open={open}
        placement={placement}
        onClose={() => setOpen(false)}
        row={row}
        transactions={transactions}
        period={period}
        categoryRules={categoryRules}
        isReviewContext={false}
        onApply={handleApply}
        onRemoveRule={(ruleMatch) =>
          onCategoryRulesChange(
            categoryRules.filter((rule) => rule.ruleMatch.toUpperCase() !== ruleMatch.toUpperCase()),
          )
        }
      />
    </>
  );
}
