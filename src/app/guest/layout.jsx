"use client"
import React from "react"
import { SessionProvider } from "next-auth/react"
import SessionWrapper from "../SessionWrapper"

const GuestLayout = ({ children }) => {
  return (
    <SessionWrapper>
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #030303, #4a3e36, #D4C9BE)" }}>
        <main>
          <div>
            {children}
          </div>
        </main>
        <footer>
          © {new Date().getFullYear()} - All rights reserved
        </footer>
      </div>
    </SessionWrapper>
  )
}

export default GuestLayout
