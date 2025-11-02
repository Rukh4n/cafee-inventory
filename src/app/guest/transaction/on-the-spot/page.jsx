"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import TransactionList from "./componnents/TransactionList"
import PaymentMethods from "./componnents/PaymentMethods"
import PaymentModal from "./componnents/PaymentModal"

const Page = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [parsedData, setParsedData] = useState({ selectedItems: [], totalPrice: 0 })
  const [finalTotal, setFinalTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [snapUrl, setSnapUrl] = useState(null)
  const [tableNumber, setTableNumber] = useState("")
  const [userName, setUserName] = useState("Guest")
  const [userId, setUserId] = useState(null)
  const [voucherCode, setVoucherCode] = useState("")
  const [voucherLoading, setVoucherLoading] = useState(false)

  const paymentMethods = ["Manual via Kasir", "Metode Pembayaran Online"]

  useEffect(() => {
    if (session?.user) {
      setUserName(session.user.name || "Guest")
      setUserId(session.user.id || null)
    }
  }, [session])

  useEffect(() => {
    const dataParam = searchParams.get("data")
    if (typeof window !== "undefined" && dataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(dataParam))
        setParsedData(data)
        setFinalTotal(data.totalPrice)
      } catch (error) {
        console.error("Failed to parse dataParam:", error)
      }
    }
  }, [searchParams])

  const handlePayment = async (method) => {
    if (!tableNumber || isNaN(tableNumber)) {
      alert("Nomor meja wajib diisi dan harus berupa angka.")
      return
    }

    const payload = {
      userId: userId,
      items: parsedData.selectedItems,
      totalPrice: finalTotal,
      paymentMethod: method,
      tableNumber: Number(tableNumber),
      name: userName,
      transactionType: "on-the-spot",
    }

    try {
      setLoading(true)
      const res = await fetch("/api/guest/transaction/on-the-spot/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        if (method === "Manual via Kasir") {
          router.push("/guest/transaction")
        } else if (data.paymentUrl) {
          setSnapUrl(data.paymentUrl)
        }
      } else {
        alert("Transaksi gagal. Cek console untuk detail.")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat membuat transaksi.")
    } finally {
      setLoading(false)
    }
  }

  const checkVoucher = async () => {
    if (!voucherCode) {
      alert("Masukkan kode voucher terlebih dahulu.")
      return
    }

    try {
      setVoucherLoading(true)
      const res = await fetch("/api/guest/promotion/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode, totalPrice: finalTotal }),
      })
      const data = await res.json()
      if (data.success) {
        setFinalTotal(data.newTotal)
        alert("Voucher berhasil diterapkan!")
      } else {
        alert(data.message || "Voucher tidak valid.")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengecek voucher.")
    } finally {
      setVoucherLoading(false)
    }
  }

  const closeModal = () => setSnapUrl(null)

  return (
    <div suppressHydrationWarning className="p-6 min-h-screen text-[#D4C9BE]">
      <h1 className="text-2xl font-bold mb-6">On The Spot Transaction</h1>
      {typeof window !== "undefined" && (
        <>
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Nomor Meja <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Masukkan nomor meja"
              required
              className="w-full p-3 rounded-md border border-[#D4C9BE] bg-transparent text-[#D4C9BE] placeholder-[#AFA79D] focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Voucher</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Masukkan kode voucher"
                className="flex-1 p-3 rounded-md border border-[#D4C9BE] bg-transparent text-[#D4C9BE] placeholder-[#AFA79D] focus:outline-none"
              />
              <button
                onClick={checkVoucher}
                disabled={voucherLoading}
                className="px-4 py-3 rounded-md bg-[#6B5B95] hover:bg-[#5a4c7e] text-white font-semibold"
              >
                {voucherLoading ? "Memeriksa..." : "Cek"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransactionList
              selectedItems={parsedData.selectedItems}
              totalPrice={parsedData.totalPrice}
              onTotalChange={(newTotal) => setFinalTotal(newTotal)}
            />
            <PaymentMethods
              methods={paymentMethods}
              onPay={handlePayment}
              loading={loading}
            />
          </div>
          <PaymentModal snapUrl={snapUrl} onClose={closeModal} />
        </>
      )}
    </div>
  )
}

export default Page
