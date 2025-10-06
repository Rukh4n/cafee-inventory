import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const { name } = await req.json()

    if (!name || !name.trim()) {
      return new Response(JSON.stringify({ error: "Category name is required" }), {
        status: 400,
      })
    }

    // Tentukan path ke file JSON
    const dirPath = path.join(process.cwd(), "public", "products", "categories")
    const filePath = path.join(dirPath, "categories.json")

    // Pastikan folder ada
    await fs.mkdir(dirPath, { recursive: true })

    let categories = []

    // Jika file sudah ada, baca datanya
    try {
      const fileData = await fs.readFile(filePath, "utf-8")
      categories = JSON.parse(fileData)
    } catch {
      categories = []
    }

    // Tambahkan kategori baru
    const newCategory = {
      id: Date.now(),
      name,
      createdAt: new Date().toISOString(),
    }

    categories.push(newCategory)

    // Simpan kembali ke file
    await fs.writeFile(filePath, JSON.stringify(categories, null, 2))

    return new Response(JSON.stringify({ message: "Category saved successfully", data: newCategory }), {
      status: 201,
    })
  } catch (error) {
    console.error("Error saving category:", error)
    return new Response(JSON.stringify({ error: "Failed to save category" }), {
      status: 500,
    })
  }
}
