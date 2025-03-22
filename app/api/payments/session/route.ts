import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/utils/stripe';
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
    
    // Get the session ID from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('id');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Verify that the session belongs to the current user
    if (session.metadata?.userId !== currentUser.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Return the session details
    return NextResponse.json({
      id: session.id,
      plan: session.metadata?.plan,
      isAnnual: session.metadata?.isAnnual === 'true',
      status: session.status,
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
