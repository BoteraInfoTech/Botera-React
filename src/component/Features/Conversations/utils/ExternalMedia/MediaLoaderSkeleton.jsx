import React from "react";

export default function MediaLoaderSkeleton({ count = 9 }) {
  const heights = [180, 140, 200, 160, 220, 150];

  return (
    <>
      <style>{`
        @keyframes shimmerEffect {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div style={{ columnCount: 3, columnGap: "14px" }} className="pt-4 px-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="mb-4 break-inside-avoid rounded-xl bg-neutral-200 overflow-hidden relative"
            style={{ height: heights[i % heights.length] }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 opacity-60"
              style={{ animation: "shimmerEffect 1.6s infinite linear" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
