import React, { useState } from 'react'
import { User, Mail, Lock, Users } from 'lucide-react'

const Create = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/accounts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create account')
      }

      const data = await response.json()
      console.log('Success:', data)
      // Reset form jika perlu
      setFormData({ full_name: '', email: '', role: '', password: '' })
      alert('Account created successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to create account')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#030303] rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="text-[#F1EFEC]" />
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <Mail className="text-[#F1EFEC]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <Users className="text-[#F1EFEC]" />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Lock className="text-[#F1EFEC]" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4C9BE] text-[#030303] py-2 rounded hover:bg-[#D4C9BE] font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Create
