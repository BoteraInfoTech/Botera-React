import React from "react";

function RecentFileItem({ title, subtitle, button, bgColor, btnColor }) {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg`}
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <p className="font-medium text-[#263238]">{title}</p>
        <span className="text-sm text-[#26323899]">{subtitle}</span>
      </div>
      <button
        className={`text-sm text-white px-4 py-2 rounded-full shadow-md font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
        style={{ backgroundColor: btnColor }}
      >
        {button}
      </button>
    </div>
  );
}

export default function RecentFiles() {
  const files = [
    {
      title: "Account's need Reconnects",
      subtitle: "2 Accouts",
      button: "Reconnect",
      bgColor: "#FAFAFA",
      btnColor: "#3B82F6",
    },
    {
      title: "Add More Credits",
      subtitle: "10 Credits Left",
      button: "Add Credits",
      bgColor: "#FAFAFA",
      btnColor: "#3B82F6",
    },
  ];

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
