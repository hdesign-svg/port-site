"use client";

import { CaretDown, CheckCircle, Circle } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { ACCOUNTING_PERIODS, type AccountingPeriod } from "./accountingPeriods";
import {
  getAccountingPeriodReviewCount,
  getAccountingPeriodStatus,
  type AccountingPeriodStatus,
} from "./accountingReadiness";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { hcpChromeActionButtonSx, hcpColors, hcpIcon, hcpMenuPaperSx } from "../hcpTheme";

type AccountingPeriodMenuProps = {
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  onPeriodChange: (period: AccountingPeriod) => void;
};

function PeriodStatusSignifier({
  status,
  reviewCount,
}: {
  status: AccountingPeriodStatus;
  reviewCount: number;
}) {
  if (status === "ready") {
    return (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          flexShrink: 0,
        }}
      >
        <CheckCircle size={hcpIcon.sm} weight="fill" color={hcpColors.successMain} aria-hidden />
        <Typography variant="caption" sx={{ color: hcpColors.textMuted, whiteSpace: "nowrap" }}>
          CPA ready
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        flexShrink: 0,
      }}
    >
      <Circle size={8} weight="fill" color={hcpColors.primary} aria-hidden />
      <Typography variant="caption" sx={{ color: hcpColors.textMuted, whiteSpace: "nowrap" }}>
        {reviewCount} to review
      </Typography>
    </Box>
  );
}

export function AccountingPeriodMenu({
  period,
  transactions,
  onPeriodChange,
}: AccountingPeriodMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const periodStatuses = useMemo(
    () =>
      ACCOUNTING_PERIODS.map((option) => ({
        period: option,
        status: getAccountingPeriodStatus(transactions, option),
        reviewCount: getAccountingPeriodReviewCount(transactions, option),
      })),
    [transactions],
  );

  return (
    <>
      <Button
        variant="text"
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : undefined}
        aria-label={`Accounting period, ${period.label}`}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<CaretDown size={hcpIcon.sm} weight="regular" />}
        sx={hcpChromeActionButtonSx}
      >
        {period.shortLabel}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 280 } } }}
      >
        {periodStatuses.map(({ period: option, status, reviewCount }) => (
          <MenuItem
            key={option.prefix}
            selected={option.prefix === period.prefix}
            onClick={() => {
              onPeriodChange(option);
              setAnchorEl(null);
            }}
            sx={{
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="body2">{option.label}</Typography>
            <PeriodStatusSignifier status={status} reviewCount={reviewCount} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
