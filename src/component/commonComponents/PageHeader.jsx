// components/common/PageHeader.js
import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "./Button";

export default function PageHeader({
  title,
  showButton = false,
  buttonProps = {},
}) {
  console.log("on Header", title);

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        background: "white",
        borderRadius: 2,
        p: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>

      {showButton && (
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
          }}
        >
          <CustomButton {...buttonProps} />
        </Box>
      )}
    </Box>
  );
}
