// PaymentModal.jsx
import React from "react"

const PaymentModal = ({ snapUrl, onClose }) => {
  if (!snapUrl) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#030303] rounded-lg p-4 relative inline-block max-w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#D4C9BE] text-lg font-bold"
        >
          &times;
        </button>
        <iframe
          src={snapUrl}
          className="rounded-md max-w-full w-auto h-[80vh]"
          frameBorder="0"
          title="Midtrans Snap"
        ></iframe>
      </div>
    </div>
  )
}

export default PaymentModal
