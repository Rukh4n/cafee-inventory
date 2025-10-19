"use client"
import "./globals.css"
import { useEffect, useState } from "react"
import SessionWrapper from "./SessionWrapper"
import Navbar from "./components/navbar"
import Footer from "./components/Footer"

export default function RootLayout({ children }) {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased text-[#030303] flex flex-col min-h-screen">
        <SessionWrapper>
          <div
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
              showNavbar ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <Navbar />
          </div>
          <main className="min-h-screen mt-16 overflow-y-auto bg-gradient-to-br from-[#030303] via-[#4a3e36] to-[#D4C9BE]">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  )
}
