"use client"
import React from "react"
import { Coffee } from "lucide-react"

const Page = () => {
  return (
    <header className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2c1810] via-[#4a3e36] to-[#d4c9be] text-white text-center p-6">
      <div className="flex items-center gap-3 mb-4">
        <Coffee className="w-10 h-10 text-[#d4c9be]" />
        <h1 className="text-4xl font-bold tracking-wide">Welcome to Cozy Café</h1>
      </div>
      <p className="text-lg max-w-md text-[#f1efec]">
        Nikmati secangkir kopi terbaik dan suasana hangat di tempat kami ☕
      </p>
    </header>
  )
}

export default Page
