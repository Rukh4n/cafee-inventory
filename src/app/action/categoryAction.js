'use server';

import fs from 'fs';
import { revalidatePath } from 'next/cache';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');

// GET semua data
export async function getCategory() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Tambah data baru
export async function addCategory(prevState, formData) {
    const name = formData.get('name');
    if (!name) return { success: false, message: 'Nama kategori wajib diisi.' };

    const file = fs.readFileSync(filePath, 'utf-8');
    const category = JSON.parse(file);

    // Cegah duplikat
    if (category.find((item) => item.name === name)) {
        return { success: false, message: 'Kategori sudah ada.' };
    }

    const newCategory = {
        id: Date.now(),
        name,
    };
    category.push(newCategory);
    fs.writeFileSync(filePath, JSON.stringify(category, null, 2));

    revalidatePath('/category');

    return { success: true, message: 'Kategori berhasil ditambahkan.' };
}

// Edit data
export async function updateCategory(prevState, formData) {
    const id = Number(formData.get('id'));
    const name = formData.get('name');

    const data = fs.readFileSync(filePath, 'utf-8');
    const category = JSON.parse(data);

    const index = category.findIndex((item) => item.id === id);
    if (index === -1)
        return { success: false, message: 'Kategori tidak ditemukan.' };

    category[index].name = name;
    fs.writeFileSync(filePath, JSON.stringify(category, null, 2));

    revalidatePath('/category');

    return { success: true, message: 'Kategori berhasil diperbarui.' };
}

// Hapus data
export async function deleteCategory(id) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const category = JSON.parse(data);

        const newData = category.filter((item) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

        revalidatePath('/category');

        return { success: true, message: 'Kategori berhasil dihapus.' };
    } catch (error) {
        console.error('Gagal menghapus kategori:', error);
        return { success: false, message: 'Terjadi kesalahan saat menghapus.' };
    }
}
