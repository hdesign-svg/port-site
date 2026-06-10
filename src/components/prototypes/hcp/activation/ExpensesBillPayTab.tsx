"use client";

import { DownloadSimple, Receipt } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
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
  HcpTableToolbarOverflowButton,
  HcpTableToolbarSearchButton,
  HcpTableZoneHeader,
  HCP_DATA_GRID_ROW_HEIGHT,
  hcpTableToolbarActionsSx,
  hcpTableToolbarLeadingSx,
} from "../HcpTableChrome";
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
  hcpDataGridToolbarSx,
  hcpIcon,
  hcpRadius,
  hcpWorkspaceCreateButtonSx,
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
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 15,
  });

  const moreMenuOpen = Boolean(moreMenuAnchor);

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
    setMoreMenuAnchor(null);
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
            <HcpTableZoneHeader label={EXPENSES_ZONE_TITLES.bills} />
          </Box>

          <Box sx={hcpTableToolbarActionsSx}>
            <HcpTableToolbarSearchButton value={searchQuery} onChange={handleSearchChange} />
            <HcpTableToolbarOverflowButton
              menuId="bills-toolbar-more-menu"
              open={moreMenuOpen}
              anchorEl={moreMenuAnchor}
              onOpen={setMoreMenuAnchor}
              onClose={() => setMoreMenuAnchor(null)}
              active={billFilter !== "all"}
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
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={() => setMoreMenuAnchor(null)} sx={{ gap: 1.5, py: 1.25 }}>
                <DownloadSimple size={hcpIcon.sm} weight="regular" />
                <Typography variant="body2">Export</Typography>
              </MenuItem>
            </HcpTableToolbarOverflowButton>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Receipt size={hcpIcon.sm} weight="regular" />}
              aria-label="New bill"
              sx={hcpWorkspaceCreateButtonSx}
            >
              New
            </Button>
          </Box>
        </Box>

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
