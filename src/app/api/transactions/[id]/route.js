import { promises as fs } from 'fs'
import path from 'path'

export async function PUT(req, context) {
  try {
    const { id } = await context.params
    const { status } = await req.json()

    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'ID dan status wajib diisi' }), { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'public', 'transaction', 'transactions.json')

    // Baca file transaksi
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const transactions = JSON.parse(fileContent)

    // Cari transaksi berdasarkan ID
    const index = transactions.findIndex(tx => tx.transactionId === id)
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Transaksi tidak ditemukan' }), { status: 404 })
    }

    // Ubah status transaksi
    transactions[index].status = status
    transactions[index].updatedAt = new Date().toISOString()

    // Simpan perubahan ke file
    await fs.writeFile(filePath, JSON.stringify(transactions, null, 2), 'utf-8')

    return new Response(
      JSON.stringify({
        message: 'Status transaksi berhasil diperbarui',
        data: transactions[index],
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating transaction status:', error)
    return new Response(
      JSON.stringify({ error: 'Gagal memperbarui status transaksi' }),
      { status: 500 }
    )
  }
}
