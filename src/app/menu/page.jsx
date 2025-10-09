'use client'
import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import MenuList from './componnents/MenuList'

const Page = () => {
  const [menuData, setMenuData] = useState([])
  const [query, setQuery] = useState('')

  const fetchMenu = async (search = '') => {
    try {
      const url = search
        ? `/api/guest/menu/list?query=${encodeURIComponent(search)}`
        : '/api/guest/menu/list'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch menu')
      const data = await res.json()
      setMenuData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchMenu(query)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030303] to-[#D4C9BE] text-[#F1EFEC] p-6 relative">
      <div className="flex justify-center md:justify-end mb-6">
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Cari menu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded-l-lg bg-[#030303] border border-[#D4C9BE] text-[#F1EFEC] placeholder-[#D4C9BE] outline-none text-sm"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-[#D4C9BE] text-[#030303] rounded-r-lg flex items-center hover:opacity-90 transition text-sm"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
      <MenuList menu={menuData} />
    </div>
  )
}

export default Page
