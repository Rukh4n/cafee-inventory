import fs from 'fs'
import path from 'path'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')?.toLowerCase() || ''

    const filePath = path.join(process.cwd(), 'public', 'products', 'products.json')
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const products = JSON.parse(fileData)

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    )

    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
