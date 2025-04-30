import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/app/utils/auth';

export async function POST() {
  try {
    await clearAuthCookie();
    
    // Create the response object
    const response = NextResponse.json({
      message: 'Logout successful',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    // Create the error response object
    const errorResponse = NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
    
    return errorResponse;
  }
}
