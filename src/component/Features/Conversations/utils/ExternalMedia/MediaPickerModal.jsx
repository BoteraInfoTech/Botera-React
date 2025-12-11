import React, { useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MediaLoaderSkeleton from "./MediaLoaderSkeleton";
import CommonImage from "../../../../commonComponents/CustomeImage";
import Button from "../../../../commonComponents/Button";
import SearchField from "../../../../commonComponents/Search";

export default function MediaPickerModal({
  title = "Media",
  logo = "",
  categories = [],
  items = [],
  loading,
  hasMore,
  onClose,
  onSelect,
  onSearch,
  searchValue,
  onCategoryChange,
  onLoadMore,
  selectedCategory,
  selectedItems = [],
}) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (!bottomRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="w-[680px] h-[85vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2 text-lg font-semibold">
            {logo && (
              <CommonImage
                src={logo}
                alt={title}
                className="h-5 w-5 object-contain"
              />
            )}
            <span>{title}</span>
          </div>

          <Button
            text={<CloseIcon />}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition"
            isCustomButton
          />
        </div>

        {onSearch && (
          <div className="px-6 py-3">
            <SearchField
              placeholder={`Search ${title}...`}
              search={searchValue}
              setSearch={(value) => onSearch(value)}
              className="w-full px-4 py-2 border rounded-lg bg-neutral-50 text-sm  focus:bg-white focus:border-neutral-300 outline-none transition"
              width="100%"
            />
          </div>
        )}

        {!!categories.length && (
          <div className="px-6 pb-2 border-b flex justify-center gap-3">
            {categories.map((cat) => (
              <Button
                text={cat.toUpperCase()}
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`
                  px-5 py-1.5 rounded-full text-sm border transition shadow-sm
                  hover:bg-neutral-100 hover:text-neutral-600
                  ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-neutral-600 border-neutral-300"
                  }
                `}
                specialButton
              />
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="pt-4" style={{ columnCount: 3, columnGap: "14px" }}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  const isSelected = selectedItems?.some(
                    (i) => i.id === item.id
                  );
                  onSelect(item, isSelected ? "remove" : "add");
                }}
                className={`mb-4 break-inside-avoid group cursor-pointer relative rounded-xl overflow-hidden bg-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all`}
              >
                <CommonImage
                  src={item.preview}
                  className="w-full h-auto block"
                  alt=""
                />

                <div
                  className={`absolute inset-0 backdrop-blur-[1px] transition flex items-center justify-center ${
                    selectedItems?.some((i) => i.id === item.id)
                      ? "bg-emerald-500/25 opacity-100"
                      : "bg-black/20 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-10 h-10 ${
                      selectedItems?.some((i) => i.id === item.id)
                        ? "bg-white/95 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition text-red-600"
                        : "bg-white/95 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition"
                    }`}
                  >
                    {selectedItems?.some((i) => i.id === item.id) ? (
                      // X ICON — REMOVE
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      // + ICON — ADD
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="mt-6">
              <MediaLoaderSkeleton />
            </div>
          )}

          <div ref={bottomRef} className="h-10" />
        </div>

        <div className="py-3 text-center text-xs text-neutral-400 border-t">
          Powered by {title}
        </div>
      </div>
    </div>
  );
}
