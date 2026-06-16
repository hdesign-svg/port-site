"use client";

import { CheckCircle, DownloadSimple, FunnelSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  HcpTableToolbarIconButton,
  HcpTableToolbarSearchButton,
  HcpTableZoneHeader,
  HCP_DATA_GRID_ROW_HEIGHT,
  hcpTableStackedCellSx,
} from "../HcpTableChrome";
import { HcpSurfaceCard } from "../HcpSurfaceCard";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { AccountingReviewFocus } from "./AccountingReviewFocus";
import { AccountingTabPanel } from "./AccountingTabPanel";
import {
  ACCOUNTING_FLOW_FILTERS,
  ACCOUNTING_ZONE_TITLES,
  type AccountingFlowFilter,
} from "./accountingTabs";
import type { AccountingPeriod } from "./accountingPeriods";
import type { AccountingReadiness } from "./accountingReadiness";
import { getReviewQueueTransactions } from "./accountingReadiness";
import {
  formatAccountingAmount,
  formatAccountingDate,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import {
  hcpColors,
  hcpDataGridSx,
  hcpFontWeight,
  hcpIcon,
  hcpMenuPaperSx,
  hcpPrimaryButtonSx,
  hcpRadius,
} from "../hcpTheme";

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
  return (
    <Box sx={hcpTableStackedCellSx}>
      <HcpTableCellPrimary>{row.description}</HcpTableCellPrimary>
      <HcpTableCellSecondary>{row.account}</HcpTableCellSecondary>
    </Box>
  );
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
  activeView: "toReview" | "all";
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
  readiness: AccountingReadiness;
  onViewReports?: () => void;
  onSwitchToTransactions?: () => void;
};

export function AccountingTransactionsTab({
  activeView,
  period,
  transactions,
  onTransactionsChange,
  readiness,
  onViewReports,
  onSwitchToTransactions,
}: AccountingTransactionsTabProps) {
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

  const allRows = useMemo(() => {
    let rows = periodTransactions;
    rows = filterByFlow(rows, flowFilter);
    rows = filterBySearch(rows, searchQuery);
    return rows;
  }, [flowFilter, periodTransactions, searchQuery]);

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
          <Typography
            variant="body1"
            component="span"
            noWrap
            sx={{
              fontVariantNumeric: "tabular-nums",
              color: row.isDeposit ? hcpColors.successMain : hcpColors.spending,
            }}
          >
            {formatAccountingAmount(row.amount, row.isDeposit)}
          </Typography>
        ),
      },
      {
        field: "category",
        headerName: "Category",
        flex: 1.1,
        minWidth: 168,
        sortable: false,
        renderCell: ({ row }) => {
          if (row.category === null) {
            return (
              <Typography
                variant="body2"
                component="span"
                noWrap
                sx={{ color: hcpColors.textMuted, fontStyle: "italic" }}
              >
                Uncategorized
              </Typography>
            );
          }

          return <HcpTableCellSecondary>{row.category}</HcpTableCellSecondary>;
        },
      },
    ],
    [],
  );

  if (activeView === "toReview") {
    if (reviewQueue.length === 0) {
      return (
        <AccountingTabPanel>
          <HcpSurfaceCard toolbarLeading={<HcpTableZoneHeader label={ACCOUNTING_ZONE_TITLES.review} />}>
            <Box sx={{ py: 4, textAlign: "center" }}>
              {period.isCurrent ? (
                <>
                  <CheckCircle
                    size={40}
                    weight="fill"
                    color={hcpColors.successMain}
                    style={{ marginBottom: 12 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: hcpFontWeight.semibold }}>
                    {readiness.periodLabel} is ready for your CPA
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 360, mx: "auto", mb: 3 }}
                  >
                    Every recent transaction is categorized. View your profit & loss or switch to
                    Transactions to audit anytime.
                  </Typography>
                  {onViewReports ? (
                    <Button
                      variant="contained"
                      onClick={onViewReports}
                      sx={{
                        borderRadius: hcpRadius.control,
                        ...hcpPrimaryButtonSx,
                        px: 3,
                      }}
                    >
                      View profit & loss
                    </Button>
                  ) : null}
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: hcpFontWeight.semibold }}>
                    Nothing to review for {period.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 360, mx: "auto", mb: 3 }}
                  >
                    Review is only for recent activity in the current month. Open the register to
                    audit {period.label} anytime.
                  </Typography>
                  {onSwitchToTransactions ? (
                    <Button
                      variant="contained"
                      onClick={onSwitchToTransactions}
                      sx={{
                        borderRadius: hcpRadius.control,
                        ...hcpPrimaryButtonSx,
                        px: 3,
                      }}
                    >
                      View register
                    </Button>
                  ) : null}
                </>
              )}
            </Box>
          </HcpSurfaceCard>
        </AccountingTabPanel>
      );
    }

    return (
      <AccountingTabPanel>
        <AccountingReviewFocus
          period={period}
          transactions={transactions}
          onTransactionsChange={onTransactionsChange}
        />
      </AccountingTabPanel>
    );
  }

  return (
    <AccountingTabPanel>
      <HcpSurfaceCard
        flush
        toolbarLeading={<HcpTableZoneHeader label={ACCOUNTING_ZONE_TITLES.register} />}
        toolbarActions={
          <>
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
            <HcpTableToolbarIconButton tooltip="Export" aria-label="Export">
              <DownloadSimple size={hcpIcon.md} weight="regular" />
            </HcpTableToolbarIconButton>
          </>
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

        <DataGrid
          rows={allRows}
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
          rowHeight={HCP_DATA_GRID_ROW_HEIGHT}
          columnHeaderHeight={48}
          sx={hcpDataGridSx}
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
        />
      </HcpSurfaceCard>
    </AccountingTabPanel>
  );
}
