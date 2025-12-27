// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Example: Only allow public access to /api/send-email
  if (url.pathname === "/api/send-email") {
    // Just let it through
    return NextResponse.next();
  }

  // You can add auth or other logic for other routes here
  // For example, block everything else (optional)
  // return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

// Apply middleware to API routes (or all routes)
export const config = {
  matcher: ["/api/:path*"], // runs middleware on all API routes
};
