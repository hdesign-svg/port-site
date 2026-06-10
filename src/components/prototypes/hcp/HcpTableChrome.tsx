"use client";

import { DotsThree, MagnifyingGlass } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { HcpSearchField } from "./HcpSearchField";
import {
  hcpDataGridPaginationIconButtonSx,
  hcpFontWeight,
  hcpIcon,
  hcpLayout,
  hcpMenuPaperSx,
} from "./hcpTheme";
import { hcpTypographyRoles } from "./hcpTypography";

/** Single-line rows — Transactions, Bills */
export const HCP_DATA_GRID_ROW_HEIGHT = 56;

/** Stacked primary + secondary cells — Cards, Transactions */
export const HCP_DATA_GRID_STACKED_ROW_HEIGHT = 68;

export const hcpTableStackedCellSx = {
  display: "flex",
  flexDirection: "column",
  gap: 0.25,
  minWidth: 0,
  py: 0.25,
} as const;

/** Left toolbar cluster — zone title */
export const hcpTableToolbarLeadingSx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexWrap: "wrap",
  flex: 1,
  minWidth: 0,
} as const;

/** Right toolbar cluster — icons first, primary CTA last */
export const hcpTableToolbarActionsSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  flexShrink: 0,
} as const;

type HcpTableZoneHeaderProps = {
  label: string;
  detail?: string;
};

export function HcpTableZoneHeader({ label, detail }: HcpTableZoneHeaderProps) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant={hcpTypographyRoles.cardTitle}
        sx={{ fontWeight: hcpFontWeight.semibold, fontVariantNumeric: "tabular-nums" }}
      >
        {label}
      </Typography>
      {detail ? (
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 0.25 }}>
          {detail}
        </Typography>
      ) : null}
    </Box>
  );
}

type HcpTableCellProps = {
  children: ReactNode;
  noWrap?: boolean;
  tabularNums?: boolean;
};

export function HcpTableCellPrimary({ children, noWrap = true, tabularNums }: HcpTableCellProps) {
  return (
    <Typography
      variant={hcpTypographyRoles.tableCell}
      noWrap={noWrap}
      component="span"
      sx={tabularNums ? { fontVariantNumeric: "tabular-nums" } : undefined}
    >
      {children}
    </Typography>
  );
}

export function HcpTableCellSecondary({ children, noWrap = true, tabularNums }: HcpTableCellProps) {
  return (
    <Typography
      variant={hcpTypographyRoles.tableCellSecondary}
      color="text.secondary"
      noWrap={noWrap}
      component="span"
      sx={tabularNums ? { fontVariantNumeric: "tabular-nums" } : undefined}
    >
      {children}
    </Typography>
  );
}

type HcpTableToolbarIconButtonProps = IconButtonProps & {
  /** Visible on hover; also used as aria-label when none is passed */
  tooltip: string;
  /** Filter-on or other applied state */
  active?: boolean;
};

/** Table toolbar utilities — filter, export; matches pagination icon buttons */
export function HcpTableToolbarIconButton({
  tooltip,
  active,
  sx,
  "aria-label": ariaLabel,
  ...props
}: HcpTableToolbarIconButtonProps) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        size="small"
        aria-label={ariaLabel ?? tooltip}
        sx={{
          ...hcpDataGridPaginationIconButtonSx,
          ...(active ? { bgcolor: "rgba(33, 33, 33, 0.04)" } : undefined),
          ...sx,
        }}
        {...props}
      />
    </Tooltip>
  );
}

type HcpTableToolbarSearchButtonProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/** Collapsed search — icon on toolbar; field opens in a popover */
export function HcpTableToolbarSearchButton({
  value,
  onChange,
  placeholder = "Search",
}: HcpTableToolbarSearchButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverId = useId();
  const open = Boolean(anchorEl);
  const trimmedQuery = value.trim();
  const hasQuery = trimmedQuery.length > 0;
  const searchLabel = hasQuery ? `Search: ${trimmedQuery}` : "Search";

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <>
      <HcpTableToolbarIconButton
        tooltip={searchLabel}
        aria-label={searchLabel}
        active={hasQuery}
        aria-haspopup="dialog"
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? popoverId : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MagnifyingGlass size={hcpIcon.md} weight="regular" />
      </HcpTableToolbarIconButton>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              ...hcpMenuPaperSx,
              p: 1.5,
              width: hcpLayout.searchFieldWidth,
            },
          },
        }}
      >
        <HcpSearchField
          inputRef={inputRef}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          fullWidth
        />
      </Popover>
    </>
  );
}

type HcpTableToolbarOverflowButtonProps = {
  menuId: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onOpen: (anchor: HTMLElement) => void;
  onClose: () => void;
  tooltip?: string;
  /** e.g. filter applied in overflow menu */
  active?: boolean;
  children: ReactNode;
};

/** Overflow menu — filter, export, and other secondary table actions */
export function HcpTableToolbarOverflowButton({
  menuId,
  open,
  anchorEl,
  onOpen,
  onClose,
  tooltip = "More options",
  active,
  children,
}: HcpTableToolbarOverflowButtonProps) {
  return (
    <>
      <HcpTableToolbarIconButton
        tooltip={tooltip}
        aria-label={tooltip}
        active={active}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? menuId : undefined}
        onClick={(event) => onOpen(event.currentTarget)}
      >
        <DotsThree size={hcpIcon.md} weight="bold" />
      </HcpTableToolbarIconButton>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 180 } } }}
      >
        {children}
      </Menu>
    </>
  );
}
