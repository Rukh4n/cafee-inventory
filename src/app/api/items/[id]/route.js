import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'items.json');

// 🔹 GET bahan berdasarkan ID
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const item = data.find((item) => item.id === Number(id));

        if (!item)
            return Response.json(
                { error: 'Item tidak ditemukan' },
                { status: 404 }
            );

        return Response.json(item);
    } catch (error) {
        console.error('Gagal mengambil item:', error);
        return Response.json(
            { error: 'Gagal mengambil item' },
            { status: 500 }
        );
    }
}

// 🔹 PUT update bahan berdasarkan ID
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const updatedData = await request.json();
        const { name, category_id, stock, unit } = updatedData;

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.findIndex((item) => item.id === Number(id));

        if (index === -1)
            return Response.json(
                { error: 'Item tidak ditemukan' },
                { status: 404 }
            );

        data[index] = {
            ...data[index],
            name: name ?? data[index].name,
            category_id: category_id ?? data[index].category_id,
            stock: stock ?? data[index].stock,
            unit: unit ?? data[index].unit,
        };

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return Response.json({
            message: 'Item berhasil diperbarui',
            bahan: data[index],
        });
    } catch (error) {
        console.error('Gagal memperbarui item:', error);
        return Response.json(
            { error: 'Gagal memperbarui item' },
            { status: 500 }
        );
    }
}

// 🔹 DELETE hapus bahan berdasarkan ID
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        const index = data.findIndex((item) => item.id === Number(id));
        if (index === -1)
            return Response.json(
                { error: 'Item tidak ditemukan' },
                { status: 404 }
            );

        data.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return Response.json({ message: 'Item berhasil dihapus' });
    } catch (error) {
        console.error('Gagal menghapus item:', error);
        return Response.json(
            { error: 'Gagal menghapus item' },
            { status: 500 }
        );
    }
}
