import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'bahan.json');

// 🔹 GET semua bahan
export async function GET() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const bahan = JSON.parse(data);
        return Response.json(bahan);
    } catch (error) {
        console.error('Gagal membaca data bahan:', error);
        return Response.json(
            { error: 'Gagal membaca data bahan' },
            { status: 500 }
        );
    }
}

// 🔹 POST tambah bahan baru
export async function POST(request) {
    try {
        const newBahan = await request.json();
        const { name, kategori_id, stok, satuan } = newBahan;

        // Validasi input
        if (!name || isNaN(kategori_id) || isNaN(stok) || !satuan) {
            return Response.json(
                { error: 'Semua field wajib diisi' },
                { status: 400 }
            );
        }

        const file = fs.readFileSync(filePath, 'utf-8');
        const bahanList = JSON.parse(file);

        // Cek nama duplikat
        if (bahanList.find((item) => item.name === name)) {
            return Response.json(
                { error: 'Bahan dengan nama ini sudah ada' },
                { status: 400 }
            );
        }

        const newItem = {
            id: Date.now(),
            name,
            kategori_id: Number(kategori_id),
            stok: Number(stok),
            satuan,
        };

        bahanList.push(newItem);
        fs.writeFileSync(filePath, JSON.stringify(bahanList, null, 2));

        return Response.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error menambah bahan:', error);
        return Response.json(
            { error: 'Gagal menambah bahan' },
            { status: 500 }
        );
    }
}
