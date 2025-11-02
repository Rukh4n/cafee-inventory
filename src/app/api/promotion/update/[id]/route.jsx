import { promises as fs } from "fs"
import path from "path"

export async function PUT(req, { params }) {
  try {
    const { id } = params
    const formData = await req.formData()

    const title = formData.get("title")
    const description = formData.get("description")
    const startDate = formData.get("startDate")
    const endDate = formData.get("endDate")
    const promoCode = formData.get("promoCode")
    const percentage = formData.get("percentage")
    const limitQuota = formData.get("limitQuota")
    const image = formData.get("image")
    const amount = null

    const promotionsDir = path.join(process.cwd(), "public", "promotion")
    const imgDir = path.join(promotionsDir, "img")
    const promotionsFile = path.join(promotionsDir, "promotions.json")

    await fs.mkdir(imgDir, { recursive: true })

    const fileData = await fs.readFile(promotionsFile, "utf-8")
    let promotions = JSON.parse(fileData)

    const index = promotions.findIndex((promo) => promo.id === Number(id))
    if (index === -1) {
      return new Response(
        JSON.stringify({ message: "Promotion not found" }),
        { status: 404 }
      )
    }

    let imagePath = promotions[index].image

    // Jika ada gambar baru dikirimkan
    if (image && image.name) {
      // Hapus gambar lama jika ada
      if (promotions[index].image) {
        const oldImagePath = path.join(process.cwd(), "public", promotions[index].image)
        try {
          await fs.unlink(oldImagePath)
        } catch (err) {
          console.warn("Old image not found or already deleted:", oldImagePath)
        }
      }

      // Simpan gambar baru
      const buffer = Buffer.from(await image.arrayBuffer())
      const imgFileName = `${Date.now()}-${image.name}`
      const filePath = path.join(imgDir, imgFileName)
      await fs.writeFile(filePath, buffer)
      imagePath = `/promotion/img/${imgFileName}`
    }

    promotions[index] = {
      ...promotions[index],
      title,
      description,
      startDate,
      endDate,
      promoCode,
      percentage,
      limitQuota,
      amount,
      image: imagePath,
      updatedAt: new Date().toISOString(),
    }

    await fs.writeFile(promotionsFile, JSON.stringify(promotions, null, 2), "utf-8")

    return new Response(
      JSON.stringify({ message: "Promotion updated successfully", data: promotions[index] }),
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ message: "Error updating promotion", error: error.message }),
      { status: 500 }
    )
  }
}
