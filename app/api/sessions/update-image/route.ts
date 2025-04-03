import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';

export async function POST(request: NextRequest) {
  try {
    // Get session ID and image URL from request body
    const { sessionId, imageUrl } = await request.json();
    
    if (!sessionId || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required parameters: sessionId, imageUrl' },
        { status: 400 }
      );
    }
    
    console.log(`Updating session ${sessionId} with image URL: ${imageUrl}`);
    
    // Update the session record in Airtable
    await sessionsTable.update([{
      id: sessionId,
      fields: {
        SessionImage: imageUrl
      }
    }]);
    
    console.log(`Successfully updated session ${sessionId} with image URL`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating session image:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update session image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
