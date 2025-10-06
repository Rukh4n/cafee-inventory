"use client"
import { useState } from "react"
import Sidebar from "../components/sidebar"
import { Menu, X } from "lucide-react"

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-[#030303] text-[#F1EFEC]">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#123458] text-[#F1EFEC] p-2 rounded shadow"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-40 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto md:ml-0">
        {children}
      </main>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  )
}
