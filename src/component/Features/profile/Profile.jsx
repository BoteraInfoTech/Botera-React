import { useState } from "react";
import SectionCard from "./SectionCard";
import ProfileCard from "./ProfileCard";

export default function Profile() {
  const [formData, setFormData] = useState({
    fullName: "Akil",
    username: "akil123",
    email: "akil@xyz.com",
    currentPassword: "",
    newPassword: "",
    timeZone: "(GMT+05:30) Kolkata",
    dateFormat: "DD-MMM-YYYY",
    timeFormat: "24 Hours",
    language: "English",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col md:flex-row gap-6 ml-14 md:ml-0">
      {/* Left Profile Card */}
      <ProfileCard fullName={formData.fullName} email={formData.email} />

      {/* Right Edit Form (Scrollable) */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-5rem)] pr-4">
        <SectionCard
          title="General"
          formData={formData}
          handleChange={handleChange}
        />
        <SectionCard
          title="Security"
          formData={formData}
          handleChange={handleChange}
        />
        <SectionCard
          title="Date and Time"
          formData={formData}
          handleChange={handleChange}
        />
        <SectionCard
          title="Preferences"
          formData={formData}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
