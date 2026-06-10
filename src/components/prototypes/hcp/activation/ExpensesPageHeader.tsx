"use client";

import { GraduationCap, Plus } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  hcpChromeIconButtonSx,
  hcpColors,
  hcpContentSpacing,
  hcpIcon,
  hcpWorkspaceCreateButtonSx,
} from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

export function ExpensesPageHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        mb: `${hcpContentSpacing.pageHeaderStack}px`,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography component="h1" variant="h4" sx={{ color: hcpColors.textPrimary }}>
          Expenses
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant={hcpTypographyRoles.metricLabel} color="text.secondary" component="div">
            Available balance
          </Typography>
          <Typography
            variant={hcpTypographyRoles.metricValue}
            component="div"
            sx={{ color: hcpColors.textPrimary, fontVariantNumeric: "tabular-nums", lineHeight: 1.33 }}
          >
            $8,742.18
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        <IconButton
          size="small"
          aria-label="Learn how HCP Money works"
          sx={hcpChromeIconButtonSx}
        >
          <GraduationCap size={hcpIcon.md} weight="regular" />
        </IconButton>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Plus size={hcpIcon.sm} weight="regular" />}
          sx={hcpWorkspaceCreateButtonSx}
        >
          Add funds
        </Button>
      </Box>
    </Box>
  );
}
