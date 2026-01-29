import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useEffect, useState, useRef } from "react";
import CustomModal from "../../commonComponents/CustomModal";
import CustomButton from "../../commonComponents/Button";
import CheckBox from "../../commonComponents/CheckBox";
import callAPI from "../../../utils/callApi";
import { BACKEND_POINT } from "../../../utils/config";
import SpinLoader from "./loader/SpinLoader";
import Button from "../../commonComponents/Button";

const PLATFORM_CONFIG = {
  1: {
    title: "Select WhatsApp Accounts",
    subtitle: "Choose which WhatsApp Business accounts Botera can manage",
    icon: WhatsAppIcon,
    color: "#25D366",
    name: "WhatsApp Business accounts",
    notFound: {
      title: "No WhatsApp Business accounts available to connect",
      desc:
        "We couldn’t find any WhatsApp Business accounts linked to this login. " +
        "This can happen if the account doesn’t have the required access or " +
        "permissions were limited during the login process.",
      guideline: [
        "An account with WhatsApp Business access",
        "Full permissions enabled during login",
      ],
      supportAvailable: true,
    },
  },

  2: {
    title: "Select Pages to Connect",
    subtitle: "Choose which Facebook pages Botera can manage",
    icon: FacebookIcon,
    color: "#1877F2",
    name: "Facebook pages",
    notFound: {
      title: "No Facebook pages available to connect",
      desc:
        "We couldn’t find any Facebook pages linked to this login. " +
        "This can happen if the account doesn’t have admin access or " +
        "permissions were limited during the login process.",
      guideline: [
        "An account that manages your Facebook pages",
        "Full permissions enabled during login",
      ],
      supportAvailable: true,
    },
  },

  3: {
    title: "Select Instagram Accounts",
    subtitle: "Choose which Instagram business accounts Botera can manage",
    icon: InstagramIcon,
    color: "#E1306C",
    name: "Instagram business accounts",
    notFound: {
      title: "No Instagram accounts available to connect",
      desc:
        "We couldn’t find any Instagram business accounts linked to this login. " +
        "This can happen if the account is not connected to a Facebook page or " +
        "permissions were limited during the login process.",
      guideline: [
        "An Instagram business account connected to a Facebook page",
        "Full permissions enabled during login",
      ],
      supportAvailable: true,
    },
  },

  4: {
    title: "Select LinkedIn Pages",
    subtitle: "Choose which LinkedIn pages Botera can manage",
    icon: LinkedInIcon,
    color: "#0A66C2",
    name: "LinkedIn pages",
    notFound: {
      title: "No LinkedIn pages available to connect",
      desc:
        "We couldn’t find any LinkedIn pages linked to this login. " +
        "This can happen if the account doesn’t have page admin access or " +
        "permissions were limited during the login process.",
      guideline: [
        "An account with admin access to LinkedIn pages",
        "Full permissions enabled during login",
      ],
      supportAvailable: true,
    },
  },
};

