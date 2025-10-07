import { promises as fs } from "fs"
import path from "path"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""

    const filePath = path.join(process.cwd(), "public/products", "products.json")
    const data = await fs.readFile(filePath, "utf-8")
    let products = JSON.parse(data)

    if (query) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    return Response.json(products)
  } catch (error) {
    console.error("Error reading products.json:", error)
    return new Response(
      JSON.stringify({ message: "Failed to load products" }),
      { status: 500 }
    )
  }
}
