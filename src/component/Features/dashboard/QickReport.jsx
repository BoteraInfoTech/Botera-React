import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../commonComponents/Button";

function RecentFileItem({ title, subtitle, button, onClick }) {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg`}
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <div>
        <p className="font-medium text-[#263238]">{title}</p>
        <span className="text-sm text-[#26323899]">{subtitle}</span>
      </div>
      <Button
        text={button}
        className="text-sm rounded-full"
        onClick={() => onClick()}
      />
    </div>
  );
}

export default function RecentFiles({ taskData, setShowContactUs }) {
  const totalTasks = Object.keys(taskData);
  const navigate = useNavigate();

  const files = totalTasks
    .map((task) => {
      switch (task) {
        case "credits": {
          return {
            title: "Add More Credits",
            subtitle: `${taskData[task]} Credits Left`,
            button: "Add Credits",
            onClick: () => {
              setShowContactUs(true);
            },
          };
        }
        case "reconnect": {
          return {
            title: "Account's need Reconnects",
            subtitle: `${taskData[task]} Accounts`,
            button: "Reconnect",
            onClick: () => {
              navigate("/account");
            },
          };
        }
        case "knowledge": {
          return {
            title: "Add Knowledge Base",
            subtitle: "Add Recent details to make auto reply more effective",
            button: "Add",
            onClick: () => {
              navigate("/knowledge/add");
            },
          };
        }
        default:
          return null;
      }
    })
    .filter((data) => data);

  return (
    <div className="bg-white p-4 sm:p-5 shadow-md mb-3 md:min-h-[418px] shadow-lg rounded-md">
      <h4 className="text-base sm:text-lg font-semibold text-[#263238] mb-3 sm:mb-4">
        Tasks
      </h4>
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {files.map((file, index) => (
          <RecentFileItem key={index} {...file} />
        ))}
      </div>
    </div>
  );
}
