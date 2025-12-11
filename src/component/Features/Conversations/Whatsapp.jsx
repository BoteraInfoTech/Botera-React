import React, { useState, useMemo, useRef, useEffect } from "react";

// Sub-components
import InboxSidebar from "./utils/sidebar/InboxSidebar";
import ChatPanel from "./utils/chatPanel/ChatPanel";

// Data
import {
  sampleConversations,
  sampleMessages,
  ACCOUNTS,
  // suggestedReplies,
} from "./utils/sampleData";

import config from "./config";

import { parseTimeToMinutes } from "./utils/parseTime";

export default function PremiumInbox({
  externalMediaData,
  getGifImages,
  unsplashImage,
  pixabayImages,
}) {
  const [showAccount, setShowAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [conversations, setConversations] = useState(sampleConversations);
  const [dateSort, setDateSort] = useState("desc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(
    conversations[0].id
  );

  const filterList = config.availableFilter || [];
  const filteredConversations = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.last.toLowerCase().includes(q)
    );
    if (filter === "Unread") list = list.filter((c) => c.unread > 0);
    if (filter === "Pinned") list = list.filter((c) => c.pinned);
    list.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
    list.sort((a, b) =>
      dateSort === "asc"
        ? parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
        : parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time)
    );
    return list;
  }, [conversations, filter, search, dateSort]);

  const openConversation = (id) => {
    setActiveConversationId(id);
    setMessagesMap((m) => (m[id] ? m : { ...m, [id]: sampleMessages }));
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };
  const togglePin = (id) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
  };

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ||
    conversations[0];
  // Conversation state
  const [messagesMap, setMessagesMap] = useState({
    [sampleConversations[0].id]: sampleMessages,
  });

  const [text, setText] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState({ files: [], urls: [] });
  const [showAttachPreview, setShowAttachPreview] = useState(null);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [typing, setTyping] = useState(false);

  const chatScrollRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messages = messagesMap[activeConversationId] || [];

  // Auto scroll + scroll button logic
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;

    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      setShowScrollBtn(!nearBottom);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [messages]);

  // Send message
  function handleSend() {
    const hasImages = uploadedMedia.files.some((f) => f.type === "image");
    const hasVideo = uploadedMedia.files.some((f) => f.type === "video");

    // if (!text.trim() && !showAttachPreview) return;

    const msg = {
      id: Date.now(),
      type: "out",
      text: showAttachPreview
        ? `${text.trim()} [file: ${showAttachPreview.name}]`
        : text.trim(),
      images: hasImages
        ? uploadedMedia.files
            .filter((f) => f.type === "image")
            .map((f) => f.url)
        : [],
      videos: hasVideo
        ? uploadedMedia.files
            .filter((f) => f.type === "video")
            .map((f) => f.url)
        : [],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessagesMap((m) => ({
      ...m,
      [activeConversationId]: [...(m[activeConversationId] || []), msg],
    }));

    setText("");
    setUploadedMedia({ files: [], urls: [] });
    setShowAttachPreview(null);

    // Update conversation preview
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, unread: 0, last: msg.text, time: msg.time }
          : c
      )
    );

    // Simulated typing / reply
    setTimeout(() => setTyping(true), 600);
    setTimeout(() => {
      setTyping(false);
      const reply = {
        id: Date.now() + 1,
        type: "in",
        text: "Thanks — I'll check and get back to you.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessagesMap((m) => ({
        ...m,
        [activeConversationId]: [...(m[activeConversationId] || []), reply],
      }));
    }, 2000);
  }

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-800">
      <InboxSidebar
        accounts={ACCOUNTS}
        showAccount={showAccount}
        setShowAccount={setShowAccount}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        conversations={filteredConversations}
        search={search}
        setSearch={setSearch}
        showSortMenu={showSortMenu}
        setShowSortMenu={setShowSortMenu}
        filter={filter}
        setFilter={setFilter}
        filterList={filterList}
        filtered={filteredConversations}
        dateSort={dateSort}
        setDateSort={setDateSort}
        activeConversationId={activeConversationId}
        openConversation={openConversation}
        togglePin={togglePin}
      />

      <ChatPanel
        activeConversation={activeConversation}
        messages={messages}
        typing={typing}
        aiEnabled={aiEnabled}
        setAiEnabled={setAiEnabled}
        text={text}
        setText={setText}
        handleSend={handleSend}
        externalMediaData={externalMediaData}
        getGifImages={getGifImages}
        unsplashImage={unsplashImage}
        pixabayImages={pixabayImages}
        uploadedMedia={uploadedMedia}
        setUploadedMedia={setUploadedMedia}
      />
    </div>
  );
}
