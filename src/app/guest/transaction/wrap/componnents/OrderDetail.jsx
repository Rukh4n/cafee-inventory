import React from "react"

const OrderDetail = ({ parsedData }) => {
  return (
    <div className="p-4 lg:p-6 rounded-md shadow-md bg-[#030303] border border-[#D4C9BE]">
      <h2 className="text-2xl font-bold mb-4">Detail Pesanan</h2>
      <ul>
        {parsedData.selectedItems.map((item) => (
          <li key={item.id} className="mb-4 flex items-center gap-4 p-3 rounded-md bg-[#030303] border border-[#D4C9BE]">
            <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
            <div className="flex-1">
              <p className="text-lg sm:text-xl font-semibold">{item.name}</p>
              <p className="text-md sm:text-lg">{item.quantity} x {item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <p className="text-xl sm:text-2xl font-bold">Total Item: {parsedData.selectedItems.length}</p>
        <p className="text-xl sm:text-2xl font-bold">Total Harga: {parsedData.totalPrice}</p>
      </div>
    </div>
  )
}

export default OrderDetail
