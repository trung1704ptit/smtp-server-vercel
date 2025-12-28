import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_API_ROUTES = new Set<string>([
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /api/*
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Allow public API routes
  if (PUBLIC_API_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');
  const expectedToken = process.env.API_TOKEN;

  if (!expectedToken) {
    console.error('API_TOKEN is not set');
    return NextResponse.json(
      { message: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const token = authHeader.substring('Bearer '.length);

  if (token !== expectedToken) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

// Apply middleware only to API routes
export const config = {
  matcher: ['/api/:path*'],
};
