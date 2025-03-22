import { NextRequest, NextResponse } from 'next/server';
import { usersTable } from '@/app/utils/airtable';
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
    
    // Find the user in Airtable
    const records = await usersTable.select({
      filterByFormula: `{Email} = '${currentUser.email}'`,
      maxRecords: 1
    }).firstPage();
    
    if (records.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const userRecord = records[0];
    
    // Extract preferences
    const preferences = {
      preferredSessionLength: userRecord.fields.PreferredSessionLength || 30,
      preferredVoice: userRecord.fields.PreferredVoice || 'UgBBYS2sOqTuMpoF3BR0',
      // Add other preferences here as needed
    };
    
    return NextResponse.json({ preferences });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user preferences' },
      { status: 500 }
    );
  }
}

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
    const { preferredSessionLength, preferredVoice } = await request.json();
    
    // Validate input
    if (preferredSessionLength !== undefined && 
        (typeof preferredSessionLength !== 'number' || ![15, 30, 45].includes(preferredSessionLength))) {
      return NextResponse.json(
        { error: 'Valid preferredSessionLength is required (15, 30, or 45)' },
        { status: 400 }
      );
    }
    
    if (preferredVoice !== undefined && typeof preferredVoice !== 'string') {
      return NextResponse.json(
        { error: 'Valid preferredVoice is required (string)' },
        { status: 400 }
      );
    }
    
    // Find the user in Airtable
    const records = await usersTable.select({
      filterByFormula: `{Email} = '${currentUser.email}'`,
      maxRecords: 1
    }).firstPage();
    
    if (records.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const userRecord = records[0];
    
    // Update the user's preferences
    const updateFields: any = {};
    
    if (preferredSessionLength !== undefined) {
      updateFields.PreferredSessionLength = preferredSessionLength;
    }
    
    if (preferredVoice !== undefined) {
      updateFields.PreferredVoice = preferredVoice;
    }
    
    // Only update if there are fields to update
    if (Object.keys(updateFields).length > 0) {
      await usersTable.update([
        {
          id: userRecord.id,
          fields: updateFields,
        },
      ]);
      
      console.log(`Updated user preferences for ${currentUser.email}:`, updateFields);
    }
    
    return NextResponse.json({ 
      success: true,
      preferences: {
        preferredSessionLength: preferredSessionLength !== undefined ? preferredSessionLength : userRecord.fields.PreferredSessionLength || 30,
        preferredVoice: preferredVoice !== undefined ? preferredVoice : userRecord.fields.PreferredVoice || 'UgBBYS2sOqTuMpoF3BR0',
        // Add other preferences here as needed
      }
    });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update user preferences' },
      { status: 500 }
    );
  }
}
