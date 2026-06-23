"use client";

import { DotsThree, DownloadSimple, FunnelSimple, PencilSimple, Plus } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { HcpAnalyticsView, HcpDataContainer } from "../analytics";
import {
  HcpTableCellPrimary,
  HcpTableCellSecondary,
  HcpTableStackedCell,
  HcpTableToolbarIconButton,
  HcpTableToolbarSearchButton,
  HcpTableZoneHeader,
  HCP_STACKED_DATA_GRID_DEFAULTS,
  hcpDataGridStackedSx,
  hcpTableToolbarActionsSx,
} from "../HcpTableChrome";
import { cardStatusTone, HcpStatusTag } from "../HcpStatusTag";
import { ExpensesTabPanel } from "./ExpensesTabPanel";
import { EXPENSES_ZONE_TITLES } from "./expensesTabs";
import {
  CARD_TYPE_FILTER_LABELS,
  CARD_TYPE_FILTERS,
  expenseCards,
  filterCardsByType,
  formatCardTypeLabel,
  type CardTypeFilter,
  type ExpenseCardRow,
} from "./expensesCardsData";
import { hcpAnchoredMenuSlotProps, hcpColors, hcpIcon, hcpMenuItemInsetSx, hcpMenuItemLabelSx } from "../hcpTheme";

function filterCards(rows: ExpenseCardRow[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return rows;
  }

  return rows.filter((row) => {
    const haystack = [
      row.cardholder,
      row.purpose,
      row.cardNumber,
      formatCardTypeLabel(row.cardType),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

function CardholderCell({ row }: { row: ExpenseCardRow }) {
  return (
    <HcpTableStackedCell
      primary={row.cardholder}
      secondary={row.cardNumber}
      secondaryTabularNums
    />
  );
}

function CardActionsMenu({ row }: { row: ExpenseCardRow }) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const actionsLabel = `Actions for ${row.cardholder}'s ${row.purpose} card`;

  return (
    <>
      <HcpTableToolbarIconButton
        tooltip="More options"
        aria-label={actionsLabel}
        aria-haspopup="menu"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={(event) => {
          event.stopPropagation();
          setMenuAnchor(event.currentTarget);
        }}
      >
        <DotsThree size={hcpIcon.md} weight="bold" />
      </HcpTableToolbarIconButton>

      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={hcpAnchoredMenuSlotProps}
      >
        <MenuItem
          onClick={() => setMenuAnchor(null)}
          sx={{ ...hcpMenuItemInsetSx, display: "flex", alignItems: "center", gap: 1 }}
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
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<CardTypeFilter>("all");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);

  const filterMenuOpen = Boolean(filterMenuAnchor);
  const filterAriaLabel =
    typeFilter === "all" ? "Filter" : `Filter: ${CARD_TYPE_FILTER_LABELS[typeFilter]}`;

  const visibleRows = useMemo(() => {
    const filtered = filterCardsByType(expenseCards, typeFilter);
    return filterCards(filtered, searchQuery);
  }, [typeFilter, searchQuery]);

  const handleTypeFilterChange = (next: CardTypeFilter) => {
    setTypeFilter(next);
    setFilterMenuAnchor(null);
  };

  return (
    <ExpensesTabPanel>
      <HcpAnalyticsView
        leading={<HcpTableZoneHeader label={EXPENSES_ZONE_TITLES.cards} />}
        actions={
          <Box sx={hcpTableToolbarActionsSx}>
            <HcpTableToolbarSearchButton value={searchQuery} onChange={setSearchQuery} />
            <HcpTableToolbarIconButton
              tooltip={filterAriaLabel}
              aria-label={filterAriaLabel}
              aria-haspopup="menu"
              aria-expanded={filterMenuOpen ? "true" : undefined}
              aria-controls={filterMenuOpen ? "cards-type-filter-menu" : undefined}
              active={typeFilter !== "all"}
              onClick={(event) => setFilterMenuAnchor(event.currentTarget)}
            >
              <FunnelSimple size={hcpIcon.md} weight="regular" />
            </HcpTableToolbarIconButton>
            <HcpTableToolbarIconButton tooltip="Export" aria-label="Export">
              <DownloadSimple size={hcpIcon.md} weight="regular" />
            </HcpTableToolbarIconButton>
            <HcpTableToolbarIconButton tooltip="New card" aria-label="New card">
              <Plus size={hcpIcon.md} weight="regular" />
            </HcpTableToolbarIconButton>
          </Box>
        }
      >
        <Menu
          id="cards-type-filter-menu"
          anchorEl={filterMenuAnchor}
          open={filterMenuOpen}
          onClose={() => setFilterMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={hcpAnchoredMenuSlotProps}
        >
          {CARD_TYPE_FILTERS.map((filter) => (
            <MenuItem
              key={filter}
              selected={typeFilter === filter}
              onClick={() => handleTypeFilterChange(filter)}
              sx={hcpMenuItemInsetSx}
            >
              <Typography variant="body2" sx={hcpMenuItemLabelSx}>
                {CARD_TYPE_FILTER_LABELS[filter]}
              </Typography>
            </MenuItem>
          ))}
        </Menu>

        <HcpDataContainer>
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
            {...HCP_STACKED_DATA_GRID_DEFAULTS}
            sx={hcpDataGridStackedSx}
          />
        </HcpDataContainer>
      </HcpAnalyticsView>
    </ExpensesTabPanel>
  );
}
