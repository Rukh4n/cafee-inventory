import { promises as fs } from "fs"
import path from "path"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")?.toLowerCase() || ""

    const dirPath = path.join(process.cwd(), "public/products/categories")
    const filePath = path.join(dirPath, "categories.json")

    // Pastikan file ada
    try {
      await fs.access(filePath)
    } catch {
      await fs.mkdir(dirPath, { recursive: true })
      await fs.writeFile(filePath, JSON.stringify([]))
    }

    const fileData = await fs.readFile(filePath, "utf-8")
    const categories = JSON.parse(fileData)

    // Filter berdasarkan pencarian (jika ada)
    const filteredCategories = search
      ? categories.filter((cat) =>
          cat.name.toLowerCase().includes(search)
        )
      : categories

    return new Response(JSON.stringify(filteredCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error reading categories:", error)
    return new Response(
      JSON.stringify({ message: "Failed to read categories" }),
      { status: 500 }
    )
  }
}
