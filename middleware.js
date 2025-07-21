// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname, searchParams } = req.nextUrl;

    // If the user is on the flight search page
    if (pathname === '/flights') {
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const departure = searchParams.get('departure');

        // If any of the required parameters are missing, redirect to the homepage
        if (!from || !to || !departure) {
            const homeUrl = req.nextUrl.clone();
            homeUrl.pathname = '/';
            homeUrl.search = ''; // Clear any existing query params
            return NextResponse.redirect(homeUrl);
        }
    }

    // Your existing authentication logic can be combined here
    const token = req.cookies.get('token')?.value;

    if (
        pathname === '/login' ||
        pathname === '/signup' ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    if (!token) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/login';
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};