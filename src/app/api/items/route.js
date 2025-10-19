import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'items.json');

// 🔹 GET semua bahan
export async function GET() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const item = JSON.parse(data);
        return Response.json(item);
    } catch (error) {
        console.error('Gagal membaca data item:', error);
        return Response.json(
            { error: 'Gagal membaca data item' },
            { status: 500 }
        );
    }
}

// 🔹 POST tambah bahan baru
export async function POST(request) {
    try {
        const newItem = await request.json();
        const { name, category_id, stock, unit } = newItem;

        // Validasi input
        if (!name || isNaN(category_id) || isNaN(stock) || !unit) {
            return Response.json(
                { error: 'Semua field wajib diisi' },
                { status: 400 }
            );
        }

        const file = fs.readFileSync(filePath, 'utf-8');
        const itemsList = JSON.parse(file);

        // Cek nama duplikat
        if (itemsList.find((item) => item.name === name)) {
            return Response.json(
                { error: 'Item dengan nama ini sudah ada' },
                { status: 400 }
            );
        }

        const addItem = {
            id: Date.now(),
            name,
            category_id: Number(category_id),
            stock: Number(stock),
            unit,
        };

        bahanList.push(addItem);
        fs.writeFileSync(filePath, JSON.stringify(itemsList, null, 2));

        return Response.json(addItem, { status: 201 });
    } catch (error) {
        console.error('Error menambah bahan:', error);
        return Response.json(
            { error: 'Gagal menambah bahan' },
            { status: 500 }
        );
    }
}
