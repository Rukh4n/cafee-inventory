import React from 'react'
import TransactionForm from './componnents/TransactionForm'

export default function  Page() {
  return (
    <div className="p-6 bg-[#030303] min-h-screen text-[#F1EFEC]">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
      <TransactionForm />
    </div>
  )
}

