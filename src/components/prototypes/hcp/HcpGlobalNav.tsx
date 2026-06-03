"use client";

import {
  CalendarBlank,
  CaretDown,
  CaretUp,
  ChartBar,
  CreditCard,
  Diamond,
  FileText,
  Gear,
  House,
  List,
  Megaphone,
  Receipt,
  SquaresFour,
  Users,
  Wrench,
} from "@phosphor-icons/react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpLayout } from "./hcpTheme";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 1,
        py: 1,
        borderRadius: 1,
        color: active ? hcpColors.textDark : hcpColors.textSecondary,
        bgcolor: active ? hcpColors.expensesActive : "transparent",
      }}
    >
      <Box sx={{ color: "inherit", display: "flex" }}>{icon}</Box>
      <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.74 }}>
        {label}
      </Typography>
    </Box>
  );
}

function SubNavItem({
  label,
  active,
  badge,
}: {
  label: string;
  active?: boolean;
  badge?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 1,
        py: 1,
        borderRadius: 1,
        bgcolor: active ? hcpColors.expensesActive : "transparent",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          lineHeight: 1.33,
          color: active ? hcpColors.textDark : hcpColors.textSecondary,
        }}
      >
        {label}
      </Typography>
      {badge ? (
        <Diamond size={14} weight="fill" color={hcpColors.primary} />
      ) : null}
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
        flexShrink: 0,
        bgcolor: hcpColors.paper,
        borderRight: `1px solid ${hcpColors.border}`,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 15,
              color: hcpColors.primary,
              letterSpacing: "-0.01em",
            }}
          >
            housecall
            <Box component="span" sx={{ color: hcpColors.textPrimary }}>
              {" "}
              pro
            </Box>
          </Typography>
          <List size={20} color={hcpColors.textSecondary} />
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: hcpColors.primary,
            borderRadius: 999,
            py: 1.1,
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { bgcolor: hcpColors.primaryDark, boxShadow: "none" },
          }}
        >
          Add new
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <NavItem icon={<House size={22} />} label="Home" />
        <NavItem icon={<CalendarBlank size={22} />} label="Schedule" />
        <NavItem icon={<ChartBar size={22} />} label="Pipeline" />

        <Divider sx={{ my: 0.5, borderColor: hcpColors.border }} />

        <NavItem icon={<Users size={22} />} label="Customers" />
        <NavItem icon={<Megaphone size={22} />} label="Leads" />
        <NavItem icon={<FileText size={22} />} label="Estimates" />
        <NavItem icon={<Wrench size={22} />} label="Jobs" />
        <NavItem icon={<Receipt size={22} />} label="Invoices" />

        <Divider sx={{ my: 0.5, borderColor: hcpColors.border }} />

        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 1, py: 1 }}>
            <CreditCard size={22} color={hcpColors.textDark} />
            <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 600, color: hcpColors.textDark }}>
              Money
            </Typography>
            <CaretUp size={18} color={hcpColors.textSecondary} />
          </Box>
          <Box sx={{ pl: 5, display: "flex", flexDirection: "column", gap: 0.5, mt: 0.5 }}>
            <SubNavItem label="Payments" />
            <SubNavItem label="Expenses" active badge />
            <SubNavItem label="Business Financing" />
            <SubNavItem label="Accounting" badge />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 1, py: 1 }}>
          <Megaphone size={22} color={hcpColors.textSecondary} />
          <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 600, color: hcpColors.textSecondary }}>
            Marketing
          </Typography>
          <CaretDown size={18} color={hcpColors.textSecondary} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 1, py: 1 }}>
          <ChartBar size={22} color={hcpColors.textSecondary} />
          <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 600, color: hcpColors.textSecondary }}>
            Reporting
          </Typography>
          <CaretDown size={18} color={hcpColors.textSecondary} />
        </Box>

        <Divider sx={{ my: 0.5, borderColor: hcpColors.border }} />

        <NavItem icon={<SquaresFour size={22} />} label="Apps" />
        <NavItem icon={<Gear size={22} />} label="Settings" />
      </Box>

      <Box
        sx={{
          p: 3,
          borderTop: `1px solid ${hcpColors.border}`,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: hcpColors.avatar,
            color: hcpColors.textPrimary,
            fontSize: 13,
          }}
        >
          J
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>
            Jill
          </Typography>
          <Typography sx={{ fontSize: 12, color: hcpColors.textSecondary, lineHeight: 1.2 }}>
            Admin
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
