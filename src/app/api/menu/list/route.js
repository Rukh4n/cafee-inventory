import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')?.toLowerCase() || ''

    const filePath = path.join(process.cwd(), 'public', 'products', 'products.json')
    const data = await fs.readFile(filePath, 'utf-8')
    let products = JSON.parse(data)

    if (query) {
      products = products.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
    }

    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products', detail: error.message },
      { status: 500 }
    )
  }
}
