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
import { useEffect, useMemo, useRef, useState } from "react";
import {
  HcpTableCellPrimary,
  HcpTableCellSecondary,
  HcpTableStackedCell,
  HcpTableToolbarIconButton,
  HcpTableToolbarSearchButton,
  HcpTableZoneHeader,
  HCP_STACKED_DATA_GRID_DEFAULTS,
  hcpTableToolbarActionsSx,
} from "../HcpTableChrome";
import { HcpSurfaceCard } from "../HcpSurfaceCard";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { getStragglerUncategorizedCount, type AccountingCategoryRule } from "./accountingCategoryRules";
import { AccountingExportDialog } from "./AccountingExportDialog";
import { ReviewCategoryCell } from "./AccountingReviewCategoryCell";
import { AccountingReviewCategorizer } from "./AccountingReviewCategorizer";
import { AccountingTabPanel } from "./AccountingTabPanel";
import {
  ACCOUNTING_FLOW_FILTERS,
  ACCOUNTING_ZONE_TITLES,
  type AccountingFlowFilter,
} from "./accountingTabs";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import {
  formatAccountingAmount,
  formatAccountingDate,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import { hcpColors, hcpIcon, hcpMenuPaperSx } from "../hcpTheme";

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

type AccountingTransactionsTabProps = {
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  categoryRules: AccountingCategoryRule[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  onCategoryRulesChange: (rules: AccountingCategoryRule[]) => void;
};

export function AccountingTransactionsTab({
  period,
  transactions,
  categoryRules,
  onTransactionsChange,
  onCategoryRulesChange,
}: AccountingTransactionsTabProps) {
  const categorizerRef = useRef<HTMLDivElement>(null);
  const [flowFilter, setFlowFilter] = useState<AccountingFlowFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
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

  const showCategorizer = reviewQueue.length > 0;

  useEffect(() => {
    setPaginationModel((current) => ({ ...current, page: 0 }));
  }, [period.prefix]);

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

  const stragglerCount = useMemo(
    () => getStragglerUncategorizedCount(transactions, period),
    [period, transactions],
  );

  const columns: GridColDef<AccountingTransactionRow>[] = useMemo(
    () => [
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
        flex: 1.8,
        minWidth: 240,
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
      {
        field: "category",
        headerName: "Category",
        flex: 1.1,
        minWidth: 168,
        sortable: false,
        renderCell: ({ row }) => (
          <ReviewCategoryCell
            row={row}
            transactions={transactions}
            period={period}
            categoryRules={categoryRules}
            onTransactionsChange={onTransactionsChange}
            onCategoryRulesChange={onCategoryRulesChange}
          />
        ),
      },
    ],
    [
      categoryRules,
      onCategoryRulesChange,
      onTransactionsChange,
      period,
      transactions,
    ],
  );

  return (
    <AccountingTabPanel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {showCategorizer ? (
          <Box ref={categorizerRef}>
            <AccountingReviewCategorizer
              transactions={transactions}
              period={period}
              categoryRules={categoryRules}
              onTransactionsChange={onTransactionsChange}
              onCategoryRulesChange={onCategoryRulesChange}
            />
          </Box>
        ) : null}

        <HcpSurfaceCard
          flush
          toolbarLeading={<HcpTableZoneHeader label={ACCOUNTING_ZONE_TITLES.register} />}
          toolbarActions={
            <Box sx={hcpTableToolbarActionsSx}>
              <HcpTableToolbarSearchButton
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search transactions"
              />
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
              <HcpTableToolbarIconButton
                tooltip="Export"
                aria-label="Export"
                onClick={() => setExportDialogOpen(true)}
              >
                <DownloadSimple size={hcpIcon.md} weight="regular" />
              </HcpTableToolbarIconButton>
            </Box>
          }
        >
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

          <AccountingExportDialog
            open={exportDialogOpen}
            onClose={() => setExportDialogOpen(false)}
            reviewCount={reviewQueue.length}
            stragglerCount={stragglerCount}
            onReviewNow={() => {
              setExportDialogOpen(false);
              categorizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            onExport={() => setExportDialogOpen(false)}
          />

          <DataGrid
            rows={registerRows}
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
              noRowsLabel: "No transactions match your filters.",
            }}
            sx={{
              ...HCP_STACKED_DATA_GRID_DEFAULTS.sx,
              "& .MuiDataGrid-row:hover": {
                bgcolor: hcpColors.paper,
              },
            }}
          />
        </HcpSurfaceCard>
      </Box>
    </AccountingTabPanel>
  );
}
