import { Grid, Card, CardActionArea, Typography, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useState } from "react";
import CustomModal from "../../commonComponents/CustomModal";
import { BACKEND_POINT } from "../../../utils/config";
import callAPI from "../../../utils/callApi";
import SpinLoader from "./loader/SpinLoader";

const platforms = [
  // {
  //   id: 1,
  //   name: "WhatsApp",
  //   type: "Business Account",
  //   icon: <WhatsAppIcon sx={{ color: "#25D366", fontSize: 48 }} />,
  // },
  {
    id: 2,
    name: "Facebook",
    type: "Page",
    icon: <FacebookIcon sx={{ color: "#1877F2", fontSize: 48 }} />,
  },
  {
    id: 3,
    name: "Instagram",
    type: "Business or Creator",
    icon: <InstagramIcon sx={{ color: "#E1306C", fontSize: 48 }} />,
  },
  // {
  //   id: 4,
  //   name: "LinkedIn",
  //   type: "Page or Profile",
  //   icon: <LinkedInIcon sx={{ color: "#0077b5", fontSize: 48 }} />,
  // },
];

export default function ConnectAccountModal({ open, onClose }) {
  const [loadingPlatformId, setLoadingPlatformId] = useState(null);

  const handleConnect = async (platformId) => {
    if (loadingPlatformId) return;

    try {
      setLoadingPlatformId(platformId);
      const res = await callAPI(
        `${BACKEND_POINT}/auth/auth-url?id=${platformId}`,
        "GET",
      );
      const authUrl = res?.url;
      if (!authUrl) throw new Error("No URL returned");
      window.location.href = authUrl;
    } catch (err) {
      setLoadingPlatformId(null);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title="Connect Account">
      <Grid container spacing={3} justifyContent="center">
        {platforms.map((p) => {
          const isLoading = loadingPlatformId === p.id;
          const isDisabled = !!loadingPlatformId;

          return (
            <Grid item key={p.id}>
              <Card
                sx={{
                  width: 180,
                  height: 180,
                  borderRadius: 2,
                  textAlign: "center",
                  opacity: isDisabled && !isLoading ? 0.6 : 1,
                }}
              >
                <CardActionArea
                  disabled={isDisabled}
                  onClick={() => handleConnect(p.id)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {isLoading ? (
                    <SpinLoader message={"connecting.."} />
                  ) : (
                    <>
                      <Box>{p.icon}</Box>
                      <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                        {p.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: 13 }}
                      >
                        {p.type}
                      </Typography>
                    </>
                  )}
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </CustomModal>
  );
}
