// app/guest-order/componnents/OrderDetail.jsx
"use client"
import React from "react"

const OrderDetail = ({ selectedItems, totalPrice }) => {
  return (
    <div className="hidden lg:block">
      <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center">
        Detail Pesanan
      </h2>
      {selectedItems.length === 0 ? (
        <p className="text-center text-[#D4C9BE] text-sm sm:text-base">
          Belum ada pesanan yang dipilih.
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#030303] border border-[#D4C9BE] rounded-xl p-3 sm:p-4 shadow-lg"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-[#D4C9BE]"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D4C9BE]">
                    {item.quantity} x Rp {item.price.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold mt-1">
                    Subtotal: Rp{" "}
                    {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-right border-t border-[#D4C9BE] pt-3 sm:pt-4">
            <h3 className="text-lg sm:text-xl font-bold">
              Total: Rp {totalPrice.toLocaleString()}
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetail
