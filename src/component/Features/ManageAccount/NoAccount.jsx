import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "../../commonComponents/Button";

export default function NoAccounts({ onConnectClick }) {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/1008/1008100.png"
        alt="No accounts"
        width={140}
      />
      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        No accounts connected
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
        Get started by connecting your first account.
      </Typography>
      <CustomButton
        text="Connect Account"
        className="mt-4"
        onClick={onConnectClick}
      />
    </Box>
  );
}
