import React from "react";
import DateSeparator from "./DateSeparator";
import TypingIndicator from "./TypingIndicator";
import MessageBubble from "./MessageBubble";

export default function MessagesList({ messages, typing, openViewer }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'><rect fill=\'%23ffffff\' width=\'40\' height=\'40\' rx=\'0\' ry=\'0\'/></svg>')]">
      <div className="max-w-3xl mx-auto space-y-6">
        <DateSeparator text="Today" />

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} openViewer={openViewer} />
        ))}

        {typing && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
}
