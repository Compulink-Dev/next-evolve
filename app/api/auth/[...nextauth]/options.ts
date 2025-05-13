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
            role: user.type || 'attendee', // Use 'type' field from registration
            type: user.type // Add type to user object
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
      console.log('JWT callback - token:', token);
      console.log('JWT callback - user:', user);
      if (user) {
        //@ts-expect-error
        token.role = user.role;
        token.id = user.id;
        token.type = user.type; // Add type to token
        token.email = user.email; // Make sure email is included
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - session:', session);
      console.log('Session callback - token:', token);
      if (session.user) {
        session.user.role = token.role;
        session.user.type = token.type; // Add type to session 
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        // @ts-ignore
        session.user.type = token.type; // Add user type to session
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in', // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // Remove __Secure- prefix for testing
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };