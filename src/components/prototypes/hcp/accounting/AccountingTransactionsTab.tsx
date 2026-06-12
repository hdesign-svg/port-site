"use client";

import { CaretDown } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import {
  HcpTableCellPrimary,
  HcpTableCellSecondary,
  HcpTableToolbarSearchButton,
  HCP_DATA_GRID_ROW_HEIGHT,
  hcpTableToolbarActionsSx,
} from "../HcpTableChrome";
import { HcpTablePaginationActions } from "../HcpTablePaginationActions";
import { AccountingFlowFilterToggle } from "./AccountingFlowFilterToggle";
import { AccountingTabPanel } from "./AccountingTabPanel";
import { AccountingTransactionViewTabs } from "./AccountingTransactionViewTabs";
import type { AccountingFlowFilter, AccountingTransactionView } from "./accountingTabs";
import {
  ACCOUNTING_CATEGORIES,
  accountingTransactions as initialTransactions,
  countReviewTransactions,
  formatAccountingAmount,
  formatAccountingDate,
  isUncategorized,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import {
  hcpColors,
  hcpDataGridSx,
  hcpDataGridToolbarSx,
  hcpFontWeight,
  hcpMenuPaperSx,
  hcpRadius,
} from "../hcpTheme";

const categorySelectSx = {
  width: "100%",
  maxWidth: 220,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: hcpColors.borderControl,
  },
  "& .MuiSelect-select": {
    py: 0.75,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    color: hcpColors.textPrimary,
  },
  "& .MuiSelect-select.MuiSelect-displayEmpty": {
    color: hcpColors.textMuted,
  },
};

function CategorySelect({
  value,
  onChange,
}: {
  value: AccountingCategory | null;
  onChange: (category: AccountingCategory) => void;
}) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as AccountingCategory);
  };

  return (
    <FormControl size="small" fullWidth sx={categorySelectSx}>
      <Select
        value={value ?? ""}
        displayEmpty
        onChange={handleChange}
        IconComponent={(props) => <CaretDown {...props} size={16} weight="bold" />}
        renderValue={(selected) => {
          if (!selected) {
            return "Uncategorized";
          }

          return selected;
        }}
        MenuProps={{
          slotProps: { paper: { sx: hcpMenuPaperSx } },
        }}
      >
        {ACCOUNTING_CATEGORIES.map((category) => (
          <MenuItem key={category} value={category} sx={{ py: 1 }}>
            <Typography variant="body2">{category}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

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

function filterByFlow(rows: AccountingTransactionRow[], flow: AccountingFlowFilter) {
  if (flow === "all") {
    return rows;
  }

  if (flow === "in") {
    return rows.filter((row) => row.isDeposit);
  }

  return rows.filter((row) => !row.isDeposit);
}

export function AccountingTransactionsTab() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeView, setActiveView] = useState<AccountingTransactionView>("uncategorized");
  const [flowFilter, setFlowFilter] = useState<AccountingFlowFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "date", sort: "desc" }]);

  const reviewCount = countReviewTransactions(transactions);
  const totalCount = transactions.length;

  const handleCategoryChange = (id: string, category: AccountingCategory) => {
    setTransactions((current) =>
      current.map((row) => (row.id === id ? { ...row, category } : row)),
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  const handleFlowFilterChange = (value: AccountingFlowFilter) => {
    setFlowFilter(value);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  };

  const visibleRows = useMemo(() => {
    let rows = transactions;

    if (activeView === "uncategorized") {
      rows = rows.filter(isUncategorized);
    }

    rows = filterByFlow(rows, activeView === "all" ? flowFilter : "all");

    if (activeView === "all") {
      rows = filterBySearch(rows, searchQuery);
    }

    return rows;
  }, [activeView, flowFilter, searchQuery, transactions]);

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
        field: "account",
        headerName: "Account",
        flex: 1.1,
        minWidth: 160,
        sortable: false,
        renderCell: ({ value }) => <HcpTableCellSecondary>{value}</HcpTableCellSecondary>,
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1.5,
        minWidth: 220,
        sortable: false,
        renderCell: ({ value }) => <HcpTableCellPrimary>{value}</HcpTableCellPrimary>,
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
        flex: 1.2,
        minWidth: 200,
        sortable: false,
        renderCell: ({ row }) => (
          <CategorySelect
            value={row.category}
            onChange={(category) => handleCategoryChange(row.id, category)}
          />
        ),
      },
    ],
    [],
  );

  const showEmptyUncategorized = activeView === "uncategorized" && reviewCount === 0;

  return (
    <AccountingTabPanel>
      <AccountingTransactionViewTabs
        activeView={activeView}
        reviewCount={reviewCount}
        totalCount={totalCount}
        onViewChange={setActiveView}
      />

      {showEmptyUncategorized ? (
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
          <Typography variant="h6" sx={{ mb: 1, fontWeight: hcpFontWeight.semibold }}>
            You&apos;re all caught up
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Every transaction is categorized. Switch to All transactions to review or recategorize
            anytime.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: hcpColors.paper,
            border: `1px solid ${hcpColors.border}`,
            borderRadius: hcpRadius.control,
            overflow: "hidden",
          }}
        >
          {activeView === "all" ? (
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
          ) : null}

          <DataGrid
            rows={visibleRows}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            showCellVerticalBorder={false}
            showColumnVerticalBorder={false}
            hideFooter={activeView !== "all"}
            sortingMode={activeView === "all" ? "client" : undefined}
            paginationMode={activeView === "all" ? "client" : undefined}
            paginationModel={activeView === "all" ? paginationModel : undefined}
            onPaginationModelChange={
              activeView === "all" ? setPaginationModel : undefined
            }
            sortModel={activeView === "all" ? sortModel : undefined}
            onSortModelChange={activeView === "all" ? setSortModel : undefined}
            pageSizeOptions={activeView === "all" ? [10, 25, 50] : undefined}
            rowHeight={HCP_DATA_GRID_ROW_HEIGHT}
            columnHeaderHeight={48}
            sx={hcpDataGridSx}
            slotProps={
              activeView === "all"
                ? {
                    basePagination: {
                      material: {
                        ActionsComponent: HcpTablePaginationActions,
                        labelRowsPerPage: "Rows per page:",
                      },
                    },
                  }
                : undefined
            }
            localeText={{
              noRowsLabel:
                activeView === "uncategorized"
                  ? "No uncategorized transactions."
                  : "No transactions match your filters.",
            }}
          />
        </Box>
      )}
    </AccountingTabPanel>
  );
}
