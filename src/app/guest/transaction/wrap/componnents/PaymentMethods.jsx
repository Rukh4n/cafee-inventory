import React from "react"

const PaymentMethods = ({ handlePayment, loading }) => {
  return (
    <div className="p-4 lg:p-6 rounded-md shadow-md flex flex-col gap-4 items-center justify-center bg-[#030303] border border-[#D4C9BE]">
      <h2 className="text-2xl font-bold mb-4">Pilih Metode Pembayaran</h2>
      <button
        onClick={() => handlePayment("Manual via Kasir")}
        disabled={loading}
        className="w-full py-3 bg-[#030303] text-[#D4C9BE] border border-[#D4C9BE] rounded-md font-semibold hover:bg-[#D4C9BE] hover:text-[#030303] transition"
      >
        {loading ? "Memproses..." : "Bayar Via Kasir"}
      </button>
      <button
        onClick={() => handlePayment("Metode Pembayaran Online")}
        disabled={loading}
        className="w-full py-3 bg-[#030303] text-[#D4C9BE] border border-[#D4C9BE] rounded-md font-semibold hover:bg-[#D4C9BE] hover:text-[#030303] transition"
      >
        {loading ? "Memproses..." : "Metode Pembayaran Online"}
      </button>
    </div>
  )
}

export default PaymentMethods
