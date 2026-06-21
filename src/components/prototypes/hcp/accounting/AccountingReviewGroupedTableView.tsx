"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useMemo, useState, type MouseEvent } from "react";
import { AccountingCategoryCellTrigger } from "./AccountingCategoryCellTrigger";
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
  HcpTableCellPrimary,
  HcpTableCellSecondary,
  HcpTableStackedCell,
} from "../HcpTableChrome";
import {
  HCP_DATA_GRID_ROW_HEIGHT,
  HCP_DATA_GRID_STACKED_ROW_HEIGHT,
  hcpColors,
  hcpContentSpacing,
  hcpFontWeight,
  hcpMenuItemLabelSx,
  hcpMenuPaperSx,
  hcpRadius,
} from "../hcpTheme";

const SUB_TABLE_COLUMNS = "minmax(120px, 0.8fr) minmax(240px, 1.8fr) minmax(112px, 0.75fr)";
const CELL_PX = `${hcpContentSpacing.surfaceInsetX}px`;
const GROUP_HEADER_ZEBRA = "rgba(33, 33, 33, 0.03)";

const subTableRowSx = {
  display: "grid",
  gridTemplateColumns: SUB_TABLE_COLUMNS,
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
} as const;

const subTableCellSx = {
  minWidth: 0,
  px: CELL_PX,
  overflow: "hidden",
} as const;

function formatRuleMatchLabel(ruleMatch: string) {
  if (ruleMatch.length <= 24) {
    return ruleMatch;
  }
  return `${ruleMatch.slice(0, 24)}…`;
}

type GroupCategoryMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  suggested: AccountingCategory[];
  restCategories: AccountingCategory[];
  showAlwaysRule: boolean;
  ruleMatchLabel: string;
  onSelect: (category: AccountingCategory, always: boolean) => void;
};

function GroupCategoryMenu({
  anchorEl,
  open,
  onClose,
  suggested,
  restCategories,
  showAlwaysRule,
  ruleMatchLabel,
  onSelect,
}: GroupCategoryMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 240, maxHeight: 360 } } }}
    >
      {suggested.length > 0 ? (
        <>
          <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Suggested
            </Typography>
          </Box>
          {suggested.map((category) => (
            <MenuItem key={category} onClick={() => onSelect(category, false)} sx={{ py: 0.875 }}>
              <Typography variant="body2" sx={hcpMenuItemLabelSx}>
                {category}
              </Typography>
            </MenuItem>
          ))}
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ px: 1.5, pt: 0.5, pb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              All categories
            </Typography>
          </Box>
        </>
      ) : null}
      {(suggested.length > 0 ? restCategories : ACCOUNTING_CATEGORIES.filter((c) => !suggested.includes(c))).map(
        (category) => (
          <MenuItem key={category} onClick={() => onSelect(category, false)} sx={{ py: 0.875 }}>
            <Typography variant="body2" sx={hcpMenuItemLabelSx}>
              {category}
            </Typography>
          </MenuItem>
        ),
      )}
      {showAlwaysRule ? (
        <>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ px: 1.5, pt: 0.5, pb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Always categorize &ldquo;{ruleMatchLabel}&rdquo;
            </Typography>
          </Box>
          {[...suggested, ...restCategories].slice(0, 6).map((category) => (
            <MenuItem key={`always-${category}`} onClick={() => onSelect(category, true)} sx={{ py: 0.875 }}>
              <Typography variant="body2" sx={hcpMenuItemLabelSx}>
                {category}
              </Typography>
            </MenuItem>
          ))}
        </>
      ) : null}
    </Menu>
  );
}

type VendorGroupTableSectionProps = {
  group: ReviewGroup;
  groupIndex: number;
  transactions: AccountingTransactionRow[];
  categoryRules: AccountingCategoryRule[];
  onApply: (row: AccountingTransactionRow, category: AccountingCategory, always: boolean) => void;
};

