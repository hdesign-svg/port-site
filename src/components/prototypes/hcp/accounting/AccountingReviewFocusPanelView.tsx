"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { findCategoryRule, getSimilarReviewTransactions, type AccountingCategoryRule } from "./accountingCategoryRules";
import { getReviewMetaForRow } from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import {
  ACCOUNTING_CATEGORIES,
  formatAccountingAmount,
  formatAccountingDate,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import { useReviewCategoryApply, type CategorizeScope } from "./useReviewCategoryApply";
import {
  HcpTableCellPrimary,
  HcpTableCellSecondary,
  HcpTableStackedCell,
  HCP_STACKED_DATA_GRID_DEFAULTS,
} from "../HcpTableChrome";
import {
  hcpColors,
  hcpFontWeight,
  hcpLayout,
  hcpMenuItemLabelSx,
} from "../hcpTheme";

type AccountingReviewFocusPanelViewProps = {
  rows: AccountingTransactionRow[];
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

function ScopeToggle({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      size="small"
      variant={selected ? "contained" : "outlined"}
      onClick={onSelect}
      sx={{
        flex: 1,
        textTransform: "none",
        fontSize: "0.75rem",
        borderColor: hcpColors.borderControl,
        boxShadow: "none",
        ...(selected
          ? { bgcolor: hcpColors.textPrimary, color: hcpColors.paper, "&:hover": { bgcolor: hcpColors.textPrimary } }
          : {}),
      }}
    >
      {label}
    </Button>
  );
}

export function AccountingReviewFocusPanelView({
  rows,
  transactions,
  period,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: AccountingReviewFocusPanelViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(rows[0]?.id ?? null);
  const [scope, setScope] = useState<CategorizeScope>("this");

  const selectedRow = rows.find((row) => row.id === selectedId) ?? null;
  const { applyToRow } = useReviewCategoryApply({
    transactions,
    period,
    categoryRules,
    onTransactionsChange,
    onCategoryRulesChange,
  });

  useEffect(() => {
    if (rows.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !rows.some((row) => row.id === selectedId)) {
      setSelectedId(rows[0].id);
    }
  }, [rows, selectedId]);

  useEffect(() => {
    setScope("this");
  }, [selectedId]);

  const meta = selectedRow ? getReviewMetaForRow(selectedRow) : null;
  const groupRows = selectedRow
    ? getSimilarReviewTransactions(transactions, period, selectedRow)
    : [];
  const showScope = groupRows.length > 1;
  const existingRule = meta ? findCategoryRule(categoryRules, meta.ruleMatch) : undefined;

  const suggestedCategories = useMemo(() => {
    if (!selectedRow || !meta) {
      return [];
    }
    const suggestions = meta.suggestedCategories.filter((category) => category !== selectedRow.category);
    if (existingRule && !suggestions.includes(existingRule.category)) {
      return [existingRule.category, ...suggestions].slice(0, 3);
    }
    return suggestions;
  }, [existingRule, meta, selectedRow]);

  const restCategories = useMemo(() => {
    const suggestedSet = new Set(suggestedCategories);
    return ACCOUNTING_CATEGORIES.filter((category) => !suggestedSet.has(category));
  }, [suggestedCategories]);

  const handleCategoryPick = (category: AccountingCategory) => {
    if (!selectedRow) {
      return;
    }
    applyToRow(selectedRow, { category, scope });
  };

  const handleRowClick = (params: GridRowParams<AccountingTransactionRow>) => {
    setSelectedId(String(params.id));
  };

  const columns: GridColDef<AccountingTransactionRow>[] = useMemo(
    () => [
      {
        field: "date",
        headerName: "Date",
        flex: 0.7,
        minWidth: 100,
        valueFormatter: (value: string) => formatAccountingDate(value),
        renderCell: ({ formattedValue }) => (
          <HcpTableCellSecondary tabularNums>{formattedValue}</HcpTableCellSecondary>
        ),
      },
      {
        field: "description",
        headerName: "Transaction",
        flex: 1.5,
        minWidth: 180,
        sortable: false,
        renderCell: ({ row }) => (
          <HcpTableStackedCell primary={row.description} secondary={row.account} />
        ),
      },
      {
        field: "amount",
        headerName: "Amount",
        flex: 0.6,
        minWidth: 96,
        align: "right",
        headerAlign: "right",
        renderCell: ({ row }) => (
          <HcpTableCellPrimary
            tabularNums
            sx={{ color: row.isDeposit ? hcpColors.successMain : hcpColors.spending }}
          >
            {formatAccountingAmount(row.amount, row.isDeposit)}
          </HcpTableCellPrimary>
        ),
      },
    ],
    [],
  );

  return (
    <Box sx={{ display: "flex", minHeight: 420, borderTop: `1px solid ${hcpColors.borderSubtle}` }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}
          getRowClassName={(params) =>
            params.id === selectedId ? "focus-panel-selected" : ""
          }
          {...HCP_STACKED_DATA_GRID_DEFAULTS}
          sx={{
            ...HCP_STACKED_DATA_GRID_DEFAULTS.sx,
            height: "100%",
            border: 0,
            cursor: "pointer",
            "& .MuiDataGrid-row.focus-panel-selected": {
              bgcolor: "rgba(14, 111, 190, 0.06)",
            },
            "& .MuiDataGrid-row.focus-panel-selected:hover": {
              bgcolor: "rgba(14, 111, 190, 0.08)",
            },
          }}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          hideFooter
          showCellVerticalBorder={false}
          showColumnVerticalBorder={false}
          localeText={{ noRowsLabel: "Nothing left to review." }}
        />
      </Box>

      <Box
        sx={{
          width: 300,
          flexShrink: 0,
          borderLeft: `1px solid ${hcpColors.borderSubtle}`,
          bgcolor: hcpColors.background,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedRow && meta ? (
          <>
            <Box sx={{ px: 2, py: 1.75, borderBottom: `1px solid ${hcpColors.borderSubtle}` }}>
              <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold, mb: 0.5 }}>
                Categorize
              </Typography>
              <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block" }} noWrap>
                {selectedRow.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  fontVariantNumeric: "tabular-nums",
                  color: selectedRow.isDeposit ? hcpColors.successMain : hcpColors.spending,
                }}
              >
                {formatAccountingAmount(selectedRow.amount, selectedRow.isDeposit)}
              </Typography>
              {showScope ? (
                <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block", mt: 1 }}>
                  {meta.label} · {groupRows.length} in queue
                </Typography>
              ) : null}
            </Box>

            {showScope ? (
              <Box sx={{ px: 2, py: 1.25, display: "flex", gap: 0.75 }}>
                <ScopeToggle
                  label="This one"
                  selected={scope === "this"}
                  onSelect={() => setScope("this")}
                />
                <ScopeToggle
                  label={`All ${groupRows.length}`}
                  selected={scope === "similar"}
                  onSelect={() => setScope("similar")}
                />
              </Box>
            ) : null}

            <Box sx={{ flex: 1, overflowY: "auto", px: 1, py: 0.5 }}>
              {suggestedCategories.length > 0 ? (
                <>
                  <Typography variant="caption" sx={{ px: 1, color: hcpColors.textMuted, display: "block", mb: 0.5 }}>
                    Suggested
                  </Typography>
                  {suggestedCategories.map((category) => (
                    <Button
                      key={category}
                      fullWidth
                      variant="text"
                      onClick={() => handleCategoryPick(category)}
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontSize: "0.875rem",
                        borderRadius: `${hcpLayout.controlRadius}px`,
                        color: hcpColors.textPrimary,
                        "&:hover": { bgcolor: hcpColors.borderSubtle },
                      }}
                    >
                      <Typography variant="body2" sx={hcpMenuItemLabelSx}>
                        {category}
                      </Typography>
                    </Button>
                  ))}
                  <Divider sx={{ my: 0.75 }} />
                </>
              ) : null}
              <Typography variant="caption" sx={{ px: 1, color: hcpColors.textMuted, display: "block", mb: 0.5 }}>
                All categories
              </Typography>
              {restCategories.map((category) => (
                <Button
                  key={category}
                  fullWidth
                  variant="text"
                  onClick={() => handleCategoryPick(category)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontSize: "0.875rem",
                    borderRadius: `${hcpLayout.controlRadius}px`,
                    color: hcpColors.textPrimary,
                    "&:hover": { bgcolor: hcpColors.borderSubtle },
                  }}
                >
                  <Typography variant="body2" sx={hcpMenuItemLabelSx}>
                    {category}
                  </Typography>
                </Button>
              ))}
            </Box>

            {showScope ? (
              <Box sx={{ px: 2, py: 1.5, borderTop: `1px solid ${hcpColors.borderSubtle}` }}>
                <Button
                  fullWidth
                  size="small"
                  variant="text"
                  onClick={() => setScope("always")}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.75rem",
                    color: scope === "always" ? hcpColors.textPrimary : hcpColors.textMuted,
                    fontWeight: scope === "always" ? hcpFontWeight.semibold : hcpFontWeight.regular,
                  }}
                >
                  {scope === "always" ? "✓ " : ""}
                  Always categorize future matches
                </Button>
              </Box>
            ) : null}
          </>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Select a transaction to categorize.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
