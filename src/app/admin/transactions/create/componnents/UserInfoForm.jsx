// UserInfoForm.jsx
'use client'
import React from 'react'

const UserInfoForm = ({ formData = {}, handleChange }) => {
  const safeFormData = {
    name: formData.name || '',
    userId: formData.userId || '',
    tableNumber: formData.tableNumber || '',
    phoneNumber: formData.phoneNumber || '',
    address: formData.address || '',
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col text-[#F1EFEC]">
        Name
        <input
          type="text"
          name="name"
          value={safeFormData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#030303] text-[#F1EFEC] focus:outline-none focus:ring-2 focus:ring-[#D4C9BE]"
        />
      </label>

      <label className="flex flex-col text-[#F1EFEC]">
        User ID
        <input
          type="text"
          name="userId"
          value={safeFormData.userId}
          onChange={handleChange}
          placeholder="Enter your user ID"
          className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#030303] text-[#F1EFEC] focus:outline-none focus:ring-2 focus:ring-[#D4C9BE]"
        />
      </label>

      <label className="flex flex-col text-[#F1EFEC]">
        Table Number
        <input
          type="text"
          name="tableNumber"
          value={safeFormData.tableNumber}
          onChange={handleChange}
          placeholder="Enter table number"
          className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#030303] text-[#F1EFEC] focus:outline-none focus:ring-2 focus:ring-[#D4C9BE]"
        />
      </label>

      <label className="flex flex-col text-[#F1EFEC]">
        Phone Number
        <input
          type="text"
          name="phoneNumber"
          value={safeFormData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#030303] text-[#F1EFEC] focus:outline-none focus:ring-2 focus:ring-[#D4C9BE]"
        />
      </label>

      <label className="flex flex-col text-[#F1EFEC]">
        Address
        <textarea
          name="address"
          value={safeFormData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          className="px-3 py-2 rounded border border-[#D4C9BE] bg-[#030303] text-[#F1EFEC] focus:outline-none focus:ring-2 focus:ring-[#D4C9BE] resize-none"
          rows={4}
        />
      </label>
    </div>
  )
}

export default UserInfoForm
