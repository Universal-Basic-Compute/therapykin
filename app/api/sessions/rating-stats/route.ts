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
    
    console.log('Fetching session rating stats');
    
    // Query for all sessions with ratings
    const records = await sessionsTable.select({
      filterByFormula: 'NOT({OverallRating} = "")',
    }).all();
    
    console.log(`Found ${records.length} sessions with ratings`);
    
    // Calculate rating statistics
    let totalOverall = 0;
    let totalUnderstanding = 0;
    let totalHelpfulness = 0;
    let totalFlow = 0;
    let totalRemembering = 0;
    let totalRatings = 0;
    
    // For rating distribution
    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    
    records.forEach((record: any) => {
      const overallRating = parseInt(record.fields.OverallRating) || 0;
      const understandingRating = parseInt(record.fields.UnderstandingEmpathy) || 0;
      const helpfulnessRating = parseInt(record.fields.HelpfulnessOfAdvice) || 0;
      const flowRating = parseInt(record.fields.SessionFlow) || 0;
      const rememberingRating = parseInt(record.fields.RememberingContext) || 0;
      
      if (overallRating > 0) {
        totalOverall += overallRating;
        totalRatings++;
        
        // Update rating distribution
        if (ratingCounts[overallRating as keyof typeof ratingCounts] !== undefined) {
          ratingCounts[overallRating as keyof typeof ratingCounts]++;
        }
      }
      
      if (understandingRating > 0) totalUnderstanding += understandingRating;
      if (helpfulnessRating > 0) totalHelpfulness += helpfulnessRating;
      if (flowRating > 0) totalFlow += flowRating;
      if (rememberingRating > 0) totalRemembering += rememberingRating;
    });
    
    // Calculate averages
    const averageOverall = totalRatings > 0 ? totalOverall / totalRatings : 0;
    const averageUnderstanding = totalRatings > 0 ? totalUnderstanding / totalRatings : 0;
    const averageHelpfulness = totalRatings > 0 ? totalHelpfulness / totalRatings : 0;
    const averageFlow = totalRatings > 0 ? totalFlow / totalRatings : 0;
    const averageRemembering = totalRatings > 0 ? totalRemembering / totalRatings : 0;
    
    // Format rating distribution for chart
    const ratingDistribution = Object.entries(ratingCounts).map(([rating, count]) => ({
      rating: parseInt(rating),
      count
    }));
    
    return NextResponse.json({
      ratingStats: {
        averageOverall,
        averageUnderstanding,
        averageHelpfulness,
        averageFlow,
        averageRemembering,
        totalRatings,
        ratingDistribution
      }
    });
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rating statistics' },
      { status: 500 }
    );
  }
}
