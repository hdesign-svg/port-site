"use client";

import { useState } from "react";
import {
  Bank,
  Bell,
  DotsThree,
  ListChecks,
  Phone,
  Question,
  Sparkle,
} from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { HcpSearchField } from "./HcpSearchField";
import { hcpChromeBarSx, hcpColors, hcpIcon, hcpLayout, hcpMenuPaperSx } from "./hcpTheme";

const TOP_ICON = hcpIcon.md;
const AI_SPARKLE_COLOR = "#623CC9";
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
  borderRadius: `${hcpLayout.controlRadius}px`,
  color: hcpColors.chromeIcon,
  flexShrink: 0,
  "& svg": {
    display: "block",
    flexShrink: 0,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: -8,
    borderRadius: `${hcpLayout.controlRadius}px`,
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

const notificationDotSx = {
  position: "absolute",
  top: -1,
  right: -1,
  width: 9,
  height: 9,
  borderRadius: "50%",
  bgcolor: hcpColors.primary,
  border: `2px solid ${hcpColors.paper}`,
  pointerEvents: "none",
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
        px: `${hcpLayout.contentMargin}px`,
        gap: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: hcpLayout.searchFieldWidth,
        }}
      >
        <HcpSearchField
          placeholder={SEARCH_PLACEHOLDER}
          readOnly
          displayOnly
          sx={{ width: "100%" }}
        />
      </Box>

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
          <Bank size={TOP_ICON} color={hcpColors.chromeIcon} weight="regular" />
        </Box>

        <Box component="button" type="button" aria-label="Notifications" sx={iconButtonSx}>
          <Bell size={TOP_ICON} color={hcpColors.chromeIcon} weight="regular" />
          <Box aria-hidden sx={notificationDotSx} />
        </Box>

        <Menu
          id="hcp-topbar-bank-menu"
          anchorEl={bankAnchor}
          open={bankOpen}
          onClose={() => setBankAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 200 } } }}
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
              <Typography variant="body1">{label}</Typography>
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
          <DotsThree size={TOP_ICON} weight="bold" color={hcpColors.chromeIcon} />
        </Box>

        <Menu
          id="hcp-topbar-more-menu"
          anchorEl={moreAnchor}
          open={moreOpen}
          onClose={() => setMoreAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { ...hcpMenuPaperSx, minWidth: 180 } } }}
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
              <Icon size={hcpIcon.sm} weight="regular" />
              <Typography component="span" variant="body1">
                {label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
