import React from "react";
import { PushPin } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArchiveIcon from "@mui/icons-material/Archive";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Button from "../../../../commonComponents/Button";

export default function ConversationItem({
  conversation,
  isActive,
  onTogglePin,
  openConversation,
}) {
  return (
    <div
      onClick={() => openConversation(conversation.id)}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b hover:bg-neutral-50 transition ${
        isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""
      }`}
    >
      <div
        className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold text-neutral-800 bg-gradient-to-br ${conversation.avatarColor}`}
      >
        {conversation.name
          .split(" ")
          .map((s) => s[0])
          .slice(0, 2)
          .join("")}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium truncate">
            {conversation.name}
          </div>
          <div className="text-xs text-neutral-400">{conversation.time}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-500 truncate">
            {conversation.last}
          </div>

          <div className="flex items-center gap-2">
            {conversation.unread > 0 && (
              <span className="bg-blue-600 text-white text-[11px] px-2 py-0.5 rounded-full">
                {conversation.unread}
              </span>
            )}

            <Button
              text={
                <PushPin
                  style={{ fontSize: 16 }}
                  color={conversation.pinned ? "primary" : "inherit"}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className="rounded hover:bg-neutral-100"
              isCustomButton
            />
            <Button
              text={
                <StarIcon
                  style={{ fontSize: 16 }}
                  color={conversation.pinned ? "primary" : "inherit"}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className="rounded hover:bg-neutral-100"
              isCustomButton
            />
            <Button
              text={
                <TaskAltIcon
                  style={{ fontSize: 16 }}
                  color={conversation.pinned ? "primary" : "inherit"}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className="rounded hover:bg-neutral-100"
              isCustomButton
            />
            <Button
              text={
                <ArchiveIcon
                  style={{ fontSize: 16 }}
                  color={conversation.pinned ? "primary" : "inherit"}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className="rounded hover:bg-neutral-100"
              isCustomButton
            />
            <Button
              text={
                <AutoFixHighIcon
                  style={{ fontSize: 16 }}
                  color={conversation.pinned ? "primary" : "inherit"}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className="rounded hover:bg-neutral-100"
              isCustomButton
            />
          </div>
        </div>
      </div>
    </div>
  );
}
