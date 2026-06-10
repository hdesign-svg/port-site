"use client";

import {
  ArrowsClockwise,
  CalendarBlank,
  CaretUp,
  ChartBar,
  ChartLineUp,
  ChatCircle,
  CreditCard,
  Lock,
  FileText,
  Gear,
  House,
  Megaphone,
  Receipt,
  SquaresFour,
  Tag,
  Target,
  Users,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { hcpChromeBarSx, hcpColors, hcpFontWeight, hcpIcon, hcpLayout, hcpRadius } from "./hcpTheme";

const NAV_PRIMARY_ICON = hcpIcon.md;
const NAV_TRAILING_ICON_SIZE = 16;
const NAV_TRAILING_SLOT = 20;
/** Sub-nav stem — centered in the 20px parent icon column (Linktree-style) */
const NAV_SUB_NAV_STEM_X = NAV_PRIMARY_ICON / 2;
const FOOTER_USER_DISPLAY_NAME = "Sarah";
const FOOTER_USER_FULL_NAME = "Sarah Mitchell";
const FOOTER_AVATAR_SIZE = 28;

const navIconSlotSx = {
  width: NAV_PRIMARY_ICON,
  height: NAV_PRIMARY_ICON,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

const navItemSx = {
  display: "flex",
  alignItems: "center",
  gap: `${hcpLayout.navIconLabelGap}px`,
  width: "100%",
  py: `${hcpLayout.navRowPy}px`,
  px: 0,
  borderRadius: hcpRadius.control,
  border: "none",
  bgcolor: "transparent",
  font: "inherit",
  textAlign: "left" as const,
  cursor: "pointer",
  "&:hover": {
    bgcolor: hcpColors.borderSubtle,
  },
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
    <Box sx={{ py: `${hcpLayout.navRowPy}px` }}>
      <Box sx={{ width: "100%", height: "1px", bgcolor: hcpColors.border }} />
    </Box>
  );
}

function NavRow({
  icon: IconComponent,
  label,
  chevron,
  selected = false,
}: {
  icon: Icon;
  label: string;
  chevron?: "up";
  selected?: boolean;
}) {
  const iconColor = selected ? hcpColors.navIconSelected : hcpColors.navIcon;
  const labelColor = selected ? hcpColors.textPrimary : hcpColors.textMuted;

  return (
    <Box
      component="button"
      type="button"
      aria-current={selected ? "page" : undefined}
      sx={navItemSx}
    >
      <Box sx={navIconSlotSx}>
        <IconComponent
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
          <CaretUp size={NAV_TRAILING_ICON_SIZE} color={labelColor} weight="regular" />
        </TrailingSlot>
      ) : null}
    </Box>
  );
}

export type MoneySubNavLabel = "Payments" | "Expenses" | "Financing" | "Accounting";

export type HcpGlobalNavProps = {
  activeMoneySubNav?: MoneySubNavLabel;
  lockedMoneySubNav?: readonly MoneySubNavLabel[];
  onMoneySubNavClick?: (label: MoneySubNavLabel) => void;
};

function MoneySubNavGroup({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: `${hcpLayout.navItemGap}px`,
        "&::before": {
          content: '""',
          position: "absolute",
          left: NAV_SUB_NAV_STEM_X - 0.5,
          top: 0,
          bottom: 0,
          width: "1px",
          bgcolor: hcpColors.border,
          pointerEvents: "none",
        },
      }}
    >
      {children}
    </Box>
  );
}

