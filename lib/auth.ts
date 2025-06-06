// auth.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const auth = NextAuth(authOptions);