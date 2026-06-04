"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function PrototypeAccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = searchParams.get("from") ?? "/prototypes/hcp/activation";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/prototypes/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setSubmitting(false);

    if (!response.ok) {
      setError("Incorrect password");
      return;
    }

    router.replace(from);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 360,
          p: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Prototype access
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Enter the password to view this work demo.
        </Typography>

        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoFocus
          error={Boolean(error)}
          helperText={error || " "}
          sx={{ mb: 2 }}
        />

        <Button fullWidth type="submit" variant="contained" disabled={submitting || !password}>
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default function PrototypeAccessPage() {
  return (
    <Suspense fallback={null}>
      <PrototypeAccessForm />
    </Suspense>
  );
}
