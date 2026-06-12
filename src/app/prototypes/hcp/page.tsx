import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const flows = [
  {
    href: "/prototypes/hcp/activation/expenses",
    title: "Activation · Expenses",
    shots: "Unlock modal → business info → done",
  },
  {
    href: "/prototypes/hcp/activation",
    title: "Activation · Accounting",
    shots: "Unlock modal → business info → Plaid connect → done",
  },
  {
    href: "/prototypes/hcp/accounting",
    title: "Basic Accounting",
    shots: "To review · All · Reports (post-activation)",
  },
];

export default function HcpPrototypesIndexPage() {
  return (
    <Box sx={{ maxWidth: 640, mx: "auto", py: 6, px: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        HCP prototypes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Not linked from the portfolio — bookmark a flow URL for interviews and GIF recording.
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
