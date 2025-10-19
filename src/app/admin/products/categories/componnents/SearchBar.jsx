"use client"
import React, { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar ({ onAdd, setCategories })  {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/products/categories?search=${encodeURIComponent(searchQuery)}`)
      if (!res.ok) throw new Error("Failed to fetch categories")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

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
    </div>
  )
}


