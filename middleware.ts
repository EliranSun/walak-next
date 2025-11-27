import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['he', 'en'],
    defaultLocale: 'he',
    localePrefix: 'always',
    localeDetection: false
});

export const config = {
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    matcher: ['/((?!story|voice|nutrition|stories-dashboard|api|_next|.*\\..*).*)']
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     // Retrieve the current response
//     const response = NextResponse.next();

//     // Add the CORS headers to the response
//     response.headers.set("Access-Control-Allow-Origin", "*");
//     response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     response.headers.set("Cache-Control", "no-store, max-age=0");

//     return response;
// }

// // Configure which paths the middleware applies to
// export const config = {
//     matcher: "/api/:path*",
// };