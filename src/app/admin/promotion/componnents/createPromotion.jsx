"use client"
import React, { useState } from "react"
import { Megaphone, Calendar, Tag, FileText, ImagePlus, Percent, Hash } from "lucide-react"

const CreatePromotion = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    promoCode: "",
    percentage: "",
    limitQuota: "",
    image: null,
  })

  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm({ ...form, image: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const generatePromoCode = () => {
    if (!form.title || !form.startDate || !form.endDate) {
      alert("Please fill title and date fields first.")
      return
    }
    const shortTitle = form.title.replace(/\s+/g, "").slice(0, 5).toUpperCase()
    const start = form.startDate.replaceAll("-", "").slice(-4)
    const end = form.endDate.replaceAll("-", "").slice(-4)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    const code = `${shortTitle}${start}${end}${random}`
    setForm({ ...form, promoCode: code })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const formData = new FormData()
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key])
      })

      const res = await fetch("/api/promotion/create", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to create promotion")

      setMessage("✅ Promotion created successfully!")
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      setMessage("❌ Error creating promotion")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] text-[#F1EFEC] flex items-center justify-center">
      <div className="w-full max-w-lg border border-[#D4C9BE] rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-6 mt-6 ml-6">
          <Megaphone className="w-6 h-6 text-[#D4C9BE]" />
          <h2 className="text-2xl font-semibold">Create Promotion</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 m-0 px-0">
          <div className="px-6">
            <label className="block mb-2 text-sm font-medium">Promotion Title</label>
            <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
              <Tag className="w-5 h-5 text-[#D4C9BE]" />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter promotion title"
                className="bg-transparent outline-none flex-1 text-[#F1EFEC] placeholder-[#D4C9BE]"
                required
              />
            </div>
          </div>

          <div className="px-6">
            <label className="block mb-2 text-sm font-medium">Description</label>
            <div className="flex items-start gap-2 border border-[#D4C9BE] rounded-lg p-2">
              <FileText className="w-5 h-5 mt-1 text-[#D4C9BE]" />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter promotion details"
                rows="3"
                className="bg-transparent outline-none flex-1 text-[#F1EFEC] placeholder-[#D4C9BE] resize-none"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4 px-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium">Start Date</label>
              <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
                <Calendar className="w-5 h-5 text-[#D4C9BE]" />
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="bg-transparent outline-none flex-1 text-[#F1EFEC]"
                  required
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium">End Date</label>
              <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
                <Calendar className="w-5 h-5 text-[#D4C9BE]" />
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="bg-transparent outline-none flex-1 text-[#F1EFEC]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="px-6">
            <label className="block mb-2 text-sm font-medium">Promo Code</label>
            <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
              <input
                type="text"
                name="promoCode"
                value={form.promoCode}
                onChange={handleChange}
                placeholder="Auto-generated promo code"
                className="bg-transparent outline-none flex-1 text-[#F1EFEC] placeholder-[#D4C9BE]"
                readOnly
              />
              <button
                type="button"
                onClick={generatePromoCode}
                className="text-[#030303] bg-[#D4C9BE] px-3 py-1 rounded-md text-sm font-semibold hover:opacity-90"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="flex gap-4 px-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium">Percentage (%)</label>
              <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
                <Percent className="w-5 h-5 text-[#D4C9BE]" />
                <input
                  type="number"
                  name="percentage"
                  value={form.percentage}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  className="bg-transparent outline-none flex-1 text-[#F1EFEC] placeholder-[#D4C9BE]"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium">Limit Quota</label>
              <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
                <Hash className="w-5 h-5 text-[#D4C9BE]" />
                <input
                  type="number"
                  name="limitQuota"
                  value={form.limitQuota}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  className="bg-transparent outline-none flex-1 text-[#F1EFEC] placeholder-[#D4C9BE]"
                />
              </div>
            </div>
          </div>

          <div className="px-6">
            <label className="block mb-2 text-sm font-medium">Upload Image</label>
            <div className="flex flex-col gap-2 border border-[#D4C9BE] rounded-lg p-3 items-center">
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center cursor-pointer text-[#D4C9BE] hover:opacity-80"
              >
                <ImagePlus className="w-8 h-8 mb-1" />
                <span className="text-sm">Click to upload image</span>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border border-[#D4C9BE]"
                />
              )}
            </div>
          </div>

          <div className="px-6 pb-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#D4C9BE] text-[#030303] py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Promotion"}
            </button>
            {message && (
              <p className="text-center text-sm mt-3 text-[#D4C9BE]">{message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePromotion
