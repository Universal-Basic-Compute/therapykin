import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Check for JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get token from cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Check if the path is a protected route
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                           request.nextUrl.pathname.startsWith('/account') ||
                           request.nextUrl.pathname.startsWith('/chat');
  
  // For debugging
  console.log('Middleware running for path:', request.nextUrl.pathname);
  console.log('Token exists:', !!token);
  
  // If it's a protected route and no token exists, redirect to login
  if (isProtectedRoute) {
    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Verify token
    try {
      // Convert JWT_SECRET to Uint8Array for jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      await jwtVerify(token, secret);
      console.log('Token verified successfully');
    } catch (error) {
      console.log('Token verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // If user is logged in and tries to access login/register, redirect to dashboard
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && token) {
    try {
      // Convert JWT_SECRET to Uint8Array for jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      await jwtVerify(token, secret);
      console.log('User already logged in, redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      console.log('Token verification failed in login/register check:', error);
      // If token verification fails, continue to login/register page
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*', '/chat/:path*', '/login', '/register'],
};
