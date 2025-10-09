import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { promises as fs } from "fs"
import path from "path"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const filePath = path.join(process.cwd(), "public", "auth", "users.json")
        const data = await fs.readFile(filePath, "utf-8")
        const users = JSON.parse(data)

        const user = users.find(
          (u) =>
            u.email.toLowerCase() === credentials.email.toLowerCase().trim() &&
            u.password === credentials.password
        )

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "my_secret_key",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.user.role = token.role
      return session
    },
  },
})

export { handler as GET, handler as POST }
