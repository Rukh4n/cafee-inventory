import React from "react"

const PaymentModal = ({ paymentUrl, setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#030303] p-4 rounded-lg shadow-lg max-h-[80vh] text-[#F1EFEC] inline-block w-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">Pembayaran Midtrans</h3>
          <button onClick={() => setShowModal(false)} className="text-[#D4C9BE] text-xl font-bold">×</button>
        </div>
        <iframe
          src={paymentUrl}
          className="w-full h-[70vh] border-none rounded"
          title="Midtrans Payment"
        ></iframe>
      </div>
    </div>
  )
}

export default PaymentModal
