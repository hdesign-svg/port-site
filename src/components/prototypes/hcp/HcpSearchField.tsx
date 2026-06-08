"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { hcpColors, hcpIcon, hcpSearchFieldSx } from "./hcpTheme";

const SEARCH_ICON = hcpIcon.sm;

type HcpSearchFieldProps = Omit<TextFieldProps, "size" | "variant"> & {
  readOnly?: boolean;
};

export function HcpSearchField({ placeholder, readOnly = false, sx, ...props }: HcpSearchFieldProps) {
  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder={placeholder}
      slotProps={{
        input: {
          readOnly,
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 0.25, ml: -0.25 }}>
              <MagnifyingGlass size={SEARCH_ICON} color={hcpColors.searchPlaceholder} />
            </InputAdornment>
          ),
        },
      }}
      sx={[
        hcpSearchFieldSx,
        readOnly ? { "& .MuiInputBase-input": { cursor: "pointer" } } : {},
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
}
