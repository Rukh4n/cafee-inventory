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

  // Proteksi untuk halaman /guest
  if (pathname.startsWith("/guest")) {
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url)
      return NextResponse.redirect(loginUrl)
    }

    if (token?.user?.role !== "guest") {
      const unauthorizedUrl = new URL("/unauthorized", req.url)
      return NextResponse.redirect(unauthorizedUrl)
    }
  }

  // Lanjutkan request jika lolos pengecekan
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/guest/:path*"],
}
