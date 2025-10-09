"use client"
import React from "react"
import { SessionProvider } from "next-auth/react"
import SessionWrapper from "../SessionWrapper"

const GuestLayout = ({ children }) => {
  return (
    <SessionWrapper>
      <div className="min-h-screen flex flex-col bg-[#030303] text-[#F1EFEC]">

        <main className="flex-1 flex items-center justify-center w-full px-4">
          <div className="w-full max-w-md bg-[#121212] p-6 rounded-2xl shadow-lg">
            {children}
          </div>
        </main>

        <footer className="w-full py-3 text-center text-sm text-[#AFAFAF] bg-[#1E1E1E]">
          © {new Date().getFullYear()} - All rights reserved
        </footer>
      </div>
    </SessionWrapper>
  )
}

export default GuestLayout
