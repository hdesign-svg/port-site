"use client";

import Box from "@mui/material/Box";
import { type ReactNode } from "react";
import { hcpContentHeaderSx, hcpContentSpacing } from "../hcpTheme";

/** Shared tab body inset — content starts at the same offset under the tab bar. */
export function ExpensesTabPanel({ children }: { children: ReactNode }) {
  return (
    <Box
      component="section"
      sx={{
        ...hcpContentHeaderSx,
        pb: `${hcpContentSpacing.zoneInset}px`,
      }}
    >
      {children}
    </Box>
  );
}
