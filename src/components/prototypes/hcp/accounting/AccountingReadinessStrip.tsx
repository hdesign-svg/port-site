"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import type { AccountingReadiness } from "./accountingReadiness";
import { hcpColors, hcpFontWeight, hcpRadius } from "../hcpTheme";

type AccountingReadinessStripProps = {
  readiness: AccountingReadiness;
};

export function AccountingReadinessStrip({ readiness }: AccountingReadinessStripProps) {
  const { periodLabel, readyPercent, needsYouCount, sortedCount } = readiness;

  const statusLine =
    needsYouCount === 0
      ? `${periodLabel} is ready for your CPA`
      : `${needsYouCount} ${needsYouCount === 1 ? "item needs" : "items need"} you · ${sortedCount} already sorted`;

  return (
    <Box
      sx={{
        mb: 2,
        px: 2,
        py: 1.5,
        bgcolor: hcpColors.paper,
        border: `1px solid ${hcpColors.borderSubtle}`,
        borderRadius: hcpRadius.control,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
          {periodLabel}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
          {readyPercent}% ready
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={readyPercent}
        aria-label={`${readyPercent}% ready for ${periodLabel}`}
        sx={{
          height: 6,
          borderRadius: 999,
          mb: 1,
          bgcolor: hcpColors.surfaceMuted,
          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
            bgcolor: needsYouCount === 0 ? hcpColors.successMain : hcpColors.primary,
          },
        }}
      />

      <Typography variant="body2" color="text.secondary">
        {statusLine}
      </Typography>
    </Box>
  );
}
