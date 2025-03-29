import { NextRequest, NextResponse } from 'next/server';
import { submitSessionRating } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get request body
    const { 
      sessionId, 
      overallRating,
      understandingEmpathy,
      helpfulnessOfAdvice,
      sessionFlow,
      rememberingContext,
      comments 
    } = await request.json();
    
    // Validate input
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    // Validate ratings (should be between 1-5)
    const ratings = [overallRating, understandingEmpathy, helpfulnessOfAdvice, sessionFlow, rememberingContext];
    for (const rating of ratings) {
      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return NextResponse.json(
          { error: 'All ratings must be numbers between 1 and 5' },
          { status: 400 }
        );
      }
    }
    
    console.log(`Submitting rating for session ${sessionId}`);
    
    // Submit the rating
    const success = await submitSessionRating(sessionId, {
      overallRating,
      understandingEmpathy,
      helpfulnessOfAdvice,
      sessionFlow,
      rememberingContext,
      comments
    });
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to submit rating' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting session rating:', error);
    return NextResponse.json(
      { error: 'Failed to submit session rating' },
      { status: 500 }
    );
  }
}
