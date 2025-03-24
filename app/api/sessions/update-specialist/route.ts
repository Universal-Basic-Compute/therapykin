import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '../../../utils/auth';
import { sessionsTable } from '../../../utils/airtable';

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
    const { sessionId, specialist } = await request.json();
    
    if (!sessionId || !specialist) {
      return NextResponse.json(
        { error: 'Session ID and specialist are required' },
        { status: 400 }
      );
    }
    
    // Validate specialist value
    const validSpecialists = ['generalist', 'crypto', 'athletes', 'executives'];
    if (!validSpecialists.includes(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    // Update the session in Airtable
    await sessionsTable.update([
      {
        id: sessionId,
        fields: {
          Specialist: specialist
        }
      }
    ]);
    
    console.log(`Updated specialist to ${specialist} for session ${sessionId}`);
    
    return NextResponse.json({
      success: true,
      message: `Specialist updated to ${specialist}`
    });
  } catch (error) {
    console.error('Error updating specialist:', error);
    return NextResponse.json(
      { error: 'Failed to update specialist' },
      { status: 500 }
    );
  }
}
