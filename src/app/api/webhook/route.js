import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const body = await req.json()

    // Body dari Midtrans webhook
    const { order_id, transaction_status } = body

    if (!order_id || !transaction_status) {
      return NextResponse.json({ error: "Data webhook tidak lengkap" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "public", "transaction", "transactions.json")

    let transactions = []
    try {
      const fileData = await fs.readFile(filePath, "utf-8")
      transactions = JSON.parse(fileData)
    } catch {
      return NextResponse.json({ error: "Tidak ada data transaksi" }, { status: 404 })
    }

    const transactionIndex = transactions.findIndex(tx => tx.orderId === order_id)
    if (transactionIndex === -1) {
      return NextResponse.json({ error: "Transaksi tidak ditemukan" }, { status: 404 })
    }

    // Update status transaksi
    transactions[transactionIndex].status = transaction_status
    transactions[transactionIndex].updatedAt = new Date().toISOString()

    await fs.writeFile(filePath, JSON.stringify(transactions, null, 2), "utf-8")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error webhook:", error)
    return NextResponse.json({ error: "Gagal memproses webhook" }, { status: 500 })
  }
}
