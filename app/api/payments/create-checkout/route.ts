import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPriceId } from '@/app/utils/stripe';
import { getCurrentUser } from '@/app/utils/auth';
import { usersTable } from '@/app/utils/airtable';

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
    const { plan, isAnnual } = await request.json();
    
    console.log('Checkout request:', { plan, isAnnual, userId: currentUser.id });
    
    // Validate input
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan is required' },
        { status: 400 }
      );
    }
    
    // Get the price ID based on the plan and billing period
    const priceId = getPriceId(plan, isAnnual);
    
    console.log('Selected price ID:', priceId);
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or billing period' },
        { status: 400 }
      );
    }
    
    // Check if the user already has a Stripe customer ID in your database
    let customerId = '';
    try {
      const records = await usersTable.select({
        filterByFormula: `{ID} = '${currentUser.id}'`,
        maxRecords: 1,
      }).firstPage();
      
      if (records.length > 0 && records[0].fields.StripeCustomerId) {
        customerId = records[0].fields.StripeCustomerId as string;
        console.log('Found existing Stripe customer:', customerId);
      }
    } catch (err) {
      console.error('Error fetching user from Airtable:', err);
      // Continue with creating a new customer
    }
    
    // Create a new Stripe customer if one doesn't exist
    if (!customerId) {
      try {
        console.log('Creating new Stripe customer for user:', currentUser.email);
        const customer = await stripe.customers.create({
          email: currentUser.email,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          metadata: {
            userId: currentUser.id,
          },
        });
        
        customerId = customer.id;
        console.log('Created new Stripe customer:', customerId);
        
        // Save the customer ID to your database
        try {
          await usersTable.update([
            {
              id: currentUser.id,
              fields: {
                StripeCustomerId: customerId,
              },
            },
          ]);
          console.log('Saved Stripe customer ID to database');
        } catch (err) {
          console.error('Error saving Stripe customer ID to database:', err);
          // Continue with checkout even if saving to DB fails
        }
      } catch (err) {
        console.error('Error creating Stripe customer:', err);
        return NextResponse.json(
          { error: 'Failed to create customer' },
          { status: 500 }
        );
      }
    }
    
    // Create the checkout session
    try {
      console.log('Creating checkout session with price ID:', priceId);
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/cancel`,
        metadata: {
          userId: currentUser.id,
          plan,
          isAnnual: isAnnual ? 'true' : 'false',
        },
      });
      
      console.log('Checkout session created:', session.id);
      return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
      console.error('Error creating checkout session:', err);
      return NextResponse.json(
        { error: `Failed to create checkout session: ${err.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Checkout session creation error:', error);
    return NextResponse.json(
      { error: `Failed to create checkout session: ${error.message}` },
      { status: 500 }
    );
  }
}
