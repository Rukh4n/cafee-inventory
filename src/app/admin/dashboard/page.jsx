"use client"
import React, { useEffect } from "react"
import { useSession } from "next-auth/react"
import AdminLayout from "../layout"

const Page = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      console.log("User yang login:", session.user)
    }
  }, [session])

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

  const user = {
    id: 1759710566216,
    name: "Nur Rukhan",
    email: "nurrukhans@gmail.com",
    role: "admin",
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#030303] text-[#F1EFEC]">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg mb-6 w-80 text-left">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

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
