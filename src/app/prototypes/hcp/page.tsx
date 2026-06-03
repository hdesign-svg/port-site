import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const flows = [
  {
    href: "/prototypes/hcp/activation",
    title: "HCP Money Activation",
    shots: "Activation gate · business info · enrolled overview (shipped)",
  },
  {
    href: "/prototypes/hcp/accounting",
    title: "Basic Accounting",
    shots: "Transaction review · reporting (TBD from your screenshots)",
  },
];

export default function HcpPrototypesIndexPage() {
  return (
    <Box sx={{ maxWidth: 640, mx: "auto", py: 6, px: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        HCP prototypes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Local only — record at 1440×900. GIFs scale into portfolio cards (1024×704
        ratio) with letterboxing, no crop. Not linked from the portfolio.
      </Typography>
      <Stack spacing={2}>
        {flows.map((flow) => (
          <Link
            key={flow.href}
            href={flow.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{flow.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {flow.shots}
              </Typography>
            </Box>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
