import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../utils/airtable';

export async function POST(request: NextRequest) {
  try {
    const { email, sessionLength, specialist, kinId } = await request.json();
    
    if (!kinId) {
      return NextResponse.json(
        { error: 'KinId is required' },
        { status: 400 }
      );
    }
    
    console.log(`Creating demo session for kin ID ${kinId} with specialist ${specialist}`);
    
    // Use kinId as the email for demo sessions, but don't pass kinId separately
    const session = await createSession(
      kinId, // Use kinId instead of email
      sessionLength || 15, 
      specialist || 'welcome',
      true // Mark as demo session
    );
    
    return NextResponse.json({
      success: true,
      session
    });
  } catch (error) {
    console.error('Error creating demo session:', error);
    return NextResponse.json(
      { error: 'Failed to create demo session' },
      { status: 500 }
    );
  }
}
