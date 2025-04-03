import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../utils/airtable';
import { isValidSpecialist, createProjectId } from '@/app/utils/validation';

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
    if (specialist && !isValidSpecialist(specialist, true)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Creating demo session for kin ID ${kinId} with specialist ${specialist || 'welcome'}`);
    
    // Create a consistent KinId
    const generatedKinId = createKinId({ pseudonym, kinId, email });
    
    console.log(`Using kinId: ${generatedKinId} for demo session`);
    
    // Use the email parameter for createSession if provided, otherwise use generatedKinId
    const sessionIdentifier = email || generatedKinId;
    
    const session = await createSession(
      sessionIdentifier, 
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
