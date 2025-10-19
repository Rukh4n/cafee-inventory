// guest/layout.jsx
"use client"
import React, { Suspense } from "react"
import SessionWrapper from "../SessionWrapper"

const GuestLayout = ({ children }) => {
  return (
    <SessionWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen bg-gradient-to-br from-[#030303] via-[#4a3e36] to-[#D4C9BE] text-white flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="text-center py-4">© {new Date().getFullYear()} - All rights reserved</footer>
        </div>
      </Suspense>
    </SessionWrapper>
  )
}

export default GuestLayout
