"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type ReactNode } from "react";
import { hcpColors, hcpFontWeight } from "./hcpTheme";
import { hcpTypographyRoles } from "./hcpTypography";

/** Single-line rows — Transactions, Bill Pay */
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

/** Left toolbar cluster — zone label + optional search */
export const hcpTableToolbarLeadingSx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexWrap: "wrap",
  flex: 1,
  minWidth: 0,
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
