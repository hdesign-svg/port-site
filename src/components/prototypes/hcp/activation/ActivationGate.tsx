"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { hcpColors } from "../hcpTheme";
import { ActivationCarousel } from "./ActivationCarousel";
import { LegalDisclaimer } from "./LegalDisclaimer";

type ActivationGateProps = {
  onActivate?: () => void;
};

export function ActivationGate({ onActivate }: ActivationGateProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        bgcolor: hcpColors.background,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(420px, 551px)" },
          gap: { xs: 4, lg: 6 },
          alignItems: "center",
          px: { xs: 3, md: 5, xl: 7 },
          py: { xs: 4, md: 5 },
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            maxWidth: 477,
            justifySelf: { lg: "end" },
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: 24, md: 28 },
                lineHeight: 1.43,
                color: hcpColors.textPrimary,
              }}
            >
              Take control of team spending
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 22 },
                lineHeight: 1.45,
                color: hcpColors.textPrimary,
              }}
            >
              Get free cards with spending limits, real-time alerts, and
              automatic receipt capture, all included with your Housecall Pro
              subscription.
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onActivate}
            sx={{
              alignSelf: "flex-start",
              bgcolor: hcpColors.primary,
              borderRadius: 999,
              px: 2,
              py: 1.25,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                bgcolor: hcpColors.primaryDark,
                boxShadow: "none",
              },
            }}
          >
            Access expense cards
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 551,
            height: { xs: 520, md: 640, lg: 920 },
            justifySelf: { lg: "start" },
          }}
        >
          <ActivationCarousel />
        </Box>
      </Box>

      <Box sx={{ px: { xs: 3, md: 5, xl: 7 }, pb: 3 }}>
        <LegalDisclaimer />
      </Box>
    </Box>
  );
}
