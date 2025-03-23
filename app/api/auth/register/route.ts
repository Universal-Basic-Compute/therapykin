import { NextRequest, NextResponse } from 'next/server';
import { createUser, generateToken, setAuthCookie } from '@/app/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, password } = await request.json();
    
    console.log('Registration attempt for email:', email);
    
    // Validate input
    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Create user
    const user = await createUser({ email, firstName, lastName, password });
    console.log('User created successfully:', user.id);
    
    // Generate token
    const token = generateToken(user.id, user.email);
    console.log('Token generated successfully');
    
    // Set cookie
    await setAuthCookie(token);
    console.log('Auth cookie set for new user');
    
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.message === 'User with this email already exists') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
