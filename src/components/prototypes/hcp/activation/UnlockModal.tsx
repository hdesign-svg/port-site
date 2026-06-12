"use client";

import { X } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useEffect, useMemo, useState } from "react";
import { PlaidConnectPanel } from "./PlaidConnectPanel";
import { UnlockModalDiscoverPanel } from "./UnlockModalDiscoverPanel";
import { UnlockModalEnrollPanel } from "./UnlockModalEnrollPanel";
import type { UnlockDeck, UnlockSlide } from "./unlockDecks";
import { hcpColors, hcpIcon, hcpLayout } from "../hcpTheme";

type UnlockModalPanel = "discover" | "enroll" | "connect";

type UnlockModalProps = {
  open: boolean;
  deck: UnlockDeck;
  onClose: () => void;
  onComplete: () => void;
};

const PANEL_TRANSITION_MS = 300;

export function UnlockModal({ open, deck, onClose, onComplete }: UnlockModalProps) {
  const [panel, setPanel] = useState<UnlockModalPanel>("discover");
  const [activeSlideId, setActiveSlideId] = useState(deck.slides[0]?.id ?? "");

  const includesConnectStep = deck.target === "accounting";
  const panelCount = includesConnectStep ? 3 : 2;

  const panelIndex = useMemo(() => {
    if (panel === "discover") return 0;
    if (panel === "enroll") return 1;
    return 2;
  }, [panel]);

  useEffect(() => {
    if (!open) return;

    setPanel("discover");
    setActiveSlideId(deck.slides[0]?.id ?? "");
  }, [open, deck]);

  const handleSlideSelect = (slide: UnlockSlide) => {
    setActiveSlideId(slide.id);
  };

  const handleEnrollContinue = () => {
    if (includesConnectStep) {
      setPanel("connect");
      return;
    }

    onComplete();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      aria-labelledby="unlock-modal-title"
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(33, 33, 33, 0.48)",
          },
        },
        paper: {
          sx: {
            width: "min(920px, calc(100vw - 48px))",
            height: "min(560px, calc(100vh - 80px))",
            maxWidth: "none",
            maxHeight: "none",
            m: 0,
            borderRadius: `${hcpLayout.controlRadius * 1.5}px`,
            overflow: "hidden",
            bgcolor: hcpColors.paper,
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.16)",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close"
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          color: hcpColors.textSecondary,
          "&:hover": { bgcolor: hcpColors.surfaceMuted },
        }}
      >
        <X size={hcpIcon.md} />
      </IconButton>

      <Box
        sx={{
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: `${panelCount * 100}%`,
            height: "100%",
            transform: `translateX(-${(panelIndex / panelCount) * 100}%)`,
            transition: `transform ${PANEL_TRANSITION_MS}ms ease-in-out`,
          }}
        >
          <Box
            sx={{
              width: `${100 / panelCount}%`,
              height: "100%",
              minHeight: 0,
            }}
          >
            <UnlockModalDiscoverPanel
              deck={deck}
              activeSlideId={activeSlideId}
              onSlideSelect={handleSlideSelect}
              onGetStarted={() => setPanel("enroll")}
            />
          </Box>

          <Box
            sx={{
              width: `${100 / panelCount}%`,
              height: "100%",
              minHeight: 0,
            }}
          >
            <UnlockModalEnrollPanel
              deck={deck}
              onBack={() => setPanel("discover")}
              onContinue={handleEnrollContinue}
            />
          </Box>

          {includesConnectStep ? (
            <Box
              sx={{
                width: `${100 / panelCount}%`,
                height: "100%",
                minHeight: 0,
              }}
            >
              <PlaidConnectPanel
                onBack={() => setPanel("enroll")}
                onContinue={onComplete}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Dialog>
  );
}
