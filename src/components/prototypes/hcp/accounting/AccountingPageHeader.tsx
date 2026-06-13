"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpContentSpacing } from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

export function AccountingPageHeader() {
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
        Accounting
      </Typography>

      <Box sx={{ flexShrink: 0, textAlign: "right" }}>
        <Typography variant={hcpTypographyRoles.metricLabel} color="text.secondary" component="div">
          Accounts synced
        </Typography>
        <Typography
          variant={hcpTypographyRoles.metricValue}
          component="div"
          sx={{ color: hcpColors.textPrimary, lineHeight: 1.33 }}
        >
          2h ago
        </Typography>
      </Box>
    </Box>
  );
}
