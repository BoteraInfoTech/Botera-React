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
      {/* <img
        src="https://cdn-icons-png.flaticon.com/512/1008/1008100.png"
        alt="No accounts"
        width={140}
      /> */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="34" y="38" width="92" height="58" rx="10" fill="#F1F5F9" />

        <rect x="28" y="46" width="104" height="62" rx="12" fill="#E5E7EB" />

        <rect
          x="22"
          y="56"
          width="116"
          height="70"
          rx="14"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          stroke-width="2"
        />

        <circle cx="50" cy="84" r="10" fill="#60A5FA" />

        <rect x="66" y="76" width="48" height="6" rx="3" fill="#CBD5E1" />
        <rect x="66" y="88" width="36" height="6" rx="3" fill="#E5E7EB" />
      </svg>

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
