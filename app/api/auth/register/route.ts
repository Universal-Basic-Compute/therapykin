import { NextRequest, NextResponse } from 'next/server';
import { createUser, generateToken, setAuthCookie } from '@/app/utils/auth';
import { isValidSpecialist } from '@/app/utils/validation';
import { createErrorResponse } from '@/app/utils/error-handling';
import { generatePseudonymFromEmail } from '@/app/utils/pseudonyms';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, password, specialist } = await request.json();
    
    console.log('Registration attempt for email:', email);
    
    // Validate input
    if (!email || !firstName || !password) {
      return NextResponse.json(
        { error: 'Email, first name, and password are required' },
        { status: 400 }
      );
    }
    
    // Validate specialist if provided
    if (specialist && !isValidSpecialist(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    // Create user with specialist preference
    // Note: Pseudonym will be set by the admin or another process
    const user = await createUser({ 
      email, 
      firstName, 
      password,
      preferredSpecialist: specialist || 'generalist' // Default to generalist if not specified
    });
    console.log('User created successfully:', user.id);
    
    // Generate token
    const token = generateToken(user.id, user.email);
    console.log('Token generated successfully');
    
    // Set cookie
    await setAuthCookie(token);
    console.log('Auth cookie set for new user');
    
    // Create the response object
    const response = NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          pseudonym: null // New users don't have a pseudonym yet
        },
        token: token // Include the token in the response for mobile clients
      },
      { status: 201 }
    );
    
    // Add CORS headers for mobile apps
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error: any) {
    // Handle specific known errors
    if (error.message === 'User with this email already exists') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Use our error handling utility for unexpected errors
    return createErrorResponse(500, 'Registration failed', error);
  }
}
