import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/auth';
import { getBridge, addParticipantToBridge, removeParticipantFromBridge } from '@/app/utils/airtable';

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

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body and query params
    const { email } = await request.json();
    const bridgeId = request.nextUrl.searchParams.get('bridgeId');
    
    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Participant email is required' },
        { status: 400 }
      );
    }
    
    if (!bridgeId) {
      return NextResponse.json(
        { error: 'Bridge ID is required' },
        { status: 400 }
      );
    }
    
    // Get the bridge
    const bridge = await getBridge(bridgeId);
    
    // Check if bridge exists
    if (!bridge) {
      return NextResponse.json(
        { error: 'Bridge not found' },
        { status: 404 }
      );
    }
    
    // Check if user has access to this bridge
    if (!bridge.participants.includes(user.email)) {
      return NextResponse.json(
        { error: 'You do not have access to this bridge' },
        { status: 403 }
      );
    }
    
    // Check if participant is already in the bridge
    if (bridge.participants.includes(email)) {
      return NextResponse.json(
        { error: 'Participant is already in this bridge' },
        { status: 400 }
      );
    }
    
    // Add participant to the bridge
    const updatedBridge = await addParticipantToBridge(bridgeId, email);
    
    return NextResponse.json({ bridge: updatedBridge });
  } catch (error) {
    console.error('Error adding participant to bridge:', error);
    return NextResponse.json(
      { error: 'Failed to add participant to bridge' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body and query params
    const { email } = await request.json();
    const bridgeId = request.nextUrl.searchParams.get('bridgeId');
    
    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Participant email is required' },
        { status: 400 }
      );
    }
    
    if (!bridgeId) {
      return NextResponse.json(
        { error: 'Bridge ID is required' },
        { status: 400 }
      );
    }
    
    // Get the bridge
    const bridge = await getBridge(bridgeId);
    
    // Check if bridge exists
    if (!bridge) {
      return NextResponse.json(
        { error: 'Bridge not found' },
        { status: 404 }
      );
    }
    
    // Check if user has access to this bridge
    if (!bridge.participants.includes(user.email)) {
      return NextResponse.json(
        { error: 'You do not have access to this bridge' },
        { status: 403 }
      );
    }
    
    // Check if participant is in the bridge
    if (!bridge.participants.includes(email)) {
      return NextResponse.json(
        { error: 'Participant is not in this bridge' },
        { status: 400 }
      );
    }
    
    // Check if trying to remove the creator
    if (bridge.creatorEmail === email) {
      return NextResponse.json(
        { error: 'Cannot remove the creator from the bridge' },
        { status: 400 }
      );
    }
    
    // Remove participant from the bridge
    const updatedBridge = await removeParticipantFromBridge(bridgeId, email);
    
    return NextResponse.json({ bridge: updatedBridge });
  } catch (error) {
    console.error('Error removing participant from bridge:', error);
    return NextResponse.json(
      { error: 'Failed to remove participant from bridge' },
      { status: 500 }
    );
  }
}
