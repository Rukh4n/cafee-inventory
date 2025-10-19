// /src/app/api/auth/logout/route.js
import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logout berhasil" })

  // Hapus cookie auth_token
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
  })

  return response
}
