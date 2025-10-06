// /api/auth/register/route.js
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "my_super_secret_key";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body || {};

    const errors = {};

    if (!name || !name.toString().trim()) {
      errors.name = "Name is required.";
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "A valid email is required.";
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Password confirmation does not match.";
    }

    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    // Tentukan direktori penyimpanan
    const dirPath = path.join(process.cwd(), "public", "auth");
    const filePath = path.join(dirPath, "users.json");

    // Pastikan direktori ada
    await fs.mkdir(dirPath, { recursive: true });

    // Baca file jika sudah ada
    let existingUsers = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      existingUsers = JSON.parse(data);
    } catch {
      existingUsers = [];
    }

    // Cek jika email sudah terdaftar
    const isDuplicate = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (isDuplicate) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    // Buat user baru
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // ⚠️ Simpan plain text hanya untuk demo (gunakan hash di production)
      role: "staff",
      createdAt: new Date().toISOString(),
    };

    // Simpan user baru ke file JSON
    existingUsers.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), "utf-8");

    // 🔒 Buat JWT token dengan timestamp sebagai kunci tambahan
    const timestamp = Date.now();
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, ts: timestamp },
      SECRET_KEY + timestamp,
      { expiresIn: "2h" }
    );

    // Buat response dan set cookie JWT
    const response = NextResponse.json(
      { message: "User registered successfully.", user: newUser },
      { status: 201 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // 2 jam
      path: "/",
    });

    // Redirect ke dashboard admin
    response.headers.set("Location", "/admin/dashboard");
    response.status = 302;

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        error: "Invalid request or server error.",
        detail: err?.message,
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Method GET not allowed on this route." },
    { status: 405 }
  );
}
