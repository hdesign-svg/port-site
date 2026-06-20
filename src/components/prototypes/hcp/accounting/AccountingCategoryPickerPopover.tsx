"use client";

import { CaretLeft } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  findCategoryRule,
  getSimilarReviewTransactionIds,
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
  hcpPrimaryButtonSx,
  hcpSecondaryButtonSx,
} from "../hcpTheme";
import type { HcpAnchoredPlacement } from "../hcpPopoverPlacement";

export type CategorizeScope = "this" | "similar" | "always";

export type CategoryPickerApplyInput = {
  category: AccountingCategory;
  scope: CategorizeScope;
};

type PickerStep = "pick" | "scope";

type AccountingCategoryPickerPopoverProps = {
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

function formatRuleMatchLabel(ruleMatch: string) {
  if (ruleMatch.length <= 24) {
    return ruleMatch;
  }

  return `${ruleMatch.slice(0, 24)}…`;
}

const CATEGORY_SECTION_LABEL_SX = {
  px: 1,
  pb: 0.75,
  display: "block",
  fontSize: "0.75rem",
  fontWeight: hcpFontWeight.regular,
  color: hcpColors.textMuted,
} as const;

const CATEGORY_ROW_HEIGHT = 38;
const CATEGORY_LIST_VISIBLE_ROWS = 5.5;

type ScrollEdgeFade = {
  top: boolean;
  bottom: boolean;
};

function CategoryScrollList({
  children,
  clipAfterRows,
}: {
  children: ReactNode;
  clipAfterRows?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edgeFade, setEdgeFade] = useState<ScrollEdgeFade>({ top: false, bottom: false });

  const maxHeight =
    clipAfterRows != null ? `${Math.ceil(CATEGORY_ROW_HEIGHT * clipAfterRows)}px` : undefined;

  const updateEdgeFade = useCallback(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }

    const overflow = node.scrollHeight - node.clientHeight > 1;

    setEdgeFade({
      top: overflow && node.scrollTop > 1,
      bottom: overflow && node.scrollTop + node.clientHeight < node.scrollHeight - 1,
    });
  }, []);

  useEffect(() => {
    updateEdgeFade();
  }, [children, clipAfterRows, updateEdgeFade]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver(updateEdgeFade);
    observer.observe(node);

    return () => observer.disconnect();
  }, [updateEdgeFade]);

  const fadeBandSx = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 28,
    pointerEvents: "none",
    zIndex: 1,
  } as const;

  return (
    <Box sx={{ position: "relative", flex: 1, minHeight: 0, mx: -0.5 }}>
      <Box
        ref={scrollRef}
        onScroll={updateEdgeFade}
        sx={{
          overflow: "auto",
          minHeight: 0,
          maxHeight: maxHeight ?? "100%",
        }}
      >
        {children}
      </Box>
      {edgeFade.top ? (
        <Box
          aria-hidden
          sx={{
            ...fadeBandSx,
            top: 0,
            background: `linear-gradient(to bottom, ${hcpColors.paper} 0%, transparent 100%)`,
          }}
        />
      ) : null}
      {edgeFade.bottom ? (
        <Box
          aria-hidden
          sx={{
            ...fadeBandSx,
            bottom: 0,
            background: `linear-gradient(to top, ${hcpColors.paper} 0%, transparent 100%)`,
          }}
        />
      ) : null}
    </Box>
  );
}

function CategorySection({
  label,
  children,
  sx,
}: {
  label: string;
  children: ReactNode;
  sx?: { pt?: number };
}) {
  return (
    <Box sx={sx}>
      <Typography component="span" variant="caption" sx={CATEGORY_SECTION_LABEL_SX}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>{children}</Box>
    </Box>
  );
}

function CategoryPickerRow({
  category,
  onPick,
}: {
  category: AccountingCategory;
  onPick: (category: AccountingCategory) => void;
}) {
  return (
    <Button
      variant="text"
      onClick={() => onPick(category)}
      sx={{
        width: "100%",
        justifyContent: "flex-start",
        textTransform: "none",
        fontWeight: hcpFontWeight.regular,
        fontSize: "0.875rem",
        color: hcpColors.textPrimary,
        px: 1,
        py: 0.75,
        minHeight: 0,
        borderRadius: 1,
        transition: "background-color 150ms ease",
        "&:hover": {
          bgcolor: hcpColors.borderSubtle,
        },
      }}
    >
      <Typography component="span" variant="body2" noWrap sx={{ minWidth: 0, textAlign: "left" }}>
        {category}
      </Typography>
    </Button>
  );
}

