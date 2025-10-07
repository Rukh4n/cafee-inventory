'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, DollarSign, Search } from 'lucide-react'

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

      {/* Form Pencarian */}
      <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 max-w-md">
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

      {transactions.length > 0 ? (
        <table className="w-full border border-[#D4C9BE] text-[#F1EFEC]">
          <thead className="bg-[#123458]">
            <tr>
              <th className="px-3 py-2 border border-[#D4C9BE]">ID</th>
              <th className="px-3 py-2 border border-[#D4C9BE]">Products</th>
              <th className="px-3 py-2 border border-[#D4C9BE]">Total Price</th>
              <th className="px-3 py-2 border border-[#D4C9BE]">Cash Given</th>
              <th className="px-3 py-2 border border-[#D4C9BE]">Change</th>
              <th className="px-3 py-2 border border-[#D4C9BE]">Created At</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-3 py-2 border border-[#D4C9BE]">{tx.id}</td>
                <td className="px-3 py-2 border border-[#D4C9BE]">
                  {tx.products.map((p) => (
                    <div key={p.id}>
                      {p.name} x {p.quantity} - <DollarSign className="inline w-4 h-4 mr-1" /> Rp{p.price * p.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-3 py-2 border border-[#D4C9BE]">
                  <DollarSign className="inline w-4 h-4 mr-1" /> Rp{tx.totalPrice}
                </td>
                <td className="px-3 py-2 border border-[#D4C9BE]">{tx.cashGiven}</td>
                <td className="px-3 py-2 border border-[#D4C9BE]">{tx.change}</td>
                <td className="px-3 py-2 border border-[#D4C9BE]">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  )
}

export default Page
