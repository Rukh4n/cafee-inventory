import React from 'react'
import Detail from '../detail'

const DetailUserModal = ({ user, onClose, onDelete }) => {
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
        <h2 className="text-xl font-semibold mb-4 text-center">User Details</h2>
        <Detail user={user} onSuccess={() => window.location.reload()} />
        <button onClick={() => onDelete(user.id)} className={buttonClass}>
          Delete User
        </button>
      </div>
    </div>
  )
}

export default DetailUserModal
