// src/app/api/accounts/route.js
import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""

    // Path ke file users.json
    const filePath = path.join(process.cwd(), "public", "auth", "users.json")

    // Baca isi file
    const data = await fs.readFile(filePath, "utf-8")
    let users = JSON.parse(data)

    // Filter berdasarkan query pencarian jika ada
    if (query) {
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      )
    }

    // Kembalikan data user
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load users.", detail: error.message },
      { status: 500 }
    )
  }
}
