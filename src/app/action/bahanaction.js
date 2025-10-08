'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { EDGE_UNSUPPORTED_NODE_APIS } from 'next/dist/shared/lib/constants';

const filePath = path.join(process.cwd(), 'public', 'data', 'bahan.json');

export async function getBahan() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function addBahan(prevState, formData) {
    try {
        const name = formData.get('name');
        const kategori_id = Number(formData.get('kategori_id'));
        const stok = Number(formData.get('stok'));
        const satuan = formData.get('satuan');

        if (!name)
            return { success: false, message: 'Nama bahan wajib diisi.' };
        if (isNaN(kategori_id))
            return { success: false, message: 'Kategori bahan wajib diisi.' };
        if (isNaN(stok))
            return { success: false, message: 'Stok bahan wajib diisi.' };
        if (!satuan)
            return { success: false, message: 'Satuan bahan wajib diisi.' };

        const file = fs.readFileSync(filePath, 'utf-8');
        const bahan = JSON.parse(file);

        if (bahan.find((item) => item.name === name)) {
            return {
                success: false,
                message: 'Bahan dengan nama ini sudah ada.',
            };
        }

        const newBahan = {
            id: Date.now(),
            name,
            kategori_id,
            stok,
            satuan,
        };

        bahan.push(newBahan);
        fs.writeFileSync(filePath, JSON.stringify(bahan, null, 2));

        // revalidate halaman bahan agar data terbaru muncul
        revalidatePath('/bahan');

        return { success: true, message: 'Bahan berhasil ditambahkan.' };
    } catch (error) {
        console.error('Error di addBahan:', error);
        return {
            success: false,
            message: 'Terjadi kesalahan saat menambahkan bahan.',
        };
    }
}

export async function updateBahan(id, prevState, formData) {
    const name = formData.get('name');
    const kategori_id = Number(formData.get('kategori_id'));
    const stok = Number(formData.get('stok'));
    const satuan = formData.get('satuan');

    // Baca file JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    const bahan = JSON.parse(data);

    // Cari index berdasarkan ID yang dikirim lewat bind()
    const index = bahan.findIndex((item) => item.id === id);
    if (index === -1)
        return { success: false, message: 'Bahan tidak ditemukan.' };

    // Update data bahan
    bahan[index].name = name;
    bahan[index].kategori_id = kategori_id;
    bahan[index].stok = stok;
    bahan[index].satuan = satuan;

    // Tulis ulang ke file
    fs.writeFileSync(filePath, JSON.stringify(bahan, null, 2));

    // Refresh halaman /bahan agar data terbaru tampil
    revalidatePath('/bahan');

    return { success: true, message: 'Bahan berhasil diperbarui.' };
}

export async function deleteBahan(id) {
    try {
        // Baca data bahan dari file JSON
        const data = fs.readFileSync(filePath, 'utf-8');
        const bahanList = JSON.parse(data);

        // Cek apakah id-nya ada
        const index = bahanList.findIndex((item) => item.id === id);
        if (index === -1) {
            return { success: false, message: 'Bahan tidak ditemukan.' };
        }

        // Hapus data berdasarkan index
        bahanList.splice(index, 1);

        // Simpan kembali ke file
        fs.writeFileSync(filePath, JSON.stringify(bahanList, null, 2));

        // Revalidate halaman bahan agar daftar terbaru muncul
        revalidatePath('/bahan');

        return { success: true, message: 'Bahan berhasil dihapus.' };
    } catch (error) {
        console.error('Gagal menghapus bahan:', error);
        return {
            success: false,
            message: 'Terjadi kesalahan saat menghapus bahan.',
        };
    }
}
