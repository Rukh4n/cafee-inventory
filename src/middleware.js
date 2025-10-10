import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "my_secret_key",
  })

  const { pathname } = req.nextUrl

  // Proteksi untuk halaman /admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url)
      return NextResponse.redirect(loginUrl)
    }

    if (token?.user?.role !== "admin") {
      const unauthorizedUrl = new URL("/unauthorized", req.url)
      return NextResponse.redirect(unauthorizedUrl)
    }
  }

  // Proteksi untuk API /guest/order-list
  if (pathname.startsWith("/api/guest/order-list")) {
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (token?.user?.role !== "guest") {
      return NextResponse.json({ message: "Forbidden: Only guest can access" }, { status: 403 })
    }
  }

  // Lanjutkan request jika lolos pengecekan
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/guest/:path*", "/api/guest/order-list/:path*"],
}
