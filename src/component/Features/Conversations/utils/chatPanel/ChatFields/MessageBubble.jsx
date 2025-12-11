import React from "react";
import MediaGrid from "../Preview/MediaGrid";

export default function MessageBubble({ message, openViewer }) {
  const isOutgoing = message.type === "out";
  const { images = [], videos = [] } = message;

  const bubbleClass = isOutgoing ? "bg-[#E9F2FF]" : "bg-white";

  const mediaArray = [
    ...images.map((src) => ({ type: "image", src })),
    ...videos.map((src) => ({ type: "video", src })),
  ];

  return (
    <>
      <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
        <div className="max-w-[70%]">
          {/* Bubble wrapper */}
          <div className={`p-1.5 rounded-xl shadow-sm ${bubbleClass}`}>
            {(images.length > 0 || videos.length > 0) && (
              <MediaGrid
                images={images}
                videos={videos}
                isOutgoing={isOutgoing}
                onMediaClick={(idx) => openViewer(mediaArray, idx)}
              />
            )}

            {/* Text inside bubble */}
            {message.text && (
              <div className="text-sm leading-relaxed mt-1">{message.text}</div>
            )}

            {/* Time inside bubble */}
            <div className="text-[10px] text-neutral-500 mt-1 text-right">
              {message.time}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
