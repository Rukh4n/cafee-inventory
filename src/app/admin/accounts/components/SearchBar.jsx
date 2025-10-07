import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const buttonClass =
    "bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"

  return (
    <form onSubmit={onSearch} className="mb-4 flex items-center gap-2">
      <div
        className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-[#123458]"
        style={{ borderColor: "#D4C9BE" }}
      >
        <Search className="w-5 h-5 text-[#F1EFEC]" />
        <input
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder-gray-300 text-[#F1EFEC]"
        />
      </div>
      <button type="submit" className={buttonClass}>
        Search
      </button>
    </form>
  )
}

export default SearchBar
