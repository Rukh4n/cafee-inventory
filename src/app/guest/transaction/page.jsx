"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"

const Page = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const statusCode = searchParams.get("status_code")
  const transactionStatus = searchParams.get("transaction_status")
  const [message, setMessage] = useState("Memproses hasil transaksi...")
  const [showModal, setShowModal] = useState(true)

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

  if (!showModal) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div
        className="relative rounded-2xl border-2 p-8 max-w-md w-full mx-4 shadow-lg"
        style={{
          backgroundColor: "#030303",
          borderColor: "#D4C9BE",
          color: "#F1EFEC",
        }}
      >
        {/* Tombol X di pojok kanan atas */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#D4C9BE]/20 transition"
        >
          <X size={20} color="#F1EFEC" />
        </button>

        <h1 className="text-2xl font-semibold mb-4 text-center">Status Transaksi</h1>
        <p className="text-center">{message}</p>
      </div>
    </div>
  )
}

export default Page
