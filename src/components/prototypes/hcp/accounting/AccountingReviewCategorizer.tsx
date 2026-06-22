"use client";

import {
  ArrowDown,
  Receipt,
  Storefront,
  User,
  type Icon,
} from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
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
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import { useReviewCategoryApply } from "./useReviewCategoryApply";
import {
  hcpColors,
  hcpFontWeight,
  hcpIcon,
  hcpMenuItemLabelSx,
  hcpMenuPaperSx,
  hcpRadius,
} from "../hcpTheme";

const TASK_ACCENTS = ["#7C3AED", "#0D9488", "#EA580C", "#64748B", "#2563EB", "#DB2777"] as const;

function formatRuleMatchLabel(ruleMatch: string) {
  if (ruleMatch.length <= 28) {
    return ruleMatch;
  }

  return `${ruleMatch.slice(0, 28)}…`;
}

function groupIcon(ruleMatch: string): Icon {
  const upper = ruleMatch.toUpperCase();

  if (upper.includes("AMAZON") || upper.includes("COSTCO")) {
    return Storefront;
  }

  if (upper.includes("ZELLE") || upper.includes("VENMO")) {
    return User;
  }

  if (upper.includes("DEPOSIT")) {
    return ArrowDown;
  }

  return Receipt;
}

function groupCaption(rows: AccountingTransactionRow[]) {
  const net = rows.reduce((sum, row) => sum + (row.isDeposit ? row.amount : -row.amount), 0);

  if (rows.length === 1) {
    return formatAccountingAmount(rows[0].amount, rows[0].isDeposit);
  }

  const direction = net >= 0 ? "in" : "out";
  return `${rows.length} transactions · ${formatAccountingAmount(Math.abs(net), direction === "in")} ${direction}`;
}

type ReviewTaskCardProps = {
  group: ReviewGroup;
  transactions: AccountingTransactionRow[];
  accent: string;
  selected: boolean;
  onSelect: () => void;
};

