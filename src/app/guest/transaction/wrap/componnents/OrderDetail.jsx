import React, { useState, useEffect } from "react"

const OrderDetail = ({ parsedData, onTotalChange }) => {
  const [voucher, setVoucher] = useState("")
  const [discountedTotal, setDiscountedTotal] = useState(parsedData.totalPrice)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDiscountedTotal(parsedData.totalPrice)
  }, [parsedData.totalPrice])

  const handleCheckVoucher = async () => {
    if (!voucher.trim()) {
      setMessage("Kode voucher tidak boleh kosong.")
      setDiscountedTotal(parsedData.totalPrice)
      onTotalChange(parsedData.totalPrice)
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/guest/promotion/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucher, totalPrice: parsedData.totalPrice }),
      })
      const data = await res.json()

      if (data.success) {
        setDiscountedTotal(data.newTotal)
        setMessage(data.message)
        onTotalChange(data.newTotal)
      } else {
        setDiscountedTotal(parsedData.totalPrice)
        setMessage(data.message)
        onTotalChange(parsedData.totalPrice)
      }
    } catch (error) {
      setMessage("Terjadi kesalahan saat mengecek voucher.")
      setDiscountedTotal(parsedData.totalPrice)
      onTotalChange(parsedData.totalPrice)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 lg:p-6 rounded-md shadow-md bg-[#030303] border border-[#D4C9BE]">
      <h2 className="text-2xl font-bold mb-4">Detail Pesanan</h2>
      <ul>
        {parsedData.selectedItems.map((item) => (
          <li
            key={item.id}
            className="mb-4 flex items-center gap-4 p-3 rounded-md bg-[#030303] border border-[#D4C9BE]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-lg sm:text-xl font-semibold">{item.name}</p>
              <p className="text-md sm:text-lg">
                {item.quantity} x Rp {item.price.toLocaleString()}
              </p>
            </div>
            <div className="text-[#D4C9BE] font-semibold">
              Rp {(item.price * item.quantity).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      {/* Input Voucher */}
      <div className="mt-4 p-4 bg-[#030303] border border-[#D4C9BE] rounded-md space-y-3">
        <label className="block font-medium text-[#D4C9BE]">Kode Voucher</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            placeholder="Masukkan kode voucher"
            className="flex-1 p-2 rounded-md border border-[#D4C9BE] bg-transparent text-[#D4C9BE] placeholder-[#AFA79D] focus:outline-none"
          />
          <button
            onClick={handleCheckVoucher}
            disabled={loading}
            className="px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-md font-semibold hover:bg-[#b9a892] transition"
          >
            {loading ? "Memeriksa..." : "Cek"}
          </button>
        </div>
        {message && <p className="text-sm text-green-400">{message}</p>}
      </div>

      {/* Total */}
      <div className="mt-4 text-right">
        <p className="text-xl sm:text-2xl font-bold">
          Total Item: {parsedData.selectedItems.length}
        </p>
        <p className="text-xl sm:text-2xl font-bold">
          Total Harga: Rp {discountedTotal.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default OrderDetail
