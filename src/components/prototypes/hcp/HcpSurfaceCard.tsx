"use client";

import Box from "@mui/material/Box";
import { type SxProps, type Theme } from "@mui/material/styles";
import { type ReactNode } from "react";
import { hcpTableToolbarActionsSx, hcpTableToolbarLeadingSx } from "./HcpTableChrome";
import {
  hcpChartCardBodySx,
  hcpColors,
  hcpDataGridToolbarSx,
  hcpRadius,
} from "./hcpTheme";

type HcpSurfaceCardProps = {
  toolbarLeading?: ReactNode;
  toolbarActions?: ReactNode;
  children: ReactNode;
  /** Skip body inset — use for Data Grid and other edge-to-edge content */
  flush?: boolean;
  bodySx?: SxProps<Theme>;
};

/** Bordered module card — toolbar band + inset body (matches Expenses tables and chart cards) */
export function HcpSurfaceCard({
  toolbarLeading,
  toolbarActions,
  children,
  flush = false,
  bodySx,
}: HcpSurfaceCardProps) {
  const hasToolbar = Boolean(toolbarLeading || toolbarActions);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: hcpColors.paper,
        border: `1px solid ${hcpColors.border}`,
        borderRadius: hcpRadius.control,
        overflow: "hidden",
      }}
    >
      {hasToolbar ? (
        <Box
          sx={{
            ...hcpDataGridToolbarSx,
            ...(!toolbarLeading ? { justifyContent: "flex-end" } : undefined),
          }}
        >
          {toolbarLeading ? <Box sx={hcpTableToolbarLeadingSx}>{toolbarLeading}</Box> : null}
          {toolbarActions ? <Box sx={hcpTableToolbarActionsSx}>{toolbarActions}</Box> : null}
        </Box>
      ) : null}

      {flush ? (
        children
      ) : (
        <Box sx={{ ...hcpChartCardBodySx, ...bodySx }}>{children}</Box>
      )}
    </Box>
  );
}
