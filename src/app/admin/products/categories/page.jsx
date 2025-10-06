"use client"
import React, { useState, useEffect } from "react"
import { Search, Trash2 } from "lucide-react"
import Create from "./create"
import Detail from "./detail"

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

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#1C1C1C] border border-[#D4C9BE] rounded-lg overflow-hidden w-full sm:w-auto"
          >
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent px-3 py-2 outline-none text-[#F1EFEC] w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#D4C9BE] text-[#030303] hover:bg-[#F1EFEC] transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg hover:bg-[#F1EFEC] transition w-full sm:w-auto"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto border border-[#D4C9BE] rounded-lg">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#1C1C1C] text-[#D4C9BE] text-sm sm:text-base">
            <tr>
              <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap">#</th>
              <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap">Name</th>
              <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap">Created At</th>
              <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr
                  key={category.id}
                  className="hover:bg-[#1F1F1F] transition-colors cursor-pointer"
                >
                  <td
                    className="p-3 border-b border-[#D4C9BE] whitespace-nowrap"
                    onClick={() => handleRowClick(category)}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="p-3 border-b border-[#D4C9BE] whitespace-nowrap"
                    onClick={() => handleRowClick(category)}
                  >
                    {category.name}
                  </td>
                  <td
                    className="p-3 border-b border-[#D4C9BE] whitespace-nowrap"
                    onClick={() => handleRowClick(category)}
                  >
                    {new Date(category.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border-b border-[#D4C9BE] text-center">
                    <button
                      onClick={() => handleDelete(category.id)}
                      disabled={loading}
                      className="p-2 bg-red-600 text-[#F1EFEC] rounded-lg hover:opacity-80 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4 text-[#D4C9BE] italic"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Create */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#030303] rounded-2xl shadow-lg p-6 w-full max-w-md border border-[#D4C9BE]">
            <div className="flex justify-between items-center mb-4 border-b border-[#D4C9BE] pb-2">
              <h2 className="text-lg font-semibold text-[#F1EFEC]">Create Category</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#F1EFEC] hover:text-[#D4C9BE] font-bold text-lg"
              >
                ✕
              </button>
            </div>
            <div className="bg-[#123458] rounded-xl p-4">
              <Create />
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {showDetailModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#030303] rounded-2xl shadow-lg p-6 w-full max-w-md border border-[#D4C9BE]">
            <div className="flex justify-between items-center mb-4 border-b border-[#D4C9BE] pb-2">
              <h2 className="text-lg font-semibold text-[#F1EFEC]">
                Category Detail
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-[#F1EFEC] hover:text-[#D4C9BE] font-bold text-lg"
              >
                ✕
              </button>
            </div>
            <div className="bg-[#123458] rounded-xl p-4">
              <Detail category={selectedCategory} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
