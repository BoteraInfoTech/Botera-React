import SearchIcon from "@mui/icons-material/Search";

export default function CustomSearch({
  search,
  setSearch,
  placeholder = "Search...",
}) {
  return (
    <>
      <SearchIcon className="text-neutral-400" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm ml-2 w-full"
      />
    </>
  );
}
