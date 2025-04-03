import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword, generateToken, setAuthCookie } from '@/app/utils/auth';
import { createErrorResponse, logError } from '@/app/utils/error-handling';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('Login attempt for email:', email);
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate token
    const token = generateToken(user.id, user.email);
    console.log('Token generated successfully');
    
    // Set cookie
    await setAuthCookie(token);
    console.log('Auth cookie set');
    
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    });
  } catch (error) {
    logError('Login', 'Authentication failed', error);
    return createErrorResponse(500, 'Login failed', error);
  }
}
