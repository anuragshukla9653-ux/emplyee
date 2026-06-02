const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by name or department"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
        w-full
        border
        border-gray-300
        rounded-lg
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
      />
    </div>
  );
};

export default SearchBar;
