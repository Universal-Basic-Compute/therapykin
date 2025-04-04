import { NextRequest, NextResponse } from 'next/server';
import { usersTable, sessionsTable, escapeAirtableString } from '@/app/utils/airtable';
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
    const escapedEmail = escapeAirtableString(currentUser.email);
    const records = await usersTable.select({
      filterByFormula: `{Email} = '${escapedEmail}'`,
      maxRecords: 1
    }).firstPage();
    
    if (records.length === 0) {
      console.log('User not found in Airtable:', currentUser.email);
      // Return default subscription data for users not in Airtable yet
      // For users not in Airtable yet, calculate free plan sessions
      try {
        // Check if there are any sessions for this email
        const sessionsRecords = await sessionsTable.select({
          filterByFormula: `{Email} = '${escapedEmail}'`,
          fields: ['id', 'MinutesActive']
        }).all();
        
        // Only count sessions with MinutesActive > 5 as valid sessions
        const validSessions = sessionsRecords.filter((record: any) => {
          const minutesActive = record.fields.MinutesActive as number || 0;
          return minutesActive > 5;
        });
        
        const freeSessionsAllowed = 3;
        const remainingSessions = Math.max(0, freeSessionsAllowed - validSessions.length);
        
        console.log(`New user has used ${validSessions.length} sessions, has ${remainingSessions} remaining`);
        
        return NextResponse.json({
          subscription: {
            plan: 'free',
            status: 'active',
            isAnnual: false,
            currentPeriodEnd: null,
            sessionsRemaining: remainingSessions,
            totalSessions: validSessions.length,
            daysActive: 1
          }
        });
      } catch (error) {
        console.error('Error counting sessions for new user:', error);
        // Fall back to default values if there's an error
        return NextResponse.json({
          subscription: {
            plan: 'free',
            status: 'active',
            isAnnual: false,
            currentPeriodEnd: null,
            sessionsRemaining: 3,  // Default for new users
            totalSessions: 0,
            daysActive: 1
          }
        });
      }
    }
    
    const userRecord = records[0];
    console.log('Found user record in Airtable:', userRecord.id);
    
    // Define sessions per plan
    const sessionsPerPlan: Record<string, number> = {
      'free': 3,
      'basic': 8,
      'standard': 30,
      'premium': Infinity
    };

    // Get the plan from user record
    const plan = userRecord.fields.SubscriptionPlan || 'free';
    const planLowerCase = typeof plan === 'string' ? plan.toLowerCase() : 'free';

    // Determine total sessions allowed for the plan
    const totalSessionsAllowed = sessionsPerPlan[planLowerCase] || 0;

    // For free plan, we need to count all sessions ever used
    // For paid plans, it's a monthly allocation that resets
    let sessionsRemaining = 0;

    if (planLowerCase === 'free') {
      // For free plan, count all sessions ever used
      // We'll need to query the sessions table to get this count
      try {
        const sessionsRecords = await sessionsTable.select({
          filterByFormula: `{Email} = '${escapedEmail}'`,
          fields: ['id', 'MinutesActive']
        }).all();
        
        // Only count sessions with MinutesActive > 5 as valid sessions
        const validSessions = sessionsRecords.filter((record: any) => {
          const minutesActive = record.fields.MinutesActive as number || 0;
          return minutesActive > 5;
        });
        
        console.log(`User has used ${validSessions.length} valid sessions out of ${totalSessionsAllowed} allowed`);
        
        // Calculate remaining sessions
        sessionsRemaining = Math.max(0, totalSessionsAllowed - validSessions.length);
      } catch (error) {
        console.error('Error counting used sessions:', error);
        // Default to 0 remaining if there's an error
        sessionsRemaining = 0;
      }
    } else {
      // For paid plans, it's the full monthly allocation
      sessionsRemaining = totalSessionsAllowed;
    }

    console.log('Calculated sessionsRemaining value:', sessionsRemaining);
    
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
    // Try to count sessions even in error case
    try {
      const currentUser = await getCurrentUser();
      if (currentUser?.email) {
        const email = currentUser.email;
        const escapedEmail = escapeAirtableString(email);
        const sessionsRecords = await sessionsTable.select({
          filterByFormula: `{Email} = '${escapedEmail}'`,
          fields: ['id', 'MinutesActive']
        }).all();
        
        // Only count sessions with MinutesActive > 5 as valid sessions
        const validSessions = sessionsRecords.filter((record: any) => {
          const minutesActive = record.fields.MinutesActive as number || 0;
          return minutesActive > 5;
        });
        
        const freeSessionsAllowed = 3;
        const remainingSessions = Math.max(0, freeSessionsAllowed - validSessions.length);
        
        return NextResponse.json({ 
          subscription: {
            plan: 'free',
            status: 'active',
            isAnnual: false,
            currentPeriodEnd: null,
            sessionsRemaining: remainingSessions,
            totalSessions: validSessions.length,
            daysActive: 1
          }
        });
      }
    } catch (secondError) {
      console.error('Error in fallback session counting:', secondError);
    }
    
    // Ultimate fallback if everything fails
    return NextResponse.json({ 
      subscription: {
        plan: 'free',
        status: 'active',
        isAnnual: false,
        currentPeriodEnd: null,
        sessionsRemaining: 3,  // Default for new users
        totalSessions: 0,
        daysActive: 1
      }
    });
  }
}
