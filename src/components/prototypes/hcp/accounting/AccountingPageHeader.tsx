"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ACCOUNTING_PERIOD_LABEL } from "./accountingReadiness";
import { hcpColors, hcpContentSpacing } from "../hcpTheme";

export function AccountingPageHeader() {
  return (
    <Box sx={{ mb: `${hcpContentSpacing.pageHeaderStack}px` }}>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          color: hcpColors.textPrimary,
          mb: 0.5,
        }}
      >
        Accounting
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {ACCOUNTING_PERIOD_LABEL} · Chase & Amex synced 2h ago
      </Typography>
    </Box>
  );
}
