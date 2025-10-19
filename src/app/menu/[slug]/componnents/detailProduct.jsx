'use client'
import React, { useEffect, useState } from 'react'
import { PlusCircle, X, CheckCircle, AlertTriangle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const DetailProduct = ({ slug }) => {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [alertModal, setAlertModal] = useState({ visible: false, type: '', message: '' })
  const { data: session } = useSession()

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/guest/menu/${slug}`)
        const data = await res.json()
        setMenu(data)
      } catch (error) {
        console.error('Error fetching menu:', error)
      }
    }
    fetchMenu()
  }, [slug])

  const showAlert = (type, message) => {
    setAlertModal({ visible: true, type, message })
    setTimeout(() => {
      setAlertModal({ visible: false, type: '', message: '' })
    }, 3000)
  }

  const handleAddToOrderList = async () => {
    if (!session?.user) {
      setShowModal(true)
      return
    }

    if (!menu) return
    setLoading(true)
    try {
      const res = await fetch('/api/guest/order-list/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          productId: menu.id,
          name: menu.name,
          price: menu.price,
          category: menu.category,
          image: menu.image,
          quantity: 1,
        }),
      })
      if (!res.ok) throw new Error('Gagal menambahkan ke daftar pesanan')
      showAlert('success', 'Berhasil menambahkan ke daftar pesanan!')
    } catch (error) {
      console.error('Error:', error)
      showAlert('error', 'Terjadi kesalahan, coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (!menu) return <div className="p-6 text-[#F1EFEC] min-h-screen">Loading...</div>

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-[#030303] via-[#4a3e36] to-[#D4C9BE] flex items-center justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {/* Kolom Gambar */}
          <div className="bg-[#030303] border border-[#D4C9BE] rounded-md p-4 flex items-center justify-center">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Kolom Detail */}
          <div className="bg-[#030303] border border-[#D4C9BE] rounded-md p-8 flex flex-col justify-center text-[#F1EFEC]">
            <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
            <p className="mb-2 text-lg">Kategori: {menu.category}</p>
            <p className="mb-2 text-lg">Stok: {menu.stock}</p>
            <p className="text-2xl font-semibold mb-6">Rp {menu.price.toLocaleString()}</p>

            <button
              onClick={handleAddToOrderList}
              disabled={loading}
              className={`flex items-center justify-center gap-2 bg-[#D4C9BE] text-[#030303] font-semibold py-3 rounded-lg transition ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              <PlusCircle size={20} />
              {loading ? 'Menambahkan...' : 'Tambah Ke Daftar Pesanan'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Login */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#030303] border border-[#D4C9BE] rounded-xl p-8 text-center max-w-sm w-full text-[#F1EFEC] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-[#D4C9BE] hover:text-white transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Kamu Belum Login</h2>
            <p className="mb-6 text-sm text-[#D4C9BE]">
              Silakan daftar atau login terlebih dahulu untuk menambahkan ke daftar pesanan.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/auth/register"
                className="bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Daftar
              </Link>
              <Link
                href="/auth/login"
                className="border border-[#D4C9BE] text-[#D4C9BE] px-4 py-2 rounded-lg font-semibold hover:bg-[#D4C9BE] hover:text-[#030303] transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Alert */}
      {alertModal.visible && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm font-semibold transition-all duration-300 ${
              alertModal.type === 'success'
                ? 'bg-green-600/90 border-green-400 text-white'
                : 'bg-red-600/90 border-red-400 text-white'
            }`}
          >
            {alertModal.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
            <span>{alertModal.message}</span>
            <button
              onClick={() => setAlertModal({ visible: false, type: '', message: '' })}
              className="ml-3 hover:opacity-70 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailProduct
