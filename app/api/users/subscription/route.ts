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
    
    console.log('Fetching subscription data for user:', currentUser.email);
    
    // Find the user in Airtable by email
    const records = await usersTable.select({
      filterByFormula: `{Email} = '${currentUser.email}'`,
      maxRecords: 1
    }).firstPage();
    
    if (records.length === 0) {
      console.log('User not found in Airtable:', currentUser.email);
      // Return default subscription data for users not in Airtable yet
      return NextResponse.json({
        subscription: {
          plan: 'free',
          status: 'active',
          isAnnual: false,
          currentPeriodEnd: null,
          sessionsRemaining: 0,  // Changed from 3 to 0
          totalSessions: 0,
          daysActive: 1
        }
      });
    }
    
    const userRecord = records[0];
    console.log('Found user record in Airtable:', userRecord.id);
    
    // Get the actual sessions remaining from the user record
    // Log the raw value to help debug
    console.log('Raw SessionsRemaining value from Airtable:', userRecord.fields.SessionsRemaining);

    // Check if the value exists and is a number
    let sessionsRemaining = 0;
    if (userRecord.fields.SessionsRemaining !== undefined) {
      if (typeof userRecord.fields.SessionsRemaining === 'number') {
        sessionsRemaining = userRecord.fields.SessionsRemaining;
      } else {
        // Try to convert to number if it's a string
        const parsedValue = Number(userRecord.fields.SessionsRemaining);
        if (!isNaN(parsedValue)) {
          sessionsRemaining = parsedValue;
        }
      }
    }

    console.log('Processed sessionsRemaining value:', sessionsRemaining);
    
    // Extract subscription details with fallbacks for missing fields
    const subscriptionData = {
      plan: userRecord.fields.SubscriptionPlan || 'free',
      status: userRecord.fields.SubscriptionStatus || 'active',
      isAnnual: userRecord.fields.IsAnnual === true,
      currentPeriodEnd: userRecord.fields.SubscriptionCurrentPeriodEnd || null,
      sessionsRemaining: sessionsRemaining,
      totalSessions: userRecord.fields.TotalSessions || 0,
      daysActive: userRecord.fields.DaysActive || 1
    };
    
    console.log('Returning subscription data:', subscriptionData);
    return NextResponse.json({ subscription: subscriptionData });
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    // Return a default subscription in case of error
    return NextResponse.json({ 
      subscription: {
        plan: 'free',
        status: 'active',
        isAnnual: false,
        currentPeriodEnd: null,
        sessionsRemaining: 0,  // Changed from 3 to 0
        totalSessions: 0,
        daysActive: 1
      }
    });
  }
}
