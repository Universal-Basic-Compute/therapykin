import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/auth';
import { getBridge, addParticipantToBridge, removeParticipantFromBridge } from '@/app/utils/airtable';

export async function POST(
  request: NextRequest,
  { params }: { params: { [key: string]: string | string[] } }
) {
  const bridgeId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body
    const { email } = await request.json();
    
    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Participant email is required' },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { [key: string]: string | string[] } }
) {
  const bridgeId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body
    const { email } = await request.json();
    
    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Participant email is required' },
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
