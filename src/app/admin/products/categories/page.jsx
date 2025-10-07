// src/app/products/categories/page.jsx
"use client"
import React, { useState, useEffect } from "react"
import Create from "./create"
import Detail from "./detail"
import SearchBar from "./componnents/SearchBar"
import CreateCategoryModal from "./componnents/CreateCategoryModal"
import DetailCategoryModal from "./componnents/DetailCategoryModal"
import CategoryTable from "./componnents/CategoryTable"

const Page = () => {
  const [showModal, setShowModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchCategories = async (query = "") => {
    try {
      const res = await fetch(`/api/products/categories?search=${query}`)
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchCategories(searchQuery)
  }

  const handleRowClick = (category) => {
    setSelectedCategory(category)
    setShowDetailModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    try {
      setLoading(true)
      const res = await fetch("/api/products/categories/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        await fetchCategories()
        alert("Category deleted successfully.")
      } else {
        alert("Failed to delete category.")
      }
    } catch (error) {
      console.error("Error deleting category:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] text-[#F1EFEC] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-[#D4C9BE] pb-4 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#F1EFEC] text-center sm:text-left">
          Product Categories
        </h1>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          onAdd={() => setShowModal(true)}
        />
      </div>

      <CategoryTable
        categories={categories}
        loading={loading}
        onDelete={handleDelete}
        onRowClick={handleRowClick}
      />

      {showModal && (
        <CreateCategoryModal onClose={() => setShowModal(false)}>
          <Create />
        </CreateCategoryModal>
      )}

      {showDetailModal && selectedCategory && (
        <DetailCategoryModal
          onClose={() => setShowDetailModal(false)}
          category={selectedCategory}
        >
          <Detail category={selectedCategory} />
        </DetailCategoryModal>
      )}
    </div>
  )
}

export default Page
