import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');

export async function GET(request, { params }) {
    const { id } = params;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const category = data.find((k) => k.id === parseInt(id));

    if (!category)
        return Response.json(
            { error: 'Kategori tidak ditemukan' },
            { status: 404 }
        );
    return Response.json(category);
}

export async function PUT(request, { params }) {
    const { id } = params;
    const updatedData = await request.json();
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const index = data.findIndex((k) => k.id === parseInt(id));

    if (index === -1)
        return Response.json(
            { error: 'Kategori tidak ditemukan' },
            { status: 404 }
        );

    data[index] = { ...data[index], ...updatedData };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json(data[index]);
}

export async function DELETE(request, { params }) {
    const { id } = params;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newData = data.filter((k) => k.id !== parseInt(id));

    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    return Response.json({ message: 'Kategori berhasil dihapus' });
}
