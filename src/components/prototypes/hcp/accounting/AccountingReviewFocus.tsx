"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { AccountingCategorySelect } from "./AccountingCategorySelect";
import {
  applyReviewGroup,
  buildReviewGroups,
  getReviewGroupTransactions,
  type ApplyReviewGroupInput,
} from "./accountingReviewGroups";
import {
  formatAccountingAmount,
  formatAccountingDate,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import {
  hcpColors,
  hcpFontWeight,
  hcpPrimaryButtonSx,
  hcpRadius,
  hcpSecondaryButtonSx,
} from "../hcpTheme";

type AccountingReviewFocusProps = {
  transactions: AccountingTransactionRow[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
};

const chipButtonSx = {
  borderRadius: 999,
  textTransform: "none",
  ...hcpSecondaryButtonSx,
  bgcolor: hcpColors.paper,
  px: 2,
  "&:hover": {
    bgcolor: hcpColors.primaryLight,
    borderColor: hcpColors.primary,
  },
} as const;

export function AccountingReviewFocus({
  transactions,
  onTransactionsChange,
}: AccountingReviewFocusProps) {
  const groups = useMemo(() => buildReviewGroups(transactions), [transactions]);
  const activeGroup = groups[0] ?? null;
  const activeTransactions = activeGroup
    ? getReviewGroupTransactions(transactions, activeGroup)
    : [];

  const [applyToFuture, setApplyToFuture] = useState(false);
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState<AccountingCategory | null>(null);
  const [completedGroups, setCompletedGroups] = useState(0);

  useEffect(() => {
    setApplyToFuture(false);
    setShowOtherCategory(false);
    setOtherCategory(null);
  }, [activeGroup?.id]);

  if (!activeGroup) {
    return null;
  }

  const totalSteps = completedGroups + groups.length;

  const applyCategory = (category: AccountingCategory) => {
    const input: ApplyReviewGroupInput = {
      transactionIds: activeGroup.transactionIds,
      category,
      applyToFuture,
      ruleMatch: activeGroup.ruleMatch,
    };

    onTransactionsChange(applyReviewGroup(transactions, input));
    setCompletedGroups((current) => current + 1);
    setApplyToFuture(false);
    setShowOtherCategory(false);
    setOtherCategory(null);
  };

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", width: "100%" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
        {completedGroups} of {totalSteps} done
      </Typography>

      <Box
        sx={{
          bgcolor: hcpColors.paper,
          border: `1px solid ${hcpColors.border}`,
          borderRadius: hcpRadius.control,
          px: 3,
          py: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: hcpFontWeight.semibold, mb: 2 }}>
          {activeGroup.label}
        </Typography>

        <Box sx={{ mb: 3 }}>
          {activeTransactions.map((transaction, index) => (
            <Box
              key={transaction.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                borderTop: index === 0 ? "none" : `1px solid ${hcpColors.borderSubtle}`,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }} noWrap>
                  {transaction.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatAccountingDate(transaction.date)} · {transaction.account}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  flexShrink: 0,
                  fontVariantNumeric: "tabular-nums",
                  color: transaction.isDeposit ? hcpColors.successMain : hcpColors.spending,
                }}
              >
                {formatAccountingAmount(transaction.amount, transaction.isDeposit)}
              </Typography>
            </Box>
          ))}
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={applyToFuture}
              onChange={(event) => setApplyToFuture(event.target.checked)}
              size="small"
              sx={{
                color: hcpColors.borderControl,
                "&.Mui-checked": { color: hcpColors.primary },
              }}
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              Remember for future {activeGroup.label.toLowerCase()}
            </Typography>
          }
          sx={{ alignItems: "center", mb: 2, mx: 0 }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
          Pick a category
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {activeGroup.suggestedCategories.map((category) => (
            <Button
              key={category}
              variant="outlined"
              size="small"
              onClick={() => applyCategory(category)}
              sx={chipButtonSx}
            >
              {category}
            </Button>
          ))}
        </Box>

        {!showOtherCategory ? (
          <Button
            variant="text"
            size="small"
            onClick={() => setShowOtherCategory(true)}
            sx={{
              textTransform: "none",
              fontWeight: hcpFontWeight.semibold,
              color: hcpColors.primary,
              px: 0,
              minWidth: 0,
              "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
            }}
          >
            Other category…
          </Button>
        ) : null}

        <Collapse in={showOtherCategory}>
          <Box sx={{ pt: 2, borderTop: `1px solid ${hcpColors.borderSubtle}`, mt: showOtherCategory ? 0 : 0 }}>
            <AccountingCategorySelect
              value={otherCategory}
              onChange={setOtherCategory}
              placeholder="Choose category"
            />
            <Button
              variant="contained"
              disabled={!otherCategory}
              onClick={() => otherCategory && applyCategory(otherCategory)}
              sx={{
                mt: 2,
                borderRadius: hcpRadius.control,
                ...hcpPrimaryButtonSx,
                px: 3,
              }}
            >
              Apply
            </Button>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
