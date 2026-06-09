"use client";

import { PencilSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { useMemo, useState, type MouseEvent } from "react";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { ExpensesTabPanel } from "./ExpensesTabPanel";
import {
  CARD_TYPE_FILTER_LABELS,
  CARD_TYPE_FILTERS,
  expenseCards,
  filterCardsByType,
  formatCardTypeLabel,
  type CardTypeFilter,
  type ExpenseCardRow,
  type ExpenseCardStatus,
} from "./expensesCardsData";
import {
  hcpChromeActionButtonSx,
  hcpColors,
  hcpDataGridSx,
  hcpDataGridToolbarSx,
  hcpIcon,
  hcpRadius,
} from "../hcpTheme";

function CardStatusChip({ status }: { status: ExpenseCardStatus }) {
  if (status === "active") {
    return (
      <Chip
        label="Active"
        size="small"
        sx={{
          bgcolor: hcpColors.successLight,
          color: hcpColors.successMain,
          height: 24,
        }}
      />
    );
  }

  if (status === "needs_activation") {
    return (
      <Chip
        label="Needs activation"
        size="small"
        sx={{
          bgcolor: hcpColors.chartSpendingFill,
          color: hcpColors.chartSpending,
          height: 24,
        }}
      />
    );
  }

  return (
    <Chip
      label="Inactive"
      size="small"
      sx={{
        bgcolor: hcpColors.surfaceMuted,
        color: hcpColors.textSecondary,
        height: 24,
      }}
    />
  );
}

const cardColumns: GridColDef<ExpenseCardRow>[] = [
  {
    field: "cardholder",
    headerName: "Cardholder",
    flex: 1.2,
    minWidth: 160,
    renderCell: ({ value }) => (
      <Typography variant="body1" noWrap component="span">
        {value}
      </Typography>
    ),
  },
  {
    field: "purpose",
    headerName: "Purpose",
    flex: 1,
    minWidth: 140,
    renderCell: ({ value }) => (
      <Typography variant="body2" color="text.secondary" noWrap component="span">
        {value}
      </Typography>
    ),
  },
  {
    field: "cardNumber",
    headerName: "Card #",
    flex: 0.75,
    minWidth: 112,
    renderCell: ({ value }) => (
      <Typography
        variant="body2"
        color="text.secondary"
        component="span"
        sx={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </Typography>
    ),
  },
  {
    field: "cardType",
    headerName: "Card type",
    flex: 0.75,
    minWidth: 112,
    valueFormatter: (value: ExpenseCardRow["cardType"]) => formatCardTypeLabel(value),
    renderCell: ({ formattedValue }) => (
      <Typography variant="body2" color="text.secondary" noWrap component="span">
        {formattedValue}
      </Typography>
    ),
  },
  {
    field: "status",
    headerName: "Card status",
    flex: 0.95,
    minWidth: 148,
    sortable: false,
    renderCell: ({ row }) => <CardStatusChip status={row.status} />,
  },
  {
    field: "spendingLimit",
    headerName: "Spending limits",
    flex: 0.9,
    minWidth: 132,
    renderCell: ({ value }) => (
      <Typography variant="body1" noWrap component="span">
        {value}
      </Typography>
    ),
  },
  {
    field: "activate",
    headerName: "Activate",
    flex: 0.7,
    minWidth: 100,
    sortable: false,
    renderCell: ({ row }) =>
      row.status === "needs_activation" ? (
        <Button variant="text" sx={hcpChromeActionButtonSx}>
          Activate
        </Button>
      ) : null,
  },
  {
    field: "edit",
    headerName: "",
    flex: 0.35,
    minWidth: 56,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: () => (
      <IconButton
        size="small"
        aria-label="Edit card"
        sx={{
          color: hcpColors.chromeIcon,
          "&:hover": { bgcolor: "rgba(33, 33, 33, 0.04)" },
        }}
      >
        <PencilSimple size={hcpIcon.sm} weight="regular" />
      </IconButton>
    ),
  },
];

export function ExpensesCardsTab() {
  const [typeFilter, setTypeFilter] = useState<CardTypeFilter>("all");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const visibleRows = useMemo(
    () => filterCardsByType(expenseCards, typeFilter),
    [typeFilter],
  );

  const handleTypeFilterChange = (_: MouseEvent<HTMLElement>, next: CardTypeFilter | null) => {
    if (!next) {
      return;
    }

    setTypeFilter(next);
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
            <ToggleButtonGroup
              exclusive
              size="small"
              value={typeFilter}
              onChange={handleTypeFilterChange}
              aria-label="Filter cards by type"
            >
              {CARD_TYPE_FILTERS.map((filter) => (
                <ToggleButton key={filter} value={filter}>
                  {CARD_TYPE_FILTER_LABELS[filter]}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

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
    </ExpensesTabPanel>
  );
}
