"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { getSimilarReviewTransactionIds, type AccountingCategoryRule } from "./accountingCategoryRules";
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
import { HcpTableCellPrimary, HcpTableStackedCell } from "../HcpTableChrome";
import {
  hcpColors,
  hcpContentSpacing,
  hcpFontWeight,
  hcpMenuItemLabelSx,
  hcpMenuPaperSx,
  hcpRadius,
} from "../hcpTheme";

type GroupCategoryMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  categories: AccountingCategory[];
  onSelect: (category: AccountingCategory) => void;
};

function GroupCategoryMenu({ anchorEl, open, onClose, categories, onSelect }: GroupCategoryMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 240, maxHeight: 320 } } }}
    >
      {categories.map((category) => (
        <MenuItem key={category} onClick={() => onSelect(category)} sx={{ py: 0.875 }}>
          <Typography variant="body2" sx={hcpMenuItemLabelSx}>
            {category}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

type FocusGroupCardProps = {
  group: ReviewGroup;
  transactions: AccountingTransactionRow[];
  exiting: boolean;
  onApply: (category: AccountingCategory) => void;
};

function FocusGroupCard({ group, transactions, exiting, onApply }: FocusGroupCardProps) {
  const groupRows = getReviewGroupTransactions(transactions, group);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const suggested = group.suggestedCategories.slice(0, 3);
  const suggestedSet = new Set(suggested);
  const restCategories = ACCOUNTING_CATEGORIES.filter((category) => !suggestedSet.has(category));

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: 560,
        width: "100%",
        px: 2,
        py: 3,
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(-8px)" : "none",
        transition: "opacity 0.28s ease, transform 0.28s ease",
      }}
    >
      <Box
        sx={{
          border: `1px solid ${hcpColors.border}`,
          borderRadius: hcpRadius.control,
          bgcolor: hcpColors.paper,
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Typography variant="caption" sx={{ color: hcpColors.textMuted }}>
            Vendor group
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: hcpFontWeight.semibold, mt: 0.5 }}>
            {group.label}
          </Typography>
          <Typography variant="body2" sx={{ color: hcpColors.textSecondary, mt: 0.5 }}>
            {groupRows.length} transaction{groupRows.length === 1 ? "" : "s"} · pick one category for all
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ px: 3, py: 2 }}>
          {groupRows.map((row) => (
            <Box
              key={row.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: 2,
                py: 1,
                borderBottom: `1px solid ${hcpColors.borderSubtle}`,
                "&:last-of-type": { borderBottom: 0 },
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <HcpTableStackedCell
                  primary={row.description}
                  secondary={`${formatAccountingDate(row.date)} · ${row.account}`}
                />
              </Box>
              <HcpTableCellPrimary
                tabularNums
                sx={{
                  alignSelf: "center",
                  color: row.isDeposit ? hcpColors.successMain : hcpColors.spending,
                }}
              >
                {formatAccountingAmount(row.amount, row.isDeposit)}
              </HcpTableCellPrimary>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: hcpColors.background,
            borderTop: `1px solid ${hcpColors.borderSubtle}`,
          }}
        >
          <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block", mb: 1.25 }}>
            Suggested categories
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {suggested.map((category) => (
              <Button
                key={category}
                size="small"
                variant="outlined"
                disabled={exiting}
                onClick={() => onApply(category)}
                sx={{
                  textTransform: "none",
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
              disabled={exiting}
              onClick={(event: MouseEvent<HTMLButtonElement>) => setMenuAnchor(event.currentTarget)}
              sx={{ textTransform: "none", color: hcpColors.textSecondary }}
            >
              More
            </Button>
          </Box>
        </Box>
      </Box>

      <GroupCategoryMenu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        categories={restCategories}
        onSelect={(category) => {
          onApply(category);
          setMenuAnchor(null);
        }}
      />
    </Box>
  );
}

type AccountingReviewFocusViewProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

export function AccountingReviewFocusView({
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: AccountingReviewFocusViewProps) {
  const groups = useMemo(() => buildReviewGroups(transactions, period), [period, transactions]);
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const { applyToRow } = useReviewCategoryApply({
    transactions,
    period,
    categoryRules,
    onTransactionsChange,
    onCategoryRulesChange,
  });

  useEffect(() => {
    if (index >= groups.length) {
      setIndex(Math.max(0, groups.length - 1));
    }
    setExiting(false);
  }, [groups.length, index]);

  if (groups.length === 0) {
    return (
      <Box sx={{ px: 3, py: 6, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Nothing left to review in focus mode.
        </Typography>
      </Box>
    );
  }

  const group = groups[Math.min(index, groups.length - 1)];
  const anchorRow = getReviewGroupTransactions(transactions, group)[0];

  const handleApply = (category: AccountingCategory) => {
    if (!anchorRow) {
      return;
    }

    setExiting(true);
    const similarIds = getSimilarReviewTransactionIds(transactions, period, anchorRow);
    const scope = similarIds.length > 1 ? "similar" : "this";

    window.setTimeout(() => {
      applyToRow(anchorRow, { category, scope });
      setIndex((current) => current + 1);
    }, 260);
  };

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: `${hcpContentSpacing.surfaceInsetX}px`,
          pb: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: hcpColors.textMuted, fontVariantNumeric: "tabular-nums" }}>
          {Math.min(index + 1, groups.length)} of {groups.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.75 }}>
          {groups.map((item, dotIndex) => (
            <Box
              key={item.id}
              aria-hidden
              sx={{
                height: 6,
                width: dotIndex === index ? 24 : 6,
                borderRadius: 999,
                bgcolor:
                  dotIndex < index
                    ? hcpColors.successMain
                    : dotIndex === index
                      ? hcpColors.primary
                      : hcpColors.borderSubtle,
                transition: "width 0.2s ease, background-color 0.2s ease",
              }}
            />
          ))}
        </Box>
      </Box>

      <FocusGroupCard
        key={group.id}
        group={group}
        transactions={transactions}
        exiting={exiting}
        onApply={handleApply}
      />

      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          color: hcpColors.textMuted,
          mt: 2,
          px: 2,
        }}
      >
        Categorized groups move into All transactions.
      </Typography>
    </Box>
  );
}
