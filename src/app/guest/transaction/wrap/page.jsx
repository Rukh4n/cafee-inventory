"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import OrderDetail from "./componnents/OrderDetail"
import PaymentMethods from "./componnents/PaymentMethods"
import PaymentModal from "./componnents/PaymentModal"

const Page = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const dataParam = searchParams.get("data")
  const [parsedData, setParsedData] = useState({ selectedItems: [], totalPrice: 0 })
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: ""
  })
  const [loading, setLoading] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState(null)

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

  const handlePayment = async (method) => {
    setLoading(true)
    try {
      const response = await fetch("/api/guest/transaction/wrap/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: parsedData.selectedItems || [],
          totalPrice: parsedData.totalPrice || 0,
          paymentMethod: method || "",
          name: formData.name || "",
          phoneNumber: formData.phoneNumber || "",
          address: formData.address || "",
          transactionType: "wrap"
        })
      })

      const data = await response.json()
      if (data.success) {
        if (method === "Manual via Kasir") {
          router.push("/guest/transaction")
        } else if (method === "Metode Pembayaran Online" && data.paymentUrl) {
          setPaymentUrl(data.paymentUrl)
        }
      } else {
        alert("Transaksi gagal. Silakan cek kembali.")
      }
    } catch (error) {
      console.error("Error payment:", error)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => setPaymentUrl(null)

  return (
    <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#F1EFEC] min-h-screen">
      <OrderDetail parsedData={parsedData} formData={formData} handleChange={handleChange} />
      <PaymentMethods handlePayment={handlePayment} loading={loading} />
      <PaymentModal snapUrl={paymentUrl} onClose={closeModal} />
    </div>
  )
}

export default Page
