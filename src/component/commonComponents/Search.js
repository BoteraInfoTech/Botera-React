import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, Close } from "@mui/icons-material";

const SearchField = ({ search, setSearch, placeholder, width = 300 }) => {
  const handleClear = () => setSearch("");

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          transition: "all 0.3s ease",
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2", // blue highlight on focus
            boxShadow: "0 0 5px rgba(25, 118, 210, 0.3)",
          },
          "&:hover fieldset": {
            borderColor: "#1976d2",
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {search ? (
              <IconButton size="small" onClick={handleClear}>
                <Close />
              </IconButton>
            ) : (
              <Search color="action" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
