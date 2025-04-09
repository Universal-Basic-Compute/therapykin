import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/authOptions';
import { getBridge, updateBridge } from '@/app/utils/airtable';

// Add this interface to define the Bridge type with ratings
interface Bridge {
  id: string;
  name?: string;
  description?: string;
  type?: string;
  status?: string;
  participants?: string[];
  ratings?: string;
  creatorEmail?: string;
  createdAt?: string;
  lastActive?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the request body
    const { 
      bridgeId,
      overallRating,
      understandingEmpathy,
      helpfulnessOfAdvice,
      sessionFlow,
      rememberingContext,
      comments
    } = await request.json();
    
    // Validate required parameters
    if (!bridgeId) {
      return NextResponse.json(
        { error: 'Bridge ID is required' },
        { status: 400 }
      );
    }
    
    // Get the bridge to verify it exists
    const bridge = await getBridge(bridgeId) as Bridge;
    if (!bridge) {
      return NextResponse.json(
        { error: 'Bridge not found' },
        { status: 404 }
      );
    }
    
    // Verify the user is a participant in the bridge
    const userEmail = session.user.email?.toLowerCase();
    if (!userEmail || !bridge.participants?.some(p => 
      typeof p === 'string' && p.toLowerCase() === userEmail
    )) {
      return NextResponse.json(
        { error: 'You are not a participant in this bridge' },
        { status: 403 }
      );
    }
    
    // Create the rating object
    const rating = {
      overallRating,
      understandingEmpathy,
      helpfulnessOfAdvice,
      sessionFlow,
      rememberingContext,
      comments,
      submittedBy: userEmail,
      submittedAt: new Date().toISOString()
    };
    
    // Update the bridge with the rating
    // We'll store ratings as a JSON string in a 'ratings' field
    let ratings = [];
    try {
      if (bridge.ratings) {
        ratings = JSON.parse(bridge.ratings);
      }
    } catch (e) {
      console.error('Error parsing existing ratings:', e);
      ratings = [];
    }
    
    // Add the new rating
    ratings.push(rating);
    
    // Update the bridge
    await updateBridge(bridgeId, {
      ratings: JSON.stringify(ratings)
    } as any); // Use type assertion here
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting bridge rating:', error);
    return NextResponse.json(
      { error: 'Failed to submit bridge rating' },
      { status: 500 }
    );
  }
}
