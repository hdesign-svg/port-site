"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import {
  hcpFontWeight,
  hcpLayout,
  hcpPrimaryButtonSx,
  hcpSecondaryButtonSx,
} from "../hcpTheme";

type AccountingExportDialogProps = {
  open: boolean;
  onClose: () => void;
  onExport: () => void;
  onReviewNow: () => void;
  reviewCount: number;
  stragglerCount: number;
};

export function AccountingExportDialog({
  open,
  onClose,
  onExport,
  onReviewNow,
  reviewCount,
  stragglerCount,
}: AccountingExportDialogProps) {
  const blocked = reviewCount > 0;
  const softWarning = !blocked && stragglerCount > 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: `${hcpLayout.controlRadius * 1.5}px`,
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: hcpFontWeight.semibold, pb: 1 }}>
        {blocked ? "Finish categorizing first" : softWarning ? "Export with gaps?" : "Export transactions"}
      </DialogTitle>

      <DialogContent>
        {blocked ? (
          <Typography variant="body2" color="text.secondary">
            {reviewCount} transaction{reviewCount === 1 ? "" : "s"} still need a category in To review.
            Export is available once those are sorted.
          </Typography>
        ) : softWarning ? (
          <Typography variant="body2" color="text.secondary">
            {stragglerCount} older transaction{stragglerCount === 1 ? "" : "s"} in this period{" "}
            {stragglerCount === 1 ? "is" : "are"} still uncategorized. Your CPA or tax software may ask
            about them — you can export now and reconcile later.
          </Typography>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              This period is categorized and ready to share.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Export includes your transaction register and category assignments for your accountant or
              tax prep tool.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 0 }}>
        <Button variant="outlined" onClick={onClose} sx={hcpSecondaryButtonSx}>
          Cancel
        </Button>
        {blocked ? (
          <Button variant="contained" onClick={onReviewNow} sx={hcpPrimaryButtonSx}>
            Review now
          </Button>
        ) : (
          <Button variant="contained" onClick={onExport} sx={hcpPrimaryButtonSx}>
            Export
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
