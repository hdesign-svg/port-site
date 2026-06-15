"use client";

import { CheckCircle } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  HcpTableToolbarSearchButton,
  HCP_DATA_GRID_ROW_HEIGHT,
  hcpTableStackedCellSx,
  hcpTableToolbarActionsSx,
} from "../HcpTableChrome";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { AccountingFlowFilterToggle } from "./AccountingFlowFilterToggle";
import { AccountingReviewFocus } from "./AccountingReviewFocus";
import { AccountingTabPanel } from "./AccountingTabPanel";
import type { AccountingFlowFilter } from "./accountingTabs";
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
  hcpDataGridToolbarSx,
  hcpFontWeight,
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
};

export function AccountingTransactionsTab({
  activeView,
  period,
  transactions,
  onTransactionsChange,
  readiness,
  onViewReports,
}: AccountingTransactionsTabProps) {
  const [flowFilter, setFlowFilter] = useState<AccountingFlowFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "date", sort: "desc" }]);

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
        renderCell: ({ row }) => (
          <HcpTableCellSecondary>
            {row.category ?? "Uncategorized"}
          </HcpTableCellSecondary>
        ),
      },
    ],
    [],
  );

  if (activeView === "toReview") {
    if (reviewQueue.length === 0) {
      return (
        <AccountingTabPanel>
          <Box
            sx={{
              bgcolor: hcpColors.paper,
              border: `1px solid ${hcpColors.border}`,
              borderRadius: hcpRadius.control,
              px: 3,
              py: 6,
              textAlign: "center",
            }}
          >
            <CheckCircle
              size={40}
              weight="fill"
              color={hcpColors.successMain}
              style={{ marginBottom: 12 }}
            />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: hcpFontWeight.semibold }}>
              {readiness.periodLabel} is ready for your CPA
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, mx: "auto", mb: 3 }}>
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
          </Box>
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
      <Box
        sx={{
          bgcolor: hcpColors.paper,
          border: `1px solid ${hcpColors.border}`,
          borderRadius: hcpRadius.control,
          overflow: "hidden",
        }}
      >
        <Box sx={{ ...hcpDataGridToolbarSx, justifyContent: "flex-end" }}>
          <Box sx={hcpTableToolbarActionsSx}>
            <HcpTableToolbarSearchButton
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search transactions"
            />
            <AccountingFlowFilterToggle value={flowFilter} onChange={handleFlowFilterChange} />
          </Box>
        </Box>

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
      </Box>
    </AccountingTabPanel>
  );
}
