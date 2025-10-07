"use client"
import React, { useState, useEffect } from "react"
import { Image, Tag, Layers, Package, DollarSign, Hash, Edit, Save, X } from "lucide-react"

const Detail = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...product })
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/get-categories")
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  if (!product) return null

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image" && files && files[0]) {
      const file = files[0]
      setSelectedFile(file)
      setFormData({ ...formData, image: URL.createObjectURL(file) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
    setFormData({ ...product })
    setSelectedFile(null)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const form = new FormData()
      form.append("id", formData.id)
      form.append("name", formData.name)
      form.append("category", formData.category)
      form.append("stock", formData.stock)
      form.append("price", formData.price)
      if (selectedFile) {
        form.append("image", selectedFile)
      }

      const res = await fetch("/api/products/edit/", {
        method: "POST",
        body: form,
      })

      const result = await res.json()
      if (res.ok) {
        alert("Product updated successfully!")
        setIsEditing(false)
      } else {
        alert(result.message || "Failed to update product.")
      }
    } catch (error) {
      console.error("Error updating product:", error)
      alert("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#030303] text-[#F1EFEC] p-6 rounded-2xl relative">
      <div className="absolute top-3 right-3 flex gap-2">
        {!isEditing ? (
          <button onClick={toggleEdit} className="flex items-center gap-1 px-3 py-1 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition">
            <Edit size={16} /> Edit
          </button>
        ) : (
          <button onClick={toggleEdit} className="flex items-center gap-1 px-3 py-1 bg-[#F1EFEC] text-[#030303] rounded-lg hover:opacity-90 transition">
            <X size={16} /> Cancel
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center">
        <label className="flex items-center gap-2 text-sm mb-2 self-start">
          <Image size={18} /> Product Image
        </label>
        <div className="w-full flex flex-col items-center justify-center p-4 border border-[#D4C9BE] bg-[#123458] rounded-lg">
          {formData.image ? (
            <img src={formData.image} alt={formData.name} className="w-40 h-40 object-cover rounded-lg mb-4 border border-[#D4C9BE]" />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border border-dashed border-[#D4C9BE] rounded-lg text-sm text-[#D4C9BE] mb-4">
              No Image
            </div>
          )}
          {isEditing && (
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2 bg-[#123458] text-[#F1EFEC] rounded-lg focus:outline-none mt-2" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Hash size={18} /> Product Code
          </label>
          <input type="text" value={formData.code} readOnly className="w-full p-2 bg-[#123458] text-[#F1EFEC] rounded-lg border border-[#D4C9BE] focus:outline-none" />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Tag size={18} /> Product Name
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly={!isEditing} className="w-full p-2 rounded-lg border border-[#D4C9BE] focus:outline-none bg-[#123458] text-[#F1EFEC]" />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Layers size={18} /> Category
          </label>
          {isEditing ? (
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 rounded-lg border border-[#D4C9BE] focus:outline-none bg-[#123458] text-[#F1EFEC]">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          ) : (
            <input type="text" value={formData.category} readOnly className="w-full p-2 rounded-lg border border-[#D4C9BE] focus:outline-none bg-[#123458] text-[#F1EFEC]" />
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Package size={18} /> Stock
          </label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} readOnly={!isEditing} className="w-full p-2 rounded-lg border border-[#D4C9BE] focus:outline-none bg-[#123458] text-[#F1EFEC]" />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <DollarSign size={18} /> Price
          </label>
          <input type="text" name="price" value={`Rp ${Number(formData.price).toLocaleString("id-ID")}`} onChange={(e) => handleChange({ target: { name: "price", value: e.target.value.replace(/[^0-9]/g, "") } })} readOnly={!isEditing} className="w-full p-2 rounded-lg border border-[#D4C9BE] focus:outline-none bg-[#123458] text-[#F1EFEC]" />
        </div>

        {isEditing && (
          <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 mt-4 px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition">
            <Save size={16} /> {loading ? "Saving..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  )
}

export default Detail
