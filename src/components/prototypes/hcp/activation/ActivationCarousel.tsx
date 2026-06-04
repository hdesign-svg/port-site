"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { hcpColors, hcpLayout } from "../hcpTheme";
import { carouselSlides } from "./carouselSlides";

const AUTO_ADVANCE_MS = 5000;

export function ActivationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = carouselSlides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselSlides.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: `${hcpLayout.controlRadius}px`,
        overflow: "hidden",
        background: `linear-gradient(114deg, ${hcpColors.primary} 0%, ${hcpColors.primaryDark} 68.4%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 5,
        pb: 6,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
          maxWidth: 471,
        }}
      >
        <Box
          component="img"
          src={slide.image}
          alt=""
          sx={{
            width: "100%",
            maxWidth: 471,
            height: "auto",
            maxHeight: 351,
            objectFit: "contain",
            display: "block",
          }}
        />

        <Typography
          align="center"
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: 1.45,
            minHeight: 64,
          }}
        >
          {slide.line1}
          <br />
          {slide.line2}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 56,
          right: 56,
          bottom: 36,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        {carouselSlides.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <Box
              key={item.id}
              component="button"
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              sx={{
                flex: 1,
                height: 8,
                border: 0,
                p: 0,
                borderRadius: `${hcpLayout.controlRadius}px`,
                cursor: "pointer",
                bgcolor: "rgba(187, 222, 251, 0.16)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isActive ? (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: 8,
                    borderRadius: `${hcpLayout.controlRadius}px`,
                    bgcolor: hcpColors.primaryLight,
                  }}
                />
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
