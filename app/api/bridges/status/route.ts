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
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock bridge status data
    return NextResponse.json({
      id: bridgeId,
      status: 'active',
      progress: 35,
      relationshipType: 'Family Relationship',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      lastActivity: new Date().toISOString(),
      milestones: [
        {
          id: 'milestone-1',
          title: 'Initial Connection',
          description: 'Both participants joined the bridge',
          completed: true,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
        },
        {
          id: 'milestone-2',
          title: 'Shared Perspectives',
          description: 'Each person shared their viewpoint',
          completed: true,
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
        },
        {
          id: 'milestone-3',
          title: 'Common Ground',
          description: 'Identify areas of agreement',
          completed: false
        },
        {
          id: 'milestone-4',
          title: 'Action Plan',
          description: 'Create a plan for moving forward',
          completed: false
        }
      ],
      nextSteps: [
        'Discuss a specific situation where you felt misunderstood',
        'Share what you appreciate about each other',
        'Identify one small change each person could make'
      ],
      mediationLevel: 'balanced'
    });
  } catch (error) {
    console.error('Error fetching bridge status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bridge status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      bridgeId,
      mediationLevel,
      flaggedTopic,
      requestType
    } = await request.json();
    
    // Validate required parameters
    if (!bridgeId) {
      return NextResponse.json(
        { error: 'Bridge ID is required' },
        { status: 400 }
      );
    }
    
    // Handle different types of updates
    let responseMessage = '';
    
    if (mediationLevel) {
      // Update mediation level
      responseMessage = `Updated mediation level to ${mediationLevel}`;
    } else if (flaggedTopic) {
      // Flag a sensitive topic
      responseMessage = `Flagged sensitive topic: ${flaggedTopic}`;
    } else if (requestType === 'clarification') {
      // Request clarification
      responseMessage = 'Requested clarification from mediator';
    } else if (requestType === 'privateSession') {
      // Request private session
      responseMessage = 'Requested private session with mediator';
    } else {
      return NextResponse.json(
        { error: 'Invalid update request' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would update data in a database
    // For now, we'll just return a success message
    
    // Simulate a slight delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      success: true,
      message: responseMessage,
      bridgeId
    });
  } catch (error) {
    console.error('Error updating bridge status:', error);
    return NextResponse.json(
      { error: 'Failed to update bridge status' },
      { status: 500 }
    );
  }
}
