"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { hcpColors } from "./hcpTheme";
import { createHcpTypography } from "./hcpTypography";

const hcpTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: hcpColors.primary, dark: hcpColors.primaryDark },
    background: { default: hcpColors.background, paper: hcpColors.paper },
    text: {
      primary: hcpColors.textPrimary,
      secondary: hcpColors.textSecondary,
      disabled: hcpColors.textDisabled,
    },
    divider: hcpColors.border,
  },
  shape: { borderRadius: 8 },
  typography: createHcpTypography(),
  components: {
    MuiTypography: {
      defaultProps: {
        color: "text.primary",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 100,
        },
        sizeSmall: {
          minHeight: 28,
          paddingInline: 14,
        },
        sizeMedium: {
          minHeight: 36,
          paddingInline: 20,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontSize: "0.857rem",
          fontWeight: 600,
          lineHeight: 1.33,
        },
        sizeSmall: {
          height: 20,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: 1.43,
        },
        input: {
          paddingTop: 7,
          paddingBottom: 7,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 400,
        },
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
