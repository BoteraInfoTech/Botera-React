import React, { useState, useRef, useEffect } from "react";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  EmojiEmotions,
  Add as AddIcon,
  Send,
  AttachFileOutlined,
  Public as ExternalMediaIcon,
  Clear as ClearIcon,
  FolderCopyOutlined,
} from "@mui/icons-material";

import ExternalMediaMenu from "../ExternalMedia/ExternalMediaMenu";
import { BACKEND_POINT } from "../../../../../utils/config";
import callAPI from "../../../../../utils/callApi";
import Button from "../../../../commonComponents/Button";
import AutoResizeTextarea from "../../../../commonComponents/AutoResizeTextarea";
import CustomizedTooltips from "../../../../commonComponents/Tooltip";
import AlertMessage from "../../../../commonComponents/AlertMessage";

const MenuItem = ({ icon, title }) => (
  <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer">
    {icon}
    {title}
  </div>
);

export default function MessageComposer({
  text,
  setText,
  handleSend,
  externalMediaData,
  getGifImages,
  unsplashImage,
  pixabayImages,
  autoReply,
  uploadedMedia,
  setUploadedMedia,
}) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showExternalMenu, setShowExternalMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    message: "",
  });

  const showAlert = (type, message) => setAlert({ open: true, type, message });

  const moreRef = useRef(null);
  const externalRef = useRef(null);
  const emojiRef = useRef(null);
  const fileInputRef = useRef(null);

  const haveError = (type) => {
    const hasImage = uploadedMedia.files.some((f) => f.type === "image");
    const hasVideo = uploadedMedia.files.some((f) => f.type === "video");
    const imageCount = uploadedMedia.files.filter(
      (f) => f.type === "image"
    ).length;

    let alertData = null;

    if (type.startsWith("image") && hasVideo) {
      alertData = {
        status: "warning",
        message: "Image uploads aren’t available while a video is selected.",
      };
    }

    if (type.startsWith("video") && hasImage) {
      alertData = {
        status: "warning",
        message: "Video uploads aren’t available while images are selected.",
      };
    }

    if (type.startsWith("image") && imageCount >= 5) {
      alertData = {
        status: "warning",
        message: "You can upload up to 5 images.",
      };
    }

    if (type.startsWith("video") && hasVideo) {
      alertData = {
        status: "warning",
        message: "Only one video can be uploaded.",
      };
    }
    return alertData;
  };

  useEffect(() => {
    const closeMenus = (e) => {
      if (
        (!moreRef.current || !moreRef.current.contains(e.target)) &&
        (!externalRef.current || !externalRef.current.contains(e.target)) &&
        (!emojiRef.current || !emojiRef.current.contains(e.target))
      ) {
        setShowMoreMenu(false);
        setShowExternalMenu(false);
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  // -----------------------------
  // FILE UPLOAD HANDLER
  // -----------------------------
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = "";

    const mime = file.type;
    const alertData = haveError(mime);
    if (alertData) {
      showAlert(alertData.status, alertData.message);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const tempId = Date.now();

    // Add placeholder item
    setUploadedMedia((prev) => ({
      ...prev,
      files: [
        ...prev.files,
        {
          id: tempId,
          type: mime.startsWith("image") ? "image" : "video",
          url: null,
          name: file.name,
          progress: 0,
        },
      ],
    }));

    const res = await callAPI(
      `${BACKEND_POINT}/misc/uploadMedia`,
      "POST",
      formData,
      "json",
      {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadedMedia((prev) => ({
            ...prev,
            files: prev.files.map((f) =>
              f.id === tempId ? { ...f, progress: percent } : f
            ),
          }));
        },
      }
    );
    setUploadedMedia((prev) => ({
      ...prev,
      files: prev.files.map((f) =>
        f.id === tempId ? { ...f, url: res.url, progress: 100 } : f
      ),
    }));
  };

  const onSelect = (item, opration) => {
    if (opration === "remove") {
      const filteredImages = uploadedMedia.files.filter(
        (image) => image.id !== item.id
      );
      setUploadedMedia((prev) => ({
        ...prev,
        files: filteredImages,
      }));
    } else {
      const alertData = haveError("image");
      if (alertData) {
        showAlert(alertData.status, alertData.message);
        return;
      }
      setUploadedMedia((prev) => ({
        ...prev,
        files: [
          ...prev.files,
          {
            id: item.id,
            type: "image",
            url: item.original,
            name: `image-${item.id}`,
            progress: 100,
          },
        ],
      }));
    }
  };

  // -----------------------------
  // AUTO REPLY VIEW
  // -----------------------------
  if (autoReply) {
    return (
      <div className="px-6 py-3 border-t bg-white">
        <div className="flex items-center gap-3 p-3 rounded-xl">
          <span className="text-yellow-600 text-lg">✨</span>
          <div className="text-sm text-neutral-700">
            Auto-reply with AI is active.{" "}
            <span className="font-medium">
              Messages will be sent automatically.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 border-t bg-white shadow-inner">
      {/* ALERT */}
      {alert.open && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          duration={4000}
          onCloseComplete={() => {
            setAlert({
              open: false,
              type: "info",
              message: "",
            });
          }}
        />
      )}

      <div className="flex items-center gap-3">
        {/* EMOJI */}
        <div className="relative" ref={emojiRef}>
          <CustomizedTooltips title="Add Emoji" placement="top">
            <Button
              text={<EmojiEmotions fontSize="small" />}
              className="p-2 rounded-full transition"
              onClick={() => {
                setShowExternalMenu(false);
                setShowMoreMenu(false);
                setShowEmojiPicker((prev) => !prev);
              }}
              isCustomButton
            />
          </CustomizedTooltips>

          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 left-0 z-50">
              <Picker
                data={data}
                theme="light"
                previewPosition="none"
                skinTonePosition="none"
                onEmojiSelect={(emoji) =>
                  setText((prev) => prev + emoji.native)
                }
              />
            </div>
          )}
        </div>

        {/* TEXTAREA */}
        <div className="flex-1 relative">
          <AutoResizeTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            rows={1}
            className="w-full bg-neutral-100 px-4 py-3 rounded-xl outline-none text-sm resize-none overflow-y-auto"
            style={{ maxHeight: "120px" }}
            maxHeight={80}
          />
        </div>

        {/* HIDDEN FILE INPUT */}
        <input
          type="file"
          ref={fileInputRef}
          className="sr-only"
          onChange={handleFileSelect}
        />

        {/* MORE OPTIONS */}
        <div className="relative" ref={moreRef}>
          <CustomizedTooltips
            title={showMoreMenu ? "Close Options" : "More Options"}
          >
            <Button
              text={
                showMoreMenu ? (
                  <ClearIcon fontSize="small" />
                ) : (
                  <AddIcon fontSize="small" />
                )
              }
              onClick={() => {
                setShowExternalMenu(false);
                setShowMoreMenu((prev) => !prev);
              }}
              className="p-2 rounded-full transition"
              specialButton
            />
          </CustomizedTooltips>

          {showMoreMenu && (
            <div className="absolute bottom-full mb-2 right-0 w-56 bg-white shadow-lg border rounded-xl py-2 z-50">
              <div
                onClick={() => {
                  setShowMoreMenu(false);
                  fileInputRef.current.click();
                }}
              >
                <MenuItem icon={<AttachFileOutlined />} title="Upload Media" />
              </div>

              <MenuItem
                icon={<FolderCopyOutlined />}
                title="Template Message"
              />

              <div
                className="flex items-center justify-between px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                onClick={() => setShowExternalMenu(true)}
              >
                <div className="flex items-center gap-2 text-sm">
                  <ExternalMediaIcon fontSize="small" />
                  External Media
                </div>
                <span className="text-neutral-500">›</span>
              </div>
            </div>
          )}
        </div>

        {/* EXTERNAL MEDIA MENU */}
        <div className="relative" ref={externalRef}>
          {showExternalMenu && (
            <ExternalMediaMenu
              position={{
                bottom: "100%",
                marginBottom: "0.5rem",
                right: "230px",
              }}
              externalMediaData={externalMediaData}
              getGifImages={getGifImages}
              unsplashImage={unsplashImage}
              pixabayImages={pixabayImages}
              onSelect={onSelect}
              selectedItems={uploadedMedia.files}
              closeParent={() => {
                setShowMoreMenu(false);
                setShowExternalMenu(false);
              }}
            />
          )}
        </div>

        {/* SEND BUTTON */}
        <Button
          text={<Send />}
          onClick={handleSend}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          specialButton
        />
      </div>
    </div>
  );
}
