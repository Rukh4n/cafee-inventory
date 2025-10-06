// /middleware.js
import { NextResponse } from "next/server"

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value

  // Jika belum login, arahkan ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Jika sudah login, lanjutkan ke route berikutnya
  return NextResponse.next()
}

// Tentukan route yang dilindungi
export const config = {
  matcher: ["/admin/:path*"],
}
