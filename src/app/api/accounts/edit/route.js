// src/app/api/accounts/edit/route.js
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const body = await req.json()
    const { id, name, email, password, role } = body

    if (!id || !name || !email || !role) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    const usersFile = path.join(process.cwd(), 'public/auth/users.json')
    const data = fs.readFileSync(usersFile, 'utf8')
    let users = JSON.parse(data)

    const userIndex = users.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      password: password || users[userIndex].password,
      role
    }

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8')

    return new Response(JSON.stringify({ message: 'User updated successfully', user: users[userIndex] }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 })
  }
}
