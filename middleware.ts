import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the admin area
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login') &&
      !request.nextUrl.pathname.startsWith('/admin/oauth-setup') &&
      !request.nextUrl.pathname.startsWith('/api/')) {
    
    // Check if the user is authenticated
    const githubUser = request.cookies.get('github_user');
    
    if (!githubUser) {
      console.log('Middleware: No github_user cookie found, redirecting to login');
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // User is authenticated, allow access
    console.log('Middleware: github_user cookie found, allowing access');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 