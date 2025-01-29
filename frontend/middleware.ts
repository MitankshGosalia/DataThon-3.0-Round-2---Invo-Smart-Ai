import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that don't require authentication
const publicPaths = ['/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // Allow access to public paths
  if (publicPaths.includes(pathname)) {
    // If user is already logged in, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Check auth for protected routes
  if (!token) {
    // Redirect to login page if not authenticated
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Specify which paths this middleware will run on
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /favicon.ico, /robots.txt (static files)
     */
    '/((?!api|_next|static|favicon.ico|robots.txt).*)',
  ],
}
