// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { connectDB } from '@/lib/connectToDB';
import Registration from '@/models/registration';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
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
            email: credentials.email.toLowerCase()
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
            throw new Error('Please contact support for offline registration access');
          }

          return {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.type || 'attendee',
            type: user.type,
            otpVerified: user.otpVerified || false
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
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          type: user.type,
          otpVerified: user.otpVerified || false
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        Object.assign(session.user, {
          id: token.id ?? '',
          role: token.role ?? '',
          type: token.type ?? '',
          email: token.email ?? '',
          otpVerified: token.otpVerified ?? false,
        });
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      try {
        const dest = new URL(url);
        if (dest.origin === baseUrl) {
          return url;
        }
      } catch {
        /* not a valid absolute URL */
      }
      return baseUrl;
    }
  },
  pages: {
    signIn: '/sign-in',
    error: '/',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
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
        domain: process.env.NODE_ENV === 'production' ? 'www.evolveictsummit.com' : undefined,
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