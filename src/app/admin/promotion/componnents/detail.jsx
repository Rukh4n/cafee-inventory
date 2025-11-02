"use client"
import React, { useState } from "react"
import { Megaphone, Calendar, Tag, FileText, ImagePlus, Percent, Hash, ImageOff } from "lucide-react"

const Detail = ({ promo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(promo || {})
  const [preview, setPreview] = useState(promo?.image || null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  if (!promo) return null

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const formData = new FormData()
      Object.keys(form).forEach((key) => {
        if (form[key] !== undefined && form[key] !== null) {
          formData.append(key, form[key])
        }
      })
      formData.append("amount", null)

      const res = await fetch(`/api/promotion/update/${promo.id}`, {
        method: "PUT",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to update promotion")

      setMessage("✅ Promotion updated successfully!")
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      setMessage("❌ Error updating promotion")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] text-[#F1EFEC] flex items-center justify-center">
      <div className="w-full max-w-lg border border-[#D4C9BE] rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Megaphone className="w-6 h-6 text-[#D4C9BE]" />
          <h2 className="text-2xl font-semibold">
            {isEditing ? "Edit Promotion" : "Promotion Detail"}
          </h2>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="w-full h-60 bg-[#1a1a1a] flex items-center justify-center rounded-xl overflow-hidden">
              {promo.image ? (
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#D4C9BE]">
                  <ImageOff className="w-12 h-12 mb-2" />
                  <p className="text-sm">No Image Available</p>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold">{promo.title}</h2>
            <p className="text-sm text-[#D4C9BE]">{promo.description || "-"}</p>

            <div className="text-sm"><span className="font-semibold">Promo Code:</span> {promo.promoCode || "-"}</div>
            <div className="text-sm"><span className="font-semibold">Discount:</span> {promo.percentage ? `${promo.percentage}%` : "-"}</div>
            <div className="text-sm"><span className="font-semibold">Quota:</span> {promo.limitQuota || "-"}</div>
            <div className="text-sm"><span className="font-semibold">Amount:</span> {promo.amount || "-"}</div>

            <div className="flex justify-between text-sm">
              <p><span className="font-semibold">Start Date:</span> {promo.startDate || "-"}</p>
              <p><span className="font-semibold">End Date:</span> {promo.endDate || "-"}</p>
            </div>

            <div className="text-xs text-[#D4C9BE]">
              Created At:{" "}
              {new Date(promo.createdAt).toLocaleString("id-ID", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#D4C9BE] text-[#030303] py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Edit Promotion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Promotion Title</label>
              <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
                <Tag className="w-5 h-5 text-[#D4C9BE]" />
                <input
                  type="text"
                  name="title"
                  value={form.title || ""}
                  onChange={handleChange}
                  className="bg-transparent outline-none flex-1 text-[#F1EFEC]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Description</label>
              <div className="flex items-start gap-2 border border-[#D4C9BE] rounded-lg p-2">
                <FileText className="w-5 h-5 mt-1 text-[#D4C9BE]" />
                <textarea
                  name="description"
                  value={form.description || ""}
                  onChange={handleChange}
                  rows="3"
                  className="bg-transparent outline-none flex-1 text-[#F1EFEC] resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium">Start Date</label>
                <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
                  <Calendar className="w-5 h-5 text-[#D4C9BE]" />
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate || ""}
                    onChange={handleChange}
                    className="bg-transparent outline-none flex-1 text-[#F1EFEC]"
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
                    value={form.endDate || ""}
                    onChange={handleChange}
                    className="bg-transparent outline-none flex-1 text-[#F1EFEC]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Promo Code</label>
              <input
                type="text"
                name="promoCode"
                value={form.promoCode || ""}
                onChange={handleChange}
                className="w-full border border-[#D4C9BE] rounded-lg bg-transparent p-2 text-[#F1EFEC]"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium">Percentage (%)</label>
                <div className="flex items-center gap-2 border border-[#D4C9BE] rounded-lg p-2">
                  <Percent className="w-5 h-5 text-[#D4C9BE]" />
                  <input
                    type="number"
                    name="percentage"
                    value={form.percentage || ""}
                    onChange={handleChange}
                    className="bg-transparent outline-none flex-1 text-[#F1EFEC]"
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
                    value={form.limitQuota || ""}
                    onChange={handleChange}
                    className="bg-transparent outline-none flex-1 text-[#F1EFEC]"
                  />
                </div>
              </div>
            </div>

            <div>
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

            <div className="pb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#D4C9BE] text-[#030303] py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full mt-2 border border-[#D4C9BE] text-[#D4C9BE] py-2 rounded-lg font-semibold hover:bg-[#1a1a1a] transition"
              >
                Cancel
              </button>
              {message && <p className="text-center text-sm mt-3 text-[#D4C9BE]">{message}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Detail
