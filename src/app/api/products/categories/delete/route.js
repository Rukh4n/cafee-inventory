import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const { id } = await req.json()
    const filePath = path.join(process.cwd(), "public/products/categories/categories.json")

    // Baca file JSON
    const fileData = await fs.readFile(filePath, "utf-8")
    let categories = JSON.parse(fileData)

    // Cek apakah data ada
    const exists = categories.some((cat) => cat.id === id)
    if (!exists) {
      return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 })
    }

    // Hapus data berdasarkan id
    categories = categories.filter((cat) => cat.id !== id)

    // Tulis ulang file JSON
    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), "utf-8")

    return new Response(JSON.stringify({ message: "Category deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error deleting category:", error)
    return new Response(JSON.stringify({ error: "Failed to delete category" }), { status: 500 })
  }
}
