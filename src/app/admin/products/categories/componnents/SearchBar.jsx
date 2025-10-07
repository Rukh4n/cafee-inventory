import React from "react"
import { Search } from "lucide-react"

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, onAdd }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-[#1C1C1C] border border-[#D4C9BE] rounded-lg overflow-hidden w-full sm:w-auto"
      >
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent px-3 py-2 outline-none text-[#F1EFEC] w-full sm:w-64"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-[#D4C9BE] text-[#030303] hover:bg-[#F1EFEC] transition"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      <button
        onClick={onAdd}
        className="bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg hover:bg-[#F1EFEC] transition w-full sm:w-auto"
      >
        Add Category
      </button>
    </div>
  )
}

export default SearchBar
