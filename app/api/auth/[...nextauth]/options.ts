// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { connectDB } from '@/lib/connectToDB';
import Registration from '@/models/registration';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {

  debug: process.env.NODE_ENV === 'development', // Add this line
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            throw new Error('Email and password are required');
          }
          await connectDB();

 const user = await Registration.findOne({ 
      email: credentials.email.toLowerCase() // Case insensitive search
    });   
    if (!user) {
      console.log('No user found for email:', credentials.email);
      throw new Error('User not found');
    }

    console.log('Found user:', {
      email: user.email,
      mode: user.mode,
      hasPassword: !!user.password
    });


              // Only compare passwords for online registrations
              if (user.mode === 'online') {
                const passwordMatch = await bcrypt.compare(
                  credentials.password, 
                  user.password
                );

                console.log('Password match result:', passwordMatch);
    
                if (!passwordMatch) {
                  throw new Error('Invalid password');
                }
              } else {
                // For offline registrations, you might want to implement a different auth method
                throw new Error('Please contact support for offline registration access');
              }

          return {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role || 'user'
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-expect-error
        token.role = user.role;
        token.id = user.id;
        token.email = user.email; // Make sure email is included
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id as string;
        session.user.email = token.email as string; // Make sure email is included
      }
      return session;
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
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };