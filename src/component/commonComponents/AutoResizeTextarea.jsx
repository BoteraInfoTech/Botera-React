import React, { useRef } from "react";

export default function AutoResizeTextarea({
  value,
  onChange,
  onSend,
  placeholder = "Type a message...",
  maxHeight = 120,
  className = "",
}) {
  const textareaRef = useRef(null);

  const autoResize = (e) => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onSend && onSend();
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      onKeyDown={handleKeyDown}
      onInput={autoResize()}
      placeholder={placeholder}
      rows={1}
      className={`w-full bg-neutral-100 px-4 py-3 rounded-xl outline-none text-sm resize-none overflow-y-auto ${className}`}
      style={{ maxHeight: `${maxHeight}px` }}
    />
  );
}
