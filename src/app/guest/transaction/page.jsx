"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { BadgeDollarSign, Package, ClipboardList, CalendarDays, X } from "lucide-react"

const Page = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const statusCode = searchParams.get("status_code")
  const transactionStatus = searchParams.get("transaction_status")
  const [message, setMessage] = useState("Memproses hasil transaksi...")
  const [transactions, setTransactions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState("")
  const [query, setQuery] = useState("")

  const fetchTransactions = async (search = "") => {
    try {
      const endpoint = search
        ? `/api/guest/transaction?query=${encodeURIComponent(search)}`
        : "/api/guest/transaction/"
      const res = await fetch(endpoint)
      const data = await res.json()
      setTransactions(data || [])
    } catch (error) {
      console.error("Gagal mengambil data transaksi:", error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    if (orderId && statusCode && transactionStatus) {
      if (transactionStatus === "settlement") {
        setMessage(`✅ Pembayaran berhasil untuk Order ID: ${orderId}`)
      } else if (transactionStatus === "pending") {
        setMessage(`⏳ Pembayaran masih tertunda untuk Order ID: ${orderId}`)
      } else if (transactionStatus === "deny" || transactionStatus === "cancel") {
        setMessage(`❌ Pembayaran gagal atau dibatalkan untuk Order ID: ${orderId}`)
      } else {
        setMessage(`ℹ️ Status transaksi: ${transactionStatus}`)
      }
    }
  }, [orderId, statusCode, transactionStatus])

  const handleSearch = async (e) => {
    e.preventDefault()
    fetchTransactions(query)
  }

  const handleOpenModal = (url) => {
    setPaymentUrl(url)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setPaymentUrl("")
  }

  return (
    <div className="min-h-screen text-[#F1EFEC] flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl font-semibold mb-4 text-center">Status Transaksi</h1>
      <p className="text-center mb-10">{message}</p>

      <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Cari transaksi berdasarkan ID atau nama..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-[#D4C9BE] text-[#F1EFEC] focus:outline-none focus:ring-2 focus:ring-[#D4C9BE]"
        />
        <button
          type="submit"
          className="w-full mt-3 bg-[#D4C9BE] text-[#030303] py-2 rounded-lg font-semibold hover:bg-[#b8afa4] transition"
        >
          Cari Transaksi
        </button>
      </form>

      <div className="w-full max-w-3xl border border-[#D4C9BE] rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Daftar Transaksi</h2>
        {transactions.length > 0 ? (
          <ul className="space-y-3">
            {transactions.map((tx, index) => (
              <li
                key={index}
                className="border border-[#D4C9BE] rounded-md p-4 bg-[#030303] hover:bg-[#1a1a1a] transition"
              >
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardList size={18} color="#D4C9BE" />
                  <p>
                    <span className="font-semibold">ID Transaksi:</span> {tx.orderId}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <BadgeDollarSign size={18} color="#D4C9BE" />
                  <p>
                    <span className="font-semibold">Total Pembayaran:</span> {tx.totalPrice}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Package size={18} color="#D4C9BE" />
                  <p>
                    <span className="font-semibold">Metode Pembayaran:</span> {tx.paymentMethod}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} color="#D4C9BE" />
                  <p>
                    <span className="font-semibold">Status:</span> {tx.status}
                  </p>
                </div>

                {tx.status === "pending" &&
                  tx.paymentUrl &&
                  tx.paymentMethod !== "Manual via Kasir" && (
                    <button
                      onClick={() => handleOpenModal(tx.paymentUrl)}
                      className="mt-3 bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-md font-semibold hover:bg-[#b8afa4] transition"
                    >
                      Lihat Pembayaran
                    </button>
                  )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-[#D4C9BE]/70">Tidak ada transaksi ditemukan.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-[#121212] rounded-2xl shadow-lg inline-block">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-[#D4C9BE] hover:text-white z-10"
            >
              <X size={24} />
            </button>
            <iframe
              src={paymentUrl}
              title="Payment"
              className="rounded-lg border border-[#D4C9BE] w-[420px] h-[600px]"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
