"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Tag, Save } from "lucide-react"

const Create = () => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/products/categories/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!res.ok) throw new Error("Failed to create category")

      const data = await res.json()
      console.log("Success:", data)
      alert("Category created successfully!")
      setName("")
      router.push("/admin/products/categories")
    } catch (error) {
      console.error("Error:", error)
      alert("Error creating category!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-[#030303] p-4 rounded-xl text-[#F1EFEC]"
    >
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium flex items-center gap-2 text-[#D4C9BE]">
          <Tag className="w-4 h-4" /> Category Name
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="bg-[#123458] text-[#F1EFEC] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C9BE] placeholder:text-[#D4C9BE]/70"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition ${
          loading
            ? "bg-[#D4C9BE]/60 text-[#030303] cursor-not-allowed"
            : "bg-[#D4C9BE] text-[#030303] hover:bg-[#F1EFEC]"
        }`}
      >
        <Save className="w-4 h-4" />
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}

export default Create
