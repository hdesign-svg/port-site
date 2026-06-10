"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { HcpSearchField } from "../HcpSearchField";
import {
  HcpTableCellPrimary,
  HcpTableCellSecondary,
  HcpTableZoneHeader,
  HCP_DATA_GRID_STACKED_ROW_HEIGHT,
  hcpTableStackedCellSx,
  hcpTableToolbarLeadingSx,
} from "../HcpTableChrome";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { ExpensesTabPanel } from "./ExpensesTabPanel";
import {
  expensesTransactions,
  formatTransactionAmount,
  formatTransactionDate,
  type ExpensesTransactionRow,
} from "./expensesTransactionsData";
import {
  hcpChromeActionButtonSx,
  hcpColors,
  hcpDataGridSx,
  hcpDataGridToolbarSx,
  hcpIcon,
  hcpLayout,
  hcpRadius,
} from "../hcpTheme";

function filterRows(rows: ExpensesTransactionRow[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return rows;
  }

  return rows.filter((row) => {
    const haystack = [
      row.date,
      row.description,
      row.descriptionMeta,
      row.method,
      row.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

function DescriptionCell({ row }: { row: ExpensesTransactionRow }) {
  return (
    <Box sx={hcpTableStackedCellSx}>
      <HcpTableCellPrimary>{row.description}</HcpTableCellPrimary>
      {row.descriptionMeta ? (
        <HcpTableCellSecondary>{row.descriptionMeta}</HcpTableCellSecondary>
      ) : null}
    </Box>
  );
}

const transactionColumns: GridColDef<ExpensesTransactionRow>[] = [
  {
    field: "date",
    headerName: "Date",
    flex: 0.75,
    minWidth: 120,
    valueFormatter: (value: string) => formatTransactionDate(value),
    renderCell: ({ formattedValue }) => (
      <HcpTableCellSecondary>{formattedValue}</HcpTableCellSecondary>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1.8,
    minWidth: 220,
    sortable: false,
    renderCell: ({ row }) => <DescriptionCell row={row} />,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 0.95,
    minWidth: 128,
    renderCell: ({ value }) => <HcpTableCellSecondary>{value}</HcpTableCellSecondary>,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    flex: 0.85,
    minWidth: 120,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <HcpTableCellPrimary tabularNums>
        {formatTransactionAmount(row.amount, row.isDeposit)}
      </HcpTableCellPrimary>
    ),
  },
];

export function ExpensesTransactionsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "date", sort: "desc" }]);

  const visibleRows = useMemo(
    () => filterRows(expensesTransactions, searchQuery),
    [searchQuery],
  );

  const transactionCountLabel = `${visibleRows.length} ${
    visibleRows.length === 1 ? "transaction" : "transactions"
  }`;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  return (
    <ExpensesTabPanel>
      <Box
        sx={{
          bgcolor: hcpColors.paper,
          border: `1px solid ${hcpColors.border}`,
          borderRadius: hcpRadius.control,
          overflow: "hidden",
        }}
      >
        <Box sx={hcpDataGridToolbarSx}>
          <Box sx={hcpTableToolbarLeadingSx}>
            <HcpTableZoneHeader label={transactionCountLabel} />
            <HcpSearchField
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              sx={{ width: { xs: "100%", sm: hcpLayout.searchFieldWidth } }}
            />
          </Box>

          <Button
            variant="text"
            startIcon={<DownloadSimple size={hcpIcon.sm} weight="regular" />}
            sx={hcpChromeActionButtonSx}
          >
            Export
          </Button>
        </Box>

        <DataGrid
          rows={visibleRows}
          columns={transactionColumns}
          autoHeight
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          showCellVerticalBorder={false}
          showColumnVerticalBorder={false}
          sortingMode="client"
          paginationMode="client"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          pageSizeOptions={[10, 25, 50]}
          rowHeight={HCP_DATA_GRID_STACKED_ROW_HEIGHT}
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
        />
      </Box>
    </ExpensesTabPanel>
  );
}
