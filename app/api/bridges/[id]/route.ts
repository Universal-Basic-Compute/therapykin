import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/auth';
import { getBridge, updateBridge, deleteBridge } from '@/app/utils/airtable';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the bridge
    const bridge = await getBridge(id);
    
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
    
    return NextResponse.json({ bridge });
  } catch (error) {
    console.error('Error fetching bridge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bridge' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body
    const { name, description, type } = await request.json();
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Bridge name is required' },
        { status: 400 }
      );
    }
    
    // Get the bridge
    const existingBridge = await getBridge(id);
    
    // Check if bridge exists
    if (!existingBridge) {
      return NextResponse.json(
        { error: 'Bridge not found' },
        { status: 404 }
      );
    }
    
    // Check if user has access to this bridge
    if (!existingBridge.participants.includes(user.email)) {
      return NextResponse.json(
        { error: 'You do not have access to this bridge' },
        { status: 403 }
      );
    }
    
    // Update the bridge
    const updatedBridge = await updateBridge(id, {
      name,
      description: description || '',
      type: type || 'relationship',
    });
    
    return NextResponse.json({ bridge: updatedBridge });
  } catch (error) {
    console.error('Error updating bridge:', error);
    return NextResponse.json(
      { error: 'Failed to update bridge' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the bridge
    const bridge = await getBridge(id);
    
    // Check if bridge exists
    if (!bridge) {
      return NextResponse.json(
        { error: 'Bridge not found' },
        { status: 404 }
      );
    }
    
    // Check if user is the creator of this bridge
    if (bridge.creatorEmail !== user.email) {
      return NextResponse.json(
        { error: 'Only the creator can delete this bridge' },
        { status: 403 }
      );
    }
    
    // Delete the bridge
    await deleteBridge(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting bridge:', error);
    return NextResponse.json(
      { error: 'Failed to delete bridge' },
      { status: 500 }
    );
  }
}
