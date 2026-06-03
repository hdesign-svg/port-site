"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { hcpColors } from "./hcpTheme";

const hcpTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: hcpColors.primary, dark: hcpColors.primaryDark },
    background: { default: hcpColors.background, paper: hcpColors.paper },
    text: { primary: hcpColors.textPrimary, secondary: hcpColors.textSecondary },
    divider: hcpColors.border,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily:
      '"Open Sans", "Inter", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
  },
});

export function HcpMuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={hcpTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
