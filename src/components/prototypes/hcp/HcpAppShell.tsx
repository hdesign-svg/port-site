"use client";

import Box from "@mui/material/Box";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { HcpGlobalNav, type HcpGlobalNavProps } from "./HcpGlobalNav";
import { HcpTopBar } from "./HcpTopBar";
import { hcpColors } from "./hcpTheme";

const HcpRailReviewCountContext = createContext<(count: number) => void>(() => {});

/** Syncs Accounting review queue size to the Money sub-nav badge in the left rail */
export function useHcpAccountingReviewCount(count: number) {
  const setReviewCount = useContext(HcpRailReviewCountContext);

  useEffect(() => {
    setReviewCount(count);
    return () => setReviewCount(0);
  }, [count, setReviewCount]);
}

type HcpAppShellProps = {
  children: ReactNode;
  navProps?: HcpGlobalNavProps;
};

export function HcpAppShell({ children, navProps }: HcpAppShellProps) {
  const [accountingReviewCount, setAccountingReviewCount] = useState(0);

  return (
    <HcpRailReviewCountContext.Provider value={setAccountingReviewCount}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
          bgcolor: hcpColors.background,
          color: hcpColors.textPrimary,
        }}
      >
        <HcpGlobalNav {...navProps} accountingReviewCount={accountingReviewCount} />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HcpTopBar />
          <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </HcpRailReviewCountContext.Provider>
  );
}
