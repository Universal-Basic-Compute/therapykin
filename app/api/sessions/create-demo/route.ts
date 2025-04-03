import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../utils/airtable';
import { generatePseudonymFromEmail } from '@/app/utils/pseudonyms';

export async function POST(request: NextRequest) {
  try {
    const { email, sessionLength, specialist, kinId, pseudonym = null } = await request.json();
    
    if (!kinId) {
      return NextResponse.json(
        { error: 'KinId is required' },
        { status: 400 }
      );
    }
    
    // Validate specialist if provided
    if (specialist && !['generalist', 'crypto', 'athletes', 'executives', 'herosjourney', 'sexologist', 'welcome'].includes(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Creating demo session for kin ID ${kinId} with specialist ${specialist || 'welcome'}`);
    
    // Use the provided pseudonym or use kinId if not provided
    const projectId = pseudonym || kinId;
    
    console.log(`Using pseudonym: ${projectId} for demo session`);
    
    // Use pseudonym-based projectId instead of kinId
    const session = await createSession(
      projectId, 
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
