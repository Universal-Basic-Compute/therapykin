'use client';

import React, { useState } from 'react';
import { getStripe } from '../utils/stripe';
import { useRouter } from 'next/navigation';

interface CheckoutButtonProps {
  plan: string;
  isAnnual: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function CheckoutButton({ plan, isAnnual, className, children }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      console.log(`Starting checkout for plan: ${plan}, isAnnual: ${isAnnual}`);
      
      // Create a checkout session
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          isAnnual,
        }),
      });

      // Log the raw response for debugging
      console.log('Checkout API response status:', response.status);
      
      // Handle non-JSON responses
      if (!response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Server error: ${response.status}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText.substring(0, 100)}`);
        }
      }

      const data = await response.json();
      console.log('Checkout response data:', data);

      // Check if the response contains an error
      if (data.error) {
        console.error('Checkout error:', data.error);
        alert(`Error: ${data.error}`);
        return;
      }

      // If we have a direct URL, redirect to it
      if (data.url) {
        console.log('Redirecting to Stripe checkout URL:', data.url);
        window.location.href = data.url;
        return;
      }

      // Otherwise, redirect using Stripe.js
      if (data.sessionId) {
        console.log('Redirecting to Stripe checkout with session ID:', data.sessionId);
        const stripe = await getStripe();
        if (!stripe) {
          throw new Error('Failed to load Stripe.js');
        }
        
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

        if (error) {
          console.error('Stripe checkout error:', error);
          alert(`Payment Error: ${error.message}`);
        }
      } else {
        throw new Error('No session ID or URL returned from the server');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Checkout Error: ${error.message || 'An unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={className}
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
}
