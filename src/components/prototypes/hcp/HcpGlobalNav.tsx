"use client";

import {
  CalendarBlank,
  CaretDown,
  CaretUp,
  ChartBar,
  ChatCircle,
  CreditCard,
  Diamond,
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
import { hcpChromeBarSx, hcpColors, hcpFontWeight, hcpIcon, hcpLayout, hcpRadius } from "./hcpTheme";

const NAV_PRIMARY_ICON = hcpIcon.md;
const NAV_CHEVRON_SIZE = 16;
const NAV_TRAILING_SLOT = 20;
const FOOTER_USER_DISPLAY_NAME = "Sarah";
const FOOTER_USER_FULL_NAME = "Sarah Mitchell";

const navItemSx = {
  display: "flex",
  alignItems: "center",
  gap: `${hcpLayout.navIconLabelGap}px`,
  width: "100%",
  py: `${hcpLayout.navRowPy}px`,
  borderRadius: hcpRadius.control,
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
  const chevronColor = selected ? labelColor : iconColor;

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
          fontWeight: hcpFontWeight.regular,
          minWidth: 0,
        }}
      >
        {label}
      </Typography>
      {chevron ? (
        <TrailingSlot>
          {chevron === "down" ? (
            <CaretDown size={NAV_CHEVRON_SIZE} color={chevronColor} weight="regular" />
          ) : (
            <CaretUp size={NAV_CHEVRON_SIZE} color={chevronColor} weight="regular" />
          )}
        </TrailingSlot>
      ) : null}
    </Box>
  );
}

export type MoneySubNavLabel = "Payments" | "Expenses" | "Business Financing" | "Accounting";

export type HcpGlobalNavProps = {
  activeMoneySubNav?: MoneySubNavLabel;
  lockedMoneySubNav?: readonly MoneySubNavLabel[];
  onMoneySubNavClick?: (label: MoneySubNavLabel) => void;
};

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
  const content = (
    <>
      <Typography
        variant="caption"
        sx={{
          flex: 1,
          color: active ? hcpColors.textPrimary : hcpColors.textMuted,
          fontWeight: hcpFontWeight.regular,
          minWidth: 0,
        }}
      >
        {label}
      </Typography>
      {locked ? (
        <TrailingSlot>
          <Diamond size={12} color={hcpColors.purple} weight="fill" aria-hidden />
        </TrailingSlot>
      ) : null}
    </>
  );

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {active ? (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: hcpRadius.control,
            bgcolor: hcpColors.expensesActive,
            zIndex: 0,
          }}
        />
      ) : null}
      <Box
        component={onClick ? "button" : "div"}
        type={onClick ? "button" : undefined}
        onClick={onClick}
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          width: "100%",
          py: 0.75,
          pl: `${hcpLayout.navSubLabelInset}px`,
          pr: 1,
          border: "none",
          bgcolor: "transparent",
          cursor: onClick ? "pointer" : "default",
          font: "inherit",
          textAlign: "left",
          borderRadius: hcpRadius.control,
          "&:hover": onClick
            ? {
                bgcolor: active ? "transparent" : hcpColors.borderSubtle,
              }
            : undefined,
        }}
      >
        {content}
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
        <Gear size={NAV_PRIMARY_ICON} color={hcpColors.chromeIcon} weight="regular" aria-label="Settings" />
      </TrailingSlot>
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
    "Business Financing",
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
