import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="mb-4 flex items-center gap-2 max-w-md">
      <input
        type="text"
        placeholder="Search transactions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-3 py-2 rounded border border-[#D4C9BE] bg-[#123458] text-[#F1EFEC]"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-[#D4C9BE] text-[#030303] rounded hover:bg-[#F1EFEC] hover:text-[#030303] transition flex items-center gap-1"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </form>
  )
}

export default SearchBar
