'use client';

import React from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4 flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block p-4 bg-[var(--primary)]/10 rounded-full">
              <svg className="w-16 h-16 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Coming Soon</h1>
          
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            We're working hard to bring this content to you. This section is currently under development and will be available soon.
          </p>
          
          <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 mb-8 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-3">What to do in the meantime:</h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Explore our <Link href="/blog" className="text-[var(--primary)] hover:underline">blog articles</Link> for valuable insights</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Check out our <Link href="/resources/library" className="text-[var(--primary)] hover:underline">resource library</Link> for helpful materials</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Start a conversation with one of our <Link href="/chat" className="text-[var(--primary)] hover:underline">specialists</Link></span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Visit our <Link href="/" className="text-[var(--primary)] hover:underline">homepage</Link> to learn more about TherapyKin</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary px-6 py-3">
              Return to Homepage
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary px-6 py-3"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
