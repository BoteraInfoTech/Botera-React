import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import ProfileCard from "./ProfileCard";
import ProfileSkeleton from "./loader/loader";
import AlertMessage from "../../commonComponents/AlertMessage";

import { logout } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Profile({
  userDetails,
  getUserDetails,
  deleteUser,
  updateUser,
}) {
  const [formData, setFormData] = useState({});
  const [credits, setCredits] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const isLoading = userDetails.isLoading;
  const errorMessage = userDetails.errorMessage;

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    if (
      ["updateSuccess", "success"].includes(userDetails && userDetails.status)
    ) {
      if (userDetails && userDetails.status === "updateSuccess") {
        setSuccessMessage(userDetails.successMessage);
      }
      const data = userDetails?.successResponse?.response?.userDetails;
      if (data) {
        const { name = "", email, totalCredit = 0 } = data;
        setCredits(totalCredit);
        setFormData({
          fullName: name || email.split("@")[0],
          currentPassword: "",
          newPassword: "",
          ...data,
        });
      }
    }
    if (userDetails && userDetails.status === "deleteSuccess") {
      logout();
      navigate("/");
    }
    if (userDetails && userDetails.status === "pending") {
      setSuccessMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleChange = (value, key) => {
    setFormData({ ...formData, [key]: value });
  };

  const allowedSection = [
    "General",
    "Security",
    "Date and Time",
    "Preferences",
  ];

  return (
    <div
      className={`min-h-screen ${
        formData.mode === "D" ? "bg-gray-100" : "bg-gray-100"
      } py-10 px-4 flex flex-col md:flex-row gap-6 ml-14 md:ml-0`}
    >
      {errorMessage && <AlertMessage type="error" message={errorMessage} />}
      {successMessage && (
        <AlertMessage type="success" message={successMessage} />
      )}
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          {/* Left Profile Card */}
          <ProfileCard
            fullName={formData.fullName}
            email={formData.email}
            credits={credits}
            onUpdateProfile={() => updateUser(formData)}
            onDeleteProfile={() => deleteUser()}
          />
          {/* Right Edit Form (Scrollable) */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-5rem)] pr-4">
            {allowedSection.map((title) => (
              <SectionCard
                title={title}
                formData={formData}
                handleChange={handleChange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
