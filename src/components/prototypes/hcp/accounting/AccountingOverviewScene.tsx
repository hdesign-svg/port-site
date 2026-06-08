"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpContentSpacing,
  hcpLayout,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

export function AccountingOverviewScene() {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: hcpColors.background,
      }}
    >
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: hcpColors.background,
          ...hcpPageHeaderZoneSx,
        }}
      >
        <Box sx={hcpContentHeaderSx}>
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
        </Box>
      </Box>

      <Box sx={{ ...hcpContentHeaderSx, pb: `${hcpContentSpacing.zoneInset}px` }}>
        <Box
          sx={{
            bgcolor: hcpColors.paper,
            border: `1px solid ${hcpColors.borderSubtle}`,
            borderRadius: `${hcpLayout.controlRadius}px`,
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Transaction review
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Basic Accounting prototype — hero view after unlock. Transaction review and reporting screens
            will build out from here.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
