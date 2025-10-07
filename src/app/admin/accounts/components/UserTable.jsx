import React from 'react'

const UserTable = ({ users, onUserClick }) => {
  return (
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
                onClick={() => onUserClick(user)}
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
  )
}

export default UserTable
