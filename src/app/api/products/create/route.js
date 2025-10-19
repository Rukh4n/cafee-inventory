import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const code = formData.get("code")
    const image = formData.get("image")
    const name = formData.get("name")
    const category = formData.get("category")
    const stock = formData.get("stock")
    const price = formData.get("price")

    // Validasi input
    if (!code || !name || !category || !stock || !price) {
      return NextResponse.json({ message: "Incomplete data" }, { status: 400 })
    }

    // Tentukan direktori dan file
    const publicDir = path.join(process.cwd(), "public", "products")
    const imgDir = path.join(publicDir, "img")
    const dataFile = path.join(publicDir, "products.json")

    // Pastikan direktori ada
    await fs.mkdir(imgDir, { recursive: true })

    let imagePath = ""
    if (image && image.name) {
      const ext = path.extname(image.name)
      const timestamp = Date.now()
      const fileName = `${timestamp}${ext}`
      const filePath = path.join(imgDir, fileName)
      const arrayBuffer = await image.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await fs.writeFile(filePath, buffer)
      imagePath = `/products/img/${fileName}`
    }

    // Baca data lama
    let products = []
    try {
      const data = await fs.readFile(dataFile, "utf-8")
      products = JSON.parse(data)
    } catch {
      products = []
    }

    // Buat data baru
    const newProduct = {
      id: Date.now(),
      code,
      name,
      category,
      stock: Number(stock),
      price: Number(price),
      image: imagePath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)

    // Simpan kembali ke file
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf-8")

    return NextResponse.json({ message: "Product created successfully", product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 })
  }
}
