import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const body = await req.json()
    const { items, totalPrice, paymentMethod, tableNumber, name, address, phoneNumber, transactionType } = body

    if (!items || !totalPrice || !paymentMethod || !name || !transactionType) {
      return NextResponse.json({ error: "Data transaksi tidak lengkap" }, { status: 400 })
    }

    const transactionDir = path.join(process.cwd(), "public", "transaction")
    const transactionFile = path.join(transactionDir, "transactions.json")
    const productFile = path.join(process.cwd(), "public", "products", "products.json")
    const orderListFile = path.join(process.cwd(), "public", "order-list", "orderList.json")

    await fs.mkdir(transactionDir, { recursive: true })

    let transactions = []
    try { transactions = JSON.parse(await fs.readFile(transactionFile, "utf-8")) } catch { transactions = [] }
    let products = []
    try { products = JSON.parse(await fs.readFile(productFile, "utf-8")) } catch { return NextResponse.json({ error: "Data produk tidak ditemukan" }, { status: 500 }) }
    let orderList = []
    try { orderList = JSON.parse(await fs.readFile(orderListFile, "utf-8")) } catch { orderList = [] }

    const orderId = `DELIVERY-${Date.now()}`
    let transactionData = null
    let paymentUrl = null
    let transactionToken = null

    for (const item of items) {
      const productIndex = products.findIndex(p => p.id === item.productId)
      if (productIndex !== -1) {
        if (products[productIndex].stock < item.quantity) {
          return NextResponse.json({ error: `Stok "${products[productIndex].name}" tidak mencukupi` }, { status: 400 })
        }
        products[productIndex].stock -= item.quantity
        products[productIndex].updatedAt = new Date().toISOString()
      }
    }

    await fs.writeFile(productFile, JSON.stringify(products, null, 2), "utf-8")

    const purchasedIds = items.map(item => item.productId)
    orderList = orderList.filter(order => !purchasedIds.includes(order.productId))
    await fs.writeFile(orderListFile, JSON.stringify(orderList, null, 2), "utf-8")

    if (paymentMethod === "Manual via Kasir") {
      transactionData = {
        transactionId: orderId,
        orderId,
        name,
        items,
        totalPrice,
        paymentMethod,
        tableNumber: tableNumber || "",
        address: address || "",
        phoneNumber: phoneNumber || "",
        transactionType,
        status: "pending",
        createdAt: new Date().toISOString(),
        paymentUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/guest/transaction`
      }
    } else {
      const snap = new midtransClient.Snap({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
        serverKey: process.env.MIDTRANS_SERVER_KEY
      })

      const parameter = {
        transaction_details: { order_id: orderId, gross_amount: totalPrice },
        item_details: items.map(item => ({ id: item.productId.toString(), price: item.price, quantity: item.quantity, name: item.name })),
        credit_card: { secure: true },
        customer_details: { first_name: name, email: "guest@example.com", phone: phoneNumber || "", address: address || "" },
        callbacks: { finish: `${process.env.NEXT_PUBLIC_BASE_URL}/guest/transaction` }
      }

      const transaction = await snap.createTransaction(parameter)
      transactionToken = transaction.token
      paymentUrl = transaction.redirect_url

      transactionData = {
        transactionId: orderId,
        orderId,
        name,
        items,
        totalPrice,
        paymentMethod,
        tableNumber: tableNumber || "",
        address: address || "",
        phoneNumber: phoneNumber || "",
        transactionType,
        status: "pending",
        createdAt: new Date().toISOString(),
        paymentUrl,
        transactionToken
      }
    }

    transactions.push(transactionData)
    await fs.writeFile(transactionFile, JSON.stringify(transactions, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      transactionId: transactionData.transactionId,
      name: transactionData.name,
      items: transactionData.items,
      totalPrice: transactionData.totalPrice,
      paymentMethod: transactionData.paymentMethod,
      tableNumber: transactionData.tableNumber,
      address: transactionData.address,
      phoneNumber: transactionData.phoneNumber,
      transactionType: transactionData.transactionType,
      paymentUrl: transactionData.paymentUrl,
      transactionToken: transactionData.transactionToken || null
    })
  } catch (error) {
    console.error("Error membuat transaksi:", error)
    return NextResponse.json({ error: "Gagal membuat transaksi" }, { status: 500 })
  }
}
