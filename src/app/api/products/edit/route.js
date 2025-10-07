import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const id = formData.get("id")
    const name = formData.get("name")
    const category = formData.get("category")
    const stock = formData.get("stock")
    const price = formData.get("price")
    const imageFile = formData.get("image") // File image asli

    const productsFilePath = path.join(process.cwd(), "public/products/products.json")
    const productsData = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"))

    const productIndex = productsData.findIndex((p) => p.id.toString() === id.toString())
    if (productIndex === -1) return NextResponse.json({ message: "Product not found" }, { status: 404 })

    // Hapus gambar lama jika ada file baru
    if (imageFile && imageFile.size && productsData[productIndex].image) {
      const oldImagePath = path.join(process.cwd(), "public", productsData[productIndex].image)
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath)

      const imageExtension = path.extname(imageFile.name)
      const imageName = `${Date.now()}${imageExtension}`
      const imagePath = path.join(process.cwd(), "public/products/img", imageName)
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      fs.writeFileSync(imagePath, buffer)
      productsData[productIndex].image = `/products/img/${imageName}`
    }

    // Update data lainnya
    productsData[productIndex].name = name
    productsData[productIndex].category = category
    productsData[productIndex].stock = Number(stock)
    productsData[productIndex].price = Number(price)
    productsData[productIndex].updatedAt = new Date().toISOString()

    fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2))

    return NextResponse.json({ message: "Product updated successfully", product: productsData[productIndex] })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
