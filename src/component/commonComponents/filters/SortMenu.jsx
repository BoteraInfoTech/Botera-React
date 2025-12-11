import FilterList from "@mui/icons-material/FilterList";

const SortMenu = ({
  setShowSortMenu,
  showSortMenu,
  field = "",
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowSortMenu((s) => !s);
        }}
        className={`ml-2 p-1 rounded-full hover:bg-neutral-200 transition ${
          showSortMenu ? "bg-neutral-200" : ""
        }`}
      >
        <FilterList />
      </button>

      {showSortMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-xl py-1 z-50 animate-fadeIn"
        >
          <div className="px-3 py-1 text-[11px] text-neutral-500">
            Sort by {field}
          </div>
          <button
            onClick={() => {
              setSortOrder("asc");
              setShowSortMenu(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 ${
              sortOrder === "asc"
                ? "text-blue-600 font-medium"
                : "text-neutral-700"
            }`}
          >
            {field} ↑ (Oldest first)
          </button>
          <button
            onClick={() => {
              setSortOrder("desc");
              setShowSortMenu(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 ${
              sortOrder === "desc"
                ? "text-blue-600 font-medium"
                : "text-neutral-700"
            }`}
          >
            {field} ↓ (Newest first)
          </button>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
