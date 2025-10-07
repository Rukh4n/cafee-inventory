import React from 'react'
import { DollarSign } from 'lucide-react'

const SelectedProductTable = ({ selectedProducts, handleQuantityChange }) => {
  return (
    <div className="flex-1">
      <table className="w-full text-[#F1EFEC] border border-[#D4C9BE]">
        <thead>
          <tr className="bg-[#123458]">
            <th className="px-3 py-2 border border-[#D4C9BE]">Product</th>
            <th className="px-3 py-2 border border-[#D4C9BE]">Price</th>
            <th className="px-3 py-2 border border-[#D4C9BE]">Quantity</th>
            <th className="px-3 py-2 border border-[#D4C9BE]">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-3 py-2 border border-[#D4C9BE]">{product.name}</td>
              <td className="px-3 py-2 border border-[#D4C9BE]">
                <DollarSign className="inline w-4 h-4 mr-1" /> Rp{product.price}
              </td>
              <td className="px-3 py-2 border border-[#D4C9BE]">
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  className="w-20 px-2 py-1 rounded border border-[#D4C9BE] bg-[#123458] text-[#F1EFEC]"
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                />
              </td>
              <td className="px-3 py-2 border border-[#D4C9BE]">
                <DollarSign className="inline w-4 h-4 mr-1" /> Rp{product.price * product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SelectedProductTable
