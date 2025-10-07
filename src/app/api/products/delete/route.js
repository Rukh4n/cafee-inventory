import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 })
    }

    const productsFilePath = path.join(process.cwd(), "public/products/products.json")
    const productsData = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"))

    const productIndex = productsData.findIndex((p) => p.id.toString() === id.toString())
    if (productIndex === -1) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    // Hapus gambar product jika ada
    const product = productsData[productIndex]
    if (product.image) {
      const imagePath = path.join(process.cwd(), "public", product.image)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    // Hapus product dari array
    productsData.splice(productIndex, 1)

    // Simpan kembali ke file JSON
    fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2))

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
