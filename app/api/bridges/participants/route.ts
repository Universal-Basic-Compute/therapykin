import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bridgeId = searchParams.get('bridgeId');
    
    // Validate required parameters
    if (!bridgeId) {
      return NextResponse.json(
        { error: 'Bridge ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would fetch data from a database
    // For now, we'll return mock data
    
    // Simulate a slight delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock participant data
    return NextResponse.json({
      participants: [
        {
          id: 'participant-123',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          status: 'online',
          lastActive: new Date().toISOString(),
          role: 'initiator'
        },
        {
          id: 'participant-456',
          name: 'Jordan Smith',
          email: 'jordan@example.com',
          status: 'offline',
          lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          role: 'recipient'
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching bridge participants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bridge participants' },
      { status: 500 }
    );
  }
}
