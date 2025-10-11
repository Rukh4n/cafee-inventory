import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const body = await req.json()
    const { items, totalPrice, paymentMethod, tableNumber, address, phoneNumber } = body

    if (!items || !totalPrice || !paymentMethod) {
      return NextResponse.json({ error: "Data transaksi tidak lengkap" }, { status: 400 })
    }

    const transactionDir = path.join(process.cwd(), "public", "transaction")
    const transactionFile = path.join(transactionDir, "transactions.json")
    const productFile = path.join(process.cwd(), "public", "products", "products.json")
    const orderListFile = path.join(process.cwd(), "public", "order-list", "orderList.json")

    await fs.mkdir(transactionDir, { recursive: true })

    // Load Data Transaksi
    let transactions = []
    try {
      const fileData = await fs.readFile(transactionFile, "utf-8")
      transactions = JSON.parse(fileData)
    } catch {
      transactions = []
    }

    // Load Data Produk
    let products = []
    try {
      const productData = await fs.readFile(productFile, "utf-8")
      products = JSON.parse(productData)
    } catch {
      return NextResponse.json({ error: "Data produk tidak ditemukan" }, { status: 500 })
    }

    // Load Data Order List
    let orderList = []
    try {
      const orderData = await fs.readFile(orderListFile, "utf-8")
      orderList = JSON.parse(orderData)
    } catch {
      orderList = []
    }

    const orderId = `ONSPOT-${Date.now()}`
    let transactionData = null
    let paymentUrl = null
    let transactionId = null

    // Kurangi stok produk berdasarkan item yang dibeli
    for (const item of items) {
      const productIndex = products.findIndex(p => p.id === item.productId)
      if (productIndex !== -1) {
        if (products[productIndex].stock < item.quantity) {
          return NextResponse.json({
            error: `Stok produk "${products[productIndex].name}" tidak mencukupi`
          }, { status: 400 })
        }
        products[productIndex].stock -= item.quantity
        products[productIndex].updatedAt = new Date().toISOString()
      }
    }

    // Simpan data produk yang sudah dikurangi stoknya
    await fs.writeFile(productFile, JSON.stringify(products, null, 2), "utf-8")

    // Hapus data orderList yang dibeli
    const purchasedIds = items.map(item => item.productId)
    orderList = orderList.filter(order => !purchasedIds.includes(order.productId))
    await fs.writeFile(orderListFile, JSON.stringify(orderList, null, 2), "utf-8")

    // Jika pembayaran manual
    if (paymentMethod === "Manual via Kasir") {
      transactionData = {
        transactionId: `MANUAL-${Date.now()}`,
        orderId,
        items,
        totalPrice,
        paymentMethod,
        tableNumber: tableNumber || "",
        address: address || "",
        phoneNumber: phoneNumber || "",
        status: "pending",
        createdAt: new Date().toISOString(),
        paymentUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/guest/transaction`
      }
    } 
    // Jika pembayaran online via Midtrans
    else {
      const snap = new midtransClient.Snap({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      })

      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: totalPrice,
        },
        item_details: items.map(item => ({
          id: item.productId.toString(),
          price: item.price,
          quantity: item.quantity,
          name: item.name,
        })),
        credit_card: { secure: true },
        customer_details: { first_name: "Guest", email: "guest@example.com" },
        callbacks: {
          finish: `${process.env.NEXT_PUBLIC_BASE_URL}/guest/transaction`
        }
      }

      const transaction = await snap.createTransaction(parameter)
      transactionId = transaction.transaction_id
      paymentUrl = transaction.redirect_url

      transactionData = {
        transactionId,
        orderId,
        items,
        totalPrice,
        paymentMethod,
        tableNumber: tableNumber || "",
        address: address || "",
        phoneNumber: phoneNumber || "",
        status: "pending",
        createdAt: new Date().toISOString(),
        paymentUrl
      }
    }

    // Simpan transaksi baru
    transactions.push(transactionData)
    await fs.writeFile(transactionFile, JSON.stringify(transactions, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      paymentUrl: transactionData.paymentUrl,
      transactionId: transactionData.transactionId,
    })
  } catch (error) {
    console.error("Error membuat transaksi:", error)
    return NextResponse.json({ error: "Gagal membuat transaksi" }, { status: 500 })
  }
}
