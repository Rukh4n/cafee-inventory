"use client"
import React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamic import untuk ikon agar tidak di-SSR
const LogIn = dynamic(() => import("lucide-react").then(mod => mod.LogIn), { ssr: false })
const UserPlus = dynamic(() => import("lucide-react").then(mod => mod.UserPlus), { ssr: false })

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome Page</h1>
      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition shadow"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>

        <Link
          href="/auth/register"
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition shadow"
        >
          <UserPlus className="w-5 h-5" />
          Register
        </Link>
      </div>
    </div>
  )
}

export default Page
