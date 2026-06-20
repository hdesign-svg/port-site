import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { hcpColors } from "@/components/prototypes/hcp/hcpTheme";

export default function HcpActivationLoading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: hcpColors.background,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Loading Expenses…
      </Typography>
    </Box>
  );
}
