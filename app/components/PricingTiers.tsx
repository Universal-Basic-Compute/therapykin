'use client';

import React, { useState } from "react";
import Link from "next/link";
import CheckoutButton from './CheckoutButton';

export default function PricingTiers() {
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
    <section className="py-20 px-4 bg-pattern-dots">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Flexible Plans For Your Needs</h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-foreground/70">
          Choose the level of support that works best for you
        </p>
        
        {/* Add Pricing Toggle */}
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Free Tier */}
          <div className="card p-8 card-hover-lift transition-all flex flex-col h-full">
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
              href="/auth/register?plan=free" 
              className="mt-auto btn-secondary w-full text-center cursor-pointer hover:cursor-pointer"
            >
              Get Started
            </Link>
          </div>
          
          <div className="card p-8 card-hover-lift transition-all flex flex-col h-full">
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
          
          <div className="card card-highlight p-8 card-hover-glow transition-all flex flex-col h-full">
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
          
          <div className="card card-primary p-8 card-hover-border transition-all flex flex-col h-full">
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
              plan="basic"
              isAnnual={isAnnual}
              className="mt-auto btn-primary w-full text-center cursor-pointer hover:cursor-pointer"
            >
              Get Started
            </CheckoutButton>
          </div>
        </div>
        
        <p className="text-center mt-8 text-foreground/60">
          {isAnnual ? 'Annual plans are billed yearly. ' : ''}
          All plans include our core privacy features and can be canceled anytime.
        </p>
      </div>
    </section>
  );
}
