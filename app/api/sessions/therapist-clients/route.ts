import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';
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

    let isAuthorized = false;

    if ((currentUser as any).isAdmin || currentUser.email === 'nlr@universalbasiccompute.ai' || currentUser.email === 'theherosjourneyteam@gmail.com') {
      isAuthorized = true;
    } else if ((currentUser as any).isTherapist) {
      try {
        const therapistTypes = JSON.parse((currentUser as any).isTherapist);
        isAuthorized = Array.isArray(therapistTypes) && therapistTypes.includes('herosjourney');
      } catch (error) {
        console.error('Error parsing therapist types:', error);
        // If parsing fails, check if it's a string that contains "herosjourney"
        if (typeof (currentUser as any).isTherapist === 'string' && (currentUser as any).isTherapist.includes('herosjourney')) {
          isAuthorized = true;
        }
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    console.log('Fetching therapist client data');
    
    // Query for all herosjourney sessions
    const records = await sessionsTable.select({
      filterByFormula: "{Specialist} = 'herosjourney'",
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    console.log(`Found ${records.length} herosjourney sessions`);
    
    // Process records to get client data
    const clientsMap = new Map();
    
    // Get current date and 30 days ago for "recent sessions" count
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    records.forEach((record: any) => {
      if (!record.fields.Email) return;
      
      const email = record.fields.Email;
      const sessionDate = record.fields.CreatedAt ? new Date(record.fields.CreatedAt) : null;
      const minutesActive = record.fields.MinutesActive || 0;
      const isRecentSession = sessionDate && sessionDate >= thirtyDaysAgo;
      
      if (!clientsMap.has(email)) {
        const clientIdentifier = generatePseudonymFromEmail(email);
        
        clientsMap.set(email, {
          id: email,
          name: clientIdentifier.name,
          color: clientIdentifier.color,
          totalSessions: 0,
          recentSessions: 0,
          totalMinutes: 0,
          lastSession: null,
          status: 'Active' // Default status
        });
      }
      
      const client = clientsMap.get(email);
      client.totalSessions += 1;
      if (isRecentSession) client.recentSessions += 1;
      client.totalMinutes += minutesActive;
      
      // Update last session date if this is more recent
      if (sessionDate && (!client.lastSession || sessionDate > new Date(client.lastSession))) {
        client.lastSession = sessionDate.toISOString();
      }
      
      // Set status based on recency
      if (client.lastSession) {
        const lastSessionDate = new Date(client.lastSession);
        const daysSinceLastSession = Math.floor((now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastSession > 60) {
          client.status = 'Inactive';
        } else if (daysSinceLastSession > 30) {
          client.status = 'On Hold';
        } else {
          client.status = 'Active';
        }
      }
    });
    
    // Convert map to array and sort by most recent session
    const clients = Array.from(clientsMap.values())
      .sort((a, b) => {
        if (!a.lastSession) return 1;
        if (!b.lastSession) return -1;
        return new Date(b.lastSession).getTime() - new Date(a.lastSession).getTime();
      });
    
    return NextResponse.json({
      clients
    });
  } catch (error) {
    console.error('Error fetching therapist client data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch therapist client data' },
      { status: 500 }
    );
  }
}
