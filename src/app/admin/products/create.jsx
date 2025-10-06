"use client"
import React, { useState } from "react"
import { Image, Tag, Layers, Package, DollarSign } from "lucide-react"

const Create = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    category: "Electronics",
    stock: "",
    price: "",
  })
  const [preview, setPreview] = useState(null)

  const categories = ["Electronics", "Fashion", "Books", "Food", "Toys"]

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data:", formData)
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
              <option key={i} value={cat}>
                {cat}
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
          className="w-full mt-4 bg-[#D4C9BE] text-[#030303] py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Save Product
        </button>
      </div>
    </form>
  )
}

export default Create
