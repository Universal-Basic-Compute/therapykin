import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/app/utils/auth';

export async function POST() {
  try {
    await clearAuthCookie();
    
    // Create the response object
    const response = NextResponse.json({
      message: 'Logout successful',
    });
    
    // Add CORS headers for mobile apps
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    // Create the error response object
    const errorResponse = NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
    
    // Add CORS headers for mobile apps
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return errorResponse;
  }
}
