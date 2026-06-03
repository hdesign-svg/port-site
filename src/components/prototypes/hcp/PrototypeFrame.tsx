"use client";

import Box from "@mui/material/Box";
import { hcpColors, hcpLayout } from "./hcpTheme";

type PrototypeFrameProps = {
  children: React.ReactNode;
};

export function PrototypeFrame({ children }: PrototypeFrameProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#3a3a3a",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: hcpLayout.prototypeWidth,
          height: hcpLayout.prototypeHeight,
          flexShrink: 0,
          overflow: "hidden",
          borderRadius: 0,
          bgcolor: hcpColors.paper,
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
}
