"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { hcpColors, hcpPrimaryButtonSx, hcpRadius } from "../hcpTheme";

type BusinessInfoSceneProps = {
  onContinue?: () => void;
};

export function BusinessInfoScene({ onContinue }: BusinessInfoSceneProps) {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: hcpColors.background,
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 7 },
      }}
    >
      <Box sx={{ maxWidth: 918, mx: "auto" }}>
        <Box sx={{ mb: 4, maxWidth: 918 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 28, md: 34 },
              lineHeight: 1.3,
              mb: 2,
            }}
          >
            Enter your business information
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16, lineHeight: 1.5 }}>
            Please provide the following information about your business. How many
            employees do you currently have? If you are an owner/operator and have
            no other employees, please enter &quot;1&quot;. What is your annual
            business revenue? This can be an estimate based on the previous year.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            maxWidth: 608,
            mx: "auto",
            mb: 4,
          }}
        >
          <TextField
            label="Number of employees"
            defaultValue="3"
            fullWidth
            size="small"
          />
          <TextField
            label="Annual business revenue"
            defaultValue="$250,000"
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
    </Box>
  );
}
