"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { hcpChromeActionButtonSx, hcpColors, hcpFontWeight, hcpRadius } from "../hcpTheme";

const recentTransactions = [
  { merchant: "Home Depot", date: "May 28", amount: "-$142.50", kind: "spending" as const },
  { merchant: "ACH Transfer — Operating", date: "May 27", amount: "+$3,200.00", kind: "deposit" as const },
  { merchant: "Shell Oil", date: "May 26", amount: "-$68.40", kind: "spending" as const },
];

export function RecentActivityTeaser() {
  return (
    <Box
      sx={{
        bgcolor: hcpColors.paper,
        border: `1px solid ${hcpColors.border}`,
        borderRadius: hcpRadius.control,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          px: 3,
          py: 2,
          borderBottom: `1px solid ${hcpColors.border}`,
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ fontWeight: hcpFontWeight.semibold }}>
            Recent activity
          </Typography>
          <Typography variant="caption" color="text.disabled" component="div" sx={{ mt: 0.25 }}>
            12 transactions imported from linked accounts
          </Typography>
        </Box>
        <Button variant="text" sx={{ ...hcpChromeActionButtonSx, flexShrink: 0, mt: -0.5 }}>
          View all
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "88px 1fr auto",
          gap: 2,
          px: 3,
          py: 1.25,
          bgcolor: hcpColors.tableHeaderBg,
          borderBottom: `1px solid ${hcpColors.borderSubtle}`,
        }}
      >
        {["Date", "To/From", "Amount"].map((header) => (
          <Typography key={header} variant="caption" color="text.disabled">
            {header}
          </Typography>
        ))}
      </Box>

      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
        {recentTransactions.map((row, index) => (
          <Box
            component="li"
            key={`${row.merchant}-${row.date}`}
            sx={{
              display: "grid",
              gridTemplateColumns: "88px 1fr auto",
              gap: 2,
              alignItems: "center",
              px: 3,
              py: 1.75,
              borderBottom:
                index < recentTransactions.length - 1 ? `1px solid ${hcpColors.borderSubtle}` : undefined,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {row.date}
            </Typography>
            <Typography variant="body1" sx={{ minWidth: 0 }}>
              {row.merchant}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: hcpColors.textPrimary,
                fontVariantNumeric: "tabular-nums",
                flexShrink: 0,
              }}
            >
              {row.amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
