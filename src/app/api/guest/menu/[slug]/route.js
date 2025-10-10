import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request, { params }) {
  const { slug } = params

  try {
    const filePath = path.join(process.cwd(), 'public', 'products', 'products.json')
    const fileData = await fs.readFile(filePath, 'utf-8')
    const products = JSON.parse(fileData)

    const product = products.find(
      (item) => item.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    )

    if (!product) {
      return Response.json({ message: 'Produk tidak ditemukan' }, { status: 404 })
    }

    return Response.json(product)
  } catch (error) {
    return Response.json({ message: 'Gagal membaca data produk', error: error.message }, { status: 500 })
  }
}
