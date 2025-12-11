const badgeFilter = ({ filterList = [], filter, setFilter }) => {
  return (
    <div className="mt-3 flex items-center gap-2">
      {filterList.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded-full text-sm transition ${
            filter === f
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default badgeFilter;
