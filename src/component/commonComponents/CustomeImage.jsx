import React, { useState } from "react";

export default function CommonImage({
  src,
  alt = "",
  fallback = "/fallback.png",
  className = "",
  specialImage = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (specialImage) {
    return (
      <div className={`relative overflow-hidden inline-block ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        <img
          src={error ? fallback : src}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
          alt="media"
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <img
        src={error ? fallback : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}
