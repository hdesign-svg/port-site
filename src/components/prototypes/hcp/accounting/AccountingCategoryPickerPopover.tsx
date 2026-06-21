"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  CategoryList,
  CategoryPickerShell,
  getCategoryPickerPopoverHeight,
  PickerTitle,
  SavedRuleBanner,
  TransactionMetaLine,
  useCategoryPickerData,
  type CategoryPickerApplyInput,
  type CategoryPickerPopoverProps,
} from "./AccountingCategoryPickerShared";

export type { CategoryPickerApplyInput, CategorizeScope } from "./AccountingCategoryPickerShared";
export { getCategoryPickerPopoverHeight };

export function AccountingCategoryPickerPopover({
  anchorEl,
  open,
  placement,
  onClose,
  row,
  transactions,
  period,
  categoryRules,
  isReviewContext,
  onApply,
  onRemoveRule,
}: CategoryPickerPopoverProps) {
  const { existingRule, suggestedCategories, restCategories } = useCategoryPickerData({
    row,
    transactions,
    period,
    categoryRules,
    isReviewContext,
  });

  const height = getCategoryPickerPopoverHeight(Boolean(existingRule));

  const handleSelect = (category: CategoryPickerApplyInput["category"]) => {
    onApply({ category, scope: "this" });
    onClose();
  };

  return (
    <CategoryPickerShell
      anchorEl={anchorEl}
      open={open}
      placement={placement}
      onClose={onClose}
      height={height}
      ariaLabel={`Select category for ${row.description}`}
    >
      <Box sx={{ flexShrink: 0 }}>
        <PickerTitle>Select category</PickerTitle>
        <TransactionMetaLine
          description={row.description}
          amount={row.amount}
          isDeposit={row.isDeposit}
        />
        <Divider sx={{ mx: 1.25, mt: 1.25 }} />
      </Box>

      {existingRule ? (
        <SavedRuleBanner
          ruleMatch={existingRule.ruleMatch}
          category={existingRule.category}
          onRemove={() => onRemoveRule(existingRule.ruleMatch)}
        />
      ) : null}

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, mt: 1.25 }}>
        <CategoryList
          suggestedCategories={suggestedCategories}
          restCategories={restCategories}
          onSelect={handleSelect}
        />
      </Box>
    </CategoryPickerShell>
  );
}
