// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        // if (request.nextUrl.pathname.startsWith("/dashboard")
        //     && request.nextauth.token?.role !== "ad min") {
        //     return NextResponse.rewrite(
        //         new URL("/admin-login", request.url)
        //     )
        // }

        if (request.nextUrl.pathname.startsWith("/checkout")
            && request.nextauth.token?.role !== "user"
            && request.nextauth.token?.role !== "client") {
            return NextResponse.rewrite(
                new URL("/login", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/payment", "/checkout", "/dashboard"] }