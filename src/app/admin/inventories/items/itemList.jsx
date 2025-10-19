'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useActionState } from 'react';
import { deleteItem } from '@/app/action/itemAction';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Search } from 'lucide-react';

export default function ItemsList({ item, category }) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const [state, formAction, isPending] = useActionState(
        async (prevState, formData) => {
            const id = parseInt(formData.get('id'));
            return await deleteItem(id);
        },
        { success: false, message: '' }
    );

    const getNameCategory = (id) => {
        const found = category.find((k) => k.id === id);
        return found ? found.name : '-';
    };

    // 🕒 Debounce effect — tunggu 500ms setelah user berhenti mengetik
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(searchInput);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchInput]);

    const filteredItems = useMemo(() => {
        const term = search.toLowerCase();
        return item.filter(
            (i) =>
                i.name.toLowerCase().includes(term) ||
                getNameCategory(i.category_id).toLowerCase().includes(term)
        );
    }, [search, item, category]);

    useEffect(() => {
        if (state?.success) {
            router.refresh();
        }
    }, [state?.success, router]);

    return (
        <div className="bg-[#030303]  text-[#F1EFEC] p-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Daftar Item</h1>
                {/* Input pencarian */}
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 border border-[#D4C9BE] rounded-md bg-[#030303] w-full sm:w-64">
                        <Search size={16} className="text-[#D4C9BE]" />
                        <input
                            type="text"
                            placeholder="Cari item atau kategori..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full bg-transparent outline-none text-sm text-[#F1EFEC]"
                        />
                    </div>
                    <Link
                        href="/admin/inventories/items/add-item"
                        className="flex items-center gap-2 px-4 py-2 bg-[#D4C9BE] text-[#030303] rounded-md font-bold hover:opacity-90 transition"
                    >
                        <Plus size={16} /> Tambah Item
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-2 border-[#D4C9BE] border-collapse">
                    <thead className="bg-[#1a1a1a] text-[#F1EFEC]">
                        <tr>
                            <th className="p-3 border border-[#D4C9BE]">No</th>
                            <th className="p-3 border border-[#D4C9BE]">
                                Nama Item
                            </th>
                            <th className="p-3 border border-[#D4C9BE]">
                                Kategori
                            </th>
                            <th className="p-3 border border-[#D4C9BE]">
                                Stok
                            </th>
                            <th className="p-3 border border-[#D4C9BE]">
                                Satuan
                            </th>
                            <th className="p-3 border border-[#D4C9BE]">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-4 text-center">
                                    Belum ada data bahan.
                                </td>
                            </tr>
                        ) : (
                            filteredItems.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#1a1a1a] transition"
                                >
                                    <td className="p-2 border border-[#D4C9BE] text-center">
                                        {index + 1}
                                    </td>
                                    <td className="p-2 border border-[#D4C9BE]">
                                        {item.name}
                                    </td>
                                    <td className="p-2 border border-[#D4C9BE]">
                                        {getNameCategory(item.category_id)}
                                    </td>
                                    <td className="p-2 border border-[#D4C9BE] text-center">
                                        {item.stock}
                                    </td>
                                    <td className="p-2 border border-[#D4C9BE] text-center">
                                        {item.unit}
                                    </td>
                                    <td className="p-2 border border-[#D4C9BE] text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                href={`/admin/inventories/items/edit-Item/${item.id}`}
                                                className="flex items-center gap-1 px-3 py-2 bg-[#D4C9BE] text-[#030303] rounded-md font-bold hover:opacity-90 transition"
                                            >
                                                <Edit2 size={14} /> Edit
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
                                                    className="flex items-center gap-1 px-3 py-2 bg-[#D4C9BE] text-[#030303] rounded-md font-bold hover:opacity-90 transition disabled:opacity-50"
                                                >
                                                    <Trash2 size={14} />{' '}
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
                    <p>{state.message}</p>
                </div>
            )}
        </div>
    );
}
