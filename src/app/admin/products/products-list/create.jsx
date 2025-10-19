"use client"
import React, { useState, useEffect } from "react"
import { Image, Tag, Layers, Package, DollarSign, Hash } from "lucide-react"

const Create = () => {
  const [formData, setFormData] = useState({
    code: "",
    image: "",
    name: "",
    category: "",
    stock: "",
    price: "",
  })
  const [preview, setPreview] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/get-categories")
        const data = await res.json()
        setCategories(data)
        if (data.length > 0)
          setFormData((prev) => ({ ...prev, category: data[0].name }))
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image" && files && files[0]) {
      const file = files[0]
      setFormData({ ...formData, image: file })
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const generateCode = () => {
    const randomCode = "PRD-" + Math.floor(100000 + Math.random() * 900000)
    setFormData({ ...formData, code: randomCode })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData()
      form.append("code", formData.code)
      form.append("image", formData.image)
      form.append("name", formData.name)
      form.append("category", formData.category)
      form.append("stock", formData.stock)
      form.append("price", formData.price)

      const res = await fetch("/api/products/create", {
        method: "POST",
        body: form,
      })

      const result = await res.json()
      if (res.ok) {
        alert("Product created successfully!")
        setFormData({
          code: "",
          image: "",
          name: "",
          category: categories[0]?.name || "",
          stock: "",
          price: "",
        })
        setPreview(null)
        window.location.reload() // 🔥 refresh halaman setelah upload selesai
      } else {
        alert(result.message || "Failed to create product.")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      alert("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#030303] text-[#F1EFEC] p-6 rounded-2xl"
    >
      {/* LEFT COLUMN - Image Upload & Preview */}
      <div className="flex flex-col items-center justify-center">
        <label className="flex items-center gap-2 text-sm mb-2 self-start">
          <Image size={18} /> Product Image
        </label>
        <div className="w-full flex flex-col items-center justify-center p-4 border border-[#D4C9BE] bg-[#123458] rounded-lg">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg mb-4 border border-[#D4C9BE]"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border border-dashed border-[#D4C9BE] rounded-lg text-sm text-[#D4C9BE] mb-4">
              No Image
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 bg-[#123458] text-[#F1EFEC] rounded-lg focus:outline-none"
          />
        </div>
      </div>

      {/* RIGHT COLUMN - Product Details */}
      <div className="space-y-4">
        {/* Product Code */}
        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Hash size={18} /> Product Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="code"
              value={formData.code}
              readOnly
              placeholder="Click generate to create code"
              className="flex-1 p-2 bg-[#123458] text-[#F1EFEC] rounded-lg border border-[#D4C9BE] focus:outline-none"
            />
            <button
              type="button"
              onClick={generateCode}
              className="px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Tag size={18} /> Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full p-2 bg-[#123458] text-[#F1EFEC] rounded-lg border border-[#D4C9BE] focus:outline-none"
          />
        </div>

        {/* Category Input */}
        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Layers size={18} /> Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 bg-[#123458] text-[#F1EFEC] rounded-lg border border-[#D4C9BE] focus:outline-none"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Input */}
        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <Package size={18} /> Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="w-full p-2 bg-[#123458] text-[#F1EFEC] rounded-lg border border-[#D4C9BE] focus:outline-none"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <DollarSign size={18} /> Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full p-2 bg-[#123458] text-[#F1EFEC] rounded-lg border border-[#D4C9BE] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-[#D4C9BE] text-[#030303] py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  )
}

export default Create
