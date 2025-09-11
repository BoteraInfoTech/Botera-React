import CustomModal from "../../commonComponents/CustomModal";
import { Grid, Card, CardActionArea, Typography, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const platforms = [
  {
    name: "WhatsApp",
    type: "Business Account",
    icon: <WhatsAppIcon sx={{ color: "#25D366", fontSize: 48 }} />,
  },
  {
    name: "Facebook",
    type: "Page",
    icon: <FacebookIcon sx={{ color: "#1877F2", fontSize: 48 }} />,
  },
  {
    name: "Instagram",
    type: "Business or Creator",
    icon: <InstagramIcon sx={{ color: "#E1306C", fontSize: 48 }} />,
  },
  {
    name: "LinkedIn",
    type: "Page or Profile",
    icon: <LinkedInIcon sx={{ color: "#0077b5", fontSize: 48 }} />,
  },
];

export default function ConnectAccountModal({ open, onClose }) {
  return (
    <CustomModal open={open} onClose={onClose} title="Connect Account">
      <Grid container spacing={3} justifyContent="center">
        {platforms.map((platform, idx) => (
          <Grid item key={idx}>
            <Card
              sx={{
                width: 180,
                height: 180,
                borderRadius: 2,
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <CardActionArea
                onClick={() => alert(`Connect ${platform.name}`)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    backgroundColor: "#fff",
                  },
                }}
              >
                <Box>{platform.icon}</Box>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                  {platform.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 13 }}
                >
                  {platform.type}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CustomModal>
  );
}
