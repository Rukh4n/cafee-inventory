import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("query")?.toLowerCase() || ""

    const transactionFile = path.join(process.cwd(), "public", "transaction", "transactions.json")

    let transactions = []
    try {
      const data = await fs.readFile(transactionFile, "utf-8")
      transactions = JSON.parse(data)
    } catch {
      transactions = []
    }

    // Filter pencarian jika ada query
    if (query) {
      transactions = transactions.filter(
        (tx) =>
          tx.orderId?.toLowerCase().includes(query) ||
          tx.paymentMethod?.toLowerCase().includes(query) ||
          tx.status?.toLowerCase().includes(query)
      )
    }

    // Urutkan dari data terbaru ke terlama berdasarkan createdAt
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Gagal mengambil data transaksi:", error)
    return NextResponse.json({ error: "Gagal mengambil data transaksi" }, { status: 500 })
  }
}
