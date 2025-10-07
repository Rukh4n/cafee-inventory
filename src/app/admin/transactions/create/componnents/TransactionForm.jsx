import React from 'react'
import { DollarSign } from 'lucide-react'

const TransactionForm = ({
  formData,
  searchQuery,
  productSuggestions,
  handleChange,
  handleSubmit,
  handleSelectProduct,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
      {/* Search Product */}
      <div className="flex flex-col relative mb-4">
        <label className="mb-1">Search Product</label>
        <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
          className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#123458] text-[#F1EFEC]"
          autoComplete="off"
        />
        {productSuggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-[#123458] border border-[#D4C9BE] rounded mt-1 max-h-40 overflow-y-auto z-10">
            {productSuggestions.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="px-3 py-2 hover:bg-[#D4C9BE] hover:text-[#030303] cursor-pointer"
              >
                {product.name} - Rp{product.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Transaction Inputs */}
      <div className="flex flex-col gap-4 max-w-md">
        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Cash Given
          </label>
          <input
            type="number"
            name="cashGiven"
            value={formData.cashGiven}
            onChange={handleChange}
            className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#123458] text-[#F1EFEC]"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Total Price
          </label>
          <input
            type="number"
            value={formData.totalPrice}
            readOnly
            className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#123458] text-[#F1EFEC]"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Change
          </label>
          <input
            type="number"
            value={formData.change}
            readOnly
            className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#123458] text-[#F1EFEC]"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded hover:bg-[#F1EFEC] hover:text-[#030303] transition"
        >
          Submit Transaction
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
