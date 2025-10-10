import React from "react"
import { Plus, Minus, Trash2 } from "lucide-react"

const OrderList = ({
  orders = [],
  selectedOrders = [],
  handleSelect = () => {},
  handleSelectAll = () => {},
  handleQuantityChange = () => {},
}) => {
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/guest/order-list/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error("Gagal menghapus pesanan")
      console.log(`Pesanan dengan id ${id} berhasil dihapus`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (id, value) => {
    const quantity = Math.max(1, Number(value) || 1)
    handleQuantityChange(id, quantity - orders.find(o => o.id === id).quantity)
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Daftar Pesanan Anda
      </h1>

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button
          onClick={handleSelectAll}
          className="px-3 sm:px-4 py-2 bg-[#D4C9BE] text-[#030303] text-sm sm:text-base font-semibold rounded-md hover:bg-[#b9afa5] transition"
        >
          {selectedOrders.length === orders.length
            ? "Batalkan Pilih Semua"
            : "Pilih Semua"}
        </button>
        <span className="text-xs sm:text-sm text-[#D4C9BE]">
          {selectedOrders.length} dipilih dari {orders.length}
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`flex flex-col sm:flex-row items-center justify-between bg-[#030303] border ${
              selectedOrders.includes(order.id)
                ? "border-[#D4C9BE]"
                : "border-[#4a3e36]"
            } rounded-xl p-3 sm:p-4 shadow-lg transition-all duration-200 hover:scale-[1.01]`}
          >
            <div
              onClick={() => handleSelect(order.id)}
              className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto cursor-pointer"
            >
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
                <h2 className="font-semibold text-sm sm:text-base">
                  {order.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#D4C9BE]">
                  Rp {(order.price || 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-2 mt-2 sm:mt-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => handleQuantityChange(order.id, -1)}
                className="p-1 rounded-md border border-[#D4C9BE] hover:bg-[#D4C9BE] transition"
              >
                <Minus size={16} color="#D4C9BE" />
              </button>
              <input
                type="number"
                min="1"
                value={order.quantity}
                onChange={(e) => handleInputChange(order.id, e.target.value)}
                className="w-12 text-center text-sm bg-[#030303] border border-[#D4C9BE] rounded-md text-[#D4C9BE]"
              />
              <button
                onClick={() => handleQuantityChange(order.id, 1)}
                className="p-1 rounded-md border border-[#D4C9BE] hover:bg-[#D4C9BE] transition"
              >
                <Plus size={16} color="#D4C9BE" />
              </button>
              <button
                onClick={() => handleDelete(order.id)}
                className="p-1 rounded-md border border-[#D4C9BE] hover:bg-[#D4C9BE] transition ml-2"
              >
                <Trash2 size={16} color="#D4C9BE" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderList
