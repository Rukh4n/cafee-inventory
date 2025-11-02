import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
  try {
    const { code, totalPrice } = await req.json()

    const filePath = path.join(process.cwd(), "public", "promotion", "promotions.json")
    const fileData = await fs.readFile(filePath, "utf-8")
    const promotions = JSON.parse(fileData)

    const promo = promotions.find((p) => p.promoCode === code)

    if (!promo) {
      return new Response(
        JSON.stringify({ success: false, message: "Kode promo tidak ditemukan." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    // cek periode tanggal
    const today = new Date()
    const start = new Date(promo.startDate)
    const end = new Date(promo.endDate)
    if (today < start || today > end) {
      return new Response(
        JSON.stringify({ success: false, message: "Promo belum aktif atau sudah berakhir." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    // cek limit kuota
    if (promo.amount === null) promo.amount = 0
    if (Number(promo.amount) < Number(promo.limitQuota)) {
      promo.amount = Number(promo.amount) + 1

      // update file promotions.json
      await fs.writeFile(filePath, JSON.stringify(promotions, null, 2), "utf-8")
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Kuota promo sudah habis." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    const discount = totalPrice * (Number(promo.percentage) / 100)
    const newTotal = totalPrice - discount

    return new Response(
      JSON.stringify({
        success: true,
        newTotal,
        message: `Voucher berhasil! Diskon ${promo.percentage}% diterapkan.`
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Terjadi kesalahan server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
