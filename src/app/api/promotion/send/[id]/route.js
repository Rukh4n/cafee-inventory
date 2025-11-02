import nodemailer from "nodemailer"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req, context) {
  try {
    const { id } = await context.params
    const promotionId = Number(id)

    // Lokasi file promotions
    const promotionsDir = path.join(process.cwd(), "public", "promotion")
    const promotionsFile = path.join(promotionsDir, "promotions.json")

    // Baca data promosi
    const fileData = await fs.readFile(promotionsFile, "utf-8")
    const promotions = JSON.parse(fileData)
    const promotion = promotions.find((p) => p.id === promotionId)

    if (!promotion) {
      return new Response(JSON.stringify({ message: "Promotion not found" }), {
        status: 404,
      })
    }

    // Lokasi file users
    const usersFile = path.join(process.cwd(), "public", "auth", "users.json")
    const userData = await fs.readFile(usersFile, "utf-8")
    const allUsers = JSON.parse(userData)

    // Filter hanya user dengan role = "guest"
    const users = allUsers.filter((user) => user.role === "guest")

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ message: "No guest user found" }),
        { status: 400 }
      )
    }

    // Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Kirim email ke setiap guest user
    const sendPromises = users.map(async (user) => {
      const mailOptions = {
        from: `"Promo Center" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: `🎉 ${promotion.title} is Here!`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #030303; color: #F1EFEC; border: 2px solid #D4C9BE; border-radius: 10px; padding: 20px; max-width: 600px; margin: auto;">
            <h2 style="text-align: center; color: #F1EFEC;">${promotion.title}</h2>
            ${
              promotion.image
                ? `<div style="text-align:center; margin: 20px 0;">
                    <img src="${process.env.NEXT_PUBLIC_BASE_URL}${promotion.image}" alt="${promotion.title}" style="max-width: 100%; border-radius: 10px;"/>
                  </div>`
                : ""
            }
            <p style="font-size: 15px; line-height: 1.6;">${promotion.description}</p>
            <div style="background-color: #D4C9BE; color: #030303; padding: 10px; border-radius: 8px; text-align: center; font-weight: bold; letter-spacing: 1px; margin: 20px 0;">
              Promo Code: ${promotion.promoCode}
            </div>
            <p><strong>Discount:</strong> ${promotion.percentage || 0}%</p>
            <p><strong>Limit Quota:</strong> ${promotion.limitQuota}</p>
            <p><strong>Valid:</strong> ${promotion.startDate} - ${promotion.endDate}</p>
            <p style="margin-top: 20px; text-align:center;">Don't miss out on this special offer!</p>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
    })

    await Promise.all(sendPromises)

    return new Response(
      JSON.stringify({
        message: `Promotion "${promotion.title}" has been sent to ${users.length} guest email(s) successfully!`,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending promotion:", error)
    return new Response(
      JSON.stringify({
        message: "Error sending promotion",
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
