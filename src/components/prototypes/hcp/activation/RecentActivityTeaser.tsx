"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpFontWeight } from "../hcpTheme";

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
        borderRadius: 1,
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
          <Typography
            variant="h6"
            sx={{
              color: hcpColors.textPrimary,
              fontWeight: hcpFontWeight.semibold,
            }}
          >
            Recent activity
          </Typography>
          <Typography variant="body2" sx={{ color: hcpColors.textSecondary, mt: 0.25 }}>
            12 transactions imported from linked accounts
          </Typography>
        </Box>
        <Button variant="text" color="primary" sx={{ flexShrink: 0, mt: -0.5 }}>
          View all
        </Button>
      </Box>

      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
        {recentTransactions.map((row, index) => (
          <Box
            component="li"
            key={`${row.merchant}-${row.date}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              px: 3,
              py: 1.75,
              borderBottom:
                index < recentTransactions.length - 1 ? `1px solid ${hcpColors.borderSubtle}` : undefined,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body1" sx={{ color: hcpColors.textPrimary }}>
                {row.merchant}
              </Typography>
              <Typography variant="body2" sx={{ color: hcpColors.textSecondary, mt: 0.25 }}>
                {row.date}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: row.kind === "deposit" ? hcpColors.primary : hcpColors.spending,
                fontWeight: hcpFontWeight.semibold,
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
