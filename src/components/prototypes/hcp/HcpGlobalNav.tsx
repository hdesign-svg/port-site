"use client";

import {
  CalendarBlank,
  CaretDown,
  CaretUp,
  ChartBar,
  ChatCircle,
  CreditCard,
  FileText,
  Gear,
  House,
  Megaphone,
  Receipt,
  SquaresFour,
  Tag,
  Users,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { hcpChromeBarSx, hcpColors, hcpFontWeight, hcpIcon, hcpLayout } from "./hcpTheme";

const NAV_PRIMARY_ICON = hcpIcon.md;
const NAV_CHEVRON_SIZE = 18;
const NAV_TRAILING_SLOT = 20;
const FOOTER_USER_DISPLAY_NAME = "Sarah";
const FOOTER_USER_FULL_NAME = "Sarah Mitchell";

const navItemSx = {
  display: "flex",
  alignItems: "center",
  gap: `${hcpLayout.navIconLabelGap}px`,
  width: "100%",
  py: `${hcpLayout.navRowPy}px`,
  borderRadius: 1,
};

const trailingSlotSx = {
  width: NAV_TRAILING_SLOT,
  height: NAV_TRAILING_SLOT,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

function TrailingSlot({ children }: { children?: React.ReactNode }) {
  return <Box sx={trailingSlotSx}>{children}</Box>;
}

function NavDivider() {
  return (
    <Box
      sx={{
        py: `${hcpLayout.navRowPy}px`,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "1px",
          bgcolor: hcpColors.border,
        }}
      />
    </Box>
  );
}

function NavRow({
  icon: Icon,
  label,
  chevron,
  selected = false,
}: {
  icon: Icon;
  label: string;
  chevron?: "down" | "up";
  selected?: boolean;
}) {
  const iconColor = selected ? hcpColors.primary : hcpColors.navIcon;
  const labelColor = selected ? hcpColors.textPrimary : hcpColors.textMuted;

  return (
    <Box sx={navItemSx}>
      <Box
        sx={{
          width: NAV_PRIMARY_ICON,
          height: NAV_PRIMARY_ICON,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          size={NAV_PRIMARY_ICON}
          color={iconColor}
          weight={selected ? "fill" : "regular"}
        />
      </Box>
      <Typography
        variant="navLabel"
        sx={{
          flex: 1,
          color: labelColor,
          fontWeight: selected ? hcpFontWeight.semibold : hcpFontWeight.regular,
          minWidth: 0,
        }}
      >
        {label}
      </Typography>
      {chevron ? (
        <TrailingSlot>
          {chevron === "down" ? (
            <CaretDown size={NAV_CHEVRON_SIZE} color={iconColor} weight="regular" />
          ) : (
            <CaretUp size={NAV_CHEVRON_SIZE} color={iconColor} weight="regular" />
          )}
        </TrailingSlot>
      ) : null}
    </Box>
  );
}

function SubNavItem({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {active ? (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: 1,
            bgcolor: hcpColors.expensesActive,
            zIndex: 0,
          }}
        />
      ) : null}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          py: 0.75,
          pl: 5,
        }}
      >
        <Typography
          variant={active ? "captionSemibold" : "caption"}
          sx={{
            flex: 1,
            color: active ? hcpColors.textPrimary : hcpColors.textMuted,
            minWidth: 0,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

function FooterUserAccount() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: NAV_PRIMARY_ICON,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/hcp/user-jill.png"
            alt={FOOTER_USER_FULL_NAME}
            fill
            sizes="28px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: hcpColors.textPrimary,
          fontWeight: hcpFontWeight.regular,
          maxWidth: 64,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {FOOTER_USER_DISPLAY_NAME}
      </Typography>

      <Box sx={{ flex: 1, minWidth: 0 }} />

      <TrailingSlot>
        <Gear size={NAV_PRIMARY_ICON} color={hcpColors.textSecondary} weight="regular" aria-label="Settings" />
      </TrailingSlot>
    </Box>
  );
}

export function HcpGlobalNav() {
  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        width: hcpLayout.globalNavWidth,
        height: "100%",
        flexShrink: 0,
        bgcolor: hcpColors.paper,
        borderRight: `1px solid ${hcpColors.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Header — logo row, height matched to top bar */}
      <Box
        sx={{
          ...hcpChromeBarSx,
          flexShrink: 0,
          bgcolor: hcpColors.paper,
          borderBottom: `1px solid ${hcpColors.border}`,
          px: `${hcpLayout.railInset}px`,
          zIndex: 3,
        }}
      >
        <Box
          component="img"
          src="/images/hcp/hcp-logo.svg"
          alt="Housecall Pro"
          sx={{
            display: "block",
            height: 20,
            width: 140.5,
          }}
        />
      </Box>

      {/* Scrollable nav */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          px: `${hcpLayout.railInset}px`,
          py: `${hcpLayout.navListPaddingY}px`,
          bgcolor: hcpColors.paper,
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: `${hcpLayout.navItemGap}px`,
          }}
        >
          <NavRow icon={House} label="Home" />
          <NavRow icon={CalendarBlank} label="Schedule" />
          <NavRow icon={ChartBar} label="Pipeline" />

          <NavDivider />

          <NavRow icon={Users} label="Customers" />
          <NavRow icon={Megaphone} label="Leads" />
          <NavRow icon={FileText} label="Estimates" />
          <NavRow icon={Wrench} label="Jobs" />
          <NavRow icon={Receipt} label="Invoices" />

          <NavDivider />

          <NavRow icon={ChatCircle} label="Communications" chevron="down" />

          <Box sx={{ display: "flex", flexDirection: "column", gap: `${hcpLayout.navItemGap}px` }}>
            <NavRow icon={CreditCard} label="Money" selected chevron="up" />
            <SubNavItem label="Payments" />
            <SubNavItem label="Expenses" active />
            <SubNavItem label="Business Financing" />
            <SubNavItem label="Accounting" />
          </Box>

          <NavRow icon={Megaphone} label="Marketing" chevron="down" />
          <NavRow icon={ChartBar} label="Reporting" chevron="down" />
          <NavRow icon={UsersThree} label="Team" chevron="down" />

          <NavDivider />

          <NavRow icon={Tag} label="Price Book" />
          <NavRow icon={SquaresFour} label="Apps" />
          <NavRow icon={Receipt} label="Service Plans" />
        </Box>
      </Box>

      {/* Footer — user account, height matched to logo header */}
      <Box
        sx={{
          ...hcpChromeBarSx,
          flexShrink: 0,
          bgcolor: hcpColors.paper,
          borderTop: `1px solid ${hcpColors.border}`,
          px: `${hcpLayout.railInset}px`,
          zIndex: 1,
        }}
      >
        <FooterUserAccount />
      </Box>
    </Box>
  );
}
