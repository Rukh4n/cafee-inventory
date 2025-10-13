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
    <div className="bg-[#030303] text-[#F1EFEC] min-h-screen flex justify-center items-center p-4">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-lg shadow-lg">
        <h1 className="text-2xl mb-2 font-semibold">Tambah Item</h1>
        <p className="mb-6 text-base">Menambahkan item baru</p>

        <form action={formAction} className="flex flex-col gap-4">
          {/* Nama Item */}
          <div className="flex flex-col">
            <label htmlFor="name">Nama Item</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Contoh: Biji Kopi Arabika"
              required
              className="p-2 rounded border border-[#F1EFEC] bg-[#030303] text-[#F1EFEC] w-full"
            />
          </div>

          {/* Dropdown Kategori */}
          <div className="flex flex-col">
            <label htmlFor="category_id">Kategori</label>
            <select
              name="category_id"
              id="category_id"
              required
              className="p-2 rounded border border-[#F1EFEC] bg-[#030303] text-[#F1EFEC] w-full"
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
            <label htmlFor="stock">Stok</label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Contoh: 5000"
              required
              className="p-2 rounded border border-[#F1EFEC] bg-[#030303] text-[#F1EFEC] w-full"
            />
          </div>

          {/* Satuan */}
          <div className="flex flex-col">
            <label htmlFor="unit">Satuan</label>
            <input
              type="text"
              name="unit"
              id="unit"
              placeholder="Contoh: gram, liter, pcs"
              required
              className="p-2 rounded border border-[#F1EFEC] bg-[#030303] text-[#F1EFEC] w-full"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={pending}
            className={`p-3 rounded font-bold w-full ${
              pending ? 'bg-[#D4C9BE] cursor-not-allowed text-[#030303]' : 'bg-[#D4C9BE] text-[#030303] hover:opacity-90'
            }`}
          >
            {pending ? 'Menyimpan...' : 'Simpan Bahan'}
          </button>

          {/* Pesan Sukses / Error */}
          {state?.message && (
            <p className="mt-4 text-center">{state.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
