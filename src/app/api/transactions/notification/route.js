import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'transaction', 'transactions.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    // hitung jumlah transaksi dengan status settlement
    const settlementCount = data.filter(tx => tx.status === 'settlement').length

    return new Response(JSON.stringify({ settlementCount }), { status: 200 })
  } catch (error) {
    console.error('Error reading transactions:', error)
    return new Response(JSON.stringify({ error: 'Failed to read transactions' }), { status: 500 })
  }
}
