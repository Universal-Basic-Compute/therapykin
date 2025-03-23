'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Client component that uses useSearchParams
function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchSessionDetails() {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/payments/session?id=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          setSessionDetails(data);
        }
      } catch (error) {
        console.error('Error fetching session details:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSessionDetails();
  }, [sessionId]);

  return (
    <div className="card p-8 shadow-depth text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      
      {isLoading ? (
        <p className="text-foreground/70 mb-8">Loading your subscription details...</p>
      ) : sessionDetails ? (
        <div className="mb-8">
          <p className="text-foreground/70 mb-4">
            Thank you for subscribing to TherapyKin. Your {sessionDetails.plan} plan is now active.
          </p>
          <div className="card p-4 bg-[var(--background-alt)] max-w-sm mx-auto mb-4">
            <p className="font-medium">Subscription Details</p>
            <p className="text-sm text-foreground/70">Plan: {sessionDetails.plan}</p>
            <p className="text-sm text-foreground/70">Billing: {sessionDetails.isAnnual ? 'Annual' : 'Monthly'}</p>
          </div>
        </div>
      ) : (
        <p className="text-foreground/70 mb-8">
          Thank you for subscribing to TherapyKin. Your subscription is now active.
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/chat" className="btn-primary">
          Start a Session
        </Link>
        <Link href="/account" className="btn-secondary">
          View Account
        </Link>
      </div>
    </div>
  );
}

// Loading fallback component
function CheckoutSuccessLoading() {
  return (
    <div className="card p-8 shadow-depth text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-foreground/70 mb-8">Loading your subscription details...</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="btn-primary opacity-50">Start a Session</div>
        <div className="btn-secondary opacity-50">View Account</div>
      </div>
    </div>
  );
}

// Main page component
export default function CheckoutSuccess() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<CheckoutSuccessLoading />}>
            <CheckoutSuccessContent />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
