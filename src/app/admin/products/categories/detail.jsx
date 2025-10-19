// src/app/products/categories/detail.jsx
"use client"
import React, { useState } from "react"
import { CalendarDays, Tag, Edit3, Save, X } from "lucide-react"

const Detail = ({ category, onSuccess }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCategory, setEditedCategory] = useState(category || {})
  const [loading, setLoading] = useState(false)

  if (!category) return null

  const handleChange = (e) => {
    setEditedCategory({ ...editedCategory, name: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/products/categories/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCategory),
      })
      const data = await res.json()
      console.log("Updated category:", data)

      if (res.ok) {
        setIsEditing(false)
        onSuccess?.() // akan tutup modal + reload halaman
      }
    } catch (error) {
      console.error("Failed to update category:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-[#F1EFEC] bg-[#030303] p-6 rounded-2xl shadow-md border border-[#D4C9BE] max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-[#D4C9BE] pb-2">
        <h3 className="text-xl font-semibold text-center w-full">Category Detail</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-4 p-2 rounded-lg bg-[#D4C9BE] text-[#030303] hover:opacity-90"
          >
            <Edit3 size={18} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="ml-4 p-2 rounded-lg bg-red-600 text-[#F1EFEC] hover:opacity-90"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 bg-[#123458] p-3 rounded-lg border border-[#D4C9BE]">
          <Tag className="text-[#D4C9BE]" />
          <div className="flex-1">
            <p className="text-sm text-[#D4C9BE] mb-1">Category Name</p>
            {isEditing ? (
              <input
                type="text"
                value={editedCategory.name}
                onChange={handleChange}
                className="w-full bg-[#030303] border border-[#D4C9BE] text-[#F1EFEC] px-3 py-2 rounded-lg focus:outline-none"
              />
            ) : (
              <p className="text-lg font-medium">{category.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#123458] p-3 rounded-lg border border-[#D4C9BE]">
          <CalendarDays className="text-[#D4C9BE]" />
          <div>
            <p className="text-sm text-[#D4C9BE]">Created At</p>
            <p className="text-lg font-medium">
              {new Date(category.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#D4C9BE] text-[#030303] hover:opacity-90"
            }`}
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  )
}

export default Detail
