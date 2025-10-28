import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { promises as fs } from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'public', 'auth', 'users.json');

async function readUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []; // kalau belum ada file
    }
}

async function writeUsers(users) {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const filePath = path.join(
                    process.cwd(),
                    'public',
                    'auth',
                    'users.json'
                );
                const data = await fs.readFile(filePath, 'utf-8');
                const users = JSON.parse(data);

                const user = users.find(
                    (u) =>
                        u.email.toLowerCase() ===
                            credentials.email.toLowerCase().trim() &&
                        u.password === credentials.password
                );

                if (user) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } else {
                    return null;
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
            clientSecret:
                process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
    },
    secret: process.env.NEXTAUTH_SECRET || 'my_secret_key',
    callbacks: {
        // Callback ketika login berhasil
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                const users = await readUsers();

                const existingUser = users.find(
                    (u) => u.email.toLowerCase() === user.email.toLowerCase()
                );

                if (!existingUser) {
                    const newUser = {
                        id: Date.now(),
                        name: user.name || 'User Tanpa Nama',
                        email: user.email,
                        password: '', // tidak ada password dari Google
                        role: 'guest',
                        createdAt: new Date().toISOString(),
                    };

                    users.push(newUser);
                    await writeUsers(users);
                    console.log(
                        '✅ User baru dari Google ditambahkan:',
                        newUser
                    );
                }
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.user = user;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.user.role = token.role;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
