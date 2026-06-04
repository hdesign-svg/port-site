"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpRadius } from "../hcpTheme";

const tabs = [
  "Overview",
  "Transactions",
  "Expense cards",
  "Receipts",
  "Settings",
  "Accounting",
];

export function EnrolledOverviewScene() {
  return (
    <Box sx={{ flex: 1, bgcolor: hcpColors.background, minHeight: 0 }}>
      <Box
        sx={{
          px: 3,
          py: 2.5,
          bgcolor: hcpColors.paper,
          borderBottom: `1px solid ${hcpColors.border}`,
        }}
      >
        <Typography sx={{ fontSize: 28, fontWeight: 400, lineHeight: 1.3 }}>
          HCP Money
        </Typography>
      </Box>

      <Tabs
        value={0}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          bgcolor: hcpColors.paper,
          borderBottom: `1px solid ${hcpColors.border}`,
          px: 2,
          minHeight: 46,
          "& .MuiTab-root": {
            minHeight: 46,
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
          },
        }}
      >
        {tabs.map((label, index) => (
          <Tab
            key={label}
            label={
              index === 4 ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  {label}
                  <Chip label="New" size="small" color="primary" sx={{ height: 20, fontSize: 11 }} />
                </Box>
              ) : (
                label
              )
            }
          />
        ))}
      </Tabs>

      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            bgcolor: hcpColors.paper,
            borderRadius: hcpRadius.control,
            border: `1px solid ${hcpColors.border}`,
            p: 3,
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 1 }}>
            Welcome to HCP Money!
          </Typography>
          <Typography sx={{ color: hcpColors.textSecondary, mb: 3 }}>
            We&apos;ll help you get started with HCP Money. It should only take a
            couple of minutes.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {[
              "Connect your bank account",
              "Order your first expense card",
              "Set spending limits for your team",
              "Capture your first receipt",
            ].map((task, index) => (
              <Box
                key={task}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: hcpRadius.control,
                  border: `1px solid ${hcpColors.border}`,
                  bgcolor: index === 3 ? hcpColors.background : hcpColors.paper,
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: `2px solid ${index === 3 ? hcpColors.border : hcpColors.primary}`,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{task}</Typography>
                  <Typography sx={{ fontSize: 13, color: hcpColors.textSecondary }}>
                    {index === 0
                      ? "Link accounts for faster reconciliation."
                      : index === 1
                        ? "Ship cards to team members in minutes."
                        : index === 2
                          ? "Control spend before it happens."
                          : "Completed — nice work."}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
