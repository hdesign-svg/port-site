"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { type ReactNode } from "react";

type HcpDetachedToolbarProps = {
  leading?: ReactNode;
  actions?: ReactNode;
};

/** Filters, period, export — sits in open space above the data container (X Analytics pattern). */
export function HcpDetachedToolbar({ leading, actions }: HcpDetachedToolbarProps) {
  if (!leading && !actions) {
    return null;
  }

  return (
    <Stack
      direction="row"
      useFlexGap
      spacing={1.5}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        minHeight: 36,
      }}
    >
      {leading ? <Box sx={{ minWidth: 0 }}>{leading}</Box> : <Box />}
      {actions ? (
        <Stack direction="row" useFlexGap spacing={1} sx={{ alignItems: "center", flexShrink: 0 }}>
          {actions}
        </Stack>
      ) : null}
    </Stack>
  );
}
