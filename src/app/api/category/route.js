import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');

// GET semua kategori
export async function GET() {
    const data = fs.readFileSync(filePath, 'utf8');
    const category = JSON.parse(data);
    return Response.json(category);
}

// POST tambah kategori baru
export async function POST(request) {
    const newCategory = await request.json();
    const data = fs.readFileSync(filePath, 'utf8');
    const category = JSON.parse(data);

    const newId =
        category.length > 0 ? category[category.length - 1].id + 1 : 1;
    const newData = { id: newId, ...newCategory };
    category.push(newData);

    fs.writeFileSync(filePath, JSON.stringify(category, null, 2));
    return Response.json(newData, { status: 201 });
}
