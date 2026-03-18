import { NextRequest, NextResponse } from "next/server";

/**
 * Basic password protection using HTTP Basic Auth.
 * Set SITE_PASSWORD in Vercel environment variables to enable.
 * If SITE_PASSWORD is not set, the site is open (no auth).
 */
export function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // If no password configured, allow access
  if (!password) return NextResponse.next();

  // Skip auth for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) return NextResponse.next();

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [, pwd] = decoded.split(":");
      if (pwd === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Skimmer Photo Intelligence"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
