// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Add proper error if credentials missing
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required')
          }

          // Example user - replace with your actual user lookup
          const users = [
            {
              id: "1",
              email: "admin@example.com",
              password: "evolve2024", // In production, use hashed passwords!
              name: "Admin User",
              role: "admin"
            }
          ]

          const user = users.find(u => u.email === credentials.email)
          
          if (!user) {
            throw new Error('User not found')
          }

          // In production, use password hashing like bcrypt.compare()
          if (user.password !== credentials.password) {
            throw new Error('Invalid password')
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }