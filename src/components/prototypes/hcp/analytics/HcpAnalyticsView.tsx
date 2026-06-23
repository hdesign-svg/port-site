"use client";

import Stack from "@mui/material/Stack";
import { type ReactNode } from "react";
import { hcpContentSpacing } from "../hcpTheme";
import { HcpDetachedToolbar } from "./HcpDetachedToolbar";

type HcpAnalyticsViewProps = {
  leading?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
};

/** Detached toolbar + full-width data block(s). */
export function HcpAnalyticsView({ leading, actions, children }: HcpAnalyticsViewProps) {
  return (
    <Stack spacing={`${hcpContentSpacing.inset}px`}>
      <HcpDetachedToolbar leading={leading} actions={actions} />
      {children}
    </Stack>
  );
}
