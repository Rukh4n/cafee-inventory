"use client"
import React, { useEffect, useState } from "react"
import { Trash2, Plus, Info } from "lucide-react"
import CreateCategoryModal from "./CreateCategoryModal"
import DetailCategoryModal from "./DetailCategoryModal"
import SearchBar from "./SearchBar"

export default function CategoryTable()  {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  const fetchCategories = async (query = "") => {
    try {
      setLoading(true)
      const res = await fetch(`/api/products/categories?search=${encodeURIComponent(query)}`)
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchCategories(searchQuery)
  }

  const handleDelete = async () => {
    if (!categoryToDelete) return
    try {
      setLoading(true)
      const res = await fetch("/api/products/categories/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: categoryToDelete.id }),
      })
      if (res.ok) {
        await fetchCategories()
        setConfirmDeleteModal(false)
      }
    } catch (error) {
      console.error("Error deleting category:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowDetail = (category) => {
    setSelectedCategory(category)
    setShowDetailModal(true)
  }

  const openDeleteModal = (category) => {
    setCategoryToDelete(category)
    setConfirmDeleteModal(true)
  }

  return (
    <div className="min-h-screen bg-[#030303] text-[#F1EFEC] p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold border-b border-[#D4C9BE] pb-2 w-full sm:w-auto">
          Product Categories
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            setCategories={setCategories}
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition w-full sm:w-auto"
          >
            <Plus size={18} />
            Tambah Kategori
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-[#D4C9BE] rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#1C1C1C] text-[#D4C9BE]">
            <tr>
              <th className="p-3 border-b border-[#D4C9BE] text-left">#</th>
              <th className="p-3 border-b border-[#D4C9BE] text-left">Nama</th>
              <th className="p-3 border-b border-[#D4C9BE] text-left">Dibuat Pada</th>
              <th className="p-3 border-b border-[#D4C9BE] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center italic text-[#D4C9BE]">
                  Loading...
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-[#1F1F1F] transition-colors">
                  <td className="p-3 border-b border-[#D4C9BE]">{index + 1}</td>
                  <td className="p-3 border-b border-[#D4C9BE]">{category.name}</td>
                  <td className="p-3 border-b border-[#D4C9BE]">
                    {new Date(category.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border-b border-[#D4C9BE] text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleShowDetail(category)}
                        className="flex items-center gap-1 p-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-80 transition"
                      >
                        <Info size={16} />
                        Detail
                      </button>
                      <button
                        onClick={() => openDeleteModal(category)}
                        disabled={loading}
                        className="flex items-center gap-1 p-2 bg-red-600 text-[#F1EFEC] rounded-lg hover:opacity-80 transition"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center italic text-[#D4C9BE]">
                  Tidak ada kategori ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && <CreateCategoryModal onClose={() => setShowModal(false)} />}

      {showDetailModal && selectedCategory && (
        <DetailCategoryModal
          category={selectedCategory}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {confirmDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#030303] rounded-2xl shadow-lg p-6 w-full max-w-md border border-[#D4C9BE]">
            <h2 className="text-lg font-semibold text-[#F1EFEC] mb-4 border-b border-[#D4C9BE] pb-2">
              Konfirmasi Hapus
            </h2>
            <p className="text-[#D4C9BE] mb-6">
              Apakah kamu yakin ingin menghapus kategori{" "}
              <span className="font-semibold text-[#F1EFEC]">{categoryToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-[#D4C9BE] text-[#D4C9BE] hover:bg-[#1C1C1C] transition"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-[#F1EFEC] hover:opacity-80 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

