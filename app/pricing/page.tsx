'use client';

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import CheckoutButton from '../components/CheckoutButton';

export default function Pricing() {
  // Add state for billing period
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Calculate prices based on billing period
  const basicPrice = isAnnual ? 39 : 49; // 20% discount for annual
  const standardPrice = isAnnual ? 69 : 89; // ~22% discount for annual
  const premiumPrice = isAnnual ? 119 : 149; // 20% discount for annual
  
  // Calculate annual prices (for display)
  const basicAnnualTotal = basicPrice * 12;
  const standardAnnualTotal = standardPrice * 12;
  const premiumAnnualTotal = premiumPrice * 12;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Choose the plan that works best for your needs. All plans include our core privacy features and can be canceled anytime.
            </p>
          </div>
          
          {/* Pricing Toggle - Update to make it functional */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-[var(--background-alt)] p-1 rounded-full">
              <button 
                className={`px-6 py-2 rounded-full cursor-pointer ${!isAnnual ? 'bg-[var(--primary)] text-white' : 'text-foreground/70'}`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-2 rounded-full cursor-pointer ${isAnnual ? 'bg-[var(--primary)] text-white' : 'text-foreground/70'}`}
                onClick={() => setIsAnnual(true)}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {/* Free Plan */}
            <div className="card p-8 hover:shadow-depth transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-foreground/60 ml-2">/forever</span>
                </div>
                <p className="text-foreground/70 mb-6">Try TherapyKin with no commitment</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>3 sessions</strong> free</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Text or voice communication</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic therapeutic techniques</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Standard privacy protections</span>
                  </li>
                </ul>
              </div>
              <Link 
                href="/signup?plan=free" 
                className="mt-auto btn-secondary w-full text-center cursor-pointer hover:cursor-pointer"
              >
                Get Started
              </Link>
            </div>
              
            {/* Basic Plan */}
            <div className="card p-8 hover:shadow-depth transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Basic</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">${basicPrice}</span>
                  <span className="text-foreground/60 ml-2">/{isAnnual ? 'month' : 'month'}</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-[var(--primary)] mb-2">
                    ${basicAnnualTotal} billed annually
                  </p>
                )}
                <p className="text-foreground/70 mb-6">Perfect for getting started with AI therapy</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>8 sessions</strong> per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Text or voice communication</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Core therapeutic techniques</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Standard privacy protections</span>
                  </li>
                </ul>
              </div>
              <CheckoutButton
                plan="basic"
                isAnnual={isAnnual}
                className="mt-auto btn-primary w-full text-center cursor-pointer hover:cursor-pointer"
              >
                Get Started
              </CheckoutButton>
            </div>
            
            {/* Standard Plan */}
            <div className="card card-highlight p-8 hover:shadow-depth transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Standard</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">${standardPrice}</span>
                  <span className="text-foreground/60 ml-2">/{isAnnual ? 'month' : 'month'}</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-[var(--primary)] mb-2">
                    ${standardAnnualTotal} billed annually
                  </p>
                )}
                <p className="text-foreground/70 mb-6">Ideal for consistent, comprehensive support</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>30 sessions</strong> per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Text and voice communication</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full access to all therapeutic modalities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Progress tracking and insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enhanced privacy features</span>
                  </li>
                </ul>
              </div>
              <CheckoutButton
                plan="standard"
                isAnnual={isAnnual}
                className="mt-auto btn-primary w-full text-center cursor-pointer hover:cursor-pointer"
              >
                Get Started
              </CheckoutButton>
            </div>
            
            {/* Premium Plan */}
            <div className="card card-primary p-8 hover:shadow-depth transition-all flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <div className="flex items-end mb-1">
                  <span className="text-4xl font-bold">${premiumPrice}</span>
                  <span className="text-foreground/60 ml-2">/{isAnnual ? 'month' : 'month'}</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-[var(--primary)] mb-2">
                    ${premiumAnnualTotal} billed annually
                  </p>
                )}
                <p className="text-foreground/70 mb-6">Best for comprehensive, priority support</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Unlimited sessions</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority response time</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced analytics and insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enhanced privacy options</span>
                  </li>
                </ul>
              </div>
              <CheckoutButton
                plan="premium"
                isAnnual={isAnnual}
                className="mt-auto btn-primary w-full text-center cursor-pointer hover:cursor-pointer"
              >
                Get Started
              </CheckoutButton>
            </div>
          </div>
          
          
          {/* FAQ Section */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-3">Can I change plans later?</h3>
                <p className="text-foreground/70">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-3">Is there a free option?</h3>
                <p className="text-foreground/70">
                  Yes, we offer a free tier that includes 3 sessions at no cost. This gives you a chance to experience TherapyKin before committing to a paid plan. No credit card required to start.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-3">How do I cancel my subscription?</h3>
                <p className="text-foreground/70">
                  You can cancel anytime through your account settings. There are no cancellation fees or long-term commitments.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-3">How secure is my data?</h3>
                <p className="text-foreground/70">
                  Your privacy and data security are our top priorities. All conversations are encrypted, and we follow industry-leading security practices. We never share your personal information with third parties without your explicit consent.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-3">Are there any hidden fees?</h3>
                <p className="text-foreground/70">
                  No hidden fees. The price you see is the price you pay, with no additional charges or surprise costs.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-3">What counts as a session?</h3>
                <p className="text-foreground/70">
                  A session is a continuous conversation with TherapyKin lasting up to 30 minutes. You can use text, voice, or both during a session. Sessions don't expire and can be used anytime during your billing cycle.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-3">How long is a session?</h3>
                <p className="text-foreground/70">
                  Sessions can be as long as you need, with a cap of 1 hour per session. This allows you to have meaningful conversations without feeling rushed, while ensuring our system remains responsive for all users. You can have multiple sessions per day based on your subscription plan.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Begin your journey with TherapyKin today and experience the benefits of a therapeutic companion that remembers, adapts, and grows with you.
            </p>
            <Link 
              href="/signup?plan=free" 
              className="btn-primary inline-flex items-center px-8 py-4 text-lg"
            >
              Get 3 Free Sessions
            </Link>
            <p className="mt-4 text-foreground/60">No credit card required. Start with our free tier today.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
