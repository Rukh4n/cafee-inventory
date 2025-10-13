'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCategory } from '../action/categoryAction';
import EditCategoryForm from './editCategoryForm';

export default function CategoryList({ category }) {
    const [editing, setEditing] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const router = useRouter();

    // Gunakan useActionState untuk delete
    const [state, formAction, isPending] = useActionState(
        async (prevState, formData) => {
            const id = parseInt(formData.get('id'));
            return await deleteCategory(id);
        },
        null
    );

    // Tutup popup otomatis setelah delete sukses
    useEffect(() => {
        if (state?.success) {
            setConfirmDelete(null); // tutup modal
            router.refresh(); // refresh data
        }
    }, [state?.success, router]);

    const categoryEdit = category.find((item) => item.id === editing);

    return (
        <div>
            <ul className="mt-5 space-y-3">
                {category.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg shadow-md border"
                        style={{
                            backgroundColor: '#F1EFEC',
                            borderColor: '#D4C9BE',
                            color: '#030303',
                        }}
                    >
                        <span className="font-medium">{item.name}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setConfirmDelete(item.id)}
                                className="px-3 py-1 rounded-md font-semibold transition-all"
                                style={{
                                    backgroundColor: '#123458',
                                    color: '#F1EFEC',
                                }}
                            >
                                Hapus
                            </button>

                            <button
                                onClick={() => setEditing(item.id)}
                                className="px-3 py-1 rounded-md font-semibold transition-all"
                                style={{
                                    backgroundColor: '#D4C9BE',
                                    color: '#030303',
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal Edit */}
            {editing && categoryEdit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold text-[#123458] mb-4">
                            Edit Kategori
                        </h2>
                        <EditCategoryForm
                            category={categoryEdit}
                            onCancel={() => setEditing(null)}
                        />
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Delete */}
            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
                        <h2 className="text-lg font-semibold text-[#123458] mb-4">
                            Apakah Anda yakin ingin menghapus kategori ini?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={async () => {
                                    try {
                                        const result = await deleteCategory(
                                            confirmDelete
                                        );
                                        if (result.success) {
                                            setConfirmDelete(null); // tutup modal
                                            router.refresh(); // refresh data
                                        } else {
                                            alert(result.message);
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        alert(
                                            'Terjadi kesalahan saat menghapus.'
                                        );
                                    }
                                }}
                                className="px-4 py-2 rounded-md font-semibold"
                                style={{
                                    backgroundColor: '#C0392B',
                                    color: '#F1EFEC',
                                }}
                            >
                                Ya, Hapus
                            </button>

                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 rounded-md font-semibold"
                                style={{
                                    backgroundColor: '#D4C9BE',
                                    color: '#030303',
                                }}
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
