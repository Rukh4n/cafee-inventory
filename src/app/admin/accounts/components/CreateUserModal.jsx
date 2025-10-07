import React from 'react'
import Create from '../create'

const CreateUserModal = ({ onClose }) => {
  const buttonClass =
    "bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] text-[#F1EFEC] p-6 rounded-xl w-[90%] sm:w-[500px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-[#F1EFEC] hover:text-red-400 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add New Account
        </h2>
        <Create onClose={onClose} />
      </div>
    </div>
  )
}

export default CreateUserModal
