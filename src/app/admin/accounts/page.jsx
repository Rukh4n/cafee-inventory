"use client"
import React, { useEffect, useState } from "react"
import { Search } from "lucide-react"
import Create from "./create"
import Detail from "./detail"

const Page = () => {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const fetchUsers = async (query = "") => {
    try {
      const res = await fetch(`/api/accounts?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchUsers(searchQuery)
  }

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setShowDetailModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      const response = await fetch("/api/accounts/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete user")
      const data = await response.json()
      console.log("Deleted:", data)
      setUsers(users.filter((u) => u.id !== id))
      setShowDetailModal(false)
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("Failed to delete user")
    }
  }

  const buttonClass =
    "bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"

  return (
    <div className="min-h-screen bg-[#030303] text-[#F1EFEC] p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#D4C9BE]">User Accounts</h1>
        <button onClick={() => setShowCreateModal(true)} className={buttonClass}>
          Add Account
        </button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
        <div
          className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-[#123458]"
          style={{ borderColor: "#D4C9BE" }}
        >
          <Search className="w-5 h-5 text-[#F1EFEC]" />
          <input
            type="text"
            placeholder="Search user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder-gray-300 text-[#F1EFEC]"
          />
        </div>
        <button type="submit" className={buttonClass}>
          Search
        </button>
      </form>

      <div className="overflow-x-auto">
        <div className="min-w-max inline-block">
          <table className="w-full border border-[#D4C9BE] rounded-lg overflow-hidden text-sm sm:text-base">
            <thead className="bg-[#123458] text-[#F1EFEC]">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className="border-t border-[#D4C9BE] hover:bg-[#D4C9BE] hover:text-[#030303] cursor-pointer transition"
                >
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-[#F1EFEC] p-6 rounded-xl w-[90%] sm:w-[500px] shadow-lg relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-3 right-4 text-[#F1EFEC] hover:text-red-400 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add New Account
            </h2>
            <Create onClose={() => setShowCreateModal(false)} />
          </div>
        </div>
      )}

      {/* Detail User Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-[#F1EFEC] p-6 rounded-xl w-[90%] sm:w-[500px] shadow-lg relative">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-3 right-4 text-[#F1EFEC] hover:text-red-400 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              User Details
            </h2>
            <Detail user={selectedUser} />
            <button onClick={() => handleDelete(selectedUser.id)} className={buttonClass}>
              Delete User
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
