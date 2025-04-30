// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import { connectDB } from '@/lib/connectToDB'
import registration from '@/models/registration'
import bcrypt from 'bcryptjs' // Make sure to import bcrypt

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

          await connectDB() // Connect to MongoDB

          // Example user - replace with your actual user lookup
          const user = await registration.findOne({ email: credentials.email })
          
          if (!user) {
            throw new Error('User not found')
          }

           // Use bcrypt.compare() to check the password
           const passwordMatch = await bcrypt.compare(
            credentials.password, 
            user.password
          )

          if (!passwordMatch) {
            throw new Error('Invalid password')
          }

          // Return user object in the format NextAuth expects
          return {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role || 'user' // Default to 'user' if role not specified
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
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
    
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