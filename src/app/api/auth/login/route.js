// /api/auth/login/route.js
import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "my_secret_key"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      )
    }

    // Lokasi file user
    const filePath = path.join(process.cwd(), "public", "auth", "users.json")

    // Pastikan file user ada
    let users = []
    try {
      const data = await fs.readFile(filePath, "utf-8")
      users = JSON.parse(data)
    } catch {
      return NextResponse.json(
        { error: "User database not found." },
        { status: 404 }
      )
    }

    // Cek user berdasarkan email dan password
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase().trim() &&
        u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      )
    }

    // Jika user ditemukan, buat JWT token dengan timestamp
    const timestamp = Date.now()
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, ts: timestamp },
      SECRET_KEY,
      { expiresIn: "1h" }
    )

    // Buat response dan simpan token ke cookie
    const response = NextResponse.json({
      message: "Login successful.",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 jam
    })

    return response
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error.", detail: err.message },
      { status: 500 }
    )
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Method GET not allowed on this route." },
    { status: 405 }
  )
}
