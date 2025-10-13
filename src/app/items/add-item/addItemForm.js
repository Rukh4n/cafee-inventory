'use client';

import { addItem } from '@/app/action/itemAction';
import { useActionState, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function AddItemForm({ category }) {
    const [state, formAction, pending] = useActionState(addItem, {
        success: false,
        message: '',
    });

    useEffect(() => {
        if (state?.success === true) {
            setTimeout(() => {
                redirect('/items');
            }, 1000);
        }
    }, [state?.success]);

    return (
        <div className="flex flex-col items-center p-10 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-[#123458] mb-2">
                Tambah Item
            </h1>
            <p className="text-gray-600 mb-8">Menambahkan item baru</p>

            <form
                action={formAction}
                className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-2xl shadow-md border"
            >
                {/* Nama Bahan */}
                <div className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="font-semibold text-gray-700 mb-1"
                    >
                        Nama Item
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Contoh: Biji Kopi Arabika"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                </div>

                {/* Dropdown Kategori */}
                <div className="flex flex-col">
                    <label
                        htmlFor="category_id"
                        className="font-semibold text-gray-700 mb-1"
                    >
                        Kategori
                    </label>
                    <select
                        name="category_id"
                        id="category_id"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    >
                        <option value="">-- Pilih Kategori --</option>
                        {category.map((kat) => (
                            <option key={kat.id} value={kat.id}>
                                {kat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stok */}
                <div className="flex flex-col">
                    <label
                        htmlFor="stock"
                        className="font-semibold text-gray-700 mb-1"
                    >
                        Stok
                    </label>
                    <input
                        type="number"
                        name="stock"
                        id="stock"
                        placeholder="Contoh: 5000"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                </div>

                {/* Satuan */}
                <div className="flex flex-col">
                    <label
                        htmlFor="unit"
                        className="font-semibold text-gray-700 mb-1"
                    >
                        Satuan
                    </label>
                    <input
                        type="text"
                        name="unit"
                        id="unit"
                        placeholder="Contoh: gram, liter, pcs"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                </div>

                {/* Tombol Submit */}
                <button
                    type="submit"
                    disabled={pending}
                    className={`mt-4 p-3 rounded-lg text-white font-semibold transition-all ${
                        pending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#123458] hover:bg-[#0e2e45]'
                    }`}
                >
                    {pending ? 'Menyimpan...' : 'Simpan Bahan'}
                </button>

                {/* Pesan Sukses / Error */}
                {state?.message && (
                    <p
                        className={`mt-3 text-center font-medium ${
                            state.success ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
}
