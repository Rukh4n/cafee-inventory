'use client';

import { useActionState, useEffect } from 'react';
import { updateBahan } from '@/app/action/bahanaction';
import { redirect } from 'next/navigation';

export default function EditBahanForm({ bahan, kategori }) {
    // Gunakan bind agar id otomatis dikirim
    const updateBahanWithId = updateBahan.bind(null, bahan.id);

    const [state, formAction, pending] = useActionState(updateBahanWithId, {
        success: false,
        message: '',
    });

    useEffect(() => {
        if (state?.success) {
            setTimeout(() => {
                redirect('/bahan');
            }, 800);
        }
    }, [state?.success]);

    return (
        <div className="flex flex-col items-center p-10 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-[#123458] mb-2">
                Edit Bahan
            </h1>
            <p className="text-gray-600 mb-8">
                Perbarui data bahan yang sudah ada.
            </p>

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
                        Nama Bahan
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={bahan.name}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>

                {/* Dropdown Kategori */}
                <div className="flex flex-col">
                    <label
                        htmlFor="kategori_id"
                        className="font-semibold text-gray-700 mb-1"
                    >
                        Kategori
                    </label>
                    <select
                        name="kategori_id"
                        id="kategori_id"
                        defaultValue={bahan.kategori_id}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-black"
                    >
                        <option value="">-- Pilih Kategori --</option>
                        {kategori.map((kat) => (
                            <option key={kat.id} value={kat.id}>
                                {kat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stok */}
                <div className="flex flex-col">
                    <label
                        htmlFor="stok"
                        className="font-semibold text-gray-700 mb-1"
                    >
                        Stok
                    </label>
                    <input
                        type="number"
                        name="stok"
                        id="stok"
                        defaultValue={bahan.stok}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>

                {/* Satuan */}
                <div className="flex flex-col">
                    <label
                        htmlFor="satuan"
                        className="font-semibold text-gray-700 mb-1"
                    >
                        Satuan
                    </label>
                    <input
                        type="text"
                        name="satuan"
                        id="satuan"
                        defaultValue={bahan.satuan}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className={`mt-4 p-3 rounded-lg text-white font-semibold transition-all ${
                        pending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#123458] hover:bg-[#0e2e45]'
                    }`}
                >
                    {pending ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>

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
