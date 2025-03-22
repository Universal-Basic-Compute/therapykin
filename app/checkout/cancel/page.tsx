import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CheckoutCancel() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 shadow-depth text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--background-alt)] flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
            <p className="text-foreground/70 mb-8">
              Your payment was canceled. If you have any questions or need assistance, please contact our support team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="btn-primary">
                Return to Pricing
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
