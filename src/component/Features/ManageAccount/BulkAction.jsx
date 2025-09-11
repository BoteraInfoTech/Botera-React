import React from "react";
import { Box, Stack, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import SearchField from "../../commonComponents/Search";
import Tooltip from "../../commonComponents/Tooltip";

export default function BulkActionBar({
  search,
  setSearch,
  selected,
  filtered,
  allSelected,
  setSelected,
  handleSelectAll,
}) {
  return (
    <>
      <Box
        sx={{
          mb: 3,
          display: { xs: "none", sm: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Main Select All checkbox */}
          <Checkbox
            checked={allSelected}
            indeterminate={
              selected.length > 0 && selected.length < filtered.length
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
          />

          {/* Show count when some selected */}
          {selected.length > 0 && !allSelected && (
            <>
              <span className="text-sm m-0">
                {selected.length} of {filtered.length} selected
              </span>
              <span
                className="text-blue-600 cursor-pointer text-sm"
                onClick={() => handleSelectAll(true)}
              >
                Select All
              </span>
            </>
          )}

          {/* Show "Deselect All" when everything selected */}
          {allSelected && (
            <span
              className="text-blue-600 cursor-pointer text-sm"
              onClick={() => setSelected([])}
            >
              Deselect All
            </span>
          )}

          {/* Bulk Delete when selected */}
          {selected.length > 0 && (
            <Tooltip title="Delete Selected">
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Search input when nothing is selected */}
          {selected.length === 0 && (
            <SearchField
              search={search}
              setSearch={setSearch}
              placeholder="Search accounts..."
            />
          )}
        </Stack>

        {/* Pagination */}
        <Pagination count={3} color="primary" shape="rounded" />
      </Box>
    </>
  );
}
