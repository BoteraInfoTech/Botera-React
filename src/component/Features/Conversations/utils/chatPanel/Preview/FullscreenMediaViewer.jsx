import React, { useEffect, useState, useCallback } from "react";
import Button from "../../../../../commonComponents/Button";
import CommonVideo from "../../../../../commonComponents/CommonVideo";
import CommonImage from "../../../../../commonComponents/CustomeImage";

export default function FullscreenMediaViewer({
  isOpen,
  onClose,
  media = [],
  initialIndex = 0,
  customerName = "",
  time = "",
  status = "",
  onBack, // optional: go back to chat thread
}) {
  const [index, setIndex] = useState(initialIndex);

  // Sync index when opening with different initialIndex
  useEffect(() => {
    if (isOpen) setIndex(initialIndex);
  }, [isOpen, initialIndex]);

  const hasMultiple = media.length > 1;
  const current = media[index];

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((prev) => (prev + 1) % media.length);
  }, [hasMultiple, media.length]);

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [hasMultiple, media.length]);

  // Keyboard: Esc, ←, →
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || !current) return null;

  const isImage = current.type === "image";
  const isVideo = current.type === "video";

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md flex flex-col"
      style={{
        paddingTop: "0px",
        marginTop: "0px",
        inset: 0,
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white border-b border-white/10">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              text={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              }
              onClick={onBack}
              className="p-1 rounded-full hover:bg-white/10 transition"
            />
          )}
          <span className="font-medium truncate max-w-[200px]">
            {customerName || "Customer"}
          </span>
        </div>

        <Button
          text={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          }
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 transition"
          isCustomButton
        />
      </div>

      {/* BODY */}
      <div className="flex-1 relative flex items-center justify-center px-4 pb-6 pt-4 select-none">
        {/* Prev area */}
        {hasMultiple && (
          <Button
            text={
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            }
            onClick={goPrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
            isCustomButton
          />
        )}

        {/* Media */}
        <div className="max-h-[80vh] max-w-[90vw] flex items-center justify-center">
          {isImage && (
            <CommonImage
              src={current.src || current.url}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              specialImage
            />
          )}

          {isVideo && (
            <CommonVideo
              src={current.src || current.url}
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              specialVideo
            />
          )}
        </div>

        {/* Next area */}
        {hasMultiple && (
          <Button
            text={
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            }
            onClick={goNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
            isCustomButton
          />
        )}

        {/* Pagination dots */}
        {hasMultiple && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {media.map((_, i) => (
              <Button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition ${
                  i === index ? "w-4 bg-white" : "w-2 bg-white/40"
                }`}
                isCustomButton
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-5 text-[11px] text-neutral-300 border-t border-white/10">
        <div className="relative flex items-center justify-between py-3">
          <span>{time}</span>

          <div className="absolute left-1/2 -translate-x-1/2">
            {index + 1} of {media.length}
          </div>

          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}
