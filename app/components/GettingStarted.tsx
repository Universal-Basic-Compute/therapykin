import Link from "next/link";
import React from "react";

export default function GettingStarted() {
  return (
    <section className="py-20 px-4 bg-[var(--background-alt)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Getting Started Is Simple</h2>
        <p className="text-center max-w-2xl mx-auto mb-16 text-foreground/70">
          Begin your journey with TherapyKin in just a few easy steps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="card p-6 card-hover-rotate transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div>
            <h3 className="text-xl font-semibold mb-3">Choose Your Plan</h3>
            <p className="text-foreground/70">Select what works for your needs and budget. All plans include our core features and privacy protections.</p>
          </div>
          
          <div className="card p-6 card-hover-rotate transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div>
            <h3 className="text-xl font-semibold mb-3">Brief Introduction</h3>
            <p className="text-foreground/70">A quick conversation to understand your goals and preferences. No lengthy intake forms required.</p>
          </div>
          
          <div className="card p-6 card-hover-rotate transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div>
            <h3 className="text-xl font-semibold mb-3">Your Choice of Interaction</h3>
            <p className="text-foreground/70">Start with text, voice, or both—change anytime. Communicate in whatever way feels most comfortable.</p>
          </div>
          
          <div className="card p-6 card-hover-rotate transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">4</div>
            <h3 className="text-xl font-semibold mb-3">Build Your Relationship</h3>
            <p className="text-foreground/70">Each conversation helps TherapyKin understand and support you better. The experience improves over time.</p>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/signup?plan=free" 
            className="btn-primary inline-flex items-center px-8 py-4 text-lg"
          >
            Get 3 Free Sessions - No Credit Card Required
          </Link>
          <p className="mt-4 text-foreground/60">Try TherapyKin with our free tier today</p>
        </div>
      </div>
    </section>
  );
}
