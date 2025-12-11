import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./ChatFields/MessageList";
import SuggestionsBar from "./SuggestionsBar";
import MessageComposer from "./MessageComposer";
import MediaPreviewBar from "./Preview/MediaPreviewBar";
import FullscreenMediaViewer from "./Preview/FullscreenMediaViewer";

export default function ChatPanel({
  activeConversation,
  selectedAccount,
  messages,
  typing,
  aiEnabled,
  suggestedReplies,
  text,
  setText,
  handleSend,
  externalMediaData,
  getGifImages,
  unsplashImage,
  pixabayImages,
  uploadedMedia,
  setUploadedMedia,
}) {
  // Fullscreen state
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [mediaArray, setMediaArray] = useState([]);

  const openViewer = (media, index) => {
    setStartIndex(index);
    setOpen(true);
    setMediaArray(media);
  };

  return (
    <main className="flex-1 flex flex-col">
      <ChatHeader
        activeConversation={activeConversation}
        selectedAccount={selectedAccount}
        status={"online"}
      />
      <MessageList
        messages={messages}
        openViewer={openViewer}
        typing={typing}
      />
      <SuggestionsBar
        aiEnabled={aiEnabled}
        suggestedReplies={suggestedReplies}
      />
      <MediaPreviewBar
        files={uploadedMedia.files}
        // urls={[
        //   {
        //     image: "https://static.toiimg.com/photo/47529300.cms",
        //     title:
        //       "US News: US News, Top News in India, US election news, Business news, Sports & International News | Times of India",
        //     description:
        //       "Read Top News in India and around the World on Times of India. Breaking news coverage and analysis on US presidential election, politics, current affairs, business & sports.",
        //   },
        //   {
        //     image: "https://ak-d.tripcdn.com/images/05E1412000cmevvp5D2FE.png ",
        //     title:
        //       "Trip.com: Book cheap flights, hotels, car rentals, trains and more",
        //     description:
        //       "Book from a huge range of flights, hotels, trains, and much more - right at your fingertips. For fantastic travel offers, visit Trip.com!",
        //   },
        // ]}
        onRemove={(index, type) => {
          setUploadedMedia((prev) => {
            const updatedFiles = [...prev.files];
            updatedFiles.splice(index, 1);
            return { ...prev, files: updatedFiles };
          });
        }}
        openViewer={openViewer}
      />
      <FullscreenMediaViewer
        isOpen={open}
        onClose={() => setOpen(false)}
        media={mediaArray}
        initialIndex={startIndex}
        customerName={"Customer"}
        time={""}
        // status={isOutgoing ? "Delivered" : ""}
      />

      <MessageComposer
        text={text}
        setText={setText}
        handleSend={handleSend}
        externalMediaData={externalMediaData}
        getGifImages={getGifImages}
        unsplashImage={unsplashImage}
        pixabayImages={pixabayImages}
        uploadedMedia={uploadedMedia}
        setUploadedMedia={setUploadedMedia}
        // autoReply={true}
      />
    </main>
  );
}
