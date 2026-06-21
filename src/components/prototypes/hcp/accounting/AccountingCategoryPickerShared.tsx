"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  findCategoryRule,
  getSimilarReviewTransactions,
  type AccountingCategoryRule,
} from "./accountingCategoryRules";
import { getReviewMetaForRow } from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import { getReviewQueueTransactions } from "./accountingReadiness";
import {
  ACCOUNTING_CATEGORIES,
  formatAccountingAmount,
  type AccountingCategory,
  type AccountingTransactionRow,
} from "./accountingTransactionData";
import {
  hcpColors,
  hcpFontWeight,
  hcpLayout,
  hcpMenuItemLabelSx,
  hcpPopoverPaperSx,
} from "../hcpTheme";
import type { HcpAnchoredPlacement } from "../hcpPopoverPlacement";

export type CategorizeScope = "this" | "similar" | "always";

export type CategoryPickerApplyInput = {
  category: AccountingCategory;
  scope: CategorizeScope;
};

export type CategoryPickerPopoverProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  placement: HcpAnchoredPlacement | null;
  onClose: () => void;
  row: AccountingTransactionRow;
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  categoryRules: AccountingCategoryRule[];
  isReviewContext: boolean;
  onApply: (input: CategoryPickerApplyInput) => void;
  onRemoveRule: (ruleMatch: string) => void;
};

export const PICKER_CONTENT_INSET_X = 1.25;
export const PICKER_SURFACE_INSET = 1.5;
export const PICKER_ROW_GAP = 0.25;
export const PICKER_LABEL_ROW_GAP = 0.5;
export const PICKER_SECTION_GAP = 1.5;

export const PICKER_SHELL_HEADER_HEIGHT = 48;
export const PICKER_SCOPE_BAR_HEIGHT = 72;
export const PICKER_SPLIT_ACTIONS_HEIGHT = 36;
export const PICKER_SAVED_RULE_BLOCK_HEIGHT = 76;
export const PICKER_PAPER_PADDING_Y = 24;

const CATEGORY_ROW_HEIGHT = 34;
const CATEGORY_LIST_VISIBLE_ROWS = 7.25;
const PICKER_SCROLL_MAX_HEIGHT = Math.ceil(CATEGORY_ROW_HEIGHT * CATEGORY_LIST_VISIBLE_ROWS);
const PICKER_LIST_HEIGHT_EXTRA = 8;
export const PICKER_LIST_SCROLL_HEIGHT = PICKER_SCROLL_MAX_HEIGHT + PICKER_LIST_HEIGHT_EXTRA;

export const PICKER_ROW_SX = {
  px: PICKER_CONTENT_INSET_X,
  py: 0.625,
  borderRadius: `${hcpLayout.controlRadius}px`,
  minHeight: 0,
  minWidth: 0,
  color: hcpColors.textPrimary,
  fontWeight: hcpFontWeight.regular,
  transition: "background-color 150ms ease, color 150ms ease",
  "&:hover": {
    bgcolor: hcpColors.borderSubtle,
  },
} as const;

export function formatRuleMatchLabel(ruleMatch: string) {
  if (ruleMatch.length <= 24) {
    return ruleMatch;
  }

  return `${ruleMatch.slice(0, 24)}…`;
}

export function getCategoryPickerPopoverHeight(hasSavedRule: boolean) {
  return (
    PICKER_PAPER_PADDING_Y +
    PICKER_SHELL_HEADER_HEIGHT +
    (hasSavedRule ? PICKER_SAVED_RULE_BLOCK_HEIGHT : 0) +
    PICKER_LIST_SCROLL_HEIGHT
  );
}

