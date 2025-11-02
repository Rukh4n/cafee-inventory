import React, { useState, useEffect } from "react"

const TransactionList = ({ selectedItems, totalPrice, onTotalChange }) => {
  const [voucher, setVoucher] = useState("")
  const [discountedTotal, setDiscountedTotal] = useState(totalPrice)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDiscountedTotal(totalPrice)
  }, [totalPrice])

  const handleCheckVoucher = async () => {
    if (!voucher.trim()) {
      setMessage("Kode voucher tidak boleh kosong.")
      setDiscountedTotal(totalPrice)
      onTotalChange(totalPrice)
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/guest/promotion/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucher, totalPrice }),
      })
      const data = await res.json()

      if (data.success) {
        setDiscountedTotal(data.newTotal)
        setMessage(data.message)
        onTotalChange(data.newTotal)
      } else {
        setDiscountedTotal(totalPrice)
        setMessage(data.message)
        onTotalChange(totalPrice)
      }
    } catch (error) {
      setMessage("Terjadi kesalahan saat mengecek voucher.")
      setDiscountedTotal(totalPrice)
      onTotalChange(totalPrice)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {selectedItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 bg-[#030303] border border-[#D4C9BE] rounded-md"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
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

      {/* Input Voucher */}
      <div className="p-4 bg-[#030303] border border-[#D4C9BE] rounded-md space-y-3">
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
      <div className="flex justify-between p-4 font-bold border-t border-[#D4C9BE]">
        <span>Total</span>
        <span>Rp {discountedTotal.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default TransactionList
