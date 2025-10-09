"use client"
import React, { useState } from "react"
import { User, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.redirected) {
        router.push(res.url)
        return
      }

      // Jika API tidak redirect otomatis, arahkan manual ke guest/dashboard
      if (res.ok) {
        router.push("/guest/dashboard")
      } else {
        const data = await res.json()
        console.error("Register failed:", data)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030303] to-[#D4C9BE] text-[#F1EFEC] p-6">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-[#030303] border border-[#D4C9BE]">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#F1EFEC]">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border border-[#D4C9BE] bg-[#030303] rounded-lg px-3 py-2">
            <User className="w-5 h-5 text-[#D4C9BE]" />
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent outline-none text-[#F1EFEC] placeholder-[#D4C9BE]"
            />
          </div>

          <div className="flex items-center gap-2 border border-[#D4C9BE] bg-[#030303] rounded-lg px-3 py-2">
            <Mail className="w-5 h-5 text-[#D4C9BE]" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent outline-none text-[#F1EFEC] placeholder-[#D4C9BE]"
            />
          </div>

          <div className="flex items-center gap-2 border border-[#D4C9BE] bg-[#030303] rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-[#D4C9BE]" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent outline-none text-[#F1EFEC] placeholder-[#D4C9BE]"
            />
          </div>

          <div className="flex items-center gap-2 border border-[#D4C9BE] bg-[#030303] rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-[#D4C9BE]" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent outline-none text-[#F1EFEC] placeholder-[#D4C9BE]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 font-semibold py-2 rounded-lg transition w-full bg-[#D4C9BE] text-[#030303] hover:opacity-90"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
