import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  // Switch,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncIcon from "@mui/icons-material/Sync";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "../../commonComponents/Tooltip";
import CustomeImage from "../../commonComponents/CustomeImage";
import ConfirmationModal from "../../commonComponents/ConfirmationModal";
import { BACKEND_POINT } from "../../../utils/config";
import callAPI from "../../../utils/callApi";

export default function AccountCard({
  account,
  selected,
  onSelect,
  onMenuOpen,
  setIsSnykLoading,
  isSnykLoading,
  onDeleted,
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Reset delete state when modal closes or account changes
  useEffect(() => {
    if (!isDeleteOpen) {
      setIsDeleting(false);
      setDeleteError("");
    }
  }, [isDeleteOpen]);

  // Reset delete state when account changes (e.g., after list refresh)
  useEffect(() => {
    setIsDeleteOpen(false);
    setIsDeleting(false);
    setDeleteError("");
  }, [account?.id]);

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

  const handleSnyk = async (key, platformId) => {
    try {
      setIsSnykLoading(key);
      const res = await callAPI(
        `${BACKEND_POINT}/auth/auth-url?id=${platformId}&reconnect=true`,
        "GET",
      );
      const authUrl = res?.url;
      if (!authUrl) throw new Error("No URL returned");
      window.location.href = authUrl;
    } catch (err) {
      setIsSnykLoading("");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!account?.id || isDeleting) return;

    setIsDeleting(true);
    setDeleteError("");
    try {
      await callAPI(`${BACKEND_POINT}/account/delete/${account.id}`, "DELETE");
      // Close modal first, then trigger refresh
      setIsDeleteOpen(false);
      setIsDeleting(false);
      setDeleteError("");
      // Call onDeleted callback to show success + refresh the list
      onDeleted?.("Account deleted successfully");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete account";
      setDeleteError(message);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        open={isDeleteOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteOpen(false);
            setDeleteError("");
          }
        }}
        title="Delete account?"
        description={`This will permanently remove “${account?.name ?? "this account"}” from Botera.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        tone="danger"
      >
        {deleteError ? (
          <Box
            sx={{
              mt: 0.5,
              p: 1.25,
              borderRadius: 2,
              bgcolor: "rgba(211, 47, 47, 0.08)",
              border: "1px solid rgba(211, 47, 47, 0.18)",
            }}
          >
            <Typography variant="body2" color="error.main" fontWeight={600}>
              {deleteError}
            </Typography>
          </Box>
        ) : null}
      </ConfirmationModal>

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
                <CustomeImage
                  src={account.profilePhoto}
                  fallback={account.logo}
                  alt={account.name}
                  specialImage
                  width={30}
                  className="rounded-sm"
                />
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
                {/* <Tooltip
                title={`Auto reply ${
                  account.autoReply ? "enabled" : "disabled"
                }`}
              >
                <Switch checked={account.autoReply} fontSize="small" />
              </Tooltip> */}
                {account.status === "healthy" ? (
                  <Tooltip
                    title={
                      isSnykLoading === account.id
                        ? "Syncing Account"
                        : "Sync Account"
                    }
                  >
                    {isSnykLoading === account.id ? (
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleSnyk(account.id, account.platformId)
                        }
                      >
                        <CircularProgress size={20} color="inherit" />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleSnyk(account.id, account.platformId)
                        }
                        disabled={isSnykLoading}
                      >
                        <SyncIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Tooltip>
                ) : (
                  <Box sx={{ width: 36 }} />
                )}
                <Tooltip title="Delete Account">
                  <IconButton
                    color="error"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                {account.status === "reconnect" ? (
                  <IconButton
                    color="error"
                    onClick={() => handleSnyk(account.id, account.platformId)}
                  >
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
    </>
  );
}
