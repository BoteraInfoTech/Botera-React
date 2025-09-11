import React from "react";
import { Box, Typography } from "@mui/material";

export default function NoResults({ onClearSearch }) {
  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
        alt="No results"
        width={120}
      />
      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        No results found
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
        Try adjusting your search or connect a new account.
      </Typography>
    </Box>
  );
}
