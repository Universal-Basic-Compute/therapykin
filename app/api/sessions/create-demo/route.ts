import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../utils/airtable';

export async function POST(request: NextRequest) {
  try {
    const { email, sessionLength, specialist, projectId } = await request.json();
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'ProjectId is required' },
        { status: 400 }
      );
    }
    
    console.log(`Creating demo session for project ID ${projectId} with specialist ${specialist}`);
    
    // Use projectId as the email for demo sessions, but don't pass projectId separately
    const session = await createSession(
      projectId, // Use projectId instead of email
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
