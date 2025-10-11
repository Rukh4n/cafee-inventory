// Page Component
"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const dataParam = searchParams.get("data")
  const [parsedData, setParsedData] = useState({ selectedItems: [], totalPrice: 0 })
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: ""
  })
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState("")

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({ ...prev, name: session.user.name }))
    }
  }, [session])

  useEffect(() => {
    if (dataParam) {
      try {
        const decoded = decodeURIComponent(dataParam)
        const jsonData = JSON.parse(decoded)
        setParsedData(jsonData)
      } catch (error) {
        console.error("Gagal memparsing data:", error)
      }
    }
  }, [dataParam])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    if (!formData.name || !formData.phoneNumber || !formData.address) {
      alert("Harap lengkapi semua informasi pengiriman.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/guest/transaction/delivery/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: parsedData.selectedItems,
          totalPrice: parsedData.totalPrice,
          paymentMethod: "Midtrans",
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          transactionType: "delivery"
        })
      })
      const data = await response.json()
      console.log("Response pembayaran:", data)
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl)
        setShowModal(true)
      }
    } catch (error) {
      console.error("Error payment:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#F1EFEC]">
      <div className="p-4 lg:p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Detail Pesanan</h2>
        <ul>
          {parsedData.selectedItems.map((item) => (
            <li key={item.id} className="mb-4 flex items-center gap-4 bg-[#030303] border border-[#D4C9BE] p-3 rounded-md">
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

      <div className="p-4 lg:p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Informasi Pengiriman</h2>
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handlePayment() }}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" className="w-full p-3 rounded bg-[#030303] border border-[#D4C9BE]" />
          <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="No. Telepon" className="w-full p-3 rounded bg-[#030303] border border-[#D4C9BE]" />
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Alamat" rows={5} className="w-full p-3 rounded bg-[#030303] border border-[#D4C9BE]" />
          <button type="submit" disabled={loading} className="mt-4 bg-[#D4C9BE] text-[#030303] py-3 rounded">{loading ? "Memproses..." : "Bayar Sekarang"}</button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#030303] p-4 rounded-lg shadow-lg max-h-[80vh] text-[#F1EFEC] inline-block w-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">Pembayaran Midtrans</h3>
              <button onClick={() => setShowModal(false)} className="text-[#D4C9BE] text-xl font-bold">×</button>
            </div>
            <iframe src={paymentUrl} className="w-full h-[70vh] border-none rounded" title="Midtrans Payment"></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
