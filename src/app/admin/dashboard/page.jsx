"use client"
import React from "react"
import AdminLayout from "../layout"

const Page = () => {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (res.ok) {
        window.location.href = "/auth/login"
      } else {
        alert("Logout gagal!")
      }
    } catch (error) {
      console.error("Logout error:", error)
      alert("Terjadi kesalahan saat logout.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030303] text-[#F1EFEC]">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-[#D4C9BE] text-[#030303] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
      >
        Logout
      </button>
    </div>
  )
}

export default Page
