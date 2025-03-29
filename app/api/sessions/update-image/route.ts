import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID || ''
);

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
    await base('SESSIONS').update(sessionId, {
      SessionImage: imageUrl  // Changed from "image" to "SessionImage" to match Airtable field name
    });
    
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
