"use client";

import Box from "@mui/material/Box";
import { HcpGlobalNav, type HcpGlobalNavProps } from "./HcpGlobalNav";
import { HcpTopBar } from "./HcpTopBar";
import { hcpColors } from "./hcpTheme";

type HcpAppShellProps = {
  children: React.ReactNode;
  navProps?: HcpGlobalNavProps;
};

export function HcpAppShell({ children, navProps }: HcpAppShellProps) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        bgcolor: hcpColors.background,
        color: hcpColors.textPrimary,
      }}
    >
      <HcpGlobalNav {...navProps} />

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
