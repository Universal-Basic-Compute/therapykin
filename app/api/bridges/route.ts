import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/utils/auth';
import { createBridge, getBridgesByUser } from '@/app/utils/airtable';

export async function GET(request: NextRequest) {
  try {
    // Get the user from the session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get bridges for the user
    const bridges = await getBridgesByUser(session.user.email);
    
    return NextResponse.json({ bridges });
  } catch (error) {
    console.error('Error fetching bridges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bridges' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the user from the session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body
    const { name, description, type, participantEmail } = await request.json();
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Bridge name is required' },
        { status: 400 }
      );
    }
    
    // Create the bridge
    const bridge = await createBridge({
      name,
      description: description || '',
      type: type || 'relationship',
      creatorEmail: session.user.email,
      participantEmail: participantEmail || null,
    });
    
    return NextResponse.json({ bridge }, { status: 201 });
  } catch (error) {
    console.error('Error creating bridge:', error);
    return NextResponse.json(
      { error: 'Failed to create bridge' },
      { status: 500 }
    );
  }
}
