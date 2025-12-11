import { Tooltip as MUITooltip } from "@mui/material";

export default function CustomizedTooltips({ children, title, placement }) {
  return (
    <MUITooltip
      title={title}
      placement={placement}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: "white",
            color: "black",
            fontSize: "0.9rem",
            border: "1px solid #ccc",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
          },
        },
        arrow: {
          sx: {
            "&::before": {
              bgcolor: "white",
              border: "1px solid #ccc",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
            },
          },
        },
      }}
    >
      <span>{children}</span>
    </MUITooltip>
  );
}
