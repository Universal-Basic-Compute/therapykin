import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser, isAuthorizedForSpecialist } from '@/app/utils/auth';
import { generatePseudonymFromEmail } from '@/app/utils/pseudonyms';

export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    if (!isAuthorizedForSpecialist(currentUser as any, 'herosjourney')) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    console.log('Fetching therapist session data');
    
    // Query for all herosjourney sessions
    const records = await sessionsTable.select({
      filterByFormula: "{Specialist} = 'herosjourney'",
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    console.log(`Found ${records.length} herosjourney sessions`);
    
    // Process records to get session data
    const now = new Date();
    const pastSessions: Array<{
      id: string;
      clientId: string;
      clientColor: string;
      timestamp: string;
      minutesActive: number;
      rating: number | null;
    }> = [];
    
    // Get the 10 most recent sessions
    records.forEach((record: any) => {
      if (!record.fields.CreatedAt || !record.fields.Email) return;
      
      const sessionDate = new Date(record.fields.CreatedAt);
      const clientIdentifier = generatePseudonymFromEmail(record.fields.Email);
      const minutesActive = record.fields.MinutesActive || 0;
      
      // Only include completed sessions (in the past)
      if (sessionDate < now) {
        pastSessions.push({
          id: record.id,
          clientId: clientIdentifier.name,
          clientColor: clientIdentifier.color,
          timestamp: record.fields.CreatedAt,
          minutesActive: minutesActive,
          rating: record.fields.Rating || null
        });
        
        // Limit to 10 past sessions
        if (pastSessions.length >= 10) {
          return;
        }
      }
    });
    
    return NextResponse.json({
      sessions: {
        pastSessions
      }
    });
  } catch (error) {
    console.error('Error fetching therapist session data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch therapist session data' },
      { status: 500 }
    );
  }
}
