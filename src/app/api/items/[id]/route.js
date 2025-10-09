import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'bahan.json');

// 🔹 GET bahan berdasarkan ID
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const bahan = data.find((item) => item.id === Number(id));

        if (!bahan)
            return Response.json(
                { error: 'Bahan tidak ditemukan' },
                { status: 404 }
            );

        return Response.json(bahan);
    } catch (error) {
        console.error('Gagal mengambil bahan:', error);
        return Response.json(
            { error: 'Gagal mengambil bahan' },
            { status: 500 }
        );
    }
}

// 🔹 PUT update bahan berdasarkan ID
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const updatedData = await request.json();
        const { name, kategori_id, stok, satuan } = updatedData;

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.findIndex((item) => item.id === Number(id));

        if (index === -1)
            return Response.json(
                { error: 'Bahan tidak ditemukan' },
                { status: 404 }
            );

        data[index] = {
            ...data[index],
            name: name ?? data[index].name,
            kategori_id: kategori_id ?? data[index].kategori_id,
            stok: stok ?? data[index].stok,
            satuan: satuan ?? data[index].satuan,
        };

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return Response.json({
            message: 'Bahan berhasil diperbarui',
            bahan: data[index],
        });
    } catch (error) {
        console.error('Gagal memperbarui bahan:', error);
        return Response.json(
            { error: 'Gagal memperbarui bahan' },
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
                { error: 'Bahan tidak ditemukan' },
                { status: 404 }
            );

        data.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return Response.json({ message: 'Bahan berhasil dihapus' });
    } catch (error) {
        console.error('Gagal menghapus bahan:', error);
        return Response.json(
            { error: 'Gagal menghapus bahan' },
            { status: 500 }
        );
    }
}
