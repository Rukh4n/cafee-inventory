import { promises as fs } from "fs"
import path from "path"
import { redirect } from "next/navigation"

export async function POST(req) {
  try {
    const updatedCategory = await req.json()
    const filePath = path.join(process.cwd(), "public/products/categories/categories.json")

    // Baca data JSON
    const fileData = await fs.readFile(filePath, "utf-8")
    let categories = JSON.parse(fileData)

    // Cari index data yang akan diperbarui
    const index = categories.findIndex((cat) => cat.id === updatedCategory.id)
    if (index === -1) {
      return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 })
    }

    // Update data
    categories[index] = {
      ...categories[index],
      name: updatedCategory.name,
      updatedAt: new Date().toISOString(),
    }

    // Simpan ke file JSON
    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), "utf-8")

    // Redirect setelah update berhasil
    redirect("/admin/products/categories")
  } catch (error) {
    console.error("Error updating category:", error)
    return new Response(JSON.stringify({ error: "Failed to update category" }), { status: 500 })
  }
}
