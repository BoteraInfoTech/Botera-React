import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const SpinLoader = ({ message, height = 280, size = 36, textClassName }) => {
  return (
    <Box
      sx={{
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress size={size} />
      <Typography
        variant="body2"
        color="text.secondary"
        className={textClassName}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default SpinLoader;
