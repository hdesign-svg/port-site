"use client";

import { CreditCard, DotsThree, FunnelSimple, PencilSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
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
  HcpTableCellSecondary,
  HcpTableZoneHeader,
  HCP_DATA_GRID_STACKED_ROW_HEIGHT,
  hcpTableStackedCellSx,
} from "../HcpTableChrome";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { cardStatusTone, HcpStatusTag } from "../HcpStatusTag";
import { ExpensesTabPanel } from "./ExpensesTabPanel";
import {
  CARD_TYPE_FILTER_LABELS,
  CARD_TYPE_FILTERS,
  expenseCards,
  filterCardsByType,
  formatCardTypeLabel,
  type CardTypeFilter,
  type ExpenseCardRow,
} from "./expensesCardsData";
import {
  hcpChromeActionButtonSx,
  hcpColors,
  hcpDataGridSx,
  hcpDataGridToolbarSx,
  hcpIcon,
  hcpMenuPaperSx,
  hcpRadius,
  hcpWorkspaceCreateButtonSx,
} from "../hcpTheme";

function CardholderCell({ row }: { row: ExpenseCardRow }) {
  return (
    <Box sx={hcpTableStackedCellSx}>
      <HcpTableCellPrimary>{row.cardholder}</HcpTableCellPrimary>
      <HcpTableCellSecondary tabularNums>{row.cardNumber}</HcpTableCellSecondary>
    </Box>
  );
}

function CardActionsMenu({ row }: { row: ExpenseCardRow }) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  return (
    <>
      <IconButton
        aria-label={`Actions for ${row.cardholder}'s ${row.purpose} card`}
        aria-haspopup="menu"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={(event) => {
          event.stopPropagation();
          setMenuAnchor(event.currentTarget);
        }}
        sx={{
          width: hcpIcon.md,
          height: hcpIcon.md,
          p: 0,
          color: hcpColors.chromeIcon,
          borderRadius: hcpRadius.control,
          "&:hover": { bgcolor: "rgba(33, 33, 33, 0.04)" },
        }}
      >
        <DotsThree size={hcpIcon.md} weight="regular" />
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: hcpMenuPaperSx } }}
      >
        <MenuItem onClick={() => setMenuAnchor(null)} sx={{ gap: 1 }}>
          <PencilSimple size={hcpIcon.sm} weight="regular" />
          Edit card
        </MenuItem>
      </Menu>
    </>
  );
}

const cardColumns: GridColDef<ExpenseCardRow>[] = [
  {
    field: "cardholder",
    headerName: "Cardholder",
    flex: 1,
    minWidth: 120,
    renderCell: ({ row }) => <CardholderCell row={row} />,
  },
  {
    field: "purpose",
    headerName: "Purpose",
    flex: 1,
    minWidth: 120,
    renderCell: ({ value }) => <HcpTableCellPrimary>{value}</HcpTableCellPrimary>,
  },
  {
    field: "cardType",
    headerName: "Type",
    flex: 1,
    minWidth: 96,
    valueFormatter: (value: ExpenseCardRow["cardType"]) => formatCardTypeLabel(value),
    renderCell: ({ formattedValue }) => (
      <HcpTableCellSecondary>{formattedValue}</HcpTableCellSecondary>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 88,
    sortable: false,
    renderCell: ({ row }) => (
      <HcpStatusTag
        label={row.status === "active" ? "Active" : "Inactive"}
        tone={cardStatusTone(row.status)}
      />
    ),
  },
  {
    field: "spendingLimit",
    headerName: "Spending limit",
    flex: 1,
    minWidth: 120,
    renderCell: ({ value }) => (
      <HcpTableCellPrimary tabularNums>{value}</HcpTableCellPrimary>
    ),
  },
  {
    field: "actions",
    headerName: "",
    width: 72,
    flex: 0,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => <CardActionsMenu row={row} />,
  },
];

export function ExpensesCardsTab() {
  const [typeFilter, setTypeFilter] = useState<CardTypeFilter>("all");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const filterMenuOpen = Boolean(filterMenuAnchor);

  const visibleRows = useMemo(
    () => filterCardsByType(expenseCards, typeFilter),
    [typeFilter],
  );

  const cardCountLabel = `${visibleRows.length} ${visibleRows.length === 1 ? "card" : "cards"}`;
  const inactiveCount = visibleRows.filter((row) => row.status === "inactive").length;
  const zoneDetail =
    inactiveCount > 0 ? `${inactiveCount} inactive` : undefined;

  const handleTypeFilterChange = (next: CardTypeFilter) => {
    setTypeFilter(next);
    setFilterMenuAnchor(null);
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
          <HcpTableZoneHeader label={cardCountLabel} detail={zoneDetail} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CreditCard size={hcpIcon.sm} weight="regular" />}
              sx={hcpWorkspaceCreateButtonSx}
            >
              New card
            </Button>
            <Button
              variant="text"
              startIcon={<FunnelSimple size={hcpIcon.sm} weight="regular" />}
            aria-haspopup="menu"
            aria-expanded={filterMenuOpen ? "true" : undefined}
            aria-controls={filterMenuOpen ? "cards-type-filter-menu" : undefined}
            onClick={(event) => setFilterMenuAnchor(event.currentTarget)}
            sx={{
              ...hcpChromeActionButtonSx,
              ...(typeFilter !== "all"
                ? { bgcolor: "rgba(33, 33, 33, 0.04)" }
                : undefined),
            }}
          >
            {typeFilter === "all" ? "Filter" : CARD_TYPE_FILTER_LABELS[typeFilter]}
          </Button>
          </Box>
        </Box>

        <Menu
          id="cards-type-filter-menu"
          anchorEl={filterMenuAnchor}
          open={filterMenuOpen}
          onClose={() => setFilterMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: hcpMenuPaperSx } }}
        >
          {CARD_TYPE_FILTERS.map((filter) => (
            <MenuItem
              key={filter}
              selected={typeFilter === filter}
              onClick={() => handleTypeFilterChange(filter)}
              sx={{ py: 1 }}
            >
              <Typography variant="body2">{CARD_TYPE_FILTER_LABELS[filter]}</Typography>
            </MenuItem>
          ))}
        </Menu>

        <DataGrid
          rows={visibleRows}
          columns={cardColumns}
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
