"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { UnlockDeck } from "./unlockDecks";
import { hcpColors, hcpIcon, hcpLayout, hcpPrimaryButtonSx, hcpRadius } from "../hcpTheme";

type UnlockModalEnrollPanelProps = {
  deck: UnlockDeck;
  onBack: () => void;
  onContinue: () => void;
};

export function UnlockModalEnrollPanel({ deck, onBack, onContinue }: UnlockModalEnrollPanelProps) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 4,
        py: 3,
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <IconButton
          onClick={onBack}
          aria-label="Back to overview"
          size="small"
          sx={{
            ml: -1,
            mb: 2,
            color: hcpColors.textSecondary,
            "&:hover": { bgcolor: hcpColors.surfaceMuted },
          }}
        >
          <ArrowLeft size={hcpIcon.md} />
        </IconButton>

        <Typography variant="h5" sx={{ mb: 1 }}>
          {deck.enrollTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
          {deck.enrollDescription}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          maxWidth: 520,
          mb: 4,
        }}
      >
        <TextField label="Number of employees" defaultValue="3" fullWidth size="small" />
        <TextField label="Annual business revenue" defaultValue="$250,000" fullWidth size="small" />
      </Box>

      <Box sx={{ mt: "auto", pt: 2 }}>
        <Button
          variant="contained"
          onClick={onContinue}
          sx={{
            borderRadius: hcpRadius.control,
            ...hcpPrimaryButtonSx,
            px: 3,
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
