import React, { useState } from "react";

export default function CommonVideo({
  src,
  fallback = "/fallback-video.png",
  poster,
  className = "",
  aspectRatio = "1/1",
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  specialVideo = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  if (specialVideo) {
    return (
      <div className={`${className}`}>
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        {!error ? (
          <video
            src={src}
            poster={poster}
            controls={controls}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            onLoadedData={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(true);
            }}
            className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
            {...props}
          />
        ) : (
          <img
            src={fallback}
            className="w-full h-full object-cover"
            alt="fallback"
          />
        )}
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden rounded-lg border bg-gray-100 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton Loader */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      {!error ? (
        <video
          src={src}
          poster={poster}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          onLoadedData={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          {...props}
        />
      ) : (
        <img
          src={fallback}
          alt="video fallback"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
