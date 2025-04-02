import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';

export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser || !currentUser.isAdmin) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    console.log('Fetching daily session stats');
    
    // Query for all sessions
    const records = await sessionsTable.select({
      sort: [{ field: 'CreatedAt', direction: 'asc' }]
    }).all();
    
    console.log(`Found ${records.length} total sessions`);
    
    // Process records to get daily stats
    const dailyStatsMap = new Map();
    
    records.forEach((record: any) => {
      if (!record.fields.CreatedAt) return;
      
      const date = new Date(record.fields.CreatedAt as string).toISOString().split('T')[0];
      const minutesActive = record.fields.MinutesActive as number || 0;
      const isWelcomeSession = (record.fields.Specialist === 'welcome');
      
      if (!dailyStatsMap.has(date)) {
        dailyStatsMap.set(date, {
          date,
          regularSessions: 0,
          welcomeSessions: 0,
          totalMinutesActive: 0
        });
      }
      
      const dayStats = dailyStatsMap.get(date);
      
      if (isWelcomeSession) {
        dayStats.welcomeSessions += 1;
      } else {
        dayStats.regularSessions += 1;
      }
      
      dayStats.totalMinutesActive += minutesActive;
    });
    
    // Convert map to array and sort by date
    const dailyStats = Array.from(dailyStatsMap.values())
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return NextResponse.json({
      dailyStats
    });
  } catch (error) {
    console.error('Error fetching daily session stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily session statistics' },
      { status: 500 }
    );
  }
}
