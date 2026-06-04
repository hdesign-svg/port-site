"use client";

import { GraduationCap } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
      <Typography variant="caption" color="text.disabled" component="div">
        {label}
      </Typography>
      <Typography variant="h6" color="text.primary" fontWeight={hcpFontWeight.semibold} component="div">
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
        <IconButton
          size="medium"
          aria-label="Learn how HCP Money works"
          sx={{
            width: 36,
            height: 36,
            color: hcpColors.chromeIcon,
            border: `1px solid ${hcpColors.borderControl}`,
            borderRadius: "50%",
            bgcolor: hcpColors.paper,
            "&:hover": {
              bgcolor: hcpColors.paper,
              borderColor: hcpColors.borderInput,
            },
          }}
        >
          <GraduationCap size={hcpIcon.md} />
        </IconButton>

        <Button
          variant="outlined"
          size="medium"
          sx={{
            color: hcpColors.textPrimary,
            borderColor: hcpColors.borderControl,
            bgcolor: hcpColors.paper,
            "&:hover": {
              bgcolor: hcpColors.paper,
              borderColor: hcpColors.borderInput,
            },
          }}
        >
          Add funds
        </Button>
      </Box>
    </Box>
  );
}