function TransactionContextHeader({
  description,
  amount,
  isDeposit,
}: {
  description: string;
  amount: number;
  isDeposit: boolean;
}) {
  return (
    <>
      <Box sx={{ pb: 1.5 }}>
        <Typography variant="body2" noWrap sx={{ mb: 0.25 }}>
          {description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontVariantNumeric: "tabular-nums",
            color: isDeposit ? hcpColors.successMain : hcpColors.spending,
          }}
        >
          {formatAccountingAmount(amount, isDeposit)}
        </Typography>
      </Box>
      <Divider sx={{ mx: -2, mb: 1.5 }} />
    </>
  );
}

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
}: AccountingCategoryPickerPopoverProps) {
  const [step, setStep] = useState<PickerStep>("pick");
  const [selectedCategory, setSelectedCategory] = useState<AccountingCategory | null>(null);
  const [scope, setScope] = useState<CategorizeScope>("this");

  const meta = getReviewMetaForRow(row);
  const existingRule = findCategoryRule(categoryRules, meta.ruleMatch);
  const similarIds = useMemo(
    () => getSimilarReviewTransactionIds(transactions, period, row),
    [period, row, transactions],
  );
  const inReviewQueue = getReviewQueueTransactions(transactions, period).some(
    (queued) => queued.id === row.id,
  );

  useEffect(() => {
    if (!open) {
      setStep("pick");
      setSelectedCategory(null);
      setScope("this");
    }
  }, [open]);

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

  const categoryCount = suggestedCategories.length + restCategories.length;

  const categoryListClipAfterRows = useMemo(
    () => (categoryCount > 5 ? CATEGORY_LIST_VISIBLE_ROWS : undefined),
    [categoryCount],
  );

  const showSimilarScope = isReviewContext && inReviewQueue && similarIds.length > 1;
  const showAlwaysScope = meta.id !== `misc-${row.id}`;

  const handlePickCategory = (category: AccountingCategory) => {
    setSelectedCategory(category);
    setScope("this");
    setStep("scope");
  };

  const handleApply = () => {
    if (!selectedCategory) {
      return;
    }

    onApply({ category: selectedCategory, scope });
    onClose();
  };

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
          "aria-label":
            step === "pick"
              ? `Choose category for ${row.description}`
              : `Apply category for ${row.description}`,
          sx: {
            p: 2,
            width: placement?.width ?? 340,
            maxHeight: placement?.maxHeight ?? 420,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: `1px solid ${hcpColors.border}`,
            borderRadius: `${hcpLayout.controlRadius}px`,
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
          },
        },
      }}
    >
      <Box>
        {step === "scope" ? (
          <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold, mb: 1.5 }}>
            Apply category
          </Typography>
        ) : null}
        <TransactionContextHeader
          description={row.description}
          amount={row.amount}
          isDeposit={row.isDeposit}
        />
      </Box>

      {existingRule ? (
        <Box
          sx={{
            mb: 1.5,
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
            <Typography variant="body2" sx={{ minWidth: 0 }}>
              &ldquo;{formatRuleMatchLabel(existingRule.ruleMatch)}&rdquo; → {existingRule.category}
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={() => onRemoveRule(existingRule.ruleMatch)}
              sx={{ flexShrink: 0, minWidth: 0, px: 0.5 }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ) : null}

      {step === "pick" ? (
        <CategoryScrollList clipAfterRows={categoryListClipAfterRows}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {suggestedCategories.length > 0 ? (
              <CategorySection label="Suggested">
                {suggestedCategories.map((category) => (
                  <CategoryPickerRow key={category} category={category} onPick={handlePickCategory} />
                ))}
              </CategorySection>
            ) : null}
            <CategorySection
              label="All categories"
              sx={suggestedCategories.length > 0 ? { pt: 2.5 } : undefined}
            >
              {restCategories.map((category) => (
                <CategoryPickerRow key={category} category={category} onPick={handlePickCategory} />
              ))}
            </CategorySection>
          </Box>
        </CategoryScrollList>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
            <IconButton
              size="small"
              aria-label="Back to category list"
              onClick={() => setStep("pick")}
              sx={{ ml: -0.5 }}
            >
              <CaretLeft size={16} weight="bold" />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
              {selectedCategory}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold, mb: 1.5 }}>
            Apply to
          </Typography>

          <RadioGroup value={scope} onChange={(_, value) => setScope(value as CategorizeScope)}>
            <FormControlLabel
              value="this"
              control={<Radio size="small" />}
              label={<Typography variant="body2">This transaction only</Typography>}
              sx={{ alignItems: "flex-start", mx: 0, mb: 0.5 }}
            />
            {showSimilarScope ? (
              <FormControlLabel
                value="similar"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    This + {similarIds.length - 1} similar in queue
                  </Typography>
                }
                sx={{ alignItems: "flex-start", mx: 0, mb: 0.5 }}
              />
            ) : null}
            {showAlwaysScope ? (
              <FormControlLabel
                value="always"
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    {existingRule
                      ? `Update rule: always categorize "${formatRuleMatchLabel(meta.ruleMatch)}"`
                      : `Always categorize "${formatRuleMatchLabel(meta.ruleMatch)}"`}
                  </Typography>
                }
                sx={{ alignItems: "flex-start", mx: 0 }}
              />
            ) : null}
          </RadioGroup>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2, pt: 1 }}>
            <Button variant="outlined" onClick={onClose} sx={hcpSecondaryButtonSx}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApply} sx={hcpPrimaryButtonSx}>
              Apply
            </Button>
          </Box>
        </Box>
      )}
    </Popover>
  );
}
