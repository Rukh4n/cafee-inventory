import fs from "fs"
import path from "path"

export async function POST(req) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const filePath = path.join(process.cwd(), "public/auth/users.json")
    const fileData = fs.readFileSync(filePath, "utf-8")
    const users = JSON.parse(fileData)

    const filteredUsers = users.filter((user) => user.id !== id)

    fs.writeFileSync(filePath, JSON.stringify(filteredUsers, null, 2))

    return new Response(JSON.stringify({ success: true, deletedId: id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
