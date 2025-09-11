import React from "react";
import { Box } from "@mui/material";
import CustomButton from "../../commonComponents/Button";
import SearchField from "../../commonComponents/Search";

export default function MobileHeader({ search, setSearch, setConnectOpen }) {
  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        justifyContent: "center",
        flexDirection: "column",
        m: 2,
      }}
    >
      <CustomButton
        text="Connect Account"
        className="mb-2"
        onClick={() => setConnectOpen(true)}
      />
      <SearchField
        search={search}
        setSearch={setSearch}
        placeholder="Search accounts..."
        width="100%"
      />
    </Box>
  );
}
