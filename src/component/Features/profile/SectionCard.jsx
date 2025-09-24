// components/SectionCard.jsx
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Dropdown from "../../commonComponents/Dropdown";
import RadioButton from "../../commonComponents/RadioButton";
import CheckBox from "../../commonComponents/CheckBox";
import TextBox from "../../commonComponents/TextBox";
import TimezoneList from "../../../utils/getAllTimezone";
import dateFormatOptions from "../../../utils/getAllDateFormate";

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
                value={formData.language}
                options={[
                  { value: "English", label: "English" },
                  { value: "Spanish", label: "Spanish" },
                  { value: "French", label: "French" },
                  { value: "German", label: "German" },
                  { value: "Turkish", label: "Turkish" },
                  { value: "Japanese", label: "Japanese" },
                  { value: "Arabic", label: "Arabic" },
                ]}
                onChange={(value) => handleChange(value, "language")}
                searchable
              />
            </div>
            <CheckBox
              checked={formData.mode === "D"}
              label={"Dark Mode"}
              isSwitch={true}
              handleChange={(e, checked) =>
                handleChange(checked ? "D" : "L", "mode")
              }
              color={"primary"}
            />
          </div>
        );

      case "date and time": {
        const allTimeZones = TimezoneList();
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Dropdown
                label="Time Zone"
                value={formData.timeZone}
                options={allTimeZones}
                onChange={(value) => handleChange(value, "timeZone")}
                searchable
              />
            </div>
            <div>
              <Dropdown
                label="Date Format"
                value={formData.dateFormate}
                options={dateFormatOptions}
                onChange={(value) => handleChange(value, "dateFormate")}
              />
            </div>
            <div className="md:col-span-2">
              <RadioButton
                label={"Time Format"}
                checkedValue={formData.timeFormate}
                handleChange={(e) =>
                  handleChange(e.target.value, "timeFormate")
                }
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
      }

      case "general":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <TextBox
                label={"Name"}
                value={formData.fullName}
                onChange={(e) => handleChange(e.target.value, "fullName")}
                isFullWidth
              />
            </div>
            <div>
              <TextBox
                label={"Email"}
                value={formData.email}
                onChange={(e) => handleChange(e.target.value, "email")}
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
                type="password"
                label={"Current Password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  handleChange(e.target.value, "currentPassword")
                }
                isFullWidth
                placeholder={"Enter current password"}
              />
            </div>
            <div>
              <TextBox
                type="password"
                label={"New Password"}
                value={formData.newPassword}
                onChange={(e) => handleChange(e.target.value, "newPassword")}
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
