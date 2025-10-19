"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Coffee, ShoppingCart, Truck } from "lucide-react"
import OrderList from "./componnents/OrderList"
import OrderDetail from "./componnents/OrderDetail"
import TotalPriceMobile from "./componnents/TotalPriceMobile"

const Page = () => {
  const { data: session } = useSession()
  const [orders, setOrders] = useState([])
  const [selectedOrders, setSelectedOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.id) return
      try {
        const res = await fetch(`/api/guest/order-list?userId=${session.user.id}`)
        if (!res.ok) throw new Error("Gagal mengambil data pesanan")
        const data = await res.json()
        const initializedOrders = data.map((order) => ({
          ...order,
          quantity: order.quantity || 1,
        }))
        setOrders(initializedOrders)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [session])

  const handleSelect = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
  }

  const handleQuantityChange = (orderId, delta) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, quantity: Math.max(1, order.quantity + delta) }
          : order
      )
    )
  }

  const selectedItems = orders.filter((order) =>
    selectedOrders.includes(order.id)
  )
  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  if (loading)
    return <div className="p-6 text-center">Memuat data pesanan...</div>
  if (!orders.length)
    return <div className="p-6 text-center">Tidak ada pesanan ditemukan.</div>

  const encodedData = encodeURIComponent(JSON.stringify({ selectedItems, totalPrice }))

  return (
    <div className="p-0 min-h-screen bg-gradient-to-br from-[#030303] via-[#4a3e36] to-[#D4C9BE] text-[#F1EFEC] grid grid-cols-1 lg:grid-cols-2">
      <OrderList
        orders={orders}
        selectedOrders={selectedOrders}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
        handleQuantityChange={handleQuantityChange}
        selectedItems={selectedItems}
      />
      <OrderDetail selectedItems={selectedItems} totalPrice={totalPrice} />
      <TotalPriceMobile totalPrice={totalPrice} selectedItems={selectedItems} />

      {selectedItems.length > 0 && (
        <div className="mt-6 flex justify-center lg:col-span-2 gap-4">
          <Link
            href={`/guest/transaction/on-the-spot?data=${encodedData}`}
            className="flex flex-col items-center px-4 py-2 bg-[#030303] border border-[#D4C9BE] rounded-md transition hover:bg-[#D4C9BE] hover:text-[#030303]"
          >
            <Coffee size={24} />
            <span className="text-sm">Makan Sini</span>
          </Link>
          <Link
            href={`/guest/transaction/wrap?data=${encodedData}`}
            className="flex flex-col items-center px-4 py-2 bg-[#030303] border border-[#D4C9BE] rounded-md transition hover:bg-[#D4C9BE] hover:text-[#030303]"
          >
            <ShoppingCart size={24} />
            <span className="text-sm">Bungkus</span>
          </Link>
          <Link
            href={`/guest/transaction/delivery-order?data=${encodedData}`}
            className="flex flex-col items-center px-4 py-2 bg-[#030303] border border-[#D4C9BE] rounded-md transition hover:bg-[#D4C9BE] hover:text-[#030303]"
          >
            <Truck size={24} />
            <span className=" text-sm">Antar</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Page