export function useCategoryPickerData({
  row,
  transactions,
  period,
  categoryRules,
  isReviewContext,
}: Pick<
  CategoryPickerPopoverProps,
  "row" | "transactions" | "period" | "categoryRules" | "isReviewContext"
>) {
  const meta = getReviewMetaForRow(row);
  const existingRule = findCategoryRule(categoryRules, meta.ruleMatch);

  const vendorGroupTransactions = useMemo(
    () => getSimilarReviewTransactions(transactions, period, row),
    [period, row, transactions],
  );

  const similarIds = useMemo(
    () => vendorGroupTransactions.map((transaction) => transaction.id),
    [vendorGroupTransactions],
  );

  const inReviewQueue = getReviewQueueTransactions(transactions, period).some(
    (queued) => queued.id === row.id,
  );

  const suggestedCategories = useMemo(() => {
    const suggestions = meta.suggestedCategories.filter((category) => category !== row.category);
    if (existingRule && !suggestions.includes(existingRule.category)) {
      return [existingRule.category, ...suggestions].slice(0, 3);
    }
    return suggestions;
  }, [existingRule, meta.suggestedCategories, row.category]);

  const restCategories = useMemo(() => {
    const suggestedSet = new Set(suggestedCategories);
    return ACCOUNTING_CATEGORIES.filter((category) => !suggestedSet.has(category));
  }, [suggestedCategories]);

  const showVendorGroup = vendorGroupTransactions.length > 1;
  const showSimilarScope = isReviewContext && inReviewQueue && similarIds.length > 1;
  const showAlwaysScope = showVendorGroup;

  return {
    meta,
    existingRule,
    vendorGroupTransactions,
    similarIds,
    suggestedCategories,
    restCategories,
    showVendorGroup,
    showSimilarScope,
    showAlwaysScope,
  };
}

type ScrollEdgeState = {
  overflow: boolean;
  atTop: boolean;
  atBottom: boolean;
};

export function CategoryScrollList({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edgeState, setEdgeState] = useState<ScrollEdgeState>({
    overflow: false,
    atTop: true,
    atBottom: true,
  });

  const updateEdgeState = useCallback(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }

    const overflow = node.scrollHeight - node.clientHeight > 4;
    const atTop = node.scrollTop <= 1;
    const atBottom = !overflow || node.scrollTop + node.clientHeight >= node.scrollHeight - 4;

    setEdgeState({ overflow, atTop, atBottom });
  }, []);

  useEffect(() => {
    updateEdgeState();
    const frame = requestAnimationFrame(updateEdgeState);
    return () => cancelAnimationFrame(frame);
  }, [children, updateEdgeState]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver(updateEdgeState);
    observer.observe(node);

    return () => observer.disconnect();
  }, [children, updateEdgeState]);

  const fadeBandSx = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 36,
    pointerEvents: "none",
    zIndex: 2,
  } as const;

  return (
    <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
      <Box
        ref={scrollRef}
        onScroll={updateEdgeState}
        sx={{ height: "100%", overflowY: "auto", boxSizing: "border-box" }}
      >
        {children}
      </Box>
      {edgeState.overflow && !edgeState.atTop ? (
        <Box
          aria-hidden
          sx={{
            ...fadeBandSx,
            top: 0,
            background: `linear-gradient(to bottom, ${hcpColors.paper} 0%, transparent 100%)`,
          }}
        />
      ) : null}
      {edgeState.overflow && !edgeState.atBottom ? (
        <Box
          aria-hidden
          sx={{
            ...fadeBandSx,
            bottom: 0,
            background: `linear-gradient(to top, ${hcpColors.paper} 0%, ${hcpColors.paper} 40%, transparent 100%)`,
          }}
        />
      ) : null}
    </Box>
  );
}

export function PickerSectionLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="span"
      variant="caption"
      sx={{
        px: PICKER_CONTENT_INSET_X,
        mb: PICKER_LABEL_ROW_GAP,
        display: "block",
        fontSize: "0.75rem",
        lineHeight: 1,
        fontWeight: hcpFontWeight.regular,
        color: hcpColors.textMuted,
      }}
    >
      {children}
    </Typography>
  );
}

