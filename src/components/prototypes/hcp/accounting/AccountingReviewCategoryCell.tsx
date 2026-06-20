"use client";

import Box from "@mui/material/Box";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { AccountingCategoryCellTrigger } from "./AccountingCategoryCellTrigger";
import {
  findCategoryRule,
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
  const meta = getReviewMetaForRow(row);
  const hasRule = Boolean(findCategoryRule(categoryRules, meta.ruleMatch));

  const updatePlacement = useCallback(() => {
    if (!triggerRef.current) {
      return;
    }

    setPlacement(getHcpContextPanelPlacement(triggerRef.current));
  }, []);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    updatePlacement();
    setOpen(true);
  };

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
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
      <Box ref={triggerRef} sx={{ width: "100%" }} onClick={(event) => event.stopPropagation()}>
        <AccountingCategoryCellTrigger
          category={row.category}
          hasRule={hasRule}
          onClick={handleOpen}
          onMouseDown={handleMouseDown}
        />
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
