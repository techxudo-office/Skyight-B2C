// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
    // clone URL so we can mutate safely
    const url = req.nextUrl.clone();

    // normalized pathname without trailing slash
    let pathname = url.pathname.replace(/\/$/, "") || "/";

    // quick access to search params
    const searchParams = url.searchParams;

    // cookie token (edge runtime)
    const token = req.cookies.get("token")?.value;

    // PUBLIC PATHS (allowlist) - any path that startsWith one of these should bypass auth
    const publicStarts = [
        "/api", // API routes
        "/_next", // next internals
        "/static", // static files
        "/assets",
        "/images",
        "/favicon.ico",
    ];
    const publicExact = ["/login", "/signup"]; // exact public pages

    const isPublic =
        publicExact.includes(pathname) ||
        publicStarts.some((p) => pathname.startsWith(p)) ||
        pathname.includes("."); // allow requests for files (fonts, images, etc.)

    // --- Special case: flights page requires query params ---
    // Only validate when user actually lands on the flights page (normalized)
    if (pathname === "/flights") {
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        const departure = searchParams.get("departure");

        if (!from || !to || !departure) {
            // redirect to home (clear query)
            const home = req.nextUrl.clone();
            home.pathname = "/";
            home.search = "";
            return NextResponse.redirect(home);
        }
    }

    // If user is authenticated, prevent them from seeing login/signup pages
    if (token && (pathname === "/login" || pathname === "/signup")) {
        const dashboardUrl = req.nextUrl.clone();
        dashboardUrl.pathname = "/"; // change target if you'd prefer '/'
        dashboardUrl.search = "";
        return NextResponse.redirect(dashboardUrl);
    }

    // Allow public paths immediately
    if (isPublic) {
        return NextResponse.next();
    }

    // For protected routes, ensure token exists; if not, redirect to login
    if (!token) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/login";
        // optional: preserve the intended path so you can redirect after login
        loginUrl.search = `?next=${encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)}`;
        return NextResponse.redirect(loginUrl);
    }

    // all good
    return NextResponse.next();
}

/**
 * matcher controls which routes the middleware runs for.
 * This pattern excludes api, _next static & image requests and favicon.ico.
 */
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
