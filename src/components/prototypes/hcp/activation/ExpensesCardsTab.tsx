"use client";

import { DotsThree, FunnelSimple, PencilSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
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
  hcpFontWeight,
  hcpIcon,
  hcpRadius,
} from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

const filterMenuPaperSx = {
  mt: 0.5,
  minWidth: 188,
  border: `1px solid ${hcpColors.border}`,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
} as const;

const stackedCellSx = {
  display: "flex",
  flexDirection: "column",
  gap: 0.25,
  minWidth: 0,
  py: 0.25,
} as const;

function CardholderCell({ row }: { row: ExpenseCardRow }) {
  return (
    <Box sx={stackedCellSx}>
      <Typography variant="body1" noWrap component="span">
        {row.cardholder}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        noWrap
        component="span"
        sx={{ fontVariantNumeric: "tabular-nums" }}
      >
        {row.cardNumber}
      </Typography>
    </Box>
  );
}

function PurposeCell({ value }: { value: string }) {
  return (
    <Typography variant="body1" noWrap component="span">
      {value}
    </Typography>
  );
}

function CardStatusCell({ row }: { row: ExpenseCardRow }) {
  return (
    <Typography
      variant="body2"
      color={row.status === "active" ? "text.primary" : "text.secondary"}
      component="span"
    >
      {row.status === "active" ? "Active" : "Inactive"}
    </Typography>
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
        <DotsThree size={hcpIcon.md} weight="bold" />
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: filterMenuPaperSx } }}
      >
        <MenuItem
          onClick={() => setMenuAnchor(null)}
          sx={{ gap: 1 }}
        >
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
    renderCell: ({ value }) => <PurposeCell value={value} />,
  },
  {
    field: "cardType",
    headerName: "Type",
    flex: 1,
    minWidth: 96,
    valueFormatter: (value: ExpenseCardRow["cardType"]) => formatCardTypeLabel(value),
    renderCell: ({ formattedValue }) => (
      <Typography variant="body2" color="text.secondary" noWrap component="span">
        {formattedValue}
      </Typography>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 88,
    sortable: false,
    renderCell: ({ row }) => <CardStatusCell row={row} />,
  },
  {
    field: "spendingLimit",
    headerName: "Spending limit",
    flex: 1,
    minWidth: 120,
    renderCell: ({ value }) => (
      <Typography variant="body1" noWrap component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
        {value}
      </Typography>
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

  const filterMenuOpen = Boolean(filterMenuAnchor);

  const visibleRows = useMemo(
    () => filterCardsByType(expenseCards, typeFilter),
    [typeFilter],
  );

  const cardCountLabel = `${visibleRows.length} ${visibleRows.length === 1 ? "card" : "cards"}`;

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
          <Typography
            variant={hcpTypographyRoles.cardTitle}
            sx={{ fontWeight: hcpFontWeight.semibold, fontVariantNumeric: "tabular-nums" }}
          >
            {cardCountLabel}
          </Typography>

          <Button
            variant="text"
            startIcon={<FunnelSimple size={hcpIcon.sm} weight="regular" />}
            aria-haspopup="menu"
            aria-expanded={filterMenuOpen ? "true" : undefined}
            aria-controls={filterMenuOpen ? "cards-type-filter-menu" : undefined}
            onClick={(event) => setFilterMenuAnchor(event.currentTarget)}
            sx={hcpChromeActionButtonSx}
          >
            {typeFilter === "all" ? "Filter" : CARD_TYPE_FILTER_LABELS[typeFilter]}
          </Button>
        </Box>

        <Menu
          id="cards-type-filter-menu"
          anchorEl={filterMenuAnchor}
          open={filterMenuOpen}
          onClose={() => setFilterMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: filterMenuPaperSx } }}
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
          hideFooter
          rowHeight={68}
          columnHeaderHeight={48}
          sx={hcpDataGridSx}
        />
      </Box>
    </ExpensesTabPanel>
  );
}
