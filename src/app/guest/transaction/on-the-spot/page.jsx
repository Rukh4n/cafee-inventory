"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const dataParam = searchParams.get("data")
  const [parsedData, setParsedData] = useState({ selectedItems: [], totalPrice: 0 })
  const [loading, setLoading] = useState(false)
  const [snapUrl, setSnapUrl] = useState(null)

  const paymentMethods = ["Transfer Bank", "Manual via Kasir", "QRIS"]

  useEffect(() => {
    if (dataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(dataParam))
        setParsedData(data)
      } catch (error) {}
    }
  }, [dataParam])

  const handlePayment = async (method) => {
    const payload = {
      items: parsedData.selectedItems,
      totalPrice: parsedData.totalPrice,
      paymentMethod: method
    }

    try {
      setLoading(true)
      const res = await fetch("/api/guest/transaction/on-the-spot/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success && data.paymentUrl) {
        setSnapUrl(data.paymentUrl)
      } else {
        alert("Transaksi gagal. Cek console untuk detail.")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat membuat transaksi.")
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setSnapUrl(null)
  }

  return (
    <div className="p-6 min-h-screen text-[#D4C9BE]">
      <h1 className="text-2xl font-bold mb-6">On The Spot Transaction</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {parsedData.selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-[#030303] border border-[#D4C9BE] rounded-md"
            >
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="font-semibold text-[#D4C9BE]">{item.name}</h2>
                  <p className="text-sm text-[#D4C9BE]">
                    {item.category} • Rp {item.price.toLocaleString()} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-[#D4C9BE] font-semibold">
                Rp {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
          <div className="flex justify-between p-4 font-bold border-t border-[#D4C9BE]">
            <span>Total</span>
            <span>Rp {parsedData.totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold mb-2">Pilih Metode Pembayaran</h2>
          {paymentMethods.map((method) => (
            <button
              key={method}
              onClick={() => handlePayment(method)}
              disabled={loading}
              className="p-4 bg-[#030303] border border-[#D4C9BE] rounded-md text-[#D4C9BE] hover:bg-[#D4C9BE] hover:text-[#030303] transition"
            >
              {loading ? "Memproses..." : method}
            </button>
          ))}
        </div>
      </div>

      {snapUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-[#030303] rounded-lg w-full max-w-3xl p-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-[#D4C9BE] text-lg font-bold"
            >
              &times;
            </button>
            <iframe
              src={snapUrl}
              className="w-full h-[80vh] rounded-md"
              frameBorder="0"
              title="Midtrans Snap"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
