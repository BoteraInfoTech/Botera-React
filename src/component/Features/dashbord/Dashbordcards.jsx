import React from "react";

function FolderCard({ title, files, date, bgColor, textColor }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow hover:shadow-lg transition duration-200`}
      style={{ backgroundColor: bgColor, color: textColor || "white" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm">{files}</span>
      </div>
    </div>
  );
}

export default function FolderList() {
  const folders = [
    {
      title: "Remaining Credits",
      files: `10 credits`,
      bgColor: "#FFFFFF",
      textColor: "#000000",
    },
    {
      title: "Auto-replied",
      files: "12 messages",
      bgColor: "#FFFFFF",
      textColor: "#000000",
    },
    {
      title: "Pending replies",
      files: "16 messages",
      bgColor: "#FFFFFF",
      textColor: "#000000",
    },
    {
      title: "Failed replies",
      files: "8 messages",
      bgColor: "#FFFFFF",
      textColor: "#000000",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-2 mb-3">
      {folders.map((folder, index) => (
        <FolderCard key={index} {...folder} />
      ))}
    </div>
  );
}
