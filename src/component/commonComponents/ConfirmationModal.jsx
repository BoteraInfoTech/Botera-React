import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Divider,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export default function ConfirmationModal({
  open,
  onClose,
  title = "Confirm action",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  tone = "danger", // "danger" | "primary"
  children,
  maxWidth = "xs",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const confirmColor = tone === "danger" ? "error" : "primary";

  const handleClose = () => {
    if (!isLoading) onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 2 : 3,
          boxShadow: "0 18px 70px rgba(2, 6, 23, 0.35)",
          background: "linear-gradient(145deg, #ffffff, #f6f8fb)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(2, 6, 23, 0.55)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
        }}
      >
        <Typography variant="h6" fontWeight={800} noWrap>
          {title}
        </Typography>

        <IconButton onClick={handleClose} disabled={isLoading}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          px: isMobile ? 2 : 2.5,
          pb: isMobile ? 2 : 2.5,
          pt: 0,
          gap: 1,
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      >
        {children ? (
          children
        ) : (
          <Typography variant="body2" color="text.secondary">
            {description || "Are you sure you want to continue?"}
          </Typography>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 2.5,
          pb: 2.5,
          gap: 1,
        }}
      >
        <Button
          onClick={handleClose}
          disabled={isLoading}
          variant="outlined"
          sx={{ borderRadius: 2, fontWeight: 700, textTransform: "none" }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          disabled={isLoading}
          variant="contained"
          color={confirmColor}
          startIcon={
            isLoading ? <CircularProgress size={18} color="inherit" /> : null
          }
          sx={{
            borderRadius: 2,
            fontWeight: 800,
            textTransform: "none",
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
