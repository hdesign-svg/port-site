"use client";

import { DownloadSimple, FunnelSimple, Plus } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import {
  HcpTableCellPrimary,
  HcpTableToolbarIconButton,
  HcpTableToolbarSearchButton,
  HcpTableZoneHeader,
  HCP_DATA_GRID_COLUMN_HEADER_HEIGHT,
  HCP_DATA_GRID_ROW_HEIGHT,
  hcpTableToolbarActionsSx,
} from "../HcpTableChrome";
import { HcpSurfaceCard } from "../HcpSurfaceCard";
import { billPayStatusTone, HcpStatusTag } from "../HcpStatusTag";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { ExpensesTabPanel } from "./ExpensesTabPanel";
import { EXPENSES_ZONE_TITLES } from "./expensesTabs";
import {
  BILL_PAY_FILTER_OPTIONS,
  expenseBills,
  formatBillPayAmount,
  formatBillPayDate,
  formatBillPayStatus,
  type BillPayFilterOption,
  type BillPayRow,
} from "./expensesBillPayData";
import {
  hcpColors,
  hcpDataGridSx,
  hcpIcon,
  hcpMenuPaperSx,
  hcpRadius,
} from "../hcpTheme";

function filterBills(rows: BillPayRow[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return rows;
  }

  return rows.filter((row) => {
    const haystack = [
      row.vendor,
      row.invoiceNumber,
      formatBillPayDate(row.due),
      formatBillPayStatus(row.status),
      formatBillPayAmount(row.amount),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

function sortBills(rows: BillPayRow[], filter: BillPayFilterOption) {
  const sorted = [...rows];

  switch (filter) {
    case "created":
      return sorted.sort((a, b) => a.created.localeCompare(b.created));
    case "due":
      return sorted.sort((a, b) => a.due.localeCompare(b.due));
    case "status":
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    default:
      return sorted;
  }
}

const billColumns: GridColDef<BillPayRow>[] = [
  {
    field: "vendor",
    headerName: "Vendor",
    flex: 1.5,
    minWidth: 200,
    sortable: false,
    renderCell: ({ row }) => <HcpTableCellPrimary>{row.vendor}</HcpTableCellPrimary>,
  },
  {
    field: "due",
    headerName: "Due",
    flex: 1,
    minWidth: 140,
    valueFormatter: (value: string) => formatBillPayDate(value),
    renderCell: ({ formattedValue }) => (
      <HcpTableCellPrimary>{formattedValue}</HcpTableCellPrimary>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    sortable: false,
    renderCell: ({ row }) => (
      <HcpStatusTag
        label={formatBillPayStatus(row.status)}
        tone={billPayStatusTone(row.status)}
      />
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
      <HcpTableCellPrimary tabularNums>
        {formatBillPayAmount(row.amount)}
      </HcpTableCellPrimary>
    ),
  },
];

export function ExpensesBillPayTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [billFilter, setBillFilter] = useState<BillPayFilterOption>("all");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 15,
  });

  const filterMenuOpen = Boolean(filterMenuAnchor);
  const filterAriaLabel =
    billFilter === "all"
      ? "Filter"
      : `Filter: ${BILL_PAY_FILTER_OPTIONS.find((option) => option.id === billFilter)?.label ?? "All bills"}`;

  const visibleRows = useMemo(() => {
    const filtered = filterBills(expenseBills, searchQuery);
    return sortBills(filtered, billFilter);
  }, [searchQuery, billFilter]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  const handleFilterChange = (next: BillPayFilterOption) => {
    setBillFilter(next);
    setFilterMenuAnchor(null);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  return (
    <ExpensesTabPanel>
      <HcpSurfaceCard
        flush
        toolbarLeading={<HcpTableZoneHeader label={EXPENSES_ZONE_TITLES.bills} />}
        toolbarActions={
          <Box sx={hcpTableToolbarActionsSx}>
            <HcpTableToolbarSearchButton value={searchQuery} onChange={handleSearchChange} />
            <HcpTableToolbarIconButton
              tooltip={filterAriaLabel}
              aria-label={filterAriaLabel}
              aria-haspopup="menu"
              aria-expanded={filterMenuOpen ? "true" : undefined}
              aria-controls={filterMenuOpen ? "bills-filter-menu" : undefined}
              active={billFilter !== "all"}
              onClick={(event) => setFilterMenuAnchor(event.currentTarget)}
            >
              <FunnelSimple size={hcpIcon.md} weight="regular" />
            </HcpTableToolbarIconButton>
            <HcpTableToolbarIconButton tooltip="Export" aria-label="Export">
              <DownloadSimple size={hcpIcon.md} weight="regular" />
            </HcpTableToolbarIconButton>
            <HcpTableToolbarIconButton tooltip="New bill" aria-label="New bill">
              <Plus size={hcpIcon.md} weight="regular" />
            </HcpTableToolbarIconButton>
          </Box>
        }
      >
        <Menu
          id="bills-filter-menu"
          anchorEl={filterMenuAnchor}
          open={filterMenuOpen}
          onClose={() => setFilterMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: hcpMenuPaperSx } }}
        >
          {BILL_PAY_FILTER_OPTIONS.map((option) => (
            <MenuItem
              key={option.id}
              selected={billFilter === option.id}
              onClick={() => handleFilterChange(option.id)}
              sx={{ py: 1 }}
            >
              <Typography variant="body2">{option.label}</Typography>
            </MenuItem>
          ))}
        </Menu>

        <DataGrid
          rows={visibleRows}
          columns={billColumns}
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
          pageSizeOptions={[15, 25, 50]}
          rowHeight={HCP_DATA_GRID_ROW_HEIGHT}
          columnHeaderHeight={HCP_DATA_GRID_COLUMN_HEADER_HEIGHT}
          sx={{
            ...hcpDataGridSx,
            "& .MuiDataGrid-row:hover": {
              bgcolor: hcpColors.paper,
            },
          }}
          slotProps={{
            basePagination: {
              material: {
                ActionsComponent: HcpTablePaginationActions,
                labelRowsPerPage: "Rows per page:",
              },
            },
          }}
        />
      </HcpSurfaceCard>
    </ExpensesTabPanel>
  );
}
