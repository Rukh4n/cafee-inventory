import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

// 🔹 GET: ambil semua user
export async function GET() {
    const data = await fs.readFile(filePath, 'utf8');
    return new Response(data, { status: 200 });
}

// 🔹 POST: tambah user baru
export async function POST(req) {
    try {
        const newUser = await req.json();
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);

        // ✅ Buat id otomatis (ambil id terakhir + 1)
        const newId =
            users.length > 0 ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1;

        const userWithId = { id: newId, ...newUser };
        users.push(userWithId);

        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        return new Response(JSON.stringify(userWithId), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'Gagal menambah user' }),
            { status: 500 }
        );
    }
}

// 🔹 DELETE: hapus user berdasarkan id
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = parseInt(searchParams.get('id'));

        if (!id)
            return new Response(JSON.stringify({ message: 'ID tidak valid' }), {
                status: 400,
            });

        const data = await fs.readFile(filePath, 'utf8');
        let users = JSON.parse(data);

        const updatedUsers = users.filter((u) => u.id !== id);
        await fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2));

        return new Response(
            JSON.stringify({ message: 'User berhasil dihapus' }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'Gagal menghapus user' }),
            { status: 500 }
        );
    }
}
