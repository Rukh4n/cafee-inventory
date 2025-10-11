// TransactionList.jsx
import React from "react"

const TransactionList = ({ selectedItems, totalPrice }) => {
  return (
    <div className="space-y-4">
      {selectedItems.map((item) => (
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
        <span>Rp {totalPrice.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default TransactionList
