"use client";

import { DownloadSimple, FunnelSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import {
  HcpTableCellPrimary,
  HcpTableCellSecondary,
  HcpTableStackedCell,
  HcpTableToolbarIconButton,
  HcpTableToolbarSearchButton,
  hcpTableToolbarLeadingSx,
  HCP_DATA_GRID_STACKED_ROW_HEIGHT,
  HCP_STACKED_DATA_GRID_DEFAULTS,
  hcpTableToolbarActionsSx,
} from "../HcpTableChrome";
import { HcpSegmentControl } from "../HcpSegmentControl";
import { HcpSurfaceCard } from "../HcpSurfaceCard";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { ReviewCategoryCell } from "./AccountingReviewCategoryCell";
import { AccountingTabPanel } from "./AccountingTabPanel";
import {
  ACCOUNTING_FLOW_FILTERS,
  type AccountingFlowFilter,
} from "./accountingTabs";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewMetaForRow } from "./accountingReviewGroups";
import { getReviewQueueTransactions } from "./accountingReadiness";
import {
  formatAccountingAmount,
  formatAccountingDate,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import { hcpColors, hcpIcon, hcpMenuPaperSx } from "../hcpTheme";

type RegisterView = "toReview" | "all";

function filterBySearch(rows: AccountingTransactionRow[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return rows;
  }

  return rows.filter((row) => {
    const haystack = [row.description, row.account, row.category ?? "uncategorized"]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

function TransactionCell({ row }: { row: AccountingTransactionRow }) {
  return <HcpTableStackedCell primary={row.description} secondary={row.account} />;
}

function filterByFlow(rows: AccountingTransactionRow[], flow: AccountingFlowFilter) {
  if (flow === "all") {
    return rows;
  }

  if (flow === "in") {
    return rows.filter((row) => row.isDeposit);
  }

  return rows.filter((row) => !row.isDeposit);
}

type RegisterViewSegmentsProps = {
  value: RegisterView;
  reviewCount: number;
  onChange: (view: RegisterView) => void;
};

function RegisterViewSegments({ value, reviewCount, onChange }: RegisterViewSegmentsProps) {
  return (
    <HcpSegmentControl
      value={value}
      onChange={onChange}
      aria-label="Register view"
      options={[
        {
          value: "toReview",
          label: (
            <>
              To review
              {reviewCount > 0 ? (
                <Box
                  component="span"
                  sx={{ ml: 0.5, fontVariantNumeric: "tabular-nums" }}
                >
                  ({reviewCount})
                </Box>
              ) : null}
            </>
          ),
          disabled: reviewCount === 0,
          "aria-label":
            reviewCount > 0 ? `To review, ${reviewCount} transactions` : "To review",
        },
        {
          value: "all",
          label: "All transactions",
          "aria-label": "All transactions",
        },
      ]}
    />
  );
}

type AccountingTransactionsTabProps = {
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
};

export function AccountingTransactionsTab({
  period,
  transactions,
  onTransactionsChange,
}: AccountingTransactionsTabProps) {
  const [registerView, setRegisterView] = useState<RegisterView>("all");
  const [flowFilter, setFlowFilter] = useState<AccountingFlowFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "date", sort: "desc" }]);

  const filterMenuOpen = Boolean(filterMenuAnchor);
  const filterOption =
    ACCOUNTING_FLOW_FILTERS.find((option) => option.id === flowFilter) ?? ACCOUNTING_FLOW_FILTERS[0];
  const filterAriaLabel =
    flowFilter === "all" ? "Filter" : `Filter: ${filterOption.label}`;

  const reviewQueue = useMemo(
    () => getReviewQueueTransactions(transactions, period),
    [transactions, period],
  );

  const isReviewView = registerView === "toReview" && reviewQueue.length > 0;

  useEffect(() => {
    setPaginationModel((current) => ({ ...current, page: 0 }));
  }, [period.prefix]);

  useEffect(() => {
    setRegisterView(reviewQueue.length > 0 ? "toReview" : "all");
  }, [period.prefix]);

  useEffect(() => {
    if (reviewQueue.length === 0) {
      setRegisterView("all");
    }
  }, [reviewQueue.length]);

  useEffect(() => {
    setPaginationModel((current) => ({ ...current, page: 0 }));
  }, [registerView]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  const handleFlowFilterChange = (value: AccountingFlowFilter) => {
    setFlowFilter(value);
    setFilterMenuAnchor(null);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  const periodTransactions = useMemo(
    () => transactions.filter((row) => row.date.startsWith(period.prefix)),
    [transactions, period.prefix],
  );

  const registerRows = useMemo(() => {
    let rows = periodTransactions;
    rows = filterByFlow(rows, flowFilter);
    rows = filterBySearch(rows, searchQuery);
    return rows;
  }, [flowFilter, periodTransactions, searchQuery]);

  const reviewRows = useMemo(
    () => filterBySearch(reviewQueue, searchQuery),
    [reviewQueue, searchQuery],
  );

  const gridRows = isReviewView ? reviewRows : registerRows;

  const columns: GridColDef<AccountingTransactionRow>[] = useMemo(() => {
    const shared: GridColDef<AccountingTransactionRow>[] = [
      {
        field: "date",
        headerName: "Date",
        flex: 0.8,
        minWidth: 120,
        valueFormatter: (value: string) => formatAccountingDate(value),
        renderCell: ({ formattedValue }) => (
          <HcpTableCellSecondary tabularNums>{formattedValue}</HcpTableCellSecondary>
        ),
      },
      {
        field: "description",
        headerName: "Transaction",
        flex: isReviewView ? 1.6 : 1.8,
        minWidth: 220,
        sortable: false,
        renderCell: ({ row }) => <TransactionCell row={row} />,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        flex: 0.75,
        minWidth: 112,
        align: "right",
        headerAlign: "right",
        renderCell: ({ row }) => (
          <HcpTableCellPrimary
            tabularNums
            sx={{
              color: row.isDeposit ? hcpColors.successMain : hcpColors.spending,
            }}
          >
            {formatAccountingAmount(row.amount, row.isDeposit)}
          </HcpTableCellPrimary>
        ),
      },
    ];

    if (isReviewView) {
      return [
        ...shared,
        {
          field: "group",
          headerName: "Group",
          flex: 1,
          minWidth: 160,
          sortable: false,
          valueGetter: (_value, row) => getReviewMetaForRow(row).label,
          renderCell: ({ row }) => (
            <HcpTableCellSecondary noWrap>{getReviewMetaForRow(row).label}</HcpTableCellSecondary>
          ),
        },
        {
          field: "category",
          headerName: "Category",
          flex: 1.35,
          minWidth: 240,
          sortable: false,
          renderCell: ({ row }) => (
            <ReviewCategoryCell
              row={row}
              transactions={transactions}
              onTransactionsChange={onTransactionsChange}
            />
          ),
        },
      ];
    }

    return [
      ...shared,
      {
        field: "category",
        headerName: "Category",
        flex: 1.1,
        minWidth: 168,
        sortable: false,
        renderCell: ({ row }) => {
          if (row.category === null) {
            return (
              <HcpTableCellSecondary sx={{ color: hcpColors.textMuted, fontStyle: "italic" }}>
                Uncategorized
              </HcpTableCellSecondary>
            );
          }

          return <HcpTableCellSecondary>{row.category}</HcpTableCellSecondary>;
        },
      },
    ];
  }, [isReviewView, onTransactionsChange, transactions]);

  return (
    <AccountingTabPanel>
      <HcpSurfaceCard
        flush
        toolbarLeading={
          <Box sx={hcpTableToolbarLeadingSx}>
            <RegisterViewSegments
              value={isReviewView ? "toReview" : registerView}
              reviewCount={reviewQueue.length}
              onChange={setRegisterView}
            />
          </Box>
        }
        toolbarActions={
          <Box sx={hcpTableToolbarActionsSx}>
            <HcpTableToolbarSearchButton
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search transactions"
            />
            {!isReviewView ? (
              <>
                <HcpTableToolbarIconButton
                  tooltip={filterAriaLabel}
                  aria-label={filterAriaLabel}
                  aria-haspopup="menu"
                  aria-expanded={filterMenuOpen ? "true" : undefined}
                  aria-controls={filterMenuOpen ? "accounting-flow-filter-menu" : undefined}
                  active={flowFilter !== "all"}
                  onClick={(event) => setFilterMenuAnchor(event.currentTarget)}
                >
                  <FunnelSimple size={hcpIcon.md} weight="regular" />
                </HcpTableToolbarIconButton>
                <HcpTableToolbarIconButton tooltip="Export" aria-label="Export">
                  <DownloadSimple size={hcpIcon.md} weight="regular" />
                </HcpTableToolbarIconButton>
              </>
            ) : null}
          </Box>
        }
      >
        {!isReviewView ? (
          <Menu
            id="accounting-flow-filter-menu"
            anchorEl={filterMenuAnchor}
            open={filterMenuOpen}
            onClose={() => setFilterMenuAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ paper: { sx: hcpMenuPaperSx } }}
          >
            {ACCOUNTING_FLOW_FILTERS.map((option) => (
              <MenuItem
                key={option.id}
                selected={flowFilter === option.id}
                onClick={() => handleFlowFilterChange(option.id)}
                sx={{ py: 1 }}
              >
                <Typography variant="body2">{option.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        ) : null}

        <DataGrid
          rows={gridRows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          showCellVerticalBorder={false}
          showColumnVerticalBorder={false}
          paginationMode="client"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          pageSizeOptions={[10, 25, 50]}
          {...HCP_STACKED_DATA_GRID_DEFAULTS}
          slotProps={{
            basePagination: {
              material: {
                ActionsComponent: HcpTablePaginationActions,
                labelRowsPerPage: "Rows per page:",
              },
            },
          }}
          localeText={{
            noRowsLabel: isReviewView
              ? "Nothing left to review."
              : "No transactions match your filters.",
          }}
          getRowHeight={isReviewView ? () => "auto" : undefined}
          sx={
            isReviewView
              ? {
                  ...HCP_STACKED_DATA_GRID_DEFAULTS.sx,
                  "& .MuiDataGrid-row": {
                    maxHeight: "none !important",
                    minHeight: `${HCP_DATA_GRID_STACKED_ROW_HEIGHT}px !important`,
                  },
                  "& .MuiDataGrid-cell": {
                    maxHeight: "none !important",
                    alignItems: "flex-start",
                    py: 1,
                  },
                }
              : HCP_STACKED_DATA_GRID_DEFAULTS.sx
          }
        />
      </HcpSurfaceCard>
    </AccountingTabPanel>
  );
}