function SubNavItem({
  label,
  active,
  locked,
  onClick,
}: {
  label: MoneySubNavLabel;
  active?: boolean;
  locked?: boolean;
  onClick?: () => void;
}) {
  const row = (
    <Box
      component={onClick ? "button" : "div"}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      sx={{
        ...navItemSx,
        pl: `${hcpLayout.navSubLabelInset}px`,
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              bgcolor: "transparent",
              backgroundColor: "transparent",
              "& .money-sub-nav-label": {
                fontWeight: hcpFontWeight.semibold,
              },
            }
          : { bgcolor: "transparent", backgroundColor: "transparent" },
        "&:focus, &:active, &:focus-visible": {
          bgcolor: "transparent",
          backgroundColor: "transparent",
          outline: "none",
          boxShadow: "none",
        },
      }}
    >
      <Typography
        className="money-sub-nav-label"
        variant="body2"
        sx={{
          flex: 1,
          color: active ? hcpColors.textPrimary : hcpColors.textMuted,
          fontWeight: active ? hcpFontWeight.semibold : hcpFontWeight.regular,
          minWidth: 0,
        }}
      >
        {label}
      </Typography>
      {locked ? (
        <TrailingSlot>
          <Lock
            size={NAV_TRAILING_ICON_SIZE}
            color={hcpColors.navIconSelected}
            weight="regular"
            aria-hidden
          />
        </TrailingSlot>
      ) : (
        <Box sx={{ ...trailingSlotSx, visibility: "hidden" }} aria-hidden />
      )}
    </Box>
  );

  if (locked) {
    return (
      <Tooltip title={`Unlock ${label}`}>
        <Box component="span" sx={{ display: "block", width: "100%" }}>
          {row}
        </Box>
      </Tooltip>
    );
  }

  return row;
}

function FooterUserAccount() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: `${hcpLayout.navIconLabelGap}px`,
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box sx={{ ...navIconSlotSx, overflow: "visible" }}>
        <Box
          sx={{
            width: FOOTER_AVATAR_SIZE,
            height: FOOTER_AVATAR_SIZE,
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
        variant="navLabel"
        sx={{
          flex: 1,
          color: hcpColors.textPrimary,
          fontWeight: hcpFontWeight.regular,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {FOOTER_USER_DISPLAY_NAME}
      </Typography>

      <Box sx={{ ...trailingSlotSx, overflow: "visible" }}>
        <IconButton
          aria-label="Settings"
          sx={{
            width: hcpLayout.actionIconButtonSize,
            height: hcpLayout.actionIconButtonSize,
            p: 0,
            color: hcpColors.chromeIcon,
            borderRadius: hcpRadius.control,
            "&:hover": { bgcolor: "rgba(33, 33, 33, 0.04)" },
          }}
        >
          <Gear size={NAV_PRIMARY_ICON} weight="regular" />
        </IconButton>
      </Box>
    </Box>
  );
}

export function HcpGlobalNav({
  activeMoneySubNav = "Expenses",
  lockedMoneySubNav = [],
  onMoneySubNavClick,
}: HcpGlobalNavProps = {}) {
  const moneySubNavItems: MoneySubNavLabel[] = [
    "Payments",
    "Expenses",
    "Financing",
    "Accounting",
  ];

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

          <NavRow icon={ChatCircle} label="Communications" />

          <Box sx={{ display: "flex", flexDirection: "column", gap: `${hcpLayout.navItemGap}px` }}>
            <NavRow icon={CreditCard} label="Money" selected chevron="up" />
            <MoneySubNavGroup>
              {moneySubNavItems.map((label) => (
                <SubNavItem
                  key={label}
                  label={label}
                  active={label === activeMoneySubNav}
                  locked={lockedMoneySubNav.includes(label)}
                  onClick={
                    onMoneySubNavClick
                      ? () => onMoneySubNavClick(label)
                      : undefined
                  }
                />
              ))}
            </MoneySubNavGroup>
          </Box>

          <NavRow icon={Target} label="Marketing" />
          <NavRow icon={ChartLineUp} label="Reporting" />
          <NavRow icon={UsersThree} label="Team" />

          <NavDivider />

          <NavRow icon={Tag} label="Price Book" />
          <NavRow icon={SquaresFour} label="Apps" />
          <NavRow icon={ArrowsClockwise} label="Service Plans" />
        </Box>
      </Box>

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
