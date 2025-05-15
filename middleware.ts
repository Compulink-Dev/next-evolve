import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

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

    // Protect role-specific routes
    if (pathname.startsWith("/sponsor") && token?.type !== "sponsor") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (pathname.startsWith("/exhibitor") && token?.type !== "exhibitor") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (pathname.startsWith("/attendee") && token?.type !== "attendee") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (pathname.startsWith("/attachee") && token?.type !== "attachee") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
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
    "/attachee/:path*"
  ],
};