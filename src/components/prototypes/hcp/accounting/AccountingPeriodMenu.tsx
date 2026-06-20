"use client";

import { CaretDown, CheckCircle, CircleHalf } from "@phosphor-icons/react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { ACCOUNTING_PERIODS, type AccountingPeriod } from "./accountingPeriods";
import {
  getAccountingPeriodStatus,
  type AccountingPeriodStatus,
} from "./accountingReadiness";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { hcpChromeActionButtonSx, hcpColors, hcpIcon, hcpAnchoredMenuSlotProps, hcpMenuItemInsetSx, hcpMenuItemLabelSx, hcpMenuPaperSx } from "../hcpTheme";

type AccountingPeriodMenuProps = {
  period: AccountingPeriod;
  transactions: AccountingTransactionRow[];
  onPeriodChange: (period: AccountingPeriod) => void;
};

function PeriodStatusSignifier({ status }: { status: AccountingPeriodStatus }) {
  if (status === "ready") {
    return (
      <CheckCircle
        size={hcpIcon.sm}
        weight="fill"
        color={hcpColors.successMain}
        aria-label="Tax ready"
      />
    );
  }

  return (
    <CircleHalf
      size={hcpIcon.sm}
      weight="fill"
      color={hcpColors.primary}
      aria-label="Needs review"
    />
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
        slotProps={{
          ...hcpAnchoredMenuSlotProps,
          paper: { sx: { ...hcpMenuPaperSx, minWidth: 280 } },
        }}
      >
        {periodStatuses.map(({ period: option, status }) => {
          const isSelected = option.prefix === period.prefix;

          return (
          <MenuItem
            key={option.prefix}
            selected={isSelected}
            onClick={() => {
              onPeriodChange(option);
              setAnchorEl(null);
            }}
            sx={{
              ...hcpMenuItemInsetSx,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={hcpMenuItemLabelSx}
            >
              {option.label}
            </Typography>
            <PeriodStatusSignifier status={status} />
          </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
