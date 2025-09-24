import React from "react";

function RecentFileItem({ title, subtitle, button, bgColor, btnColor }) {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg`}
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <div>
        <p className="font-medium text-[#263238]">{title}</p>
        <span className="text-sm text-[#26323899]">{subtitle}</span>
      </div>
      <button
        className={`text-sm text-white px-4 py-2 rounded-full shadow-md font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
        style={{ backgroundColor: "#3B82F6" }}
      >
        {button}
      </button>
    </div>
  );
}

export default function RecentFiles({ taskData }) {
  const totalTasks = Object.keys(taskData);

  const files = totalTasks
    .map((task) => {
      switch (task) {
        case "credits": {
          return {
            title: "Add More Credits",
            subtitle: `${taskData[task]} Credits Left`,
            button: "Add Credits",
          };
        }
        case "reconnect": {
          return {
            title: "Account's need Reconnects",
            subtitle: `${taskData[task]} Accounts`,
            button: "Reconnect",
          };
        }
        case "knowledge": {
          return {
            title: "Add Knowledge Base",
            subtitle: "Add Recent details to make auto reply more effective",
            button: "Add",
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
