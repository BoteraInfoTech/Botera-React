import React from "react";
import { Menu, MenuItem, Switch } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AccountMenu({ anchorEl, account, onClose }) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {account && (
        <>
          <MenuItem>
            <Switch checked={account.autoReply} sx={{ mr: 1 }} /> Auto Reply
          </MenuItem>
          {account.status === "healthy" && (
            <MenuItem>
              <SyncIcon sx={{ mr: 1 }} /> Sync Account
            </MenuItem>
          )}
          <MenuItem>
            <DeleteIcon sx={{ mr: 1 }} /> Delete Account
          </MenuItem>
        </>
      )}
    </Menu>
  );
}
