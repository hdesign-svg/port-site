"use client";

import Box from "@mui/material/Box";
import { type ReactNode } from "react";
import { hcpContentHeaderSx, hcpContentSpacing } from "../hcpTheme";

export function AccountingTabPanel({ children }: { children: ReactNode }) {
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
