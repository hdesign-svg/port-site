"use client";

import { CaretDown, GraduationCap } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  hcpChromeIconButtonSx,
  hcpColors,
  hcpContentSpacing,
  hcpIcon,
  hcpSecondaryButtonSx,
} from "../hcpTheme";

const CREATE_ACTIONS = [
  { id: "add-funds", label: "Add funds" },
  { id: "new-card", label: "New card" },
  { id: "order-card", label: "Order card" },
] as const;

const addMenuButtonSx = {
  ...hcpSecondaryButtonSx,
  "& .MuiButton-endIcon": {
    ml: 0.5,
    mr: -0.25,
    "& > svg": {
      width: hcpIcon.sm,
      height: hcpIcon.sm,
    },
  },
} as const;

export function ExpensesPageHeader() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        mb: `${hcpContentSpacing.pageHeaderStack}px`,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography component="h1" variant="h4" sx={{ color: hcpColors.textPrimary }}>
          Expenses
        </Typography>
        <Typography variant="caption" color="text.disabled" component="div" sx={{ mt: 0.5 }}>
          Available ·{" "}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: hcpColors.textPrimary, fontVariantNumeric: "tabular-nums" }}
          >
            $8,742.18
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        <IconButton
          size="small"
          aria-label="Learn how HCP Money works"
          sx={hcpChromeIconButtonSx}
        >
          <GraduationCap size={hcpIcon.md} weight="regular" />
        </IconButton>

        <Button
          variant="outlined"
          size="medium"
          endIcon={<CaretDown size={hcpIcon.sm} weight="regular" />}
          aria-haspopup="menu"
          aria-expanded={menuOpen ? "true" : undefined}
          aria-controls={menuOpen ? "expenses-create-menu" : undefined}
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          sx={addMenuButtonSx}
        >
          Add
        </Button>

        <Menu
          id="expenses-create-menu"
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {CREATE_ACTIONS.map((action) => (
            <MenuItem key={action.id} onClick={() => setMenuAnchor(null)}>
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
