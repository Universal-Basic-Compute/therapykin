import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/utils/stripe';
import { getCurrentUser } from '@/app/utils/auth';
import { usersTable } from '@/app/utils/airtable';

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
    
    // Get the user's Stripe customer ID from your database
    // This is a placeholder - implement based on your database
    const stripeCustomerId = await getStripeCustomerIdFromDatabase(currentUser.id);
    
    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: 'No Stripe customer found' },
        { status: 404 }
      );
    }
    
    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account?tab=subscription`,
    });
    
    // Redirect to the portal
    return NextResponse.redirect(session.url);
  } catch (error) {
    console.error('Portal session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}

// Helper function to get Stripe customer ID from database
async function getStripeCustomerIdFromDatabase(userId: string): Promise<string | null> {
  try {
    // This is a placeholder - implement based on your database
    const records = await usersTable.select({
      filterByFormula: `{ID} = '${userId}'`,
      maxRecords: 1,
    }).firstPage();
    
    if (records.length === 0) {
      return null;
    }
    
    return records[0].fields.StripeCustomerId as string || null;
  } catch (error) {
    console.error('Error fetching Stripe customer ID:', error);
    return null;
  }
}
