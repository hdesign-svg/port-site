"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HcpAppShell } from "@/components/prototypes/hcp/HcpAppShell";

export default function HcpAccountingPrototypePage() {
  return (
    <HcpAppShell>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 48px)",
          p: 4,
        }}
      >
        <Typography color="text.secondary" align="center" sx={{ maxWidth: 480 }}>
          Basic Accounting prototype — waiting on your screenshots and shot list.
        </Typography>
      </Box>
    </HcpAppShell>
  );
}
