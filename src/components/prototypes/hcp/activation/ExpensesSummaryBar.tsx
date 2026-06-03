"use client";

import { GraduationCap, Info } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpFontWeight, hcpIcon } from "../hcpTheme";

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography variant="body2" sx={{ color: hcpColors.textSecondary }}>
          {label}
        </Typography>
        <Info size={hcpIcon.xs} color={hcpColors.textDisabled} aria-hidden />
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: hcpColors.textPrimary,
          fontWeight: hcpFontWeight.regular,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export function ExpensesSummaryBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 5, flexWrap: "wrap" }}>
        <Metric label="Available balance" value="$0" />
        <Metric label="Pending deposits" value="$0" />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
        <Box
          component="button"
          type="button"
          aria-label="Learn how HCP Money works"
          sx={{
            width: hcpIcon.md,
            height: hcpIcon.md,
            p: 0,
            m: 0,
            border: 0,
            bgcolor: "transparent",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: hcpColors.textSecondary,
            borderRadius: "50%",
            "&:hover": {
              bgcolor: hcpColors.surfaceMuted,
            },
          }}
        >
          <GraduationCap size={hcpIcon.md} />
        </Box>
        <Button variant="contained" color="primary">
          Add funds
        </Button>
      </Box>
    </Box>
  );
}