export function CategorySection({
  label,
  children,
  isFirst = false,
}: {
  label: string;
  children: ReactNode;
  isFirst?: boolean;
}) {
  return (
    <Box component="section" sx={isFirst ? undefined : { mt: PICKER_SECTION_GAP }}>
      <PickerSectionLabel>{label}</PickerSectionLabel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: PICKER_ROW_GAP }}>{children}</Box>
    </Box>
  );
}

export function CategoryPickerRow({
  label,
  onSelect,
}: {
  label: string;
  onSelect: () => void;
}) {
  return (
    <Button
      variant="text"
      onClick={onSelect}
      sx={{
        ...PICKER_ROW_SX,
        width: "100%",
        justifyContent: "flex-start",
        textTransform: "none",
        fontSize: "0.875rem",
      }}
    >
      <Typography
        component="span"
        variant="body2"
        noWrap
        sx={{ ...hcpMenuItemLabelSx, minWidth: 0, textAlign: "left" }}
      >
        {label}
      </Typography>
    </Button>
  );
}

export function PickerTitle({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="body1"
      sx={{
        fontWeight: hcpFontWeight.semibold,
        fontSize: "1rem",
        lineHeight: 1.25,
        px: PICKER_CONTENT_INSET_X,
      }}
    >
      {children}
    </Typography>
  );
}

export function TransactionMetaLine({
  description,
  amount,
  isDeposit,
}: {
  description: string;
  amount: number;
  isDeposit: boolean;
}) {
  return (
    <Typography
      variant="caption"
      noWrap
      sx={{
        display: "block",
        px: PICKER_CONTENT_INSET_X,
        mt: 0.75,
        color: hcpColors.textMuted,
        lineHeight: 1.3,
      }}
    >
      {description}
      <Box component="span" sx={{ mx: 0.75, opacity: 0.5 }}>
        ·
      </Box>
      <Box
        component="span"
        sx={{
          fontVariantNumeric: "tabular-nums",
          color: isDeposit ? hcpColors.successMain : hcpColors.spending,
        }}
      >
        {formatAccountingAmount(amount, isDeposit)}
      </Box>
    </Typography>
  );
}

export function SavedRuleBanner({
  ruleMatch,
  category,
  onRemove,
}: {
  ruleMatch: string;
  category: AccountingCategory;
  onRemove: () => void;
}) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        mt: 1.25,
        mb: 0.5,
        mx: PICKER_CONTENT_INSET_X,
        px: 1.25,
        py: 1,
        borderRadius: 1,
        bgcolor: "rgba(14, 111, 190, 0.06)",
        border: `1px solid rgba(14, 111, 190, 0.12)`,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25 }}>
        Saved rule
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography variant="body2" sx={{ minWidth: 0, fontSize: "0.8125rem" }}>
          &ldquo;{formatRuleMatchLabel(ruleMatch)}&rdquo; → {category}
        </Typography>
        <Button size="small" variant="text" onClick={onRemove} sx={{ flexShrink: 0, minWidth: 0, px: 0.5 }}>
          Remove
        </Button>
      </Box>
    </Box>
  );
}

