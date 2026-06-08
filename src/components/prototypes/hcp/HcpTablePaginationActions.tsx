"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { TablePaginationActionsProps } from "@mui/material/TablePaginationActions";
import { hcpDataGridPaginationIconButtonSx, hcpIcon } from "./hcpTheme";

export function HcpTablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
  disabled,
}: TablePaginationActionsProps) {
  const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

  return (
    <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 0.25, ml: 2 }}>
      <IconButton
        onClick={() => onPageChange(null, page - 1)}
        disabled={disabled || page <= 0}
        aria-label="Previous page"
        size="small"
        sx={hcpDataGridPaginationIconButtonSx}
      >
        <CaretLeft size={hcpIcon.md} />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(null, page + 1)}
        disabled={disabled || page >= lastPage}
        aria-label="Next page"
        size="small"
        sx={hcpDataGridPaginationIconButtonSx}
      >
        <CaretRight size={hcpIcon.md} />
      </IconButton>
    </Box>
  );
}
