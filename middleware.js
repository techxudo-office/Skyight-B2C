// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const token = req.cookies.get("token")?.value;

  // Redirect authenticated users away from auth pages
  if (token && (pathname === "/login" || pathname === "/signup")) {
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Require auth for protected routes only
  const protectedPrefixes = ["/bookings", "/confirm-booking", "/payment"];
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  if (!token && isProtected) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = `?next=${encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)}`;
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/bookings/:path*",
    "/confirm-booking/:path*",
    "/payment/:path*",
  ],
};