function VendorGroupTableSection({
  group,
  groupIndex,
  transactions,
  categoryRules,
  onApply,
}: VendorGroupTableSectionProps) {
  const groupRows = getReviewGroupTransactions(transactions, group);
  const anchorRow = groupRows[0];
  const existingRule = findCategoryRule(categoryRules, group.ruleMatch);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  if (!anchorRow) {
    return null;
  }

  const suggested = group.suggestedCategories.slice(0, 3);
  const suggestedSet = new Set(suggested);
  const restCategories = ACCOUNTING_CATEGORIES.filter((category) => !suggestedSet.has(category));
  const showAlwaysRule = groupRows.length > 1;
  const isZebraHeader = groupIndex % 2 === 0;

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleSelect = (category: AccountingCategory, always: boolean) => {
    onApply(anchorRow, category, always);
    setMenuAnchor(null);
  };

  return (
    <Box
      component="section"
      aria-label={group.label}
      sx={{
        border: `1px solid ${hcpColors.border}`,
        borderRadius: hcpRadius.control,
        overflow: "hidden",
        bgcolor: hcpColors.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: CELL_PX,
          boxSizing: "border-box",
          minHeight: HCP_DATA_GRID_ROW_HEIGHT,
          borderBottom: `1px solid ${hcpColors.borderSubtle}`,
          bgcolor: isZebraHeader ? GROUP_HEADER_ZEBRA : hcpColors.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 0.75,
            minWidth: 0,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold, lineHeight: 1.3 }}>
            {group.label}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: hcpColors.textMuted,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            {groupRows.length}
          </Typography>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <AccountingCategoryCellTrigger
            category={null}
            hasRule={Boolean(existingRule)}
            onClick={openMenu}
            onMouseDown={(event) => event.stopPropagation()}
          />
        </Box>
      </Box>

      {groupRows.map((row, rowIndex) => (
        <Box
          key={row.id}
          sx={{
            ...subTableRowSx,
            minHeight: HCP_DATA_GRID_STACKED_ROW_HEIGHT,
            bgcolor: hcpColors.paper,
            borderBottom:
              rowIndex === groupRows.length - 1 ? 0 : `1px solid ${hcpColors.borderSubtle}`,
            "&:hover": { bgcolor: "rgba(33, 33, 33, 0.02)" },
          }}
        >
          <Box sx={subTableCellSx}>
            <HcpTableCellSecondary tabularNums>{formatAccountingDate(row.date)}</HcpTableCellSecondary>
          </Box>
          <Box sx={subTableCellSx}>
            <HcpTableStackedCell primary={row.description} secondary={row.account} />
          </Box>
          <Box sx={{ ...subTableCellSx, textAlign: "right" }}>
            <HcpTableCellPrimary
              tabularNums
              sx={{
                color: row.isDeposit ? hcpColors.successMain : hcpColors.spending,
              }}
            >
              {formatAccountingAmount(row.amount, row.isDeposit)}
            </HcpTableCellPrimary>
          </Box>
        </Box>
      ))}

      <GroupCategoryMenu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        suggested={suggested}
        restCategories={restCategories}
        showAlwaysRule={showAlwaysRule}
        ruleMatchLabel={formatRuleMatchLabel(group.ruleMatch)}
        onSelect={handleSelect}
      />
    </Box>
  );
}

type AccountingReviewGroupedTableViewProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

export function AccountingReviewGroupedTableView({
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: AccountingReviewGroupedTableViewProps) {
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
      <Box sx={{ px: CELL_PX, py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Nothing left to review.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        px: 2,
        py: 2,
        fontSize: "0.875rem",
      }}
    >
      {groups.map((group, index) => (
        <VendorGroupTableSection
          key={group.id}
          group={group}
          groupIndex={index}
          transactions={transactions}
          categoryRules={categoryRules}
          onApply={handleGroupApply}
        />
      ))}
    </Box>
  );
}
