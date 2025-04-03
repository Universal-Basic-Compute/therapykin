import { NextRequest, NextResponse } from 'next/server';
import { usersTable, escapeAirtableString } from '@/app/utils/airtable';
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
    const { pseudonym } = await request.json();
    
    if (!pseudonym) {
      return NextResponse.json(
        { error: 'Pseudonym is required' },
        { status: 400 }
      );
    }
    
    // Find the user in Airtable
    const escapedEmail = escapeAirtableString(currentUser.email);
    const records = await usersTable.select({
      filterByFormula: `{Email} = '${escapedEmail}'`,
      maxRecords: 1
    }).firstPage();
    
    if (records.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const userRecord = records[0];
    
    // Update the user's pseudonym
    await usersTable.update([
      {
        id: userRecord.id,
        fields: {
          Pseudonym: pseudonym,
        },
      },
    ]);
    
    console.log(`Updated pseudonym for ${currentUser.email} to ${pseudonym}`);
    
    return NextResponse.json({ 
      success: true,
      pseudonym
    });
  } catch (error) {
    console.error('Error updating user pseudonym:', error);
    return NextResponse.json(
      { error: 'Failed to update user pseudonym' },
      { status: 500 }
    );
  }
}
