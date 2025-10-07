'use client'
import React, { useState } from 'react'
import TransactionForm from './componnents/TransactionForm'
import SelectedProductTable from './componnents/SelectedproductTable'

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
        body: JSON.stringify({
          products: selectedProducts,
          cashGiven: formData.cashGiven,
          totalPrice: formData.totalPrice,
          change: formData.change,
        }),
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
        <TransactionForm
          formData={formData}
          searchQuery={searchQuery}
          productSuggestions={productSuggestions}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectProduct={handleSelectProduct}
        />

        {selectedProducts.length > 0 && (
          <SelectedProductTable
            selectedProducts={selectedProducts}
            handleQuantityChange={handleQuantityChange}
          />
        )}
      </div>
    </div>
  )
}

export default Page
