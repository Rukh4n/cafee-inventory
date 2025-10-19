"use client"
import React, { useState, useEffect } from "react"
import Create from "./create"
import Detail from "./detail"
import SearchBar from "./componnents/SearchBar"
import CreateProductModal from "./componnents/CreateProductModal"
import DetailProductModal from "./componnents/DetailProductModal"
import ProductTable from "./componnents/ProductTable"

const Page = () => {
  const [showCreate, setShowCreate] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch product data
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
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Products</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          onAddClick={() => setShowCreate(true)}
        />
      </div>

      {/* Product Table */}
      <ProductTable products={products} onProductClick={handleProductClick} />

      {/* Create Modal */}
      {showCreate && (
        <CreateProductModal onClose={() => setShowCreate(false)}>
          <Create />
        </CreateProductModal>
      )}

      {/* Detail Modal */}
      {showDetail && selectedProduct && (
        <DetailProductModal
          product={selectedProduct}
          onClose={() => setShowDetail(false)}
          onDelete={handleDelete}
        >
          <Detail product={selectedProduct} />
        </DetailProductModal>
      )}
    </div>
  )
}

export default Page
