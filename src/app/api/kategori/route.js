import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');

// GET semua kategori
export async function GET() {
    const data = fs.readFileSync(filePath, 'utf8');
    const kategori = JSON.parse(data);
    return Response.json(kategori);
}

// POST tambah kategori baru
export async function POST(request) {
    const newKategori = await request.json();
    const data = fs.readFileSync(filePath, 'utf8');
    const kategori = JSON.parse(data);

    const newId =
        kategori.length > 0 ? kategori[kategori.length - 1].id + 1 : 1;
    const newData = { id: newId, ...newKategori };
    kategori.push(newData);

    fs.writeFileSync(filePath, JSON.stringify(kategori, null, 2));
    return Response.json(newData, { status: 201 });
}
