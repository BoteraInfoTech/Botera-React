import React from "react";

function FolderCard({ title, value }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow hover:shadow-lg transition duration-200`}
      style={{ backgroundColor: "#FFFFFF", color: "#000000" || "white" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}

export default function FolderList({ cardData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-2 mb-3">
      {cardData.map((folder, index) => (
        <FolderCard key={index} {...folder} />
      ))}
    </div>
  );
}
