import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Check for required environment variables and provide better error handling
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY environment variable');
  // In development, we'll continue with a dummy key, but in production this should fail
  if (process.env.NODE_ENV === 'production') {
    throw new Error('STRIPE_SECRET_KEY is required in production');
  }
}

// Initialize Stripe server-side instance with better error handling
export const stripe = new Stripe(STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_development', {
  apiVersion: '2025-02-24.acacia', // Update to the required version
});

// Check for required client-side environment variables
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!STRIPE_PUBLISHABLE_KEY) {
  console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
  // We'll log this error but not throw, as this could be running during build time
}

// Initialize Stripe client-side instance (for frontend)
let stripePromise: Promise<any> | null = null;
export const getStripe = () => {
  if (!stripePromise && STRIPE_PUBLISHABLE_KEY) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  } else if (!STRIPE_PUBLISHABLE_KEY) {
    console.error('Cannot initialize Stripe: Missing publishable key');
    return Promise.reject(new Error('Stripe publishable key is missing'));
  }
  return stripePromise;
};

// Define product and price IDs
export const PRODUCTS = {
  BASIC: {
    MONTHLY: process.env.STRIPE_BASIC_MONTHLY_PRICE_ID,
    ANNUAL: process.env.STRIPE_BASIC_ANNUAL_PRICE_ID,
  },
  STANDARD: {
    MONTHLY: process.env.STRIPE_STANDARD_MONTHLY_PRICE_ID,
    ANNUAL: process.env.STRIPE_STANDARD_ANNUAL_PRICE_ID,
  },
  PREMIUM: {
    MONTHLY: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID,
    ANNUAL: process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID,
  },
};

// Helper to get price ID based on plan and billing period
export const getPriceId = (plan: string, isAnnual: boolean): string | undefined => {
  // Log environment variables for debugging
  console.log('Available price IDs:', {
    basic: { monthly: PRODUCTS.BASIC.MONTHLY, annual: PRODUCTS.BASIC.ANNUAL },
    standard: { monthly: PRODUCTS.STANDARD.MONTHLY, annual: PRODUCTS.STANDARD.ANNUAL },
    premium: { monthly: PRODUCTS.PREMIUM.MONTHLY, annual: PRODUCTS.PREMIUM.ANNUAL },
  });
  
  // Use test price IDs if environment variables are not set
  const TEST_PRICE_ID = 'price_1234567890'; // Fallback for testing
  
  switch (plan.toLowerCase()) {
    case 'basic':
      return isAnnual 
        ? (PRODUCTS.BASIC.ANNUAL || TEST_PRICE_ID) 
        : (PRODUCTS.BASIC.MONTHLY || TEST_PRICE_ID);
    case 'standard':
      return isAnnual 
        ? (PRODUCTS.STANDARD.ANNUAL || TEST_PRICE_ID) 
        : (PRODUCTS.STANDARD.MONTHLY || TEST_PRICE_ID);
    case 'premium':
      return isAnnual 
        ? (PRODUCTS.PREMIUM.ANNUAL || TEST_PRICE_ID) 
        : (PRODUCTS.PREMIUM.MONTHLY || TEST_PRICE_ID);
    default:
      console.error('Invalid plan selected:', plan);
      return undefined;
  }
};
