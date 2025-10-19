import React from "react"
import Create from "../create"

export default function CreateCategoryModal ({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#030303] rounded-2xl shadow-lg p-6 w-full max-w-md border border-[#D4C9BE]">
        <div className="flex justify-between items-center mb-4 border-b border-[#D4C9BE] pb-2">
          <h2 className="text-lg font-semibold text-[#F1EFEC]">Create Category</h2>
          <button
            onClick={onClose}
            className="text-[#F1EFEC] hover:text-[#D4C9BE] font-bold text-lg"
          >
            ✕
          </button>
        </div>
        <div className="bg-[#123458] rounded-xl p-4">
          <Create onSuccess={() => window.location.reload()} />
        </div>
      </div>
    </div>
  )
}

