import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const transaction = await req.json()
    const dirPath = path.join(process.cwd(), 'public', 'transactions')
    const filePath = path.join(dirPath, 'transactions.json')
    const productsFilePath = path.join(process.cwd(), 'public', 'products', 'products.json')

    // Pastikan directory transactions ada
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
    } catch (err) {
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

    // Tambahkan transaction baru
    existingData.push({ id: Date.now(), ...transaction, createdAt: new Date().toISOString() })

    // Simpan kembali file transactions
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8')

    return new Response(JSON.stringify({ message: 'Transaction saved successfully' }), { status: 200 })
  } catch (error) {
    console.error('Error saving transaction:', error)
    return new Response(JSON.stringify({ error: 'Failed to save transaction' }), { status: 500 })
  }
}
