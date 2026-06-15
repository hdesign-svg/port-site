"use client";

import { CaretDown } from "@phosphor-icons/react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { ACCOUNTING_CATEGORIES, type AccountingCategory } from "./accountingTransactionData";
import { hcpColors, hcpMenuPaperSx } from "../hcpTheme";

const categorySelectSx = {
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: hcpColors.borderControl,
  },
  "& .MuiSelect-select": {
    py: 0.875,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    color: hcpColors.textPrimary,
  },
  "& .MuiSelect-select.MuiSelect-displayEmpty": {
    color: hcpColors.textMuted,
  },
};

type AccountingCategorySelectProps = {
  value: AccountingCategory | null;
  onChange: (category: AccountingCategory) => void;
  placeholder?: string;
};

export function AccountingCategorySelect({
  value,
  onChange,
  placeholder = "Choose category",
}: AccountingCategorySelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as AccountingCategory);
  };

  return (
    <FormControl size="small" fullWidth sx={categorySelectSx}>
      <Select
        value={value ?? ""}
        displayEmpty
        onChange={handleChange}
        IconComponent={(props) => <CaretDown {...props} size={16} weight="bold" />}
        renderValue={(selected) => {
          if (!selected) {
            return placeholder;
          }

          return selected;
        }}
        MenuProps={{
          slotProps: { paper: { sx: hcpMenuPaperSx } },
        }}
      >
        {ACCOUNTING_CATEGORIES.map((category) => (
          <MenuItem key={category} value={category} sx={{ py: 1 }}>
            <Typography variant="body2">{category}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
