import React from "react"
import { X } from "lucide-react"

const CreateProductModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-[#030303] text-[#F1EFEC] p-4 md:p-6 rounded-2xl shadow-lg relative max-h-[90vh] overflow-y-auto w-full md:max-w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#F1EFEC] hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Product</h2>
        {children}
      </div>
    </div>
  )
}

export default CreateProductModal
