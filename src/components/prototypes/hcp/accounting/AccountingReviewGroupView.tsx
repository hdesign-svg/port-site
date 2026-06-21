"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useMemo, useState, type MouseEvent } from "react";
import { findCategoryRule, getSimilarReviewTransactionIds, type AccountingCategoryRule } from "./accountingCategoryRules";
import {
  buildReviewGroups,
  getReviewGroupTransactions,
  type ReviewGroup,
} from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import {
  ACCOUNTING_CATEGORIES,
  formatAccountingAmount,
  formatAccountingDate,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import { useReviewCategoryApply } from "./useReviewCategoryApply";
import {
  hcpColors,
  hcpFontWeight,
  hcpLayout,
  hcpMenuItemLabelSx,
  hcpMenuPaperSx,
} from "../hcpTheme";

function formatRuleMatchLabel(ruleMatch: string) {
  if (ruleMatch.length <= 24) {
    return ruleMatch;
  }
  return `${ruleMatch.slice(0, 24)}…`;
}

type ReviewGroupCardProps = {
  group: ReviewGroup;
  transactions: AccountingTransactionRow[];
  categoryRules: AccountingCategoryRule[];
  onApply: (row: AccountingTransactionRow, category: AccountingCategory, always: boolean) => void;
};

function ReviewGroupCard({ group, transactions, categoryRules, onApply }: ReviewGroupCardProps) {
  const groupRows = getReviewGroupTransactions(transactions, group);
  const anchorRow = groupRows[0];
  const existingRule = findCategoryRule(categoryRules, group.ruleMatch);
  const [alwaysRule, setAlwaysRule] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  if (!anchorRow) {
    return null;
  }

  const suggested = group.suggestedCategories.slice(0, 3);
  const suggestedSet = new Set(suggested);
  const restCategories = ACCOUNTING_CATEGORIES.filter((category) => !suggestedSet.has(category));

  const handlePick = (category: AccountingCategory) => {
    onApply(anchorRow, category, alwaysRule);
    setMenuAnchor(null);
  };

  const totalAmount = groupRows.reduce(
    (sum, row) => sum + (row.isDeposit ? row.amount : -row.amount),
    0,
  );

  return (
    <Box
      sx={{
        border: `1px solid ${hcpColors.border}`,
        borderRadius: `${hcpLayout.controlRadius}px`,
        overflow: "hidden",
        bgcolor: hcpColors.paper,
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.25,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 2,
          borderBottom: `1px solid ${hcpColors.borderSubtle}`,
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
            {group.label}
          </Typography>
          <Typography variant="caption" sx={{ color: hcpColors.textMuted }}>
            {groupRows.length} transaction{groupRows.length === 1 ? "" : "s"}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontVariantNumeric: "tabular-nums",
            color: totalAmount >= 0 ? hcpColors.successMain : hcpColors.spending,
            fontWeight: hcpFontWeight.medium,
          }}
        >
          {formatAccountingAmount(Math.abs(totalAmount), totalAmount >= 0)}
        </Typography>
      </Box>

      <Box sx={{ px: 2, py: 0.5 }}>
        {groupRows.map((row) => (
          <Box
            key={row.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              py: 0.75,
              borderBottom: `1px solid ${hcpColors.borderSubtle}`,
              "&:last-of-type": { borderBottom: 0 },
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" noWrap sx={{ fontSize: "0.8125rem" }}>
                {row.description}
              </Typography>
              <Typography variant="caption" sx={{ color: hcpColors.textMuted }}>
                {formatAccountingDate(row.date)}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                flexShrink: 0,
                fontVariantNumeric: "tabular-nums",
                fontSize: "0.8125rem",
                color: row.isDeposit ? hcpColors.successMain : hcpColors.spending,
              }}
            >
              {formatAccountingAmount(row.amount, row.isDeposit)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: hcpColors.background,
          borderTop: `1px solid ${hcpColors.borderSubtle}`,
        }}
      >
        {existingRule ? (
          <Typography variant="caption" sx={{ color: hcpColors.primary, display: "block", mb: 1 }}>
            Rule: {existingRule.category}
          </Typography>
        ) : null}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.25 }}>
          {suggested.map((category) => (
            <Button
              key={category}
              size="small"
              variant="outlined"
              onClick={() => handlePick(category)}
              sx={{
                textTransform: "none",
                fontSize: "0.8125rem",
                borderColor: hcpColors.borderControl,
                color: hcpColors.textPrimary,
              }}
            >
              {category}
            </Button>
          ))}
          <Button
            size="small"
            variant="text"
            onClick={(event: MouseEvent<HTMLButtonElement>) => setMenuAnchor(event.currentTarget)}
            sx={{ textTransform: "none", fontSize: "0.8125rem", color: hcpColors.textMuted }}
          >
            More…
          </Button>
        </Box>
        {groupRows.length > 1 ? (
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={alwaysRule}
                onChange={(event) => setAlwaysRule(event.target.checked)}
              />
            }
            label={
              <Typography variant="caption">
                Always categorize &ldquo;{formatRuleMatchLabel(group.ruleMatch)}&rdquo;
              </Typography>
            }
            sx={{ m: 0, alignItems: "flex-start" }}
          />
        ) : null}
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        slotProps={{ paper: { sx: { ...hcpMenuPaperSx, maxHeight: 280 } } }}
      >
        {restCategories.map((category) => (
          <MenuItem key={category} onClick={() => handlePick(category)} sx={{ py: 0.875 }}>
            <Typography variant="body2" sx={hcpMenuItemLabelSx}>
              {category}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

type AccountingReviewGroupViewProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

export function AccountingReviewGroupView({
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: AccountingReviewGroupViewProps) {
  const groups = useMemo(() => buildReviewGroups(transactions, period), [period, transactions]);
  const { applyToRow } = useReviewCategoryApply({
    transactions,
    period,
    categoryRules,
    onTransactionsChange,
    onCategoryRulesChange,
  });

  const handleGroupApply = (
    row: AccountingTransactionRow,
    category: AccountingCategory,
    always: boolean,
  ) => {
    const similarIds = getSimilarReviewTransactionIds(transactions, period, row);
    const scope = always ? "always" : similarIds.length > 1 ? "similar" : "this";
    applyToRow(row, { category, scope });
  };

  if (groups.length === 0) {
    return (
      <Box sx={{ px: 3, py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Nothing left to review.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      {groups.map((group) => (
        <ReviewGroupCard
          key={group.id}
          group={group}
          transactions={transactions}
          categoryRules={categoryRules}
          onApply={handleGroupApply}
        />
      ))}
    </Box>
  );
}
