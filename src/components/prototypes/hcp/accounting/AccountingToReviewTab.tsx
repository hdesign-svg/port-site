"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { HcpAnalyticsView, HcpDataContainer } from "../analytics";
import { HcpSegmentControl } from "../HcpSegmentControl";
import { HcpTableZoneHeader, hcpTableToolbarActionsSx } from "../HcpTableChrome";
import type { AccountingCategoryRule } from "./accountingCategoryRules";
import { AccountingPeriodMenu } from "./AccountingPeriodMenu";
import { AccountingReviewFocusView } from "./AccountingReviewFocusView";
import { AccountingReviewGroupedTableView } from "./AccountingReviewGroupedTableView";
import { AccountingTabPanel } from "./AccountingTabPanel";
import type { ReviewLayout } from "./accountingTabs";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { hcpContentSpacing } from "../hcpTheme";

type AccountingToReviewTabProps = {
  period: AccountingPeriod;
  onPeriodChange: (period: AccountingPeriod) => void;
  transactions: AccountingTransactionRow[];
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
  requestReviewFocus?: boolean;
  onReviewFocusHandled?: () => void;
};

export function AccountingToReviewTab({
  period,
  onPeriodChange,
  transactions,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
  requestReviewFocus = false,
  onReviewFocusHandled,
}: AccountingToReviewTabProps) {
  const [reviewLayout, setReviewLayout] = useState<ReviewLayout>("grouped");

  const reviewQueue = useMemo(
    () => getReviewQueueTransactions(transactions, period),
    [transactions, period],
  );

  useEffect(() => {
    if (requestReviewFocus) {
      setReviewLayout("focus");
      onReviewFocusHandled?.();
    }
  }, [onReviewFocusHandled, requestReviewFocus]);

  return (
    <AccountingTabPanel>
      <HcpAnalyticsView
        leading={
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
            <HcpTableZoneHeader label="To review" />
            {reviewQueue.length > 0 ? (
              <HcpSegmentControl
                value={reviewLayout}
                onChange={setReviewLayout}
                aria-label="Review layout"
                options={[
                  { value: "grouped", label: "Grouped" },
                  { value: "focus", label: "Focus" },
                ]}
              />
            ) : null}
          </Box>
        }
        actions={
          <Box sx={hcpTableToolbarActionsSx}>
            <AccountingPeriodMenu
              period={period}
              transactions={transactions}
              onPeriodChange={onPeriodChange}
            />
          </Box>
        }
      >
        <HcpDataContainer>
          {reviewQueue.length === 0 ? (
            <Box sx={{ px: `${hcpContentSpacing.surfaceInsetX}px`, py: 6, textAlign: "center" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Nothing to review in {period.shortLabel}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                New uncategorized transactions in the review window will show up here.
              </Typography>
            </Box>
          ) : reviewLayout === "focus" ? (
            <AccountingReviewFocusView
              transactions={transactions}
              period={period}
              categoryRules={categoryRules}
              onTransactionsChange={onTransactionsChange}
              onCategoryRulesChange={onCategoryRulesChange}
            />
          ) : (
            <AccountingReviewGroupedTableView
              transactions={transactions}
              period={period}
              categoryRules={categoryRules}
              onTransactionsChange={onTransactionsChange}
              onCategoryRulesChange={onCategoryRulesChange}
            />
          )}
        </HcpDataContainer>
      </HcpAnalyticsView>
    </AccountingTabPanel>
  );
}
