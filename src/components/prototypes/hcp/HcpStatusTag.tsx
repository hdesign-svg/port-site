"use client";

import Box from "@mui/material/Box";
import { hcpColors, hcpFontWeight } from "./hcpTheme";

/** Semantic status tones — blue in-progress, green complete, gray inactive, red failed */
export type HcpStatusTagTone = "primary" | "success" | "danger" | "neutral";

const toneStyles: Record<HcpStatusTagTone, { bgcolor: string; color: string }> = {
  primary: {
    bgcolor: "rgba(14, 111, 190, 0.12)",
    color: hcpColors.primary,
  },
  success: {
    bgcolor: hcpColors.successLight,
    color: hcpColors.successMain,
  },
  danger: {
    bgcolor: "rgba(216, 27, 96, 0.12)",
    color: hcpColors.spending,
  },
  neutral: {
    bgcolor: hcpColors.surfaceMuted,
    color: hcpColors.textSecondary,
  },
};

export function billPayStatusTone(status: "submitted" | "scheduled" | "paid" | "failed"): HcpStatusTagTone {
  switch (status) {
    case "submitted":
    case "scheduled":
      return "primary";
    case "paid":
      return "success";
    case "failed":
      return "danger";
  }
}

export function cardStatusTone(status: "active" | "inactive"): HcpStatusTagTone {
  return status === "active" ? "success" : "neutral";
}

type HcpStatusTagProps = {
  label: string;
  tone: HcpStatusTagTone;
};

export function HcpStatusTag({ label, tone }: HcpStatusTagProps) {
  const colors = toneStyles[tone];

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1,
        py: 0.25,
        borderRadius: 9999,
        bgcolor: colors.bgcolor,
        color: colors.color,
        fontSize: 13,
        fontWeight: hcpFontWeight.semibold,
        lineHeight: 1.33,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}
