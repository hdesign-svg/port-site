"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import {
  hcpColors,
  hcpContentHeaderSx,
  hcpModulePageHeaderTitleRowSx,
  hcpModuleStickyTabBarSx,
  hcpModuleTitleToTabsGap,
  hcpPageHeaderZoneSx,
} from "../hcpTheme";

type AccountingPageHeaderProps = {
  tabs: ReactNode;
};

export function AccountingPageHeader({ tabs }: AccountingPageHeaderProps) {
  return (
    <>
      <Box
        sx={{
          ...hcpContentHeaderSx,
          pt: hcpPageHeaderZoneSx.pt,
          pb: `${hcpModuleTitleToTabsGap}px`,
        }}
      >
        <Box sx={hcpModulePageHeaderTitleRowSx}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: hcpColors.textPrimary,
              minWidth: 0,
            }}
          >
            Accounting
          </Typography>
        </Box>
      </Box>

      <Box sx={hcpModuleStickyTabBarSx}>
        <Box sx={hcpContentHeaderSx}>{tabs}</Box>
      </Box>
    </>
  );
}
