"use client";

import { DownloadSimple, FunnelSimple, Receipt } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { HcpSearchField } from "../HcpSearchField";
import {
  HcpTableCellPrimary,
  HcpTableZoneHeader,
  HCP_DATA_GRID_ROW_HEIGHT,
  hcpTableToolbarLeadingSx,
} from "../HcpTableChrome";
import { billPayStatusTone, HcpStatusTag } from "../HcpStatusTag";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { ExpensesTabPanel } from "./ExpensesTabPanel";
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
  hcpChromeActionButtonSx,
  hcpColors,
  hcpDataGridSx,
  hcpDataGridToolbarSx,
  hcpIcon,
  hcpLayout,
  hcpMenuPaperSx,
  hcpRadius,
  hcpWorkspaceCreateButtonSx,
} from "../hcpTheme";

function getBillPayZoneDetail(rows: BillPayRow[]) {
  const failed = rows.filter((row) => row.status === "failed").length;
  if (failed > 0) {
    return `${failed} need attention`;
  }

  const scheduled = rows.filter((row) => row.status === "scheduled").length;
  if (scheduled > 0) {
    return `${scheduled} scheduled`;
  }

  return undefined;
}

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
  const activeFilterLabel =
    BILL_PAY_FILTER_OPTIONS.find((option) => option.id === billFilter)?.label ?? "Filter";

  const visibleRows = useMemo(() => {
    const filtered = filterBills(expenseBills, searchQuery);
    return sortBills(filtered, billFilter);
  }, [searchQuery, billFilter]);

  const billCountLabel = `${visibleRows.length} ${visibleRows.length === 1 ? "bill" : "bills"}`;
  const zoneDetail = getBillPayZoneDetail(visibleRows);

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
            <HcpTableZoneHeader label={billCountLabel} detail={zoneDetail} />
            <HcpSearchField
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              sx={{ width: { xs: "100%", sm: hcpLayout.searchFieldWidth } }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Receipt size={hcpIcon.sm} weight="regular" />}
              sx={hcpWorkspaceCreateButtonSx}
            >
              New bill
            </Button>
            <Button
              variant="text"
              startIcon={<FunnelSimple size={hcpIcon.sm} weight="regular" />}
              aria-haspopup="menu"
              aria-expanded={filterMenuOpen ? "true" : undefined}
              aria-controls={filterMenuOpen ? "bill-pay-filter-menu" : undefined}
              onClick={(event) => setFilterMenuAnchor(event.currentTarget)}
              sx={{
                ...hcpChromeActionButtonSx,
                ...(billFilter !== "all"
                  ? { bgcolor: "rgba(33, 33, 33, 0.04)" }
                  : undefined),
              }}
            >
              {billFilter === "all" ? "Filter" : activeFilterLabel}
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

        <Menu
          id="bill-pay-filter-menu"
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
