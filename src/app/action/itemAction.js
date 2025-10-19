'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const filePath = path.join(process.cwd(), 'public', 'data', 'items.json');

export async function getItem() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function addItem(prevState, formData) {
    try {
        const name = formData.get('name');
        const category_id = Number(formData.get('category_id'));
        const stock = Number(formData.get('stock'));
        const unit = formData.get('unit');

        if (!name) return { success: false, message: 'Nama item wajib diisi.' };
        if (isNaN(category_id))
            return { success: false, message: 'Kategori item wajib diisi.' };
        if (isNaN(stock))
            return { success: false, message: 'Stok item wajib diisi.' };
        if (!unit)
            return { success: false, message: 'Satuan item wajib diisi.' };

        const file = fs.readFileSync(filePath, 'utf-8');
        const item = JSON.parse(file);

        if (item.find((item) => item.name === name)) {
            return {
                success: false,
                message: 'Item dengan nama ini sudah ada.',
            };
        }

        const newItem = {
            id: Date.now(),
            name,
            category_id,
            stock,
            unit,
        };

        item.push(newItem);
        fs.writeFileSync(filePath, JSON.stringify(item, null, 2));

        // revalidate halaman bahan agar data terbaru muncul
        revalidatePath('/items');

        return { success: true, message: 'Item berhasil ditambahkan.' };
    } catch (error) {
        console.error('Error di addItem:', error);
        return {
            success: false,
            message: 'Terjadi kesalahan saat menambahkan item.',
        };
    }
}

export async function updateItem(id, prevState, formData) {
    const name = formData.get('name');
    const category_id = Number(formData.get('category_id'));
    const stock = Number(formData.get('stock'));
    const unit = formData.get('unit');

    // Baca file JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    const item = JSON.parse(data);

    // Cari index berdasarkan ID yang dikirim lewat bind()
    const index = item.findIndex((item) => item.id === id);
    if (index === -1)
        return { success: false, message: 'Item tidak ditemukan.' };

    // Update data bahan
    item[index].name = name;
    item[index].category_id = category_id;
    item[index].stock = stock;
    item[index].unit = unit;

    // Tulis ulang ke file
    fs.writeFileSync(filePath, JSON.stringify(item, null, 2));

    // Refresh halaman /bahan agar data terbaru tampil
    revalidatePath('/items');

    return { success: true, message: 'Item berhasil diperbarui.' };
}

export async function deleteItem(id) {
    try {
        // Baca data bahan dari file JSON
        const data = fs.readFileSync(filePath, 'utf-8');
        const itemsList = JSON.parse(data);

        // Cek apakah id-nya ada
        const index = itemsList.findIndex((item) => item.id === id);
        if (index === -1) {
            return { success: false, message: 'Item tidak ditemukan.' };
        }

        // Hapus data berdasarkan index
        itemsList.splice(index, 1);

        // Simpan kembali ke file
        fs.writeFileSync(filePath, JSON.stringify(itemsList, null, 2));

        // Revalidate halaman bahan agar daftar terbaru muncul
        revalidatePath('/items');

        return { success: true, message: 'Item berhasil dihapus.' };
    } catch (error) {
        console.error('Gagal menghapus Item:', error);
        return {
            success: false,
            message: 'Terjadi kesalahan saat menghapus Item.',
        };
    }
}
