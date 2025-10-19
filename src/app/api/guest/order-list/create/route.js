import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    const { userId, productId, name, price, category, image, quantity } = body

    if (!userId || !productId || !name || !price) {
      return NextResponse.json({ success: false, message: "Data tidak lengkap" }, { status: 400 })
    }

    const dirPath = path.join(process.cwd(), "public", "order-list")
    const filePath = path.join(dirPath, "orderList.json")

    // Pastikan folder ada, kalau tidak buat
    try {
      await fs.access(dirPath)
    } catch {
      await fs.mkdir(dirPath, { recursive: true })
    }

    // Pastikan file ada, kalau tidak buat file kosong
    try {
      await fs.access(filePath)
    } catch {
      await fs.writeFile(filePath, "[]", "utf8")
    }

    // Baca data existing
    const fileData = await fs.readFile(filePath, "utf8")
    const orders = JSON.parse(fileData)

    // Buat data baru
    const newOrder = {
      id: Date.now(),
      userId,
      productId,
      name,
      price,
      category,
      image,
      quantity,
      createdAt: new Date().toISOString(),
    }

    // Simpan data ke array
    orders.push(newOrder)

    // Tulis kembali ke file JSON
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf8")

    return NextResponse.json(
      { success: true, message: "Pesanan berhasil ditambahkan", order: newOrder },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { success: false, message: "Gagal membuat pesanan", error: error.message },
      { status: 500 }
    )
  }
}
