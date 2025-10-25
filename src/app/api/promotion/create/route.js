import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const title = formData.get("title")
    const description = formData.get("description")
    const discount = formData.get("discount")
    const startDate = formData.get("startDate")
    const endDate = formData.get("endDate")
    const percentage = formData.get("percentage")
    const limitQuota = formData.get("limitQuota")
    const amount = formData.get("amount")
    const image = formData.get("image")

    const promotionsDir = path.join(process.cwd(), "public", "promotion")
    const imgDir = path.join(promotionsDir, "img")
    const promotionsFile = path.join(promotionsDir, "promotions.json")

    await fs.mkdir(imgDir, { recursive: true })

    let imagePath = null
    if (image && image.name) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const imgFileName = `${Date.now()}-${image.name}`
      const filePath = path.join(imgDir, imgFileName)
      await fs.writeFile(filePath, buffer)
      imagePath = `/promotion/img/${imgFileName}`
    }

    let promotions = []
    try {
      const fileData = await fs.readFile(promotionsFile, "utf-8")
      promotions = JSON.parse(fileData)
    } catch (error) {
      promotions = []
    }

    const newPromotion = {
      id: Date.now(),
      title,
      description,
      discount,
      startDate,
      endDate,
      percentage,
      limitQuota,
      amount,
      image: imagePath,
      createdAt: new Date().toISOString(),
    }
    promotions.push(newPromotion)

    await fs.writeFile(promotionsFile, JSON.stringify(promotions, null, 2), "utf-8")

    return new Response(
      JSON.stringify({ message: "Promotion created successfully", data: newPromotion }),
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ message: "Error saving promotion", error: error.message }),
      { status: 500 }
    )
  }
}
