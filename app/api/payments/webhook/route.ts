import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/utils/stripe';
import { headers } from 'next/headers';
import { usersTable } from '@/app/utils/airtable';

// Disable body parsing, we need the raw body for Stripe webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature') as string;
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Extract the user ID from the metadata
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        const isAnnual = session.metadata?.isAnnual === 'true';
        
        console.log('Checkout session completed:', { 
          sessionId: session.id,
          userId,
          plan,
          isAnnual,
          customerId: session.customer,
          subscriptionId: session.subscription
        });
        
        if (userId && plan && session.subscription) {
          try {
            // Fetch the subscription to get more details
            const subscription = await stripe.subscriptions.retrieve(
              session.subscription as string
            );
            
            console.log('Retrieved subscription details:', {
              status: subscription.status,
              currentPeriodEnd: subscription.current_period_end,
              items: subscription.items.data.map(item => ({
                priceId: item.price.id,
                productId: item.price.product,
              }))
            });
            
            // Update the user's subscription in your database
            await updateUserSubscription(userId, {
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              plan,
              isAnnual,
              status: subscription.status,
              currentPeriodEnd: subscription.current_period_end * 1000, // Convert to milliseconds
            });
            
            console.log('Successfully updated user subscription after checkout');
          } catch (err) {
            console.error('Error processing checkout.session.completed event:', err);
          }
        } else {
          console.error('Missing required data in checkout session:', { 
            userId, 
            plan, 
            subscription: session.subscription 
          });
        }
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        
        // If this is a subscription invoice, update the subscription
        if (invoice.subscription) {
          // Fetch the subscription to get the customer ID
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          
          // Find the user by Stripe customer ID
          const userId = await getUserIdByStripeCustomerId(subscription.customer as string);
          
          if (userId) {
            // Update the subscription end date
            await updateSubscriptionPeriodEnd(userId, subscription.current_period_end * 1000);
          }
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        console.log('Subscription updated:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end
        });
        
        // Find the user by Stripe customer ID
        const userId = await getUserIdByStripeCustomerId(subscription.customer as string);
        
        if (userId) {
          console.log('Found user for subscription update:', userId);
          
          // Get the plan information from the subscription items
          let plan = '';
          let isAnnual = false;
          
          if (subscription.items && subscription.items.data && subscription.items.data.length > 0) {
            const priceId = subscription.items.data[0].price.id;
            
            // Determine the plan and billing period from the price ID
            if (priceId.includes('basic')) {
              plan = 'basic';
            } else if (priceId.includes('standard')) {
              plan = 'standard';
            } else if (priceId.includes('premium')) {
              plan = 'premium';
            }
            
            isAnnual = priceId.includes('annual');
            
            console.log('Determined plan from subscription:', { plan, isAnnual, priceId });
          }
          
          // Update the subscription status and end date
          await updateUserSubscription(userId, {
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end * 1000,
            plan: plan || undefined,
            isAnnual: plan ? isAnnual : undefined,
          });
          
          console.log('Successfully updated subscription status');
        } else {
          console.error('Could not find user for customer ID:', subscription.customer);
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Find the user by Stripe customer ID
        const userId = await getUserIdByStripeCustomerId(subscription.customer as string);
        
        if (userId) {
          // Update the subscription status
          await updateUserSubscription(userId, {
            status: 'canceled',
          });
        }
        break;
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Helper functions for database operations
async function getUserIdByStripeCustomerId(stripeCustomerId: string): Promise<string | null> {
  try {
    // This is a placeholder - implement based on your database
    const records = await usersTable.select({
      filterByFormula: `{StripeCustomerId} = '${stripeCustomerId}'`,
      maxRecords: 1,
    }).firstPage();
    
    if (records.length === 0) {
      return null;
    }
    
    return records[0].id;
  } catch (error) {
    console.error('Error fetching user by Stripe customer ID:', error);
    return null;
  }
}

async function updateUserSubscription(userId: string, subscriptionData: any): Promise<void> {
  try {
    console.log('Updating user subscription in Airtable:', { userId, ...subscriptionData });
    
    // Build the fields object with only the fields that are provided
    const fields: Record<string, any> = {};
    
    if (subscriptionData.stripeCustomerId) {
      fields.StripeCustomerId = subscriptionData.stripeCustomerId;
    }
    
    if (subscriptionData.stripeSubscriptionId) {
      fields.StripeSubscriptionId = subscriptionData.stripeSubscriptionId;
    }
    
    if (subscriptionData.plan) {
      fields.SubscriptionPlan = subscriptionData.plan;
    }
    
    if (subscriptionData.isAnnual !== undefined) {
      fields.SubscriptionIsAnnual = subscriptionData.isAnnual;
    }
    
    if (subscriptionData.status) {
      fields.SubscriptionStatus = subscriptionData.status;
    }
    
    if (subscriptionData.currentPeriodEnd) {
      fields.SubscriptionCurrentPeriodEnd = subscriptionData.currentPeriodEnd;
    }
    
    // Only update if there are fields to update
    if (Object.keys(fields).length > 0) {
      console.log('Updating Airtable with fields:', fields);
      
      await usersTable.update([
        {
          id: userId,
          fields,
        },
      ]);
      
      console.log('Successfully updated user subscription in Airtable');
    } else {
      console.log('No fields to update in Airtable');
    }
  } catch (error) {
    console.error('Error updating user subscription in Airtable:', error);
    throw error;
  }
}

async function updateSubscriptionPeriodEnd(userId: string, periodEnd: number): Promise<void> {
  try {
    // This is a placeholder - implement based on your database
    await usersTable.update([
      {
        id: userId,
        fields: {
          SubscriptionCurrentPeriodEnd: periodEnd,
        },
      },
    ]);
  } catch (error) {
    console.error('Error updating subscription period end:', error);
    throw error;
  }
}
