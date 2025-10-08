'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { deleteBahan } from '../action/bahanaction';

export default function BahanList({ bahan, kategori }) {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState(
        async (prevState, formData) => {
            const id = parseInt(formData.get('id'));
            return await deleteBahan(id);
        },
        { success: false, message: '' }
    );

    const getNamaKategori = (id) => {
        const found = kategori.find((k) => k.id === id);
        return found ? found.name : '-';
    };

    useEffect(() => {
        if (state?.success) {
            router.refresh();
        }
    }, [state?.success, router]);

    return (
        <div className="p-8 bg-[#F1EFEC] min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-[#E5DDD2]">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-[#123458] border-b-4 border-[#D4C9BE] pb-2">
                        Daftar Bahan
                    </h1>
                    <Link
                        href="/bahan/tambah-bahan"
                        className="bg-[#123458] text-white px-4 py-2 rounded-lg hover:bg-[#123458]/90 transition"
                    >
                        + Tambah Bahan
                    </Link>
                </div>

                <div className="overflow-hidden border border-[#E5DDD2] rounded-xl shadow-sm">
                    <table className="min-w-full">
                        <thead className="bg-[#123458] text-white text-sm uppercase">
                            <tr>
                                <th className="py-3 px-4 text-center font-semibold">
                                    No
                                </th>
                                <th className="py-3 px-4 text-left font-semibold">
                                    Nama Bahan
                                </th>
                                <th className="py-3 px-4 text-left font-semibold">
                                    Kategori
                                </th>
                                <th className="py-3 px-4 text-center font-semibold">
                                    Stok
                                </th>
                                <th className="py-3 px-4 text-center font-semibold">
                                    Satuan
                                </th>
                                <th className="py-3 px-4 text-center font-semibold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5DDD2] bg-[#FAF8F6]">
                            {bahan.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-6 text-center text-gray-500 italic"
                                    >
                                        Belum ada data bahan.
                                    </td>
                                </tr>
                            ) : (
                                bahan.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-[#F5F3F1] transition-colors"
                                    >
                                        <td className="py-3 px-4 text-center font-medium text-[#123458]">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-4 text-left font-medium text-[#123458]">
                                            {item.name}
                                        </td>
                                        <td className="py-3 px-4 text-left text-[#555]">
                                            {getNamaKategori(item.kategori_id)}
                                        </td>
                                        <td className="py-3 px-4 text-center text-[#555]">
                                            {item.stok}
                                        </td>
                                        <td className="py-3 px-4 text-center text-[#555]">
                                            {item.satuan}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <Link
                                                    href={`/bahan/edit-bahan/${item.id}`}
                                                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#D4C9BE] text-[#123458] hover:bg-[#C9BFAE] transition"
                                                >
                                                    Edit
                                                </Link>

                                                <form action={formAction}>
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={item.id}
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={isPending}
                                                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#C0392B] text-white hover:bg-[#A93226] transition"
                                                    >
                                                        {isPending
                                                            ? 'Menghapus...'
                                                            : 'Hapus'}
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {state?.message && (
                    <div className="mt-4 text-center">
                        <p
                            className={`text-sm font-medium ${
                                state.success
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {state.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
