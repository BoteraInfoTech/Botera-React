import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomModal({
  open,
  onClose,
  title,
  children,
  maxWidth = "md",
  disableClose = false,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = disableClose ? () => {} : onClose;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 2 : 3,
          boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
          overflow: "hidden",
          height: isMobile ? "90vh" : "auto",
          background: "linear-gradient(145deg, #ffffff, #f5f7fa)", // subtle premium gradient
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: isMobile ? "1.1rem" : "1.5rem",
          letterSpacing: 0.5,
          background: "linear-gradient(135deg, #f5f7fa, #e4ebf1)",
          p: isMobile ? 2 : 3,
          position: "relative",
          textTransform: "capitalize",
        }}
      >
        {title}
        <IconButton
          onClick={handleClose}
          disabled={disableClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "grey.600",
            "&:hover": { color: "grey.900" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

      {/* Content */}
      <DialogContent
        sx={{
          mt: 2,
          pb: 3,
          px: isMobile ? 2 : 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
