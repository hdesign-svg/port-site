"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpContentSpacing } from "../hcpTheme";
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
      <Typography component="h1" variant="h4" sx={{ color: hcpColors.textPrimary, minWidth: 0 }}>
        Expenses
      </Typography>

      <Box sx={{ flexShrink: 0, textAlign: "right" }}>
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
  );
}
