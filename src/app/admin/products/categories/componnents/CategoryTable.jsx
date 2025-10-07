import React from "react"
import { Trash2 } from "lucide-react"

const CategoryTable = ({ categories, loading, onDelete, onRowClick }) => {
  return (
    <div className="w-full overflow-x-auto border border-[#D4C9BE] rounded-lg">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-[#1C1C1C] text-[#D4C9BE] text-sm sm:text-base">
          <tr>
            <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap">#</th>
            <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap">Name</th>
            <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap">Created At</th>
            <th className="p-3 border-b border-[#D4C9BE] whitespace-nowrap text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm sm:text-base">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr
                key={category.id}
                className="hover:bg-[#1F1F1F] transition-colors cursor-pointer"
              >
                <td
                  className="p-3 border-b border-[#D4C9BE] whitespace-nowrap"
                  onClick={() => onRowClick(category)}
                >
                  {index + 1}
                </td>
                <td
                  className="p-3 border-b border-[#D4C9BE] whitespace-nowrap"
                  onClick={() => onRowClick(category)}
                >
                  {category.name}
                </td>
                <td
                  className="p-3 border-b border-[#D4C9BE] whitespace-nowrap"
                  onClick={() => onRowClick(category)}
                >
                  {new Date(category.createdAt).toLocaleString()}
                </td>
                <td className="p-3 border-b border-[#D4C9BE] text-center">
                  <button
                    onClick={() => onDelete(category.id)}
                    disabled={loading}
                    className="p-2 bg-red-600 text-[#F1EFEC] rounded-lg hover:opacity-80 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-[#D4C9BE] italic">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryTable
