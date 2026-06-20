"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  applyReviewGroup,
  getReviewMetaForRow,
} from "./accountingReviewGroups";
import { AccountingCategorySelect } from "./AccountingCategorySelect";
import {
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import { hcpColors, hcpFontWeight } from "../hcpTheme";

type ReviewCategoryCellProps = {
  row: AccountingTransactionRow;
  transactions: AccountingTransactionRow[];
  onTransactionsChange: (transactions: AccountingTransactionRow[]) => void;
};

export function ReviewCategoryCell({ row, transactions, onTransactionsChange }: ReviewCategoryCellProps) {
  const meta = getReviewMetaForRow(row);

  const applyCategory = (category: AccountingCategory) => {
    onTransactionsChange(
      applyReviewGroup(transactions, {
        transactionIds: [row.id],
        category,
        applyToFuture: false,
        ruleMatch: meta.ruleMatch,
      }),
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 0.75,
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <AccountingCategorySelect value={null} onChange={applyCategory} placeholder="Choose category" />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {meta.suggestedCategories.map((category) => (
          <Button
            key={category}
            variant="text"
            size="small"
            onClick={() => applyCategory(category)}
            sx={{
              minWidth: 0,
              minHeight: 0,
              px: 0.5,
              py: 0,
              fontSize: "0.75rem",
              fontWeight: hcpFontWeight.semibold,
              color: hcpColors.primary,
              "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
