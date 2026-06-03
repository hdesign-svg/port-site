"use client";

import Box from "@mui/material/Box";
import { HcpGlobalNav } from "./HcpGlobalNav";
import { HcpTopBar } from "./HcpTopBar";
import { hcpColors } from "./hcpTheme";

type HcpAppShellProps = {
  children: React.ReactNode;
};

export function HcpAppShell({ children }: HcpAppShellProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: hcpColors.background,
        color: hcpColors.textPrimary,
      }}
    >
      <HcpGlobalNav />

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HcpTopBar />
        <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
