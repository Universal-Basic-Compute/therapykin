import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';

export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser || currentUser.email !== 'nlr@universalbasiccompute.ai') {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    console.log('Fetching specialist session stats');
    
    // Query for all sessions
    const records = await sessionsTable.select().all();
    
    console.log(`Found ${records.length} total sessions`);
    
    // Process records to get specialist stats
    const specialistStatsMap = new Map();
    
    records.forEach((record: any) => {
      const specialist = record.fields.Specialist || 'unknown';
      
      if (!specialistStatsMap.has(specialist)) {
        specialistStatsMap.set(specialist, 0);
      }
      
      specialistStatsMap.set(specialist, specialistStatsMap.get(specialist) + 1);
    });
    
    // Convert map to array for the chart
    const specialistStats = Array.from(specialistStatsMap.entries()).map(([name, count]) => ({
      name,
      value: count
    }));
    
    // Sort by count (descending)
    specialistStats.sort((a, b) => b.value - a.value);
    
    return NextResponse.json({
      specialistStats
    });
  } catch (error) {
    console.error('Error fetching specialist stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specialist statistics' },
      { status: 500 }
    );
  }
}
