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
    const { sessionId, sessionLength } = await request.json();
    
    // Validate input
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    if (typeof sessionLength !== 'number' || ![15, 30, 45].includes(sessionLength)) {
      return NextResponse.json(
        { error: 'Valid sessionLength is required (15, 30, or 45)' },
        { status: 400 }
      );
    }
    
    console.log(`Updating session ${sessionId} length to ${sessionLength} minutes`);
    
    // Update the session in Airtable
    await sessionsTable.update([
      {
        id: sessionId,
        fields: {
          SessionLength: sessionLength,
        },
      },
    ]);
    
    return NextResponse.json({ success: true, sessionLength });
  } catch (error) {
    console.error('Error updating session length:', error);
    return NextResponse.json(
      { error: 'Failed to update session length' },
      { status: 500 }
    );
  }
}
