import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Check for OTP verification cookie
    const isOtpVerified = cookies().get("otp-verified")?.value === "true";

    // Redirect to appropriate dashboard based on type
    if (pathname === "/selection") {
      if (token?.type === "sponsor") {
        return NextResponse.redirect(new URL("/sponsor", req.url));
      } else if (token?.type === "exhibitor") {
        return NextResponse.redirect(new URL("/exhibitor", req.url));
      } else if (token?.type === "attendee") {
        return NextResponse.redirect(new URL("/attendee", req.url));
      } else if (token?.type === "attachee") {
        return NextResponse.redirect(new URL("/attachee", req.url));
      }
    }

    // Only require OTP for dashboard routes
    if (pathname.startsWith('/dashboard') && !isOtpVerified) {
      return NextResponse.redirect(new URL('/otp', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/sponsor/:path*",
    "/exhibitor/:path*", 
    "/attendee/:path*",
    "/attachee/:path*",
    "/dashboard/:path*",
    "/otp",
    "/selection"
  ],
};