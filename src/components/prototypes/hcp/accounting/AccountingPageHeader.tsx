"use client";

import Typography from "@mui/material/Typography";
import { hcpColors, hcpContentSpacing } from "../hcpTheme";

export function AccountingPageHeader() {
  return (
    <Typography
      component="h1"
      variant="h4"
      sx={{
        color: hcpColors.textPrimary,
        mb: `${hcpContentSpacing.pageHeaderStack}px`,
      }}
    >
      Accounting
    </Typography>
  );
}
