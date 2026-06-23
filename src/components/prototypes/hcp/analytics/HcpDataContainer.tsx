"use client";

import Paper from "@mui/material/Paper";
import { type SxProps, type Theme } from "@mui/material/styles";
import { type ReactNode } from "react";

type HcpDataContainerProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

/** Bordered box — table or chart body only. Chrome lives above in HcpDetachedToolbar. */
export function HcpDataContainer({ children, sx }: HcpDataContainerProps) {
  return (
    <Paper variant="outlined" elevation={0} sx={{ overflow: "hidden", ...sx }}>
      {children}
    </Paper>
  );
}
