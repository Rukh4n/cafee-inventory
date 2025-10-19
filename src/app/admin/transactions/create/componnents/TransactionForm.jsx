'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import UserInfoForm from './UserInfoForm'
import SelectedProductTable from './SelectedProductTable '
import ProductSearch from './ProductSearch'
import TransactionSummary from './TransactionSummary'

const TransactionForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    tableNumber: '',
    address: '',
    phoneNumber: '',
    paymentMethod: 'Manual via Kasir',
    transactionType: 'wrap',
    products: [],
    cashGiven: '',
    totalPrice: 0,
    change: 0,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [productSuggestions, setProductSuggestions] = useState([])

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
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const fetchProducts = async (query) => {
    if (!query) return setProductSuggestions([])
    try {
      const res = await fetch(`/api/transactions/get-products?query=${encodeURIComponent(query)}`)
      if (res.ok) setProductSuggestions(await res.json())
      else setProductSuggestions([])
    } catch {
      setProductSuggestions([])
    }
  }

  const handleSelectProduct = (product) => {
    if (!formData.products.some((p) => p.id === product.id)) {
      const updatedProducts = [...formData.products, { ...product, quantity: 1 }]
      setFormData((prev) => ({ ...prev, products: updatedProducts }))
      setSearchQuery('')
      setProductSuggestions([])
      updateTotalPrice(updatedProducts)
    }
  }

  const handleQuantityChange = (id, quantity) => {
    const updatedProducts = formData.products.map((p) =>
      p.id === id ? { ...p, quantity: Number(quantity) } : p
    )
    setFormData((prev) => ({ ...prev, products: updatedProducts }))
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
      const payload = {
        name: formData.name,
        userId: formData.userId,
        tableNumber: formData.tableNumber,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        paymentMethod: formData.paymentMethod,
        transactionType: formData.transactionType,
        products: formData.products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category,
          image: p.image,
          quantity: p.quantity,
        })),
        totalPrice: formData.totalPrice,
      }

      const res = await fetch('/api/transactions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert('Transaction submitted successfully!')
        router.push('/admin/transactions')
      } else {
        alert('Failed to submit transaction.')
      }
    } catch {
      alert('Error submitting transaction.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-6">
        <UserInfoForm formData={formData} handleChange={handleChange} />
        <div className="flex flex-col gap-4">
          <ProductSearch
            searchQuery={searchQuery}
            handleChange={handleChange}
            productSuggestions={productSuggestions}
            handleSelectProduct={handleSelectProduct}
          />

          {formData.products.length > 0 && (
            <SelectedProductTable
              products={formData.products}
              handleQuantityChange={handleQuantityChange}
            />
          )}

          <TransactionSummary
            cashGiven={formData.cashGiven}
            totalPrice={formData.totalPrice}
            change={formData.change}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded hover:bg-[#F1EFEC] hover:text-[#030303] transition"
          >
            Submit Transaction
          </button>
        </div>
      </div>
    </form>
  )
}

export default TransactionForm
