"use client"
import React, { useEffect, useState } from "react"
import UserTable from "./components/UserTable"
import SearchBar from "./components/SearchBar"
import CreateUserModal from "./components/CreateUserModal"
import DetailUserModal from "./components/DetailUserModal"

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
        headers: { "Content-Type": "application/json" },
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
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* User Table */}
      <UserTable users={users} onUserClick={handleUserClick} />

      {/* Create User Modal */}
      {showCreateModal && <CreateUserModal onClose={() => setShowCreateModal(false)} />}

      {/* Detail User Modal */}
      {showDetailModal && selectedUser && (
        <DetailUserModal
          user={selectedUser}
          onClose={() => setShowDetailModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Page