function ReviewTaskCard({ group, transactions, accent, selected, onSelect }: ReviewTaskCardProps) {
  const rows = getReviewGroupTransactions(transactions, group);
  const IconComponent = groupIcon(group.ruleMatch);
  const shortLabel = group.label.replace(/ purchases$/i, "");

  return (
    <Box
      component="button"
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${group.label}, ${rows.length} transaction${rows.length === 1 ? "" : "s"}`}
      sx={{
        flex: "1 1 0",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        gap: 0.75,
        px: 2,
        py: 1.75,
        border: 0,
        borderRight: `1px solid ${hcpColors.borderSubtle}`,
        bgcolor: selected ? "rgba(33, 33, 33, 0.03)" : hcpColors.paper,
        cursor: "pointer",
        font: "inherit",
        color: "inherit",
        position: "relative",
        transition: "background-color 150ms ease",
        "&:last-of-type": { borderRight: 0 },
        "&:hover": {
          bgcolor: selected ? "rgba(33, 33, 33, 0.04)" : "rgba(33, 33, 33, 0.02)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: accent,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          bgcolor: `${accent}18`,
          color: accent,
          mt: 0.5,
        }}
      >
        <IconComponent size={hcpIcon.sm} weight="regular" />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: hcpFontWeight.semibold,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.1,
        }}
      >
        {rows.length}
      </Typography>
      <Typography variant="body2" noWrap sx={{ fontWeight: hcpFontWeight.semibold, maxWidth: "100%" }}>
        {shortLabel}
      </Typography>
      <Typography variant="caption" noWrap sx={{ color: hcpColors.textMuted, maxWidth: "100%" }}>
        {groupCaption(rows)}
      </Typography>
    </Box>
  );
}

type CategoryActionRowProps = {
  group: ReviewGroup;
  transactions: AccountingTransactionRow[];
  categoryRules: AccountingCategoryRule[];
  onApply: (row: AccountingTransactionRow, category: AccountingCategory, always: boolean) => void;
};

function CategoryActionRow({ group, transactions, categoryRules, onApply }: CategoryActionRowProps) {
  const groupRows = getReviewGroupTransactions(transactions, group);
  const anchorRow = groupRows[0];
  const existingRule = findCategoryRule(categoryRules, group.ruleMatch);
  const [alwaysRule, setAlwaysRule] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setAlwaysRule(false);
  }, [group.id]);

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

  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        borderTop: `1px solid ${hcpColors.borderSubtle}`,
        bgcolor: hcpColors.paper,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={1.5}
        useFlexGap
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.medium }}>
            Categorize {group.label.toLowerCase()}
          </Typography>
          {existingRule ? (
            <Typography variant="caption" sx={{ color: hcpColors.primary }}>
              Saved rule → {existingRule.category}
            </Typography>
          ) : null}
        </Box>
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75} sx={{ justifyContent: { sm: "flex-end" } }}>
          {suggested.map((category) => (
            <Button
              key={category}
              size="small"
              variant="outlined"
              onClick={() => handlePick(category)}
              sx={{
                textTransform: "none",
                borderRadius: 999,
                px: 1.5,
                py: 0.375,
                fontSize: "0.8125rem",
                borderColor: hcpColors.borderControl,
                color: hcpColors.textPrimary,
                whiteSpace: "nowrap",
              }}
            >
              {category}
            </Button>
          ))}
          <Button
            size="small"
            variant="text"
            onClick={(event: MouseEvent<HTMLButtonElement>) => setMenuAnchor(event.currentTarget)}
            sx={{ textTransform: "none", fontSize: "0.8125rem", color: hcpColors.textSecondary, whiteSpace: "nowrap" }}
          >
            More
          </Button>
        </Stack>
      </Stack>

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
            <Typography variant="caption" sx={{ color: hcpColors.textSecondary }}>
              Always categorize &ldquo;{formatRuleMatchLabel(group.ruleMatch)}&rdquo;
            </Typography>
          }
          sx={{ mt: 1, ml: 0, alignItems: "center" }}
        />
      ) : null}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 220, maxHeight: 280 } } }}
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

type AccountingReviewCategorizerProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

export function AccountingReviewCategorizer({
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: AccountingReviewCategorizerProps) {
  const groups = useMemo(() => buildReviewGroups(transactions, period), [period, transactions]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { applyToRow } = useReviewCategoryApply({
    transactions,
    period,
    categoryRules,
    onTransactionsChange,
    onCategoryRulesChange,
  });

  useEffect(() => {
    setSelectedGroupId(null);
  }, [period.prefix]);

  useEffect(() => {
    if (groups.length === 0) {
      setSelectedGroupId(null);
      return;
    }

    if (!selectedGroupId || !groups.some((group) => group.id === selectedGroupId)) {
      setSelectedGroupId(groups[0].id);
    }
  }, [groups, selectedGroupId]);

  if (groups.length === 0) {
    return null;
  }

  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];

  const handleGroupApply = (
    row: AccountingTransactionRow,
    category: AccountingCategory,
    always: boolean,
  ) => {
    const similarIds = getSimilarReviewTransactionIds(transactions, period, row);
    const scope = always ? "always" : similarIds.length > 1 ? "similar" : "this";
    applyToRow(row, { category, scope });
  };

  return (
    <Box
      component="section"
      aria-label="Review tasks"
      sx={{
        border: `1px solid ${hcpColors.border}`,
        borderRadius: hcpRadius.control,
        overflow: "hidden",
        bgcolor: hcpColors.paper,
        boxShadow: "0 1px 2px rgba(33, 33, 33, 0.04)",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        {groups.map((group, index) => (
          <ReviewTaskCard
            key={group.id}
            group={group}
            transactions={transactions}
            accent={TASK_ACCENTS[index % TASK_ACCENTS.length]}
            selected={group.id === selectedGroup.id}
            onSelect={() => setSelectedGroupId(group.id)}
          />
        ))}
      </Box>

      <CategoryActionRow
        key={selectedGroup.id}
        group={selectedGroup}
        transactions={transactions}
        categoryRules={categoryRules}
        onApply={handleGroupApply}
      />
    </Box>
  );
}