function ManageAccountModal({
  isReconnect,
  open,
  onClose,
  onSuccess,
  platformId,
  code,
  setCode,
  accountReducer = {},
  connectAccount,
  getConnectedAccounts,
}) {
  const {
    isLoading: isConnecting,
    successMessage,
    errorMessage,
    status,
  } = accountReducer;
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [error, setError] = useState(null);
  const lastFetchedRef = useRef(null);
  const isMountedRef = useRef(true);
  const previousStatusRef = useRef(null);
  const getConnectedAccountsRef = useRef(getConnectedAccounts);
  const onCloseRef = useRef(onClose);
  const onSuccessRef = useRef(onSuccess);
  const platform = PLATFORM_CONFIG[platformId] || PLATFORM_CONFIG[2];
  const PlatformIcon = platform.icon;

  // Update refs when props change
  useEffect(() => {
    getConnectedAccountsRef.current = getConnectedAccounts;
    onCloseRef.current = onClose;
    onSuccessRef.current = onSuccess;
  }, [getConnectedAccounts, onClose, onSuccess]);

  useEffect(() => {
    if (!open) {
      setLoading(false);
      setAccountData(null);
      setError(null);
      lastFetchedRef.current = null;
      previousStatusRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open || !platformId || !code) return;

    if (isReconnect) return;
    const requestKey = `${platformId}-${code}`;
    if (lastFetchedRef.current === requestKey) return;
    lastFetchedRef.current = requestKey;
    isMountedRef.current = true;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await callAPI(
          `${BACKEND_POINT}/auth/getDetails?id=${platformId}&code=${code}`,
          "GET",
        );
        setAccountData(res);
      } catch (err) {
        if (isMountedRef.current && lastFetchedRef.current === requestKey) {
          setError("Failed to fetch account details");
        }
      } finally {
        setCode("");
        setLoading(false);
      }
    };
    fetchDetails();
    return () => {
      isMountedRef.current = false;
    };
  }, [open, platformId, code, setCode, isReconnect]);

  useEffect(() => {
    if (isReconnect) {
      const requestKey = `${platformId}-${code}`;
      if (lastFetchedRef.current === requestKey) return;
      lastFetchedRef.current = requestKey;
      isMountedRef.current = true;
      const fetchDetails = async () => {
        try {
          setLoading(true);
          setError(null);
          await callAPI(
            `${BACKEND_POINT}/auth/reconnect?id=${platformId}&code=${code}`,
            "GET",
          );
          onSuccess("Account Reconnected Successfully");
          onClose();
        } catch (err) {
          if (isMountedRef.current && lastFetchedRef.current === requestKey) {
            setError("Failed to fetch account details");
          }
        } finally {
          setCode("");
          setLoading(false);
        }
      };
      fetchDetails();
      return () => {
        isMountedRef.current = false;
      };
    }
  }, [isReconnect, platformId, code, setCode, onClose, onSuccess]);

  const pages = accountData?.response?.accounts || [];

  const togglePage = (pageId) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId],
    );
  };

  const handleConnect = async () => {
    if (!selectedPages.length || isConnecting) return;

    const selectedPagesData = pages?.filter((acc) =>
      selectedPages.includes(acc.pageId),
    );

    const payload = {
      platformId,
      accounts: selectedPagesData,
    };

    setError(null);
    try {
      await connectAccount(payload);
    } catch (err) {
      // Error is handled by reducer
      console.error("Failed to connect account:", err);
    }
  };

  // Handle success/error messages from reducer
  useEffect(() => {
    if (!open) {
      previousStatusRef.current = null;
      return;
    }

    // Only handle status change once when it transitions to success
    if (status === "success" && previousStatusRef.current !== "success") {
      previousStatusRef.current = "success";
      // Notify parent to show success in alert
      if (onSuccessRef.current) {
        onSuccessRef.current(
          successMessage || "Accounts connected successfully",
        );
      }
      // Refresh accounts list after successful connection
      if (getConnectedAccountsRef.current) {
        getConnectedAccountsRef.current();
      }
      // Close modal immediately; success message shown by parent alert
      onCloseRef.current();
      setSelectedPages([]);
    }

    // Handle error state
    if (
      status === "fail" &&
      errorMessage &&
      previousStatusRef.current !== "fail"
    ) {
      previousStatusRef.current = "fail";
      setError(errorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, successMessage, errorMessage, open]);

  return (
    <>
      {isReconnect ? (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            backgroundColor: "rgba(170, 170, 170, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              px: 4,
              py: 3,
              borderRadius: 2,
            }}
          >
            <SpinLoader message="Reconnecting account..." />
          </Box>
        </Box>
      ) : (
        <CustomModal open={open} onClose={onClose} disableClose={isConnecting}>
          {loading && <SpinLoader message={`Fetching your ${platform.name}`} />}
          {!loading && !isConnecting && error && (
            <Typography color="error">{error}</Typography>
          )}
          {!loading && pages.length > 0 && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2.5,
                  p: 2,
                  borderRadius: 2,
                  background:
                    "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  {PlatformIcon && (
                    <Avatar
                      sx={{
                        bgcolor: platform.color,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <PlatformIcon />
                    </Avatar>
                  )}
                  <Box>
                    <Typography fontWeight={600}>{platform.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {platform.subtitle}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  size="small"
                  label={`${selectedPages.length} / ${pages.length} selected`}
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              <Divider sx={{ mb: 1.5 }} />
              <Box sx={{ maxHeight: 340, overflowY: "auto", px: 0.5 }}>
                {pages.map((page) => {
                  const isSelected = selectedPages.includes(page.pageId);
                  return (
                    <Box
                      key={page.pageId}
                      onClick={() => togglePage(page.pageId)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 2,
                        py: 1.5,
                        mb: 0.8,
                        borderRadius: 2,
                        cursor: "pointer",
                        border: isSelected
                          ? "1px solid rgba(24,119,242,0.4)"
                          : "1px solid transparent",
                        backgroundColor: isSelected
                          ? "rgba(24,119,242,0.06)"
                          : "transparent",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: isSelected
                            ? "rgba(24,119,242,0.08)"
                            : "rgba(0,0,0,0.04)",
                        },
                      }}
                    >
                      <CheckBox checked={isSelected} />

                      <Avatar
                        src={page.profilePhoto}
                        sx={{
                          bgcolor: "#e4e6eb",
                          fontWeight: 600,
                        }}
                      >
                        {page.pageName?.charAt(0)}
                      </Avatar>
                      <Box flex={1}>
                        <Typography fontWeight={500}>
                          {page.pageName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {page.category}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Divider sx={{ mt: 2.5 }} />
              <Box
                display="flex"
                gap={1.5}
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <CustomButton
                  text="Cancel"
                  onClick={onClose}
                  disabled={isConnecting}
                  className="bg-red-500 hover:bg-red-600"
                />
                <CustomButton
                  text={
                    isConnecting ? " Connecting..." : "Connect Selected Pages"
                  }
                  disabled={!selectedPages.length || isConnecting}
                  isCustomButton={isConnecting}
                  startIcon={
                    isConnecting ? (
                      <CircularProgress size={18} sx={{ color: "inherit" }} />
                    ) : null
                  }
                  className={
                    isConnecting
                      ? "bg-blue-600 text-white px-4 py-2 font-bold"
                      : "font-bold px-3"
                  }
                  onClick={handleConnect}
                />
              </Box>
            </Box>
          )}
          {!loading && !error && pages.length === 0 && (
            <Box
              sx={{
                px: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {PlatformIcon && (
                <Avatar
                  sx={{
                    bgcolor: platform.color,
                    width: 56,
                    height: 56,
                    mb: 1,
                  }}
                >
                  <PlatformIcon fontSize="large" />
                </Avatar>
              )}

              <Typography variant="h6" fontWeight={600}>
                {platform.notFound?.title ??
                  `No ${platform.name} available to connect`}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 460 }}
              >
                {platform.notFound?.desc ??
                  `We couldn’t find any ${platform.name} linked to this login.`}
              </Typography>

              {platform.notFound?.guideline?.length > 0 && (
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    You can close this window and try connecting again using:
                  </Typography>
                  {platform.notFound.guideline.map((item, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Box>
              )}

              {platform.notFound?.supportAvailable && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Need help?{" "}
                    <Button
                      text={"Contact support"}
                      className={"text-blue-500 font-bold"}
                      isCustomButton
                      onClick={() => {
                        window.open("/support", "_blank");
                      }}
                    />
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </CustomModal>
      )}
    </>
  );
}

export default ManageAccountModal;
