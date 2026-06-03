"use client";

import {
  Bell,
  ChatCircle,
  ListChecks,
  MagnifyingGlass,
  Phone,
  Question,
  Sparkle,
} from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { hcpColors, hcpLayout } from "./hcpTheme";

export function HcpTopBar() {
  return (
    <Box
      component="header"
      sx={{
        height: hcpLayout.topBarHeight,
        flexShrink: 0,
        bgcolor: hcpColors.paper,
        borderBottom: `1px solid ${hcpColors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        py: 1.5,
        gap: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxWidth: 552,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          border: `1px solid ${hcpColors.borderInput}`,
          borderRadius: 1,
          bgcolor: hcpColors.paper,
        }}
      >
        <MagnifyingGlass size={20} color={hcpColors.textSecondary} />
        <InputBase
          placeholder="Search Housecall Pro"
          sx={{
            flex: 1,
            fontSize: 16,
            color: hcpColors.textSecondary,
            "& input::placeholder": { opacity: 1, color: hcpColors.textSecondary },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {[Sparkle, ChatCircle, Phone, Bell, ListChecks, Question].map((Icon, index) => (
          <IconButton
            key={index}
            size="small"
            aria-label="Utility action"
            sx={{ color: hcpColors.textSecondary }}
          >
            <Icon size={22} />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
