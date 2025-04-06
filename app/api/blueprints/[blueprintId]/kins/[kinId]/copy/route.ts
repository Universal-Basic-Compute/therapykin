import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/auth';
import { isAdmin } from '@/app/utils/admin';
import { kv } from '@vercel/kv';

export async function POST(
  request: NextRequest,
  { params }: { params: { blueprintId: string; kinId: string } }
) {
  try {
    // Get the current user and verify admin status
    const currentUser = await getCurrentUser();
    if (!currentUser || !isAdmin(currentUser as any)) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    // Get the new kin name from the request body
    const { newKinName } = await request.json();
    
    if (!newKinName) {
      return NextResponse.json(
        { error: 'New kin name is required' },
        { status: 400 }
      );
    }

    // Validate the new kin name format
    if (!/^[a-z0-9-]+$/.test(newKinName)) {
      return NextResponse.json(
        { error: 'Invalid kin name format. Use only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    const { blueprintId, kinId } = params;

    // Check if source kin exists
    const sourceKinKey = `blueprint:${blueprintId}:kin:${kinId}`;
    const sourceKin = await kv.get(sourceKinKey);

    if (!sourceKin) {
      return NextResponse.json(
        { error: 'Source kin not found' },
        { status: 404 }
      );
    }

    // Check if target kin name already exists
    const targetKinKey = `blueprint:${blueprintId}:kin:${newKinName}`;
    const existingKin = await kv.get(targetKinKey);

    if (existingKin) {
      return NextResponse.json(
        { error: 'A kin with this name already exists' },
        { status: 409 }
      );
    }

    // Copy the kin with the new name
    await kv.set(targetKinKey, sourceKin);

    // Also copy the messages if they exist
    const sourceMessagesKey = `blueprint:${blueprintId}:kin:${kinId}:messages`;
    const messages = await kv.get(sourceMessagesKey);
    if (messages) {
      const targetMessagesKey = `blueprint:${blueprintId}:kin:${newKinName}:messages`;
      await kv.set(targetMessagesKey, messages);
    }

    return NextResponse.json({
      success: true,
      message: 'Kin copied successfully',
      newKinId: newKinName
    });

  } catch (error) {
    console.error('Error copying kin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
