import { useState, useEffect } from "react";
import { Snackbar, Alert, IconButton, Slide, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
// Slide transition
const SlideTransition = (props) => <Slide {...props} direction="down" />;

// Dynamic icons for each alert type
const icons = {
  info: <InfoIcon fontSize="medium" />,
  success: <CheckCircleIcon fontSize="medium" />,
  warning: <WarningAmberIcon fontSize="medium" />,
  error: <CancelIcon fontSize="medium" />,
};

// Custom premium colors
const colors = {
  info: { bg: "#E0F2FE", text: "#0369A1" },
  success: { bg: "#DCFCE7", text: "#15803D" },
  warning: { bg: "#FEF3C7", text: "#B45309" },
  error: { bg: "#FEE2E2", text: "#B91C1C" },
};

const AlertMessage = ({ type = "info", message, duration = 4000 }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const icon = icons[type] || icons.error;
  const color = colors[type] || colors.info;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
      sx={{ mt: 2 }}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        sx={{
          width: "100%",
          maxWidth: 480,
          minWidth: 300,
          px: 2,
          py: 0,
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: color.bg,
          color: color.text,
          display: "flex",
          alignItems: "center",
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          },
        }}
        icon={<Box sx={{ color: color.text }}>{icon}</Box>}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
            sx={{ ml: 1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
