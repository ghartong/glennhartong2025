import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
    async function middleware(request: NextRequest) {
        // console.log(request)
    }, {
        isReturnToCurrentPage: true,
    }
)

export const config = {
    matcher: [
        /* 
        * match all request paths except for:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - auth
        * - favicon.ico
        * - robots.txt
        * - images
        * - reddog/login (not right now)
        * - experience
        * - highlights
        * - credentials
        * - homepage (represented with $ after beginning /)
        */
       '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|experience|highlights|credentials|portfolio|$).*)'
    ]
}