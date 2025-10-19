"use client"
import React from "react"
import { Search, Plus } from "lucide-react"

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, onAddClick }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-lg bg-[#1A1A1A] text-[#F1EFEC] border border-[#3a3a3a] focus:outline-none focus:border-[#D4C9BE] w-full"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition mt-2 md:mt-0"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition w-full md:w-auto mt-2 md:mt-0"
      >
        <Plus className="w-4 h-4" /> Add Product
      </button>
    </div>
  )
}

export default SearchBar
