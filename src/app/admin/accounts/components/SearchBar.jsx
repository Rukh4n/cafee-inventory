'use client'
import React, { useState } from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ onSearchResult }) => {
  const [query, setQuery] = useState('')

  const onSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/transactions?query=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data = await res.json()
        onSearchResult(data)
      } else {
        onSearchResult([])
      }
    } catch (error) {
      console.error('Error searching transactions:', error)
      onSearchResult([])
    }
  }

  return (
    <form onSubmit={onSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '300px' }}>
      <input
        type="text"
        placeholder="Search transactions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #D4C9BE',
          backgroundColor: '#030303',
          color: '#F1EFEC',
        }}
      />
      <button
        type="submit"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          backgroundColor: '#D4C9BE',
          color: '#030303',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        <Search style={{ width: '16px', height: '16px' }} />
        Search
      </button>
    </form>
  )
}

export default SearchBar
