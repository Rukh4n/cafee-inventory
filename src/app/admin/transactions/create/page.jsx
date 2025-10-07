'use client'
import React, { useState } from 'react'
import { DollarSign } from 'lucide-react'

const Page = () => {
  const [formData, setFormData] = useState({
    cashGiven: '',
    totalPrice: 0,
    change: 0,
  })
  const [productSuggestions, setProductSuggestions] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'cashGiven') {
      const cash = Number(value)
      setFormData((prev) => ({
        ...prev,
        cashGiven: value,
        change: cash - prev.totalPrice >= 0 ? cash - prev.totalPrice : 0,
      }))
    } else if (name === 'searchQuery') {
      setSearchQuery(value)
      fetchProducts(value)
    }
  }

  const fetchProducts = async (query) => {
    if (!query) {
      setProductSuggestions([])
      return
    }
    try {
      const res = await fetch(`/api/transactions/get-products?query=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data = await res.json()
        setProductSuggestions(data)
      } else {
        setProductSuggestions([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProductSuggestions([])
    }
  }

  const handleSelectProduct = (product) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      const updated = [...selectedProducts, { ...product, quantity: 1 }]
      setSelectedProducts(updated)
      setSearchQuery('')
      setProductSuggestions([])
      updateTotalPrice(updated)
    }
  }

  const handleQuantityChange = (id, quantity) => {
    const updatedProducts = selectedProducts.map((p) =>
      p.id === id ? { ...p, quantity: Number(quantity) } : p
    )
    setSelectedProducts(updatedProducts)
    updateTotalPrice(updatedProducts)
  }

  const updateTotalPrice = (products) => {
    const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0)
    const cash = Number(formData.cashGiven)
    setFormData((prev) => ({
      ...prev,
      totalPrice: total,
      change: cash - total >= 0 ? cash - total : 0,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/transactions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: selectedProducts, cashGiven: formData.cashGiven, totalPrice: formData.totalPrice, change: formData.change }),
      })
      if (res.ok) {
        alert('Transaction submitted successfully!')
        setSelectedProducts([])
        setFormData({ cashGiven: '', totalPrice: 0, change: 0 })
      } else {
        alert('Failed to submit transaction.')
      }
    } catch (error) {
      console.error('Error submitting transaction:', error)
      alert('Error submitting transaction.')
    }
  }

  return (
    <div className="p-6 bg-[#030303] min-h-screen text-[#F1EFEC]">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
      <div className="flex gap-6 w-full max-w-6xl">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
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

        {selectedProducts.length > 0 && (
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
        )}
      </div>
    </div>
  )
}

export default Page
