import React from 'react'
import { DollarSign } from 'lucide-react'

const TransactionTable = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p>No transactions found.</p>
  }

  return (
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
                  {p.name} x {p.quantity} -{' '}
                  <DollarSign className="inline w-4 h-4 mr-1" /> Rp{p.price * p.quantity}
                </div>
              ))}
            </td>
            <td className="px-3 py-2 border border-[#D4C9BE]">
              <DollarSign className="inline w-4 h-4 mr-1" /> Rp{tx.totalPrice}
            </td>
            <td className="px-3 py-2 border border-[#D4C9BE]">{tx.cashGiven}</td>
            <td className="px-3 py-2 border border-[#D4C9BE]">{tx.change}</td>
            <td className="px-3 py-2 border border-[#D4C9BE]">
              {new Date(tx.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionTable
