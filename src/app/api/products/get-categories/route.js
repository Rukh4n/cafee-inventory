import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "products", "categories", "categories.json")
    const data = await fs.readFile(filePath, "utf-8")
    const categories = JSON.parse(data)
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error("Error reading categories file:", error)
    return NextResponse.json({ message: "Failed to load categories" }, { status: 500 })
  }
}
