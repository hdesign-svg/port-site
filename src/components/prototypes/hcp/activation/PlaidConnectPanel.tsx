"use client";

import { ArrowLeft, Bank, CheckCircle } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { hcpColors, hcpFontWeight, hcpIcon, hcpLayout, hcpPrimaryButtonSx, hcpRadius } from "../hcpTheme";

type PlaidConnectPanelProps = {
  onBack: () => void;
  onContinue: () => void;
};

const INSTITUTIONS = [
  { name: "Chase Business Checking ···1233", detail: "Checking" },
  { name: "Chase Ink Business ···8812", detail: "Credit card" },
  { name: "Amex Business ···4401", detail: "Credit card" },
] as const;

export function PlaidConnectPanel({ onBack, onContinue }: PlaidConnectPanelProps) {
  const [connected, setConnected] = useState(false);

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
          aria-label="Back to business information"
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
          Connect your accounts
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
          Link the bank and card accounts you use for your business. We&apos;ll import transactions
          and match what we can from Housecall Pro.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxWidth: 520, mb: 4 }}>
        {INSTITUTIONS.map((institution) => (
          <Box
            key={institution.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.5,
              bgcolor: connected ? hcpColors.paper : hcpColors.background,
              border: `1px solid ${connected ? hcpColors.border : hcpColors.borderSubtle}`,
              borderRadius: hcpRadius.control,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: `${hcpLayout.controlRadius}px`,
                bgcolor: hcpColors.surfaceMuted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Bank size={hcpIcon.md} color={hcpColors.textSecondary} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }} noWrap>
                {institution.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {institution.detail}
              </Typography>
            </Box>
            {connected ? (
              <CheckCircle size={hcpIcon.md} weight="fill" color={hcpColors.successMain} />
            ) : null}
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: "auto", pt: 2, display: "flex", gap: 1.5 }}>
        {!connected ? (
          <Button
            variant="contained"
            onClick={() => setConnected(true)}
            sx={{
              borderRadius: hcpRadius.control,
              ...hcpPrimaryButtonSx,
              px: 3,
            }}
          >
            Connect with Plaid
          </Button>
        ) : (
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
        )}
      </Box>
    </Box>
  );
}
