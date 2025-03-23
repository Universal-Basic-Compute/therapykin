import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getUserByEmail, verifyPassword, hashPassword } from '@/app/utils/auth';
import { usersTable } from '@/app/utils/airtable';

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get request body
    const { currentPassword, newPassword } = await request.json();
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }
    
    // Get full user details including password hash
    const user = await getUserByEmail(currentUser.email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Verify current password
    const isPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }
    
    // Hash the new password
    const { hashedPassword, salt } = await hashPassword(newPassword);
    
    // Update the password in Airtable
    await usersTable.update([
      {
        id: user.id,
        fields: {
          PasswordHash: hashedPassword,
          PasswordSalt: salt,
        },
      },
    ]);
    
    return NextResponse.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
