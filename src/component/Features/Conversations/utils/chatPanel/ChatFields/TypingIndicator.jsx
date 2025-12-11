import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-2xl shadow-sm">
      <div
        className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
        style={{ animationDelay: "0.12s" }}
      />
      <div
        className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
        style={{ animationDelay: "0.24s" }}
      />
    </div>
  );
}
