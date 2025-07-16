// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.cookies.get('token')?.value

    // Whitelist public paths
    if (
        pathname === '/login' ||
        pathname === '/signup' ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')   // static files, etc.
    ) {
        return NextResponse.next()
    }

    // If no token, redirect to /login
    if (!token) {
        const loginUrl = req.nextUrl.clone()
        loginUrl.pathname = '/login'
        return NextResponse.redirect(loginUrl)
    }

    // Otherwise let them through
    return NextResponse.next()
}

export const config = {
    // apply to all routes except static, api, _next, etc.
    matcher: [
        /*
         * match everything except:
         *  - _next/static (static files)
         *  - _next/image
         *  - favicon.ico
         *  - /api (if you want to protect API routes too, remove that line)
         */
        '/((?!_next/static|_next/image|favicon.ico|api).*)',
    ],
}
