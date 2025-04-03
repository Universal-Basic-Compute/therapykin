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
        // Check if the user is a herosjourney therapist
        isAuthorized = Array.isArray(therapistTypes) && therapistTypes.includes('herosjourney');
      } catch (error) {
        console.error('Error parsing therapist types:', error);
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    console.log('Fetching therapist dashboard stats');
    
    // Query for all herosjourney sessions
    const records = await sessionsTable.select({
      filterByFormula: "{Specialist} = 'herosjourney'",
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    console.log(`Found ${records.length} herosjourney sessions`);
    
    // Calculate statistics
    const totalClients = new Set();
    let sessionsThisWeek = 0;
    let totalRatings = 0;
    let totalRatingScore = 0;
    
    // Get current date and start of week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Recent activity for display
    const recentActivity: Array<{
      id: string;
      type: string;
      clientId: string;
      clientColor: string;
      timestamp: string;
      minutesActive: number;
    }> = [];
    
    records.forEach((record: any) => {
      // Count unique clients
      if (record.fields.Email) {
        totalClients.add(record.fields.Email);
      }
      
      // Count sessions this week
      if (record.fields.CreatedAt) {
        const sessionDate = new Date(record.fields.CreatedAt);
        if (sessionDate >= startOfWeek) {
          sessionsThisWeek++;
        }
      }
      
      // Calculate average rating
      if (record.fields.Rating) {
        totalRatings++;
        totalRatingScore += parseInt(record.fields.Rating);
      }
      
      // Add to recent activity (limit to 4 most recent)
      if (recentActivity.length < 4 && record.fields.CreatedAt) {
        const clientIdentifier = record.fields.Email 
          ? generatePseudonymFromEmail(record.fields.Email) 
          : { name: 'Unknown Client', color: '#666666' };
        
        recentActivity.push({
          id: record.id,
          type: record.fields.SessionType || 'session',
          clientId: clientIdentifier.name,
          clientColor: clientIdentifier.color,
          timestamp: record.fields.CreatedAt,
          minutesActive: record.fields.MinutesActive || 0
        });
      }
    });
    
    // Calculate average rating
    const averageRating = totalRatings > 0 ? (totalRatingScore / totalRatings).toFixed(1) : '0.0';
    
    return NextResponse.json({
      stats: {
        activeClients: totalClients.size,
        sessionsThisWeek,
        clientSatisfaction: averageRating,
        recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching therapist stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch therapist statistics' },
      { status: 500 }
    );
  }
}
