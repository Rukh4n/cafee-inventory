import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const transaction = await req.json()
    const dirPath = path.join(process.cwd(), 'public', 'transaction')
    const filePath = path.join(dirPath, 'transactions.json')
    const productsFilePath = path.join(process.cwd(), 'public', 'products', 'products.json')

    // Pastikan directory transaction ada
    try {
      await fs.mkdir(dirPath, { recursive: true })
    } catch (err) {
      console.error('Error creating directory:', err)
    }

    // Baca file existing transactions
    let existingData = []
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      existingData = JSON.parse(fileContent)
    } catch {
      existingData = []
    }

    // Baca file products
    let productsData = []
    try {
      const productsContent = await fs.readFile(productsFilePath, 'utf-8')
      productsData = JSON.parse(productsContent)
    } catch (err) {
      console.error('Error reading products file:', err)
      productsData = []
    }

    // Kurangi stok produk sesuai quantity transaksi
    transaction.products.forEach((tProduct) => {
      const productIndex = productsData.findIndex((p) => p.id === tProduct.id)
      if (productIndex !== -1) {
        productsData[productIndex].stock = Math.max(
          0,
          productsData[productIndex].stock - (tProduct.quantity || 0)
        )
      }
    })

    // Simpan kembali file products
    await fs.writeFile(productsFilePath, JSON.stringify(productsData, null, 2), 'utf-8')

    // Buat struktur transaksi sesuai ketentuan
    const newTransaction = {
      transactionId: `TX-${Date.now()}`,
      orderId: transaction.transactionType === 'wrap' ? `ORDER-${Date.now()}` : '',
      name: transaction.name || '',
      items: transaction.products.map((p) => ({
        id: Date.now() + Math.floor(Math.random() * 1000),
        userId: transaction.userId || '',
        productId: p.id,
        name: p.name,
        price: p.price,
        category: p.category || '',
        image: p.image || '',
        quantity: p.quantity,
        createdAt: new Date().toISOString(),
      })),
      totalPrice: transaction.totalPrice || '',
      paymentMethod: transaction.paymentMethod || '',
      tableNumber: transaction.tableNumber || '',
      address: transaction.address || '',
      phoneNumber: transaction.phoneNumber || '',
      transactionType: transaction.transactionType || '',
      status: 'settlement', // status otomatis settlement
      createdAt: new Date().toISOString(),
      paymentUrl: transaction.paymentUrl || '',
    }

    // Tambahkan transaction baru
    existingData.push(newTransaction)

    // Simpan kembali file transactions
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8')

    // Redirect ke halaman admin/transactions
    return NextResponse.redirect(new URL('/admin/transactions', req.url))
  } catch (error) {
    console.error('Error saving transaction:', error)
    return new Response(JSON.stringify({ error: 'Failed to save transaction' }), { status: 500 })
  }
}
