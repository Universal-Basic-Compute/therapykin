import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';

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
    const { sessionId, minutesActive } = await request.json();
    
    // Validate input
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    if (typeof minutesActive !== 'number' || minutesActive < 0) {
      return NextResponse.json(
        { error: 'Valid minutesActive is required' },
        { status: 400 }
      );
    }
    
    console.log(`Updating session ${sessionId} minutes active to ${minutesActive}`);
    
    // Update the session in Airtable
    await sessionsTable.update([
      {
        id: sessionId,
        fields: {
          MinutesActive: minutesActive,
        },
      },
    ]);
    
    return NextResponse.json({ success: true, minutesActive });
  } catch (error) {
    console.error('Error updating session minutes:', error);
    return NextResponse.json(
      { error: 'Failed to update session minutes' },
      { status: 500 }
    );
  }
}
