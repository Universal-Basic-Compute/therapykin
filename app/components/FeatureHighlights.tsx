import React from "react";

export default function FeatureHighlights() {
  return (
    <section className="py-20 px-4 bg-pattern-lines">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Built For Real Support</h2>
        <p className="text-center max-w-2xl mx-auto mb-16 text-foreground/70">
          Thoughtfully designed tools that make a meaningful difference in your mental health journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card card-primary card-hover-lift p-6 transition-all">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Strategies</h3>
            <p className="text-foreground/70">Custom coping techniques based on your specific needs and what works for you. TherapyKin learns which approaches help you most.</p>
          </div>
          
          <div className="card card-highlight card-hover-glow p-6 transition-all">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Continuous Memory</h3>
            <p className="text-foreground/70">Every conversation builds on previous ones—no repeating your story. TherapyKin remembers your history, challenges, and progress.</p>
          </div>
          
          <div className="card card-accent card-hover-rotate p-6 transition-all">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Evidence-Based Approaches</h3>
            <p className="text-foreground/70">Access therapeutic techniques from CBT, DBT, ACT, mindfulness practices, and more—all backed by research and clinical expertise.</p>
          </div>
          
          <div className="card card-primary card-hover-border p-6 transition-all">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">In-the-Moment Support</h3>
            <p className="text-foreground/70">Help exactly when you need it, whether scheduled or during unexpected difficulties. Available 24/7 for both brief check-ins and deeper sessions.</p>
          </div>
          
          <div className="card card-highlight card-hover-scale p-6 transition-all">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Progress Visualization</h3>
            <p className="text-foreground/70">Track your journey with intuitive tools showing patterns, insights, and growth. See your progress over time with meaningful metrics.</p>
          </div>
          
          <div className="card card-accent card-hover-lift p-6 transition-all">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Crisis Resources</h3>
            <p className="text-foreground/70">Immediate grounding techniques during difficult moments, with seamless escalation to human support when needed for your safety and wellbeing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
