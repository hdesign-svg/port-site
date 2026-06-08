"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { UnlockSlidePreview } from "./UnlockSlidePreview";
import type { UnlockDeck, UnlockSlide } from "./unlockDecks";
import { hcpColors, hcpContentSpacing, hcpFontWeight, hcpLayout, hcpRadius } from "../hcpTheme";

type UnlockModalDiscoverPanelProps = {
  deck: UnlockDeck;
  activeSlideId: string;
  onSlideSelect: (slide: UnlockSlide) => void;
  onGetStarted: () => void;
};

export function UnlockModalDiscoverPanel({
  deck,
  activeSlideId,
  onSlideSelect,
  onGetStarted,
}: UnlockModalDiscoverPanelProps) {
  const activeSlide = deck.slides.find((slide) => slide.id === activeSlideId) ?? deck.slides[0];
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    setPlayKey((current) => current + 1);
  }, [activeSlideId]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          width: 320,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          px: 3,
          py: 3,
          borderRight: `1px solid ${hcpColors.borderSubtle}`,
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography
              id="unlock-modal-title"
              sx={{
                fontWeight: hcpFontWeight.semibold,
                fontSize: 20,
                lineHeight: 1.35,
                color: hcpColors.textPrimary,
                mb: 0.75,
              }}
            >
              {deck.title}
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.5, color: hcpColors.textSecondary }}>
              {deck.subtitle}
            </Typography>
          </Box>

          <Box
            component="ul"
            sx={{
              m: 0,
              p: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            {deck.slides.map((slide) => {
              const isActive = slide.id === activeSlideId;

              return (
                <Box component="li" key={slide.id}>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => onSlideSelect(slide)}
                    aria-current={isActive ? "true" : undefined}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      cursor: "pointer",
                      font: "inherit",
                      px: 1.5,
                      py: 1.25,
                      borderRadius: `${hcpLayout.controlRadius}px`,
                      bgcolor: isActive ? hcpColors.surfaceMuted : "transparent",
                      color: isActive ? hcpColors.textPrimary : hcpColors.textSecondary,
                      transition: "background-color 150ms ease, color 150ms ease",
                      "&:hover": {
                        bgcolor: isActive ? hcpColors.surfaceMuted : hcpColors.borderSubtle,
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isActive ? hcpFontWeight.semibold : hcpFontWeight.regular,
                        lineHeight: 1.4,
                      }}
                    >
                      {slide.label}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={onGetStarted}
          sx={{
            mt: 2,
            alignSelf: "flex-start",
            bgcolor: hcpColors.primary,
            borderRadius: hcpRadius.control,
            px: 2.5,
            py: 1.25,
            fontWeight: hcpFontWeight.semibold,
            boxShadow: "none",
            "&:hover": { bgcolor: hcpColors.primaryDark, boxShadow: "none" },
          }}
        >
          Get started
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: `${hcpContentSpacing.inset}px`,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <UnlockSlidePreview target={deck.target} slideId={activeSlide.id} playKey={playKey} />
      </Box>
    </Box>
  );
}
