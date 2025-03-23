import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';

export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    console.log('Fetching session stats for user:', currentUser.email);
    
    // Query for all sessions for this user
    const records = await sessionsTable.select({
      filterByFormula: `{Email} = '${currentUser.email}'`,
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    console.log(`Found ${records.length} sessions for user ${currentUser.email}`);
    
    // Filter sessions with MinutesActive > 5
    const validSessions = records.filter(record => {
      const minutesActive = record.fields.MinutesActive as number || 0;
      return minutesActive > 5;
    });
    
    console.log(`${validSessions.length} sessions have MinutesActive > 5`);
    
    // Calculate statistics
    const totalSessions = validSessions.length;
    
    // Calculate days active (unique days with sessions)
    const uniqueDays = new Set();
    validSessions.forEach(session => {
      if (session.fields.CreatedAt) {
        const date = new Date(session.fields.CreatedAt as string).toISOString().split('T')[0];
        uniqueDays.add(date);
      }
    });
    const daysActive = uniqueDays.size || 1; // Minimum 1 day
    
    // Calculate ongoing sessions (where CreatedAt + SessionLength > now)
    const now = new Date();
    const ongoingSessions = records.filter(session => {
      if (!session.fields.CreatedAt || !session.fields.SessionLength) return false;
      
      const sessionStartTime = new Date(session.fields.CreatedAt as string);
      const sessionLengthMinutes = session.fields.SessionLength as number || 30; // Default to 30 minutes
      
      // Calculate when the session ends
      const sessionEndTime = new Date(sessionStartTime);
      sessionEndTime.setMinutes(sessionEndTime.getMinutes() + sessionLengthMinutes);
      
      // Session is ongoing if end time is in the future
      return sessionEndTime > now;
    }).length;
    
    console.log(`${ongoingSessions} sessions are currently ongoing`);
    
    // Return the statistics
    return NextResponse.json({
      stats: {
        totalSessions,
        daysActive,
        ongoingSessions
      }
    });
  } catch (error) {
    console.error('Error fetching session stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session statistics' },
      { status: 500 }
    );
  }
}
