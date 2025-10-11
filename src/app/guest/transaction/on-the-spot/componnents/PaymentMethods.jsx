// PaymentMethods.jsx
import React from "react"

const PaymentMethods = ({ methods, onPay, loading }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold mb-2">Pilih Metode Pembayaran</h2>
      {methods.map((method) => (
        <button
          key={method}
          onClick={() => onPay(method)}
          disabled={loading}
          className="p-4 bg-[#030303] border border-[#D4C9BE] rounded-md text-[#D4C9BE] hover:bg-[#D4C9BE] hover:text-[#030303] transition"
        >
          {loading ? "Memproses..." : method}
        </button>
      ))}
    </div>
  )
}

export default PaymentMethods
