import { promises as fs } from 'fs'
import path from 'path'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')?.toLowerCase() || ''

    const filePath = path.join(process.cwd(), 'public', 'transactions', 'transactions.json')
    let data = []

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      data = JSON.parse(fileContent)

      if (query) {
        data = data.filter(tx => 
          tx.id.toString().includes(query) ||
          tx.products.some(p => p.name.toLowerCase().includes(query))
        )
      }
    } catch (err) {
      data = []
    }

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('Error reading transactions:', error)
    return new Response(JSON.stringify({ error: 'Failed to read transactions' }), { status: 500 })
  }
}
