import React from "react"
import { X, Trash2 } from "lucide-react"

const DetailProductModal = ({ children, product, onClose, onDelete }) => {
  if (!product) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-[#030303] text-[#F1EFEC] p-4 md:p-6 rounded-2xl shadow-lg relative max-h-[90vh] overflow-y-auto w-full md:max-w-full">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#F1EFEC] hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Konten Detail */}
        {children}

        {/* Tombol Hapus */}
        <button
          onClick={() => onDelete(product.id)}
          className="flex items-center justify-center gap-2 mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition"
        >
          <Trash2 size={16} /> Delete Product
        </button>
      </div>
    </div>
  )
}

export default DetailProductModal
