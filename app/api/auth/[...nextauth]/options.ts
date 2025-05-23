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
        //@ts-ignore
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
        //@ts-ignore
        session.user.type = token.type; // Add type to session 
        session.user.id = token.sub as any;
        session.user.email = token.email as string;
        // @ts-ignore
        session.user.type = token.type; // Add user type to session
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If callbackUrl is relative (e.g. "/exhibitor/dashboard"), prefix it
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // If callbackUrl is an absolute URL on the same origin, allow it
      try {
        const dest = new URL(url);
        if (dest.origin === baseUrl) {
          return url;
        }
      } catch {
        /* not a valid absolute URL */
      }
      // Fallback to home
      return baseUrl;
    }
    
  },
  pages: {
    signIn: '/sign-in',
    error: '/', // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === 'production' ? 'www.evolveictsummit.com' : undefined, // 
      },
    },
  },
  logger: {
    error(code, metadata) {
      console.error('Auth error:', code, metadata);
    },
    warn(code) {
      console.warn('Auth warning:', code);
    },
    debug(code, metadata) {
      console.log('Auth debug:', code, metadata);
    }
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };