import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    );
  }
}
