// components/SectionCard.jsx
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Dropdown from "../../commonComponents/Dropdown";
import RadioButton from "../../commonComponents/RadioButton";
import CheckBox from "../../commonComponents/CheckBox";
import TextBox from "../../commonComponents/TextBox";

const iconMap = {
  performance: SettingsOutlinedIcon,
  security: LockOutlinedIcon,
  "date and time": PublicOutlinedIcon,
  general: PersonOutlineIcon,
};
export default function SectionCard({ title, formData, handleChange }) {
  const key = title && title.toLowerCase();
  const renderContent = () => {
    switch (key) {
      case "preferences":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Language */}
            <div className="flex flex-col border rounded-xl p-4">
              <Dropdown
                label="Language"
                value={"English"}
                options={[
                  { value: "en", label: "English" },
                  { value: "hi", label: "Hindi" },
                  { value: "es", label: "Spanish" },
                ]}
                onChange={handleChange}
              />
            </div>
            <CheckBox
              checked={true}
              label={"Dark Mode"}
              isSwitch={true}
              onChange={handleChange}
              color={"primary"}
            />
          </div>
        );

      case "date and time":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Dropdown
                label="Time Zone"
                value={"(GMT-08:00) California"}
                options={[
                  {
                    value: "(GMT+05:30) Kolkata",
                    label: "(GMT+05:30) Kolkata",
                  },
                  { value: "(GMT+01:00) London", label: "(GMT+01:00) London" },
                  {
                    value: "(GMT-08:00) California",
                    label: "(GMT-08:00) California",
                  },
                ]}
                onChange={handleChange}
              />
            </div>
            <div>
              <Dropdown
                label="Date Format"
                value={"DD-MMM-YYYY"}
                options={[
                  {
                    value: "DD-MMM-YYYY",
                    label: "DD-MMM-YYYY",
                  },
                  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                  {
                    value: "YYYY-MM-D",
                    label: "YYYY-MM-D",
                  },
                ]}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <RadioButton
                label={" Time Format"}
                checkedValue="12"
                handleChange={handleChange}
                groupData={[
                  {
                    value: "12",
                    label: "12 Hours",
                  },
                  {
                    value: "24",
                    label: "24 Hours",
                  },
                ]}
              />
            </div>
          </div>
        );

      case "general":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <TextBox
                label={"Name"}
                value={formData.fullName}
                onChange={handleChange}
                isFullWidth
              />
            </div>
            <div>
              <TextBox
                label={"Email"}
                value={formData.email}
                onChange={handleChange}
                isFullWidth
                isReadOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        );

      case "security":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <TextBox
                label={"Current Password"}
                value={formData.currentPassword}
                onChange={handleChange}
                isFullWidth
                placeholder={"Enter current password"}
              />
            </div>
            <div>
              <TextBox
                label={"New Password"}
                value={formData.newPassword}
                onChange={handleChange}
                isFullWidth
                placeholder={"Enter new password"}
              />
            </div>
          </div>
        );

      default:
        return <div className="text-gray-500">No content available.</div>;
    }
  };
  const Icon = iconMap[key] || SettingsOutlinedIcon;

  return (
    <section>
      <div className="border rounded-2xl shadow-sm bg-white">
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <Icon className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="p-6">{renderContent()}</div>
      </div>
    </section>
  );
}
