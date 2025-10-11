// guest/layout.jsx
"use client"
import React, { Suspense } from "react"
import SessionWrapper from "../SessionWrapper"

const GuestLayout = ({ children }) => {
  return (
    <SessionWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #030303, #4a3e36, #D4C9BE)" }}>
          <main>{children}</main>
          <footer>© {new Date().getFullYear()} - All rights reserved</footer>
        </div>
      </Suspense>
    </SessionWrapper>
  )
}

export default GuestLayout
