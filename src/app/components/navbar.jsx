"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { ListOrdered } from "lucide-react"

// Dynamic import untuk ikon agar mencegah hydration error
const Menu = dynamic(() => import("lucide-react").then(mod => mod.Menu), { ssr: false })
const X = dynamic(() => import("lucide-react").then(mod => mod.X), { ssr: false })

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const linkClasses = (href) =>
    `px-3 py-1 rounded transition-colors flex items-center gap-2 ${
      pathname === href
        ? "bg-[#D4C9BE] text-[#030303]"
        : "hover:bg-[#D4C9BE] hover:text-[#030303]"
    }`

  const isGuest = session?.user?.role === "guest"

  return (
    <nav className="w-full bg-[#030303] text-[#F1EFEC] px-6 py-4 flex justify-between items-center relative">
      <div className="text-xl font-semibold">
        <Link href="/">Aplikasi Saya</Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 items-center">
        <Link href="/" className={linkClasses("/")}>
          Beranda
        </Link>
        <Link href="/menu" className={linkClasses("/menu")}>
          Daftar Menu
        </Link>
        {session && (
          <Link href="/guest/order-list" className={linkClasses("/guest/order-list")}>
            <ListOrdered className="w-4 h-4" /> Daftar Pesanan
          </Link>
        )}
        {isGuest && (
          <Link href="/guest/transaction" className={linkClasses("/guest/transaction")}>
            Transaksi
          </Link>
        )}
        {!session ? (
          <>
            <Link href="/auth/login" className={linkClasses("/auth/login")}>
              Login
            </Link>
            <Link href="/auth/register" className={linkClasses("/auth/register")}>
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="px-3 py-1 rounded hover:bg-[#D4C9BE] hover:text-[#030303] transition-colors"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded hover:bg-[#D4C9BE] hover:text-[#030303] transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#030303] text-[#F1EFEC] shadow-lg z-50 flex flex-col p-6 gap-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" className={linkClasses("/")} onClick={() => setIsOpen(false)}>
          Beranda
        </Link>
        <Link href="/menu" className={linkClasses("/menu")} onClick={() => setIsOpen(false)}>
          Daftar Menu
        </Link>
        {session && (
          <Link
            href="/guest/order-list"
            className={linkClasses("/guest/order-list")}
            onClick={() => setIsOpen(false)}
          >
            <ListOrdered className="w-4 h-4" /> Daftar Pesanan
          </Link>
        )}
        {isGuest && (
          <Link
            href="/guest/transaction"
            className={linkClasses("/guest/transaction")}
            onClick={() => setIsOpen(false)}
          >
            Transaksi
          </Link>
        )}
        {!session ? (
          <>
            <Link
              href="/auth/login"
              className={linkClasses("/auth/login")}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className={linkClasses("/auth/register")}
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              signOut({ callbackUrl: "/auth/login" })
              setIsOpen(false)
            }}
            className="px-3 py-1 rounded hover:bg-[#D4C9BE] hover:text-[#030303] transition-colors text-left"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
