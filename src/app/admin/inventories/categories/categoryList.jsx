'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCategory } from '@/app/action/categoryAction'
import EditCategoryForm from './editCategoryForm'
import { Pencil, Trash2 } from 'lucide-react'

export default function CategoryList({ category }) {
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const id = parseInt(formData.get('id'))
      return await deleteCategory(id)
    },
    null
  )

  useEffect(() => {
    if (state?.success) {
      setConfirmDelete(null)
      router.refresh()
    }
  }, [state?.success, router])

  const categoryEdit = category.find((item) => item.id === editing)
  const filteredCategory = category.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="text-[#F1EFEC] bg-[#030303] min-h-screen p-4 bg-[#030303]">
      

      <ul className="space-y-2">
        {filteredCategory.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-2 rounded-md border border-[#D4C9BE]"
          >
            <span>{item.name}</span>
            <div className="flex gap-1">
              <button
                onClick={() => setConfirmDelete(item.id)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold bg-[#D4C9BE] text-[#030303]"
              >
                <Trash2 size={14} />
                Hapus
              </button>
              <button
                onClick={() => setEditing(item.id)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold bg-[#D4C9BE] text-[#030303]"
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editing && categoryEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#030303] rounded-xl p-6 w-full max-w-md shadow-lg text-[#F1EFEC]">
            <h2 className="text-xl font-bold mb-4">Edit Kategori</h2>
            <EditCategoryForm
              category={categoryEdit}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#030303] rounded-xl p-6 w-full max-w-sm shadow-lg text-center text-[#F1EFEC]">
            <h2 className="text-lg font-semibold mb-4">
              Apakah Anda yakin ingin menghapus kategori ini?
            </h2>
            <div className="flex justify-center gap-2">
              <button
                onClick={async () => {
                  try {
                    const result = await deleteCategory(confirmDelete)
                    if (result.success) {
                      setConfirmDelete(null)
                      router.refresh()
                    } else {
                      alert(result.message)
                    }
                  } catch (err) {
                    console.error(err)
                    alert('Terjadi kesalahan saat menghapus.')
                  }
                }}
                className="px-3 py-1 rounded-md font-semibold bg-[#D4C9BE] text-[#030303]"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3 py-1 rounded-md font-semibold bg-[#D4C9BE] text-[#030303]"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
