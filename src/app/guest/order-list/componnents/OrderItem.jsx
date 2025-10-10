// app/guest-order/componnents/OrderItem.jsx
import React from "react"
import { Plus, Minus } from "lucide-react"

const OrderItem = ({
  order,
  selectedOrders,
  handleSelect,
  handleQuantityChange,
}) => {
  return (
    <div
      onClick={() => handleSelect(order.id)}
      className={`flex items-center justify-between cursor-pointer bg-[#030303] border ${
        selectedOrders.includes(order.id)
          ? "border-[#D4C9BE]"
          : "border-[#4a3e36]"
      } rounded-xl p-3 sm:p-4 shadow-lg transition-all duration-200 hover:scale-[1.01]`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="w-5 h-5 rounded-md border border-[#D4C9BE] transition-colors duration-200"
          style={{
            backgroundColor: selectedOrders.includes(order.id)
              ? "#D4C9BE"
              : "#030303",
          }}
        ></div>
        <img
          src={order.image}
          alt={order.name}
          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-[#D4C9BE]"
        />
        <div>
          <h2 className="font-semibold text-sm sm:text-base">{order.name}</h2>
          <p className="text-xs sm:text-sm text-[#D4C9BE]">
            Rp {order.price.toLocaleString()}
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => handleQuantityChange(order.id, -1)}
          className="p-1 rounded-md border border-[#D4C9BE] hover:bg-[#4a3e36] transition"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center text-sm">{order.quantity}</span>
        <button
          onClick={() => handleQuantityChange(order.id, 1)}
          className="p-1 rounded-md border border-[#D4C9BE] hover:bg-[#4a3e36] transition"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

export default OrderItem
