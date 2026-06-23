"use client";

import Box from "@mui/material/Box";
import { type ReactNode } from "react";
import { hcpContentHeaderSx, hcpContentSpacing } from "../hcpTheme";

/** Shared tab body inset — gap below tab divider at rest; scrolls under sticky tabs. */
export function AccountingTabPanel({ children }: { children: ReactNode }) {
  return (
    <Box
      component="section"
      sx={{
        ...hcpContentHeaderSx,
        pt: `${hcpContentSpacing.tabToContent}px`,
        pb: `${hcpContentSpacing.zoneInset}px`,
      }}
    >
      {children}
    </Box>
  );
}
