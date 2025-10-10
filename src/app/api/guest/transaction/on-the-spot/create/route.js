// /app/api/guest/transaction/on-the-spot/create/route.js
import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const body = await req.json()
    const { items, totalPrice, paymentMethod, bank } = body

    if (!items || !totalPrice || !paymentMethod) {
      return NextResponse.json({ error: "Data transaksi tidak lengkap" }, { status: 400 })
    }

    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    const parameter = {
      transaction_details: {
        order_id: `ONSPOT-${Date.now()}`,
        gross_amount: totalPrice,
      },
      item_details: items.map(item => ({
        id: item.id.toString(),
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })),
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "Guest",
        email: "guest@example.com",
      },
      finish_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/guest/transaction`
    }

    if (paymentMethod === "Transfer Bank" && bank) {
      parameter.enabled_payments = [`bank_transfer`]
      parameter.bank_transfer = {
        bank: bank.toLowerCase()
      }
    }

    const transaction = await snap.createTransaction(parameter)

    const dirPath = path.join(process.cwd(), "public", "transaction")
    const filePath = path.join(dirPath, "transactions.json")

    await fs.mkdir(dirPath, { recursive: true })

    let transactions = []
    try {
      const fileData = await fs.readFile(filePath, "utf-8")
      transactions = JSON.parse(fileData)
    } catch {
      transactions = []
    }

    const newTransaction = {
      transactionId: transaction.transaction_id,
      orderId: parameter.transaction_details.order_id,
      items,
      totalPrice,
      paymentMethod,
      bank: bank || null,
      createdAt: new Date().toISOString(),
      paymentUrl: transaction.redirect_url
    }

    transactions.push(newTransaction)
    await fs.writeFile(filePath, JSON.stringify(transactions, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      paymentUrl: transaction.redirect_url,
      transactionId: transaction.transaction_id,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/guest/transaction`
    })
  } catch (error) {
    console.error("Error membuat transaksi Midtrans:", error)
    return NextResponse.json({ error: "Gagal membuat transaksi" }, { status: 500 })
  }
}
