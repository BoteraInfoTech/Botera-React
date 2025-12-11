import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  MoreVert,
  Done,
  PushPin,
  Search as SearchIcon,
  Archive,
  LocalOffer as LocalOfferIcon,
  AutoAwesome,
  UploadFile,
  PersonAdd,
  FolderDelete as FolderDeleteIcon,
} from "@mui/icons-material";

import Search from "../../../../commonComponents/Search";
import Button from "../../../../commonComponents/Button";
import Tooltip from "../../../../commonComponents/Tooltip";

const MenuItem = ({ icon, title }) => {
  return (
    <Button
      text={
        <div className="flex items-center gap-3 text-sm">
          {icon}
          {title}
        </div>
      }
      className="w-full px-4 py-2 text-sm hover:bg-neutral-100 text-left"
      isCustomButton
    />
  );
};

const Divider = () => {
  return <div className="my-2 border-t" />;
};

export default function ChatHeader({
  activeConversation,
  selectedAccount,
  status = "offline",
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const [autoReply, setAutoReply] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    "VIP",
    "Priority",
    "Important",
    "Follow-up",
    "Cold",
    "New Lead",
    "Customer",
  ];

  const menuRef = useRef(null);
  const tagMenuRef = useRef(null);
  const isOnline = status === "online";

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        tagMenuRef.current &&
        !tagMenuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
        setShowTagMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="px-6 py-4 border-b bg-white flex items-center justify-between shadow-sm relative">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center font-semibold text-neutral-700">
          {activeConversation.name
            .split(" ")
            .map((s) => s[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div>
          <div className="text-sm font-semibold">{activeConversation.name}</div>
          {/* TAG BADGES */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div
            className={`text-xs mt-1 ${
              isOnline ? "text-green-600" : "text-gray-600"
            } flex items-center gap-2`}
          >
            {isOnline && (
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            )}
            {status}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE CONTROLS */}
      <div className="flex items-center gap-2" ref={menuRef}>
        <Tooltip
          title={`${showSearch ? "Close Search" : "Search In Conversation"}`}
        >
          <span
            onClick={() => setShowSearch((prev) => !prev)}
            className="hover:bg-neutral-100 p-1 rounded-lg transition cursor-pointer"
          >
            <SearchIcon fontSize="small" />
          </span>
        </Tooltip>
        <div className="relative">
          <Tooltip title={`Add Tag To Customer`}>
            <span
              onClick={() => {
                setShowTagMenu(!showTagMenu);
                setShowMenu(false);
              }}
              className="hover:bg-neutral-100 p-1 rounded-lg transition cursor-pointer"
            >
              <LocalOfferIcon fontSize="small" />
            </span>
          </Tooltip>
          {showTagMenu && (
            <div
              ref={tagMenuRef}
              className="absolute top-full mt-2 right-0 w-48 bg-white shadow-lg rounded-lg border py-2 z-50"
            >
              <div className="px-4 pb-2 text-xs font-semibold text-neutral-500">
                Select Tags
              </div>

              {availableTags.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <Tooltip
          title={`${
            autoReply ? "Disable Auto Reply" : "Enable AI For Auto Reply"
          }`}
        >
          <span
            onClick={() => setAutoReply(!autoReply)}
            className="hover:bg-neutral-100 p-1 rounded-lg transition cursor-pointer"
          >
            <AutoAwesome
              fontSize="small"
              className={autoReply ? "text-green-600" : "text-neutral-500"}
            />
          </span>
        </Tooltip>
        <Tooltip title={`More Options`}>
          <span
            onClick={() => {
              setShowMenu((prev) => !prev);
              setShowTagMenu(false);
            }}
            className="hover:bg-neutral-100 p-1 rounded-lg transition cursor-pointer"
          >
            <MoreVert fontSize="small" />
          </span>
        </Tooltip>
        {showMenu && (
          <div className="absolute right-6 top-16 w-56 bg-white shadow-lg rounded-lg border py-2 z-50">
            <MenuItem icon={<Star fontSize="small" />} title="Marked as Star" />
            <MenuItem icon={<Done fontSize="small" />} title="Mark as Done" />
            <MenuItem
              icon={<PushPin fontSize="small" />}
              title="Pin Conversation"
            />
            <MenuItem icon={<Archive fontSize="small" />} title="Archive" />

            <Divider />

            <MenuItem
              icon={<UploadFile fontSize="small" />}
              title="Export Conversation"
            />
            <MenuItem
              icon={<FolderDeleteIcon fontSize="small" />}
              title="Clear Chat"
            />
            <MenuItem
              icon={<PersonAdd fontSize="small" />}
              title="Add to Contact"
            />
          </div>
        )}
      </div>

      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-white p-3 border-b shadow-sm">
          <Search
            search={query}
            setSearch={setQuery}
            placeholder="Search in conversation..."
            width="100%"
          />
        </div>
      )}
    </div>
  );
}
