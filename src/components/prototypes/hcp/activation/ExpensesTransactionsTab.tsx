"use client";

import { DownloadSimple, FunnelSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { HcpSearchField } from "../HcpSearchField";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import {
  expensesTransactions,
  formatTransactionAmount,
  formatTransactionDate,
  type ExpensesTransactionRow,
} from "./expensesTransactionsData";
import {
  hcpChromeActionButtonSx,
  hcpColors,
  hcpContentBlockStackSx,
  hcpContentHeaderSx,
  hcpContentSpacing,
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

const transactionColumns: GridColDef<ExpensesTransactionRow>[] = [
  {
    field: "date",
    headerName: "Date",
    flex: 0.75,
    minWidth: 120,
    valueFormatter: (value: string) => formatTransactionDate(value),
    renderCell: ({ formattedValue }) => (
      <Typography variant="body2" color="text.secondary" component="span">
        {formattedValue}
      </Typography>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1.8,
    minWidth: 220,
    renderCell: ({ value }) => (
      <Typography variant="body1" noWrap component="span">
        {value}
      </Typography>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    flex: 0.95,
    minWidth: 128,
    renderCell: ({ value }) => (
      <Typography variant="body2" color="text.secondary" noWrap component="span">
        {value}
      </Typography>
    ),
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
      <Typography
        variant="body1"
        component="span"
        sx={{
          color: hcpColors.textPrimary,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formatTransactionAmount(row.amount, row.isDeposit)}
      </Typography>
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  return (
    <Box
      component="section"
      sx={{
        ...hcpContentBlockStackSx,
        pb: `${hcpContentSpacing.zoneInset}px`,
      }}
    >
      <Box sx={{ ...hcpContentHeaderSx, flexShrink: 0 }}>
        <Box
          sx={{
            bgcolor: hcpColors.paper,
            border: `1px solid ${hcpColors.border}`,
            borderRadius: hcpRadius.control,
            overflow: "hidden",
          }}
        >
          <Box sx={hcpDataGridToolbarSx}>
            <HcpSearchField
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              sx={{ width: { xs: "100%", sm: hcpLayout.searchFieldWidth } }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
              <Button
                variant="text"
                startIcon={<FunnelSimple size={hcpIcon.sm} weight="regular" />}
                sx={hcpChromeActionButtonSx}
              >
                Filter
              </Button>
              <Button
                variant="text"
                startIcon={<DownloadSimple size={hcpIcon.sm} weight="regular" />}
                sx={hcpChromeActionButtonSx}
              >
                Export
              </Button>
            </Box>
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
            rowHeight={52}
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
      </Box>
    </Box>
  );
}
