"use client"
import "./globals.css"
import SessionWrapper from "./SessionWrapper"
import Navbar from "./components/navbar"
import Footer from "./components/Footer"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased text-[#030303] flex flex-col min-h-screen">
        <SessionWrapper>
          <div className="fixed top-0 left-0 w-full z-50">
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
