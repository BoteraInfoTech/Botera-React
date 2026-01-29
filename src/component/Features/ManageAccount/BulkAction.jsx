import React from "react";
import { Box, Stack, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import SearchField from "../../commonComponents/Search";
import Tooltip from "../../commonComponents/Tooltip";

export default function BulkActionBar({
  search,
  setSearch,
  allSelected,
  selectedCount,
  onSelectAll,
  onClearSelected,
  onBulkDelete,
  totalPage = 1,
  currentPage = 1,
  totalAccounts = 0,
  isLoading = false,
  onPageChange,
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
            indeterminate={!allSelected && selectedCount > 0}
            onChange={(e) => onSelectAll(e.target.checked)}
            disabled={totalAccounts === 0}
          />

          {/* Show count when some selected */}
          {selectedCount > 0 && !allSelected && (
            <>
              <span className="text-sm m-0">
                {selectedCount} of {totalAccounts || selectedCount} selected
              </span>
              <span
                className="text-blue-600 cursor-pointer text-sm"
                onClick={() => onSelectAll(true)}
              >
                Select All
              </span>
            </>
          )}

          {/* Show "Deselect All" when everything selected */}
          {allSelected && (
            <span
              className="text-blue-600 cursor-pointer text-sm"
              onClick={onClearSelected}
            >
              Deselect All
            </span>
          )}

          {/* Bulk Delete when selected */}
          {selectedCount > 0 && (
            <Tooltip title="Delete Selected">
              <IconButton color="error" onClick={onBulkDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Search input when nothing is selected */}
          {selectedCount === 0 && (
            <SearchField
              search={search}
              setSearch={setSearch}
              placeholder="Search accounts..."
            />
          )}
        </Stack>

        {/* Pagination */}
        {totalPage > 1 && (
          <Pagination
            count={totalPage}
            page={currentPage}
            onChange={(_, page) => onPageChange?.(page)}
            disabled={isLoading}
            color="primary"
            shape="rounded"
          />
        )}
      </Box>
    </>
  );
}
