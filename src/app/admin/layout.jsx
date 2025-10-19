"use client"
import { useState } from "react"
import Sidebar from "../components/sidebar"
import { Menu, X } from "lucide-react"
import { SessionProvider } from "next-auth/react"

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden bg-[#030303] text-[#F1EFEC]">
        {/* Tombol toggle sidebar (mobile) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 bg-[#123458] p-2 rounded shadow"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-full bg-[#1a1a1a] transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 overflow-y-auto`}
        >
          <Sidebar />
        </div>

        {/* Konten utama */}
        <main className="flex-1 h-full overflow-y-auto  p-6 text-left">
          {children}
        </main>

        {/* Overlay untuk mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </SessionProvider>
  )
}
