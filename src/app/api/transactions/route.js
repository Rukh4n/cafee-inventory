import { promises as fs } from 'fs'
import path from 'path'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')?.toLowerCase() || ''

    const filePath = path.join(process.cwd(), 'public', 'transaction', 'transactions.json')
    let data = []

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      data = JSON.parse(fileContent)

      if (query) {
        data = data.filter(tx =>
          tx.transactionId.toLowerCase().includes(query) ||
          tx.items.some(item => item.name.toLowerCase().includes(query))
        )
      }

      // Urutkan data dari terbaru ke terlama berdasarkan createdAt
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (err) {
      console.error('Error parsing transactions:', err)
      data = []
    }

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('Error reading transactions:', error)
    return new Response(JSON.stringify({ error: 'Failed to read transactions' }), { status: 500 })
  }
}
