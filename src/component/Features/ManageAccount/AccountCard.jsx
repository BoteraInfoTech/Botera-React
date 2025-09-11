import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  Switch,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncIcon from "@mui/icons-material/Sync";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "../../commonComponents/Tooltip";

export default function AccountCard({
  account,
  selected,
  onSelect,
  onMenuOpen,
}) {
  const renderStatus = (status) => {
    if (status === "reconnect") {
      return (
        <Button
          variant="outlined"
          size="small"
          startIcon={<ReplayIcon />}
          sx={{
            color: "warning.main",
            borderColor: "warning.main",
            "&:hover": { borderColor: "warning.dark", color: "warning.dark" },
          }}
        >
          Reconnect
        </Button>
      );
    }
    return null;
  };

  return (
    <Grid container alignItems="center" sx={{ mb: 1 }} wrap="nowrap">
      <Grid sx={{ display: { xs: "none", sm: "flex" } }}>
        <Checkbox
          checked={selected.includes(account.id)}
          onChange={() => onSelect(account.id)}
        />
      </Grid>

      <Grid sx={{ flex: 1, minWidth: 0 }}>
        <Card
          sx={{ borderRadius: 3, boxShadow: 2, "&:hover": { boxShadow: 6 } }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: { sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <img width={30} src={account.logo} alt={account.name} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {account.name}
              </Typography>
            </Stack>

            <Box
              sx={{
                flex: 1,
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
              }}
            >
              {renderStatus(account.status)}
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Tooltip
                title={`Auto reply ${
                  account.autoReply ? "enabled" : "disabled"
                }`}
              >
                <Switch checked={account.autoReply} fontSize="small" />
              </Tooltip>
              {account.status === "healthy" ? (
                <Tooltip title="Sync Account">
                  <IconButton color="primary">
                    <SyncIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Box sx={{ width: 36 }} />
              )}
              <Tooltip title="Delete Account">
                <IconButton color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              {account.status === "reconnect" ? (
                <IconButton color="error">
                  <SyncIcon />
                </IconButton>
              ) : (
                <IconButton onClick={(e) => onMenuOpen(e, account)}>
                  <MoreVertIcon />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
