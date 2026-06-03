"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ActivationGate } from "@/components/prototypes/hcp/activation/ActivationGate";
import { BusinessInfoScene } from "@/components/prototypes/hcp/activation/BusinessInfoScene";
import { EnrolledOverviewScene } from "@/components/prototypes/hcp/activation/EnrolledOverviewScene";
import { HcpAppShell } from "@/components/prototypes/hcp/HcpAppShell";

type ActivationScene = "activation" | "business-info" | "enrolled";

const scenes: { id: ActivationScene; label: string }[] = [
  { id: "activation", label: "1 — Activation" },
  { id: "business-info", label: "2 — Business info" },
  { id: "enrolled", label: "3 — Enrolled overview" },
];

export default function HcpActivationPrototypePage() {
  const [scene, setScene] = useState<ActivationScene>("activation");

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box
        sx={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 1300,
          p: 1.5,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          boxShadow: 2,
        }}
      >
        <Typography variant="caption" sx={{ mb: 1, fontWeight: 600, display: "block" }}>
          Dev: switch scene (hide when recording)
        </Typography>
        <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: "wrap" }}>
          {scenes.map((s) => (
            <Button
              key={s.id}
              size="small"
              variant={scene === s.id ? "contained" : "outlined"}
              onClick={() => setScene(s.id)}
            >
              {s.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <HcpAppShell>
        {scene === "activation" ? (
          <ActivationGate onActivate={() => setScene("business-info")} />
        ) : null}
        {scene === "business-info" ? (
          <BusinessInfoScene onContinue={() => setScene("enrolled")} />
        ) : null}
        {scene === "enrolled" ? <EnrolledOverviewScene /> : null}
      </HcpAppShell>
    </Box>
  );
}
