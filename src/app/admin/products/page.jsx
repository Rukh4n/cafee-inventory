"use client"
import React, { useState, useEffect } from "react"
import { Search, Plus, X, Trash2 } from "lucide-react"
import Create from "./create"
import Detail from "./detail"

const Page = () => {
  const [showCreate, setShowCreate] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const fetchProducts = async (query = "") => {
    try {
      const res = await fetch(`/api/products${query ? `?q=${query}` : ""}`)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    fetchProducts(searchQuery)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setShowDetail(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      const res = await fetch("/api/products/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      const result = await res.json()
      if (res.ok) {
        alert("Product deleted successfully!")
        fetchProducts()
        setShowDetail(false)
      } else {
        alert(result.message || "Failed to delete product.")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("An error occurred.")
    }
  }

  return (
    <div className="p-4 md:p-6 min-h-screen text-[#F1EFEC] bg-[#030303]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-lg bg-[#1A1A1A] text-[#F1EFEC] border border-[#3a3a3a] focus:outline-none focus:border-[#D4C9BE] w-full"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition mt-2 md:mt-0"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition w-full md:w-auto mt-2 md:mt-0"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#3a3a3a] rounded-lg text-sm md:text-base">
          <thead className="bg-[#1A1A1A] text-left">
            <tr>
              <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Code</th>
              <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Image</th>
              <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Name</th>
              <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Category</th>
              <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Stock</th>
              <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Price</th>
              <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Created At</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#1f1f1f] transition cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <td className="p-2 md:p-3 border-b border-[#3a3a3a]">{product.code}</td>
                  <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                    <img src={product.image} alt={product.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md" />
                  </td>
                  <td className="p-2 md:p-3 border-b border-[#3a3a3a]">{product.name}</td>
                  <td className="p-2 md:p-3 border-b border-[#3a3a3a]">{product.category}</td>
                  <td className="p-2 md:p-3 border-b border-[#3a3a3a]">{product.stock}</td>
                  <td className="p-2 md:p-3 border-b border-[#3a3a3a]">Rp {product.price.toLocaleString("id-ID")}</td>
                  <td className="p-2 md:p-3 border-b border-[#3a3a3a]">{new Date(product.createdAt).toLocaleString("id-ID")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 md:p-6 text-gray-400 border-b border-[#3a3a3a]">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-[#030303] text-[#F1EFEC] p-4 md:p-6 rounded-2xl shadow-lg relative max-h-[90vh] overflow-y-auto w-full md:max-w-full">
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-3 right-3 text-[#F1EFEC] hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Product</h2>
            <Create />
          </div>
        </div>
      )}

      {showDetail && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-[#030303] text-[#F1EFEC] p-4 md:p-6 rounded-2xl shadow-lg relative max-h-[90vh] overflow-y-auto w-full md:max-w-full">
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-3 right-3 text-[#F1EFEC] hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <Detail product={selectedProduct} />
            <button
              onClick={() => handleDelete(selectedProduct.id)}
              className="flex items-center justify-center gap-2 mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition"
            >
              <Trash2 size={16} /> Delete Product
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
