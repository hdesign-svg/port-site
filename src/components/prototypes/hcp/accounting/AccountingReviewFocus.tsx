"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { HcpTableZoneHeader } from "../HcpTableChrome";
import { HcpSurfaceCard } from "../HcpSurfaceCard";
import { AccountingCategorySelect } from "./AccountingCategorySelect";
import {
  applyReviewGroup,
  buildReviewGroups,
  getReviewGroupTransactions,
  type ApplyReviewGroupInput,
} from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import { ACCOUNTING_ZONE_TITLES } from "./accountingTabs";
import {
  formatAccountingAmount,
  formatAccountingDate,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import {
  hcpColors,
  hcpFontWeight,
  hcpLayout,
  hcpPrimaryButtonSx,
  hcpRadius,
} from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

type AccountingReviewFocusProps = {
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
};

const reviewChipSx = {
  borderRadius: 999,
  textTransform: "none",
  border: `1px solid ${hcpColors.borderControl}`,
  bgcolor: hcpColors.surfaceMuted,
  color: hcpColors.textPrimary,
  minHeight: hcpLayout.chromeControlHeight,
  px: 2,
  fontSize: "0.875rem",
  lineHeight: 1.43,
  fontWeight: hcpFontWeight.regular,
  "&:hover": {
    bgcolor: hcpColors.paper,
    borderColor: hcpColors.borderInput,
  },
} as const;

export function AccountingReviewFocus({
  period,
  transactions,
  onTransactionsChange,
}: AccountingReviewFocusProps) {
  const groups = useMemo(
    () => buildReviewGroups(transactions, period),
    [transactions, period],
  );
  const activeGroup = groups[0] ?? null;
  const activeTransactions = activeGroup
    ? getReviewGroupTransactions(transactions, activeGroup)
    : [];

  const [applyToFuture, setApplyToFuture] = useState(false);
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState<AccountingCategory | null>(null);

  useEffect(() => {
    setApplyToFuture(false);
    setShowOtherCategory(false);
    setOtherCategory(null);
  }, [activeGroup?.id]);

  if (!activeGroup) {
    return null;
  }

  const remainingGroups = groups.length - 1;
  const transactionLabel =
    activeTransactions.length === 1 ? "1 transaction" : `${activeTransactions.length} transactions`;

  const applyCategory = (category: AccountingCategory) => {
    const input: ApplyReviewGroupInput = {
      transactionIds: activeGroup.transactionIds,
      category,
      applyToFuture,
      ruleMatch: activeGroup.ruleMatch,
    };

    onTransactionsChange(applyReviewGroup(transactions, input));
    setApplyToFuture(false);
    setShowOtherCategory(false);
    setOtherCategory(null);
  };

  return (
    <HcpSurfaceCard toolbarLeading={<HcpTableZoneHeader label={ACCOUNTING_ZONE_TITLES.review} />}>
      <Box sx={{ maxWidth: 560, mx: "auto", width: "100%" }}>
        {remainingGroups > 0 ? (
          <Typography
            variant={hcpTypographyRoles.caption}
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            {remainingGroups === 1 ? "1 group left after this" : `${remainingGroups} groups left after this`}
          </Typography>
        ) : null}

        <Typography variant={hcpTypographyRoles.sectionTitle} sx={{ fontWeight: hcpFontWeight.semibold, mb: 0.5 }}>
          {activeGroup.label}
        </Typography>
        <Typography variant={hcpTypographyRoles.labelSecondary} color="text.secondary" sx={{ mb: 2 }}>
          {transactionLabel}
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

        <Typography variant={hcpTypographyRoles.labelSecondary} color="text.secondary" sx={{ mb: 1.25 }}>
          Pick a category
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {activeGroup.suggestedCategories.map((category) => (
            <Button
              key={category}
              variant="outlined"
              size="small"
              onClick={() => applyCategory(category)}
              sx={reviewChipSx}
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
          <Box sx={{ pt: 2, borderTop: `1px solid ${hcpColors.borderSubtle}` }}>
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
    </HcpSurfaceCard>
  );
}
