'use server';

import fs from 'fs';
import { revalidatePath } from 'next/cache';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');

//  GET semua data
export async function getKategori() {
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log(data);
    return JSON.parse(data);
}

// Tambah data baru
export async function addKategori(prevState, formData) {
    const name = formData.get('name');
    if (!name) return { success: false, message: 'Nama kategori wajib diisi.' };

    const file = fs.readFileSync(filePath, 'utf-8');
    const kategori = JSON.parse(file);

    // Cegah duplikat
    if (kategori.find((item) => item.name === name)) {
        return { success: false, message: 'Kategori sudah ada.' };
    }

    const newKategori = {
        id: Date.now(),
        name,
    };
    kategori.push(newKategori);
    fs.writeFileSync(filePath, JSON.stringify(kategori, null, 2));

    revalidatePath('/kategori');

    return { success: true, message: 'Kategori berhasil ditambahkan.' };
}

// Edit data
export async function updateKategori(prevState, formData) {
    const id = Number(formData.get('id'));
    const name = formData.get('name');

    const data = fs.readFileSync(filePath, 'utf-8');
    const kategori = JSON.parse(data);

    const index = kategori.findIndex((item) => item.id === id);
    if (index === -1)
        return { success: false, message: 'Kategori tidak ditemukan.' };

    kategori[index].name = name;
    fs.writeFileSync(filePath, JSON.stringify(kategori, null, 2));

    revalidatePath('/kategori');

    return { success: true, message: 'Kategori berhasil diperbarui.' };
}

// Hapus data
export async function deleteKategoriAction(id) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const kategori = JSON.parse(data);

        const newData = kategori.filter((item) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

        revalidatePath('/kategori');

        return { success: true, message: 'Kategori berhasil dihapus.' };
    } catch (error) {
        console.error('Gagal menghapus kategori:', error);
        return { success: false, message: 'Terjadi kesalahan saat menghapus.' };
    }
}
