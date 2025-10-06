"use client"
import React, { useState } from "react"
import Create from "./create"

const Page = () => {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="p-6 min-h-screen text-[#F1EFEC] bg-[#030303]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-lg hover:opacity-90 transition"
        >
          Add Product
        </button>
      </div>

      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-[#030303] text-[#F1EFEC] p-6 rounded-2xl shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-3 right-3 text-[#F1EFEC] hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Product</h2>
            <Create />
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
