// src/app/api/accounts/create/route.js
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const body = await req.json()
    const { full_name, email, role, password } = body

    if (!full_name || !email || !role || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 })
    }

    // Path ke file users.json
    const usersFilePath = path.join(process.cwd(), 'public/auth/users.json')

    // Baca data user lama
    let users = []
    try {
      const data = await fs.readFile(usersFilePath, 'utf-8')
      users = JSON.parse(data)
    } catch (error) {
      console.log('No existing users, creating new file...')
    }

    // Tambahkan user baru
    const newUser = {
      id: Date.now(),
      name: full_name,
      email,
      password,
      role,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)

    // Simpan kembali ke file
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2))

    return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
  }
}
