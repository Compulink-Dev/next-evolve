import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    role: string;
    email: string;
    user: {
      id: string;
      role: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        role: string
    }
}