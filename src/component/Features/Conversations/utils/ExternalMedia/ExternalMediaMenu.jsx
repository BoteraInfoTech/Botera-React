import React, { useState, useEffect } from "react";
import MediaPickerModal from "./MediaPickerModal";
import CommonImage from "../../../../commonComponents/CustomeImage";

const items = [
  {
    title: "Giphy",
    icon: "https://img.icons8.com/fluency/48/giphy.png",
    key: "giphy",
    categories: ["trending", "memes", "stickers", "reactions"],
  },
  {
    title: "Unsplash",
    icon: "https://img.icons8.com/material-sharp/96/unsplash--v2.png",
    key: "unsplash",
    categories: ["trending", "people", "street", "film"],
  },
  {
    title: "Pixabay",
    icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/50/external-pixabay-an-international-website-for-sharing-photos-illustrations-and-vector-graphic-logo-color-tal-revivo.png",
    key: "pixabay",
    categories: ["trending", "nature", "festival", "animal", "anime"],
  },
  {
    title: "Botera AI Buddy",
    icon: "https://drive.google.com/thumbnail?id=1PNnNN2pa8bPHM9MKAuxFLevEa2R624H-&sz=w1000",
    key: "BAB",
    categories: [],
  },
];

export default function ExternalMediaMenu({
  position = {},
  externalMediaData,
  getGifImages,
  unsplashImage,
  pixabayImages,
  onSelect,
  closeParent = () => {},
  selectedItems = [],
}) {
  const [gifList, setGifList] = useState({ images: [], haveMore: false });
  const [unsplashList, setUnsplashList] = useState({
    images: [],
    haveMore: false,
  });
  const [pixabyList, setPixabyList] = useState({ images: [], haveMore: false });

  const [selectedKey, setSelectedKey] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  // Sync with preloaded API data
  useEffect(() => {
    if (!externalMediaData) return;

    const { giphyData, unsplashData, pixabayData, isLoading, status } =
      externalMediaData;

    if (status === "success") {
      setGifList(giphyData);
      setUnsplashList(unsplashData);
      setPixabyList(pixabayData);
    }

    setLoading(!!isLoading);
  }, [externalMediaData]);

  // Attach API functions
  const menuItems = items.map((item) => {
    switch (item.key) {
      case "giphy":
        return { ...item, callAPI: getGifImages };
      case "unsplash":
        return { ...item, callAPI: unsplashImage };
      case "pixabay":
        return { ...item, callAPI: pixabayImages };
      case "BAB":
        return { ...item, callAPI: null };
      default:
        return item;
    }
  });

  const selectedItem = menuItems.find((i) => i.key === selectedKey) || null;

  const getActiveList = () => {
    switch (selectedKey) {
      case "giphy":
        return gifList;
      case "unsplash":
        return unsplashList;
      case "pixabay":
        return pixabyList;
      default:
        return { images: [], haveMore: false };
    }
  };

  const { images, haveMore } = getActiveList();

  return (
    <>
      {selectedItem && (
        <MediaPickerModal
          title={selectedItem.title}
          logo={selectedItem.icon}
          categories={selectedItem.categories}
          items={images}
          loading={loading}
          hasMore={haveMore}
          selectedCategory={selectedCategory}
          selectedItems={selectedItems}
          onClose={() => {
            setSelectedKey(null);
            closeParent();
          }}
          onSelect={onSelect}
          onSearch={(value = "") => {
            setSearchValue(value);
            setCurrentPage(1);
            selectedItem.callAPI && selectedItem.callAPI(1, value, "");
          }}
          searchValue={searchValue}
          onCategoryChange={(value = "") => {
            setSelectedCategory(value);
            setCurrentPage(1);
            selectedItem.callAPI && selectedItem.callAPI(1, "", value);
          }}
          onLoadMore={() => {
            setCurrentPage((prev) => {
              const nextPage = prev + 1;
              selectedItem.callAPI &&
                selectedItem.callAPI(nextPage, searchValue, selectedCategory);
              return nextPage;
            });
          }}
        />
      )}

      {/* MENU BOX */}
      <div
        className="absolute bg-white shadow-lg border rounded-xl py-2 w-52 z-50"
        style={position}
      >
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => {
              setSelectedKey(item.key);
              setSearchValue("");
              setSelectedCategory("trending");
              setCurrentPage(1);

              item.callAPI && item.callAPI(1, "", "");
            }}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
          >
            <CommonImage
              src={item.icon}
              alt=""
              className="h-5 w-5 object-contain"
            />
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
}
