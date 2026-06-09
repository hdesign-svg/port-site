"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { hcpColors, hcpContentSpacing, hcpLayout } from "./hcpTheme";
import { createHcpTypography, hcpHtmlFontSize } from "./hcpTypography";

const chromeFontSize = `${hcpHtmlFontSize / 16}rem`;

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
          borderRadius: `${hcpLayout.controlRadius}px`,
          fontWeight: 600,
          color: hcpColors.textPrimary,
        },
        text: {
          fontSize: chromeFontSize,
          lineHeight: 1.43,
        },
        outlined: {
          fontSize: chromeFontSize,
          lineHeight: 1.43,
        },
        contained: {
          fontSize: chromeFontSize,
          lineHeight: 1.43,
        },
        sizeSmall: {
          minHeight: hcpLayout.chromeControlHeight,
          paddingInline: 10,
        },
        sizeMedium: {
          minHeight: hcpLayout.actionControlHeight,
          paddingInline: 16,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 400,
          fontSize: chromeFontSize,
          lineHeight: 1.43,
          borderRadius: `${hcpLayout.controlRadius}px`,
          color: hcpColors.textSecondary,
          px: 1.25,
          py: 0.375,
          "&.Mui-selected": {
            bgcolor: hcpColors.paper,
            color: hcpColors.textPrimary,
            fontWeight: 600,
            "&:hover": {
              bgcolor: hcpColors.paper,
            },
          },
        },
        sizeSmall: {
          minHeight: hcpLayout.chromeControlHeight,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: `${hcpLayout.controlRadius}px`,
          bgcolor: hcpColors.surfaceMuted,
          p: 0.25,
          gap: 0.25,
          "& .MuiToggleButtonGroup-grouped": {
            border: 0,
            borderRadius: `${hcpLayout.controlRadius - 2}px !important`,
            mx: 0,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontSize: chromeFontSize,
          fontWeight: 600,
          lineHeight: 1.33,
        },
        sizeSmall: {
          height: 22,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: chromeFontSize,
          lineHeight: 1.43,
        },
        input: {
          paddingTop: 7,
          paddingBottom: 7,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: chromeFontSize,
          lineHeight: 1.43,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: chromeFontSize,
          fontWeight: 400,
          lineHeight: 1.43,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          bgcolor: hcpColors.paper,
        },
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${hcpColors.borderSubtle}`,
          px: `${hcpContentSpacing.surfaceInsetX}px`,
          py: 1.75,
          fontSize: chromeFontSize,
          lineHeight: 1.43,
        },
        head: {
          bgcolor: hcpColors.tableHeaderBg,
          color: hcpColors.textDisabled,
          fontSize: "0.75rem",
          lineHeight: 1.33,
          fontWeight: 400,
          py: 1.25,
          px: `${hcpContentSpacing.surfaceInsetX}px`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td, &:last-child th": {
            borderBottom: 0,
          },
          "&:hover": {
            bgcolor: "rgba(33, 33, 33, 0.02)",
          },
        },
        head: {
          "&:hover": {
            bgcolor: hcpColors.tableHeaderBg,
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          fontWeight: "inherit",
          gap: 0.5,
          "&:hover": {
            color: hcpColors.textSecondary,
          },
          "&.Mui-active": {
            color: hcpColors.textPrimary,
            "& .MuiTableSortLabel-icon": {
              opacity: 1,
              color: `${hcpColors.textMuted} !important`,
            },
          },
        },
        icon: {
          fontSize: "1rem",
          opacity: 0.35,
          color: `${hcpColors.textDisabled} !important`,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${hcpColors.borderSubtle}`,
          color: hcpColors.textSecondary,
          fontSize: chromeFontSize,
        },
        toolbar: {
          minHeight: 48,
          px: `${hcpContentSpacing.surfaceInsetX}px`,
        },
        select: {
          fontSize: chromeFontSize,
        },
        displayedRows: {
          fontSize: chromeFontSize,
        },
        actions: {
          "& .MuiIconButton-root": {
            color: hcpColors.textSecondary,
          },
          "& .Mui-disabled": {
            color: hcpColors.textDisabled,
          },
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
