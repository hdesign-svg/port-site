"use client";

import type { AccountingCategoryRule } from "./accountingCategoryRules";
import { AccountingReviewFocusPanelView } from "./AccountingReviewFocusPanelView";
import { AccountingReviewGroupView } from "./AccountingReviewGroupView";
import { AccountingReviewGroupedTableView } from "./AccountingReviewGroupedTableView";
import type { AccountingPeriod } from "./accountingPeriods";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import type { ReviewCategorizePattern } from "./reviewCategorizePatterns";

type AccountingReviewViewProps = {
  pattern: ReviewCategorizePattern;
  rows: AccountingTransactionRow[];
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

export function AccountingReviewView({
  pattern,
  rows,
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: AccountingReviewViewProps) {
  const shared = {
    transactions,
    period,
    categoryRules,
    onTransactionsChange,
    onCategoryRulesChange,
  };

  if (pattern === "B") {
    return <AccountingReviewGroupView {...shared} />;
  }

  if (pattern === "C") {
    return <AccountingReviewFocusPanelView rows={rows} {...shared} />;
  }

  return <AccountingReviewGroupedTableView {...shared} />;
}