export function CategoryPickerShell({
  anchorEl,
  open,
  placement,
  onClose,
  height,
  ariaLabel,
  children,
}: {
  anchorEl: HTMLElement | null;
  open: boolean;
  placement: HcpAnchoredPlacement | null;
  onClose: () => void;
  height: number;
  ariaLabel: string;
  children: ReactNode;
}) {
  const resolvedHeight = Math.min(height, placement?.maxHeight ?? height);

  return (
    <Popover
      open={open && placement != null}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={placement?.anchorPosition}
      transformOrigin={placement?.transformOrigin ?? { vertical: "top", horizontal: "right" }}
      marginThreshold={16}
      disableScrollLock
      slotProps={{
        paper: {
          role: "dialog",
          "aria-label": ariaLabel,
          sx: {
            ...hcpPopoverPaperSx,
            p: 0,
            px: PICKER_SURFACE_INSET,
            pt: PICKER_SURFACE_INSET,
            pb: PICKER_SURFACE_INSET,
            width: placement?.width ?? 340,
            height: resolvedHeight,
            maxHeight: placement?.maxHeight ?? height,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxSizing: "border-box",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, height: "100%" }}>
        {children}
      </Box>
    </Popover>
  );
}

export function CategoryList({
  suggestedCategories,
  restCategories,
  onSelect,
}: {
  suggestedCategories: AccountingCategory[];
  restCategories: AccountingCategory[];
  onSelect: (category: AccountingCategory) => void;
}) {
  return (
    <CategoryScrollList>
      {suggestedCategories.length > 0 ? (
        <CategorySection label="Suggested" isFirst>
          {suggestedCategories.map((category) => (
            <CategoryPickerRow key={category} label={category} onSelect={() => onSelect(category)} />
          ))}
        </CategorySection>
      ) : null}
      <CategorySection label="All categories" isFirst={suggestedCategories.length === 0}>
        {restCategories.map((category) => (
          <CategoryPickerRow key={category} label={category} onSelect={() => onSelect(category)} />
        ))}
      </CategorySection>
    </CategoryScrollList>
  );
}

export function ScopeChip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      size="small"
      variant={selected ? "contained" : "outlined"}
      onClick={onSelect}
      sx={{
        flex: 1,
        textTransform: "none",
        fontSize: "0.75rem",
        fontWeight: selected ? hcpFontWeight.semibold : hcpFontWeight.regular,
        borderColor: hcpColors.borderSubtle,
        color: selected ? hcpColors.paper : hcpColors.textPrimary,
        bgcolor: selected ? hcpColors.textPrimary : "transparent",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
          bgcolor: selected ? hcpColors.textPrimary : hcpColors.borderSubtle,
        },
      }}
    >
      {label}
    </Button>
  );
}

export function ScopeBar({
  label,
  count,
  scope,
  showAlways,
  alwaysChecked,
  onScopeChange,
  onAlwaysChange,
  ruleMatchLabel,
}: {
  label: string;
  count: number;
  scope: CategorizeScope;
  showAlways: boolean;
  alwaysChecked: boolean;
  onScopeChange: (scope: CategorizeScope) => void;
  onAlwaysChange: (checked: boolean) => void;
  ruleMatchLabel: string;
}) {
  return (
    <Box sx={{ flexShrink: 0, px: PICKER_CONTENT_INSET_X, mt: 1.25, minHeight: PICKER_SCOPE_BAR_HEIGHT }}>
      <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block", mb: 0.75 }}>
        {label} · {count} in queue
      </Typography>
      <Box sx={{ display: "flex", gap: 0.75 }}>
        <ScopeChip
          label="Just this one"
          selected={scope === "this" && !alwaysChecked}
          onSelect={() => {
            onAlwaysChange(false);
            onScopeChange("this");
          }}
        />
        <ScopeChip
          label={`All ${count}`}
          selected={scope === "similar" && !alwaysChecked}
          onSelect={() => {
            onAlwaysChange(false);
            onScopeChange("similar");
          }}
        />
      </Box>
      {showAlways ? (
        <Button
          variant="text"
          size="small"
          onClick={() => onAlwaysChange(!alwaysChecked)}
          sx={{
            mt: 0.75,
            px: 0,
            minWidth: 0,
            textTransform: "none",
            fontSize: "0.75rem",
            color: alwaysChecked ? hcpColors.textPrimary : hcpColors.textMuted,
            fontWeight: alwaysChecked ? hcpFontWeight.semibold : hcpFontWeight.regular,
          }}
        >
          {alwaysChecked ? "✓ " : ""}
          Always categorize &ldquo;{ruleMatchLabel}&rdquo;
        </Button>
      ) : null}
      <Divider sx={{ mt: 1.25 }} />
    </Box>
  );
}
