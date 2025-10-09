import React, { useState } from 'react'
import { User, Mail, Lock, Users, Edit2, X, Save, Calendar } from 'lucide-react'

const Detail = ({ user, onSuccess }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    password: user?.password || ''
  })

  if (!user) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleToggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/accounts/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user.id, ...formData })
      })

      if (!response.ok) throw new Error('Failed to update user')

      const data = await response.json()
      console.log('Success:', data)
      alert('User updated successfully!')
      setIsEditing(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to update user')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-[#030303] rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#F1EFEC]">User Details</h3>
        <div className="flex gap-2">
          <button
            onClick={isEditing ? handleSave : handleToggleEdit}
            className="flex items-center gap-2 bg-[#D4C9BE] text-[#030303] px-3 py-1 rounded hover:bg-[#F1EFEC] transition"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={handleToggleEdit}
              className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <p className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <strong>ID:</strong> {user.id}
        </p>

        <p className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <strong>Name:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            />
          ) : (
            user.name
          )}
        </p>

        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <strong>Email:</strong>{' '}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            />
          ) : (
            user.email
          )}
        </p>

        <p className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <strong>Password:</strong>{' '}
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            />
          ) : (
            '********'
          )}
        </p>

        <p className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <strong>Role:</strong>{' '}
          {isEditing ? (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-[#123458] text-[#F1EFEC]"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          ) : (
            user.role
          )}
        </p>

        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default Detail
