"use client"
import React, { useState } from "react"
import { User, Mail, Lock } from "lucide-react"

const Page = () => {
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
      const data = await res.json()
      console.log("Register response:", data)
      alert("Registration successful!")
    } catch (error) {
      console.error("Error:", error)
      alert("Registration failed!")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
    >
      <div
        className="w-full max-w-md p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: "#030303" }}
      >
        <h1
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#D4C9BE" }}
        >
          Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div
            className="flex items-center gap-2 border rounded-lg px-3 py-2"
            style={{ borderColor: "#D4C9BE", backgroundColor: "#123458" }}
          >
            <User className="w-5 h-5" style={{ color: "#F1EFEC" }} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none placeholder-gray-300"
              style={{ color: "#F1EFEC" }}
              required
            />
          </div>

          <div
            className="flex items-center gap-2 border rounded-lg px-3 py-2"
            style={{ borderColor: "#D4C9BE", backgroundColor: "#123458" }}
          >
            <Mail className="w-5 h-5" style={{ color: "#F1EFEC" }} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none placeholder-gray-300"
              style={{ color: "#F1EFEC" }}
              required
            />
          </div>

          <div
            className="flex items-center gap-2 border rounded-lg px-3 py-2"
            style={{ borderColor: "#D4C9BE", backgroundColor: "#123458" }}
          >
            <Lock className="w-5 h-5" style={{ color: "#F1EFEC" }} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none placeholder-gray-300"
              style={{ color: "#F1EFEC" }}
              required
            />
          </div>

          <div
            className="flex items-center gap-2 border rounded-lg px-3 py-2"
            style={{ borderColor: "#D4C9BE", backgroundColor: "#123458" }}
          >
            <Lock className="w-5 h-5" style={{ color: "#F1EFEC" }} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none placeholder-gray-300"
              style={{ color: "#F1EFEC" }}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 font-medium py-2 rounded-lg transition"
            style={{
              backgroundColor: "#D4C9BE",
              color: "#030303",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
