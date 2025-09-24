import { useState, useEffect, useRef } from "react";

// Calculate position once when opening
const calculatePosition = (buttonRef, options, searchable, setPosition) => {
  if (!buttonRef.current) return;
  const rect = buttonRef.current.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const dropdownHeight = Math.min(
    240,
    options.length * 40 + (searchable ? 40 : 0)
  );

  if (
    rect.bottom + dropdownHeight > viewportHeight &&
    rect.top > dropdownHeight
  ) {
    setPosition("top");
  } else {
    setPosition("bottom");
  }
};

export default function Dropdown({
  options = [],
  label = "",
  className = "",
  onChange,
  value,
  searchable = false,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("bottom"); // "bottom" or "top"
  const dropdownRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  // Only calculate position when dropdown opens
  useEffect(() => {
    if (open) calculatePosition(buttonRef, options, searchable, setPosition);
  }, [open, options, searchable]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 bg-white p-3 rounded-md shadow-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {value || "Select"}
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute z-10 w-full border border-gray-200 rounded-md shadow-lg bg-white max-h-60 overflow-auto ${
            position === "bottom" ? "mt-1 top-full" : "mb-1 bottom-full"
          }`}
        >
          {position === "bottom" && searchable && (
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here..."
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <ul className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>

          {position === "top" && searchable && (
            <div className="p-2 border-t border-gray-200">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here..."
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
