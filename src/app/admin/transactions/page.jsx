'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import SearchBar from './componnents/SearchBar'
import TransactionTable from './componnents/TransactionTable'

const Page = () => {
  const [transactions, setTransactions] = useState([])
  const [query, setQuery] = useState('')

  const fetchTransactions = async (search = '') => {
    try {
      const res = await fetch(`/api/transactions/?query=${encodeURIComponent(search)}`)
      if (res.ok) {
        const data = await res.json()
        setTransactions(data)
      } else {
        setTransactions([])
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setTransactions([])
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchTransactions(query)
  }

  return (
    <div className="p-4 bg-[#030303] min-h-screen text-[#F1EFEC]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Transactions Page</h1>
        <Link
          href="/admin/transactions/create"
          className="flex items-center gap-2 px-4 py-2 bg-[#030303] border border-[#D4C9BE] rounded hover:bg-[#D4C9BE] hover:text-[#030303] transition"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </Link>
      </div>

      {/* Search Bar */}
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {/* Transaction Table */}
      <TransactionTable transactions={transactions} />
    </div>
  )
}

export default Page
