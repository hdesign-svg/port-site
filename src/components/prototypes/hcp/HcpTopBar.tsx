"use client";

import { useState } from "react";
import {
  Bank,
  Bell,
  DotsThree,
  ListChecks,
  MagnifyingGlass,
  Phone,
  Question,
  Sparkle,
} from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { hcpChromeBarSx, hcpColors, hcpIcon, hcpLayout } from "./hcpTheme";

const TOP_ICON = hcpIcon.md;
const AI_SPARKLE_COLOR = "#623CC9";
const SEARCH_ICON = hcpIcon.sm;
const SEARCH_PLACEHOLDER = "Search jobs, customers, invoices";

const linkedAccountMenuItems = [
  "Edit bank details",
  "Refresh connection",
  "Disconnect account",
] as const;

const moreMenuItems = [
  { Icon: Phone, label: "Phone" },
  { Icon: ListChecks, label: "Tasks" },
  { Icon: Question, label: "Help" },
] as const;

const iconButtonSx = {
  position: "relative" as const,
  width: TOP_ICON,
  height: TOP_ICON,
  p: 0,
  m: 0,
  border: 0,
  bgcolor: "transparent",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  borderRadius: "40px",
  color: hcpColors.textSecondary,
  flexShrink: 0,
  "& svg": {
    display: "block",
    flexShrink: 0,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: -8,
    borderRadius: "40px",
  },
  "&:hover::before": {
    bgcolor: "action.hover",
  },
} as const;

/** Sparkle glyph sits low/right in its viewBox — nudge to match Bank/Bell optically */
const aiIconButtonSx = {
  ...iconButtonSx,
  "& svg": {
    display: "block",
    flexShrink: 0,
    transform: "translate(0.5px, -2px)",
  },
} as const;

export function HcpTopBar() {
  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null);
  const [bankAnchor, setBankAnchor] = useState<null | HTMLElement>(null);
  const moreOpen = Boolean(moreAnchor);
  const bankOpen = Boolean(bankAnchor);

  return (
    <Box
      component="header"
      sx={{
        ...hcpChromeBarSx,
        flexShrink: 0,
        bgcolor: hcpColors.paper,
        borderBottom: `1px solid ${hcpColors.border}`,
        justifyContent: "space-between",
        pl: `${hcpLayout.contentInset}px`,
        pr: `${hcpLayout.railInset}px`,
        gap: 2,
      }}
    >
      <TextField
        size="small"
        variant="outlined"
        placeholder={SEARCH_PLACEHOLDER}
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 0.25, ml: -0.25 }}>
                <MagnifyingGlass size={SEARCH_ICON} color={hcpColors.searchPlaceholder} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: hcpLayout.searchFieldWidth,
          flexShrink: 0,
          "& .MuiOutlinedInput-root": {
            bgcolor: hcpColors.paper,
            borderRadius: "10px",
            transition: "border-color 0.15s ease",
            "& fieldset": {
              borderColor: hcpColors.searchBorder,
            },
            "&:hover fieldset": {
              borderColor: hcpColors.border,
            },
            "&.Mui-focused fieldset": {
              borderColor: hcpColors.border,
              borderWidth: 1,
            },
          },
          "& .MuiInputBase-input": {
            color: hcpColors.textPrimary,
            fontWeight: 400,
            cursor: "pointer",
            py: 0.875,
            "&::placeholder": {
              color: hcpColors.searchPlaceholder,
              opacity: 1,
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: `${hcpLayout.iconGlyphGap}px`,
          flexShrink: 0,
        }}
      >
        <Box component="button" type="button" aria-label="AI" sx={aiIconButtonSx}>
          <Sparkle size={TOP_ICON} color={AI_SPARKLE_COLOR} weight="regular" />
        </Box>

        <Box
          component="button"
          type="button"
          aria-label="Linked accounts"
          aria-haspopup="true"
          aria-expanded={bankOpen ? "true" : undefined}
          aria-controls={bankOpen ? "hcp-topbar-bank-menu" : undefined}
          onClick={(event) => setBankAnchor(event.currentTarget)}
          sx={iconButtonSx}
        >
          <Bank size={TOP_ICON} color={hcpColors.textSecondary} />
        </Box>

        <Box component="button" type="button" aria-label="Notifications" sx={iconButtonSx}>
          <Bell size={TOP_ICON} color={hcpColors.textSecondary} />
        </Box>

        <Menu
          id="hcp-topbar-bank-menu"
          anchorEl={bankAnchor}
          open={bankOpen}
          onClose={() => setBankAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 200,
                border: `1px solid ${hcpColors.border}`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              },
            },
          }}
        >
          {linkedAccountMenuItems.map((label) => (
            <MenuItem
              key={label}
              onClick={() => setBankAnchor(null)}
              sx={{
                py: 1.25,
                color: label === "Disconnect account" ? hcpColors.spending : hcpColors.textPrimary,
              }}
            >
              <Typography variant="body2">{label}</Typography>
            </MenuItem>
          ))}
        </Menu>

        <Box
          component="button"
          type="button"
          aria-label="More"
          aria-haspopup="true"
          aria-expanded={moreOpen ? "true" : undefined}
          aria-controls={moreOpen ? "hcp-topbar-more-menu" : undefined}
          onClick={(event) => setMoreAnchor(event.currentTarget)}
          sx={iconButtonSx}
        >
          <DotsThree size={TOP_ICON} weight="bold" color={hcpColors.textSecondary} />
        </Box>

        <Menu
          id="hcp-topbar-more-menu"
          anchorEl={moreAnchor}
          open={moreOpen}
          onClose={() => setMoreAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 180,
                border: `1px solid ${hcpColors.border}`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              },
            },
          }}
        >
          {moreMenuItems.map(({ Icon, label }) => (
            <MenuItem
              key={label}
              onClick={() => setMoreAnchor(null)}
              sx={{
                gap: 1.5,
                py: 1.25,
                color: hcpColors.textSecondary,
              }}
            >
              <Icon size={hcpIcon.sm} />
              <Typography component="span" variant="subtitle2">
                {label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
