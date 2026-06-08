"use client";

import { GraduationCap } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { hcpChromeIconButtonSx, hcpColors, hcpIcon, hcpSecondaryButtonSx } from "../hcpTheme";

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
      <Typography variant="caption" color="text.disabled" component="div">
        {label}
      </Typography>
      <Typography variant="h6" color="text.primary" component="div">
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
      <Metric label="Available" value="$8,742.18" />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        <IconButton
          size="small"
          aria-label="Learn how HCP Money works"
          sx={hcpChromeIconButtonSx}
        >
          <GraduationCap size={hcpIcon.md} weight="regular" />
        </IconButton>

        <Button variant="outlined" size="medium" sx={hcpSecondaryButtonSx}>
          Add funds
        </Button>
      </Box>
    </Box>
  );
}
