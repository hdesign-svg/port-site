"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccountingTabPanel } from "./AccountingTabPanel";
import { hcpColors, hcpFontWeight, hcpLayout, hcpRadius } from "../hcpTheme";

export function AccountingReportsTab() {
  return (
    <AccountingTabPanel>
      <Box
        sx={{
          bgcolor: hcpColors.paper,
          border: `1px solid ${hcpColors.border}`,
          borderRadius: hcpRadius.control,
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: hcpFontWeight.semibold }}>
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Profit & loss and balance sheet views will build out here — To review is the post-activation
          hero for the prototype.
        </Typography>
      </Box>
    </AccountingTabPanel>
  );
}
