import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ message: "UserId tidak ditemukan" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "public", "order-list", "orderList.json")

    try {
      await fs.access(filePath)
    } catch {
      await fs.writeFile(filePath, "[]", "utf8")
    }

    const fileData = await fs.readFile(filePath, "utf8")
    const orders = JSON.parse(fileData)

    const userOrders = orders.filter((order) => order.userId === Number(userId))

    return NextResponse.json(userOrders, { status: 200 })
  } catch (error) {
    console.error("Error fetching order list:", error)
    return NextResponse.json({ message: "Gagal mengambil data pesanan" }, { status: 500 })
  }
}
