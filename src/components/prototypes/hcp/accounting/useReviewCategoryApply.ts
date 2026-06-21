"use client";

import { useCallback } from "react";
import {
  getSimilarReviewTransactionIds,
  upsertCategoryRule,
  type AccountingCategoryRule,
} from "./accountingCategoryRules";
import { applyReviewGroup, getReviewMetaForRow } from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import type { AccountingCategory, AccountingTransactionRow } from "./accountingTransactionData";

export type CategorizeScope = "this" | "similar" | "always";

export type CategoryApplyInput = {
  category: AccountingCategory;
  scope: CategorizeScope;
};

type UseReviewCategoryApplyOptions = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
  isReviewContext?: boolean;
};

export function useReviewCategoryApply({
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
  isReviewContext = true,
}: UseReviewCategoryApplyOptions) {
  const resolveTransactionIds = useCallback(
    (row: AccountingTransactionRow, scope: CategorizeScope) => {
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
    },
    [isReviewContext, period, transactions],
  );

  const applyToRow = useCallback(
    (row: AccountingTransactionRow, { category, scope }: CategoryApplyInput) => {
      const meta = getReviewMetaForRow(row);
      const transactionIds = resolveTransactionIds(row, scope);
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
    },
    [
      categoryRules,
      onCategoryRulesChange,
      onTransactionsChange,
      resolveTransactionIds,
      transactions,
    ],
  );

  return { applyToRow, resolveTransactionIds };
}
