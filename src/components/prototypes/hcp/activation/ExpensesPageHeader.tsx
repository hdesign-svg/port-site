"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import {
  hcpColors,
  hcpModulePageHeaderChromeSx,
  hcpModulePageHeaderSx,
  hcpModulePageHeaderTabsSx,
} from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

type ExpensesPageHeaderProps = {
  tabs: ReactNode;
};

export function ExpensesPageHeader({ tabs }: ExpensesPageHeaderProps) {
  return (
    <Box sx={hcpModulePageHeaderSx}>
      <Typography component="h1" variant="h4" sx={{ color: hcpColors.textPrimary, minWidth: 0 }}>
        Expenses
      </Typography>

      <Box sx={{ ...hcpModulePageHeaderChromeSx, textAlign: "right" }}>
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

      <Box sx={hcpModulePageHeaderTabsSx}>{tabs}</Box>
    </Box>
  );
}
