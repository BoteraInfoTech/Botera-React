import React from "react";

export default function DateSeparator({ text }) {
  return (
    <div className="flex items-center my-2">
      <div className="flex-1 h-[1px] bg-neutral-200" />
      <div className="px-3 text-xs text-neutral-500">{text}</div>
      <div className="flex-1 h-[1px] bg-neutral-200" />
    </div>
  );
}
