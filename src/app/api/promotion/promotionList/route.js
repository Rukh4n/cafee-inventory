import { promises as fs } from "fs"
import path from "path"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get("search")?.toLowerCase() || ""

    const promotionsDir = path.join(process.cwd(), "public", "promotion")
    const promotionsFile = path.join(promotionsDir, "promotions.json")

    let promotions = []
    try {
      const fileData = await fs.readFile(promotionsFile, "utf-8")
      promotions = JSON.parse(fileData)
    } catch (error) {
      promotions = []
    }

    // Filter berdasarkan title jika parameter search ada
    if (searchQuery) {
      promotions = promotions.filter((promo) =>
        promo.title?.toLowerCase().includes(searchQuery)
      )
    }

    return new Response(JSON.stringify(promotions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ message: "Error reading promotions", error: error.message }),
      { status: 500 }
    )
  }
}
