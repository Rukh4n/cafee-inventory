// api/auth/register/route.js
import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword } = body || {}

    const errors = {}

    if (!name || !name.toString().trim()) {
      errors.name = "Name is required."
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "A valid email is required."
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters."
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Password confirmation does not match."
    }

    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 422 })
    }

    const dirPath = path.join(process.cwd(), "public", "auth")
    const filePath = path.join(dirPath, "users.json")

    await fs.mkdir(dirPath, { recursive: true })

    let existingUsers = []
    try {
      const data = await fs.readFile(filePath, "utf-8")
      existingUsers = JSON.parse(data)
    } catch {
      existingUsers = []
    }

    const isDuplicate = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )
    if (isDuplicate) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      )
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "guest",
      createdAt: new Date().toISOString(),
    }

    existingUsers.push(newUser)
    await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), "utf-8")

    return NextResponse.json(
      { message: "Registration successful. Redirect to /auth/login" },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      {
        error: "Invalid request or server error.",
        detail: err?.message,
      },
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
