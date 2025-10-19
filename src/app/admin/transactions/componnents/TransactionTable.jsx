'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import Detail from './Detail'

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchTransactions()
    const interval = setInterval(fetchTransactions, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions/')
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

  const onSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/transactions?query=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data = await res.json()
        setTransactions(data)
      } else {
        setTransactions([])
      }
    } catch (error) {
      console.error('Error searching transactions:', error)
      setTransactions([])
    }
  }

  const handleStatusChange = async (index, newStatus, transactionId) => {
    try {
      const res = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        const updated = [...transactions]
        updated[index].status = newStatus
        setTransactions(updated)
      } else {
        console.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getRowStyle = (status) => {
    if (status === 'rejected') {
      return { backgroundColor: '#6B1E1E', color: '#F1EFEC' } // sedikit kemerahan
    } else if (status === 'pending') {
      return { backgroundColor: '#030303', color: '#F1EFEC' } // coklat tua
    } else if (status === 'settlement') {
      return { backgroundColor: '#D4C9BE', color: '#030303' } // jingga
    } else {
      return { backgroundColor: '#030303', color: '#F1EFEC' } // default
    }
  }

  return (
    <div style={{ backgroundColor: '#030303', color: '#F1EFEC', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ margin: 0 }}>Transactions</h1>
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
        </div>
        <Link
          href="/admin/transactions/create"
          style={{
            padding: '8px 16px',
            backgroundColor: '#030303',
            border: '1px solid #D4C9BE',
            borderRadius: '6px',
            color: '#F1EFEC',
            textDecoration: 'none',
          }}
        >
          + Tambah
        </Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            minWidth: '800px',
            border: '1px solid #D4C9BE',
            borderCollapse: 'collapse',
          }}
        >
          <thead style={{ backgroundColor: '#1E1E1E' }}>
            <tr>
              {['ID', 'Transaction Type', 'Status', 'Customer Name', 'Items', 'Total Price', 'Payment Method', 'Created At'].map(
                (header) => (
                  <th
                    key={header}
                    style={{
                      border: '1px solid #D4C9BE',
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '12px' }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr key={tx.transactionId} style={getRowStyle(tx.status)}>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>{tx.transactionType}</td>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>
                    <select
                      value={tx.status || 'pending'}
                      onChange={(e) => handleStatusChange(index, e.target.value, tx.transactionId)}
                      style={{
                        backgroundColor: '#030303',
                        color: '#F1EFEC',
                        border: '1px solid #D4C9BE',
                        borderRadius: '4px',
                        padding: '4px 8px',
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="settlement">Settlement</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>{tx.name}</td>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>
                    {tx.items.map((item) => (
                      <div key={item.id}>
                        {item.name} x {item.quantity} - Rp{item.price * item.quantity}
                      </div>
                    ))}
                  </td>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>Rp{tx.totalPrice}</td>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>{tx.paymentMethod}</td>
                  <td style={{ border: '1px solid #D4C9BE', padding: '8px' }}>
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionPage
