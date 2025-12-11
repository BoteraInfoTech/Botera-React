import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import CommonImage from "../../../../../commonComponents/CustomeImage";
import CommonVideo from "../../../../../commonComponents/CommonVideo";
import Button from "../../../../../commonComponents/Button";
export default function MediaPreviewBar({
  files = [],
  urls = [],
  onRemove,
  openViewer,
}) {
  if (files.length === 0 && urls.length === 0) return null;

  return (
    <div className="mb-3 p-3 bg-white border rounded-xl shadow-sm flex gap-3 overflow-x-auto">
      {files.map((file, index) => (
        <div key={file.id} className="relative">
          {!file.url && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg animate-none">
              <CircularProgress
                variant="determinate"
                value={file.progress}
                size={40}
              />
              <span className="absolute text-xs font-medium">
                {file.progress}%
              </span>
            </div>
          )}
          {file.type === "image" ? (
            file.url ? (
              <CommonImage
                src={file.url}
                alt="preview"
                className="h-20 w-20 object-cover rounded-lg border cursor-pointer"
                onClick={() => openViewer(files, index)}
              />
            ) : (
              <div className="h-20 w-20 bg-neutral-100 rounded-lg border" />
            )
          ) : file.type === "video" ? (
            file.url ? (
              <div onClick={() => openViewer(files, index)}>
                <CommonVideo
                  src={file.url}
                  className="h-20 w-20 rounded-lg border cursor-pointer"
                  controls={false}
                  // onClick={() => openViewer(files, index)}
                />
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <div className="bg-black/30 p-0.5 rounded-full">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="black"
                        viewBox="0 0 24 24"
                        className="w-3 h-3"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-20 w-20 bg-neutral-100 rounded-lg border" />
            )
          ) : (
            <div className="h-20 w-20 bg-neutral-100 rounded-lg border flex items-center justify-center text-xs">
              {file.name}
            </div>
          )}

          <Button
            text={<CloseIcon fontSize="small" />}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-neutral-100"
            onClick={() => onRemove(index, "file")}
            specialButton
          />
        </div>
      ))}

      {urls.map((preview, index) => (
        <div
          key={index}
          className="relative flex gap-3 w-[360px] bg-white border rounded-xl p-4 shadow-sm"
        >
          {preview.image && (
            <CommonImage
              src={preview.image}
              className="h-20 w-20 object-cover rounded-lg flex-shrink-0 cursor-pointer"
              alt=""
              onClick={() => openViewer(files, index)}
            />
          )}
          <div className="flex-1 overflow-hidden">
            <div className="font-semibold text-sm text-black leading-tight line-clamp-2">
              {preview.title}
            </div>
            <div className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-snug">
              {preview.description}
            </div>
          </div>
          <Button
            className="absolute -top-3 -right-3 bg-white shadow-lg rounded-full p-1 hover:bg-neutral-100"
            onClick={() => onRemove(index, "url")}
            text={<CloseIcon fontSize="small" />}
            specialButton
          />
        </div>
      ))}
    </div>
  );
}
