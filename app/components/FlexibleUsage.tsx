import React from "react";

export default function FlexibleUsage() {
  return (
    <section className="py-16 px-4 bg-[var(--background-alt)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">TherapyKin Works For You</h2>
        <p className="text-center max-w-2xl mx-auto mb-12 text-foreground/70">
          Adaptable support that fits your life, schedule, and needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card p-6 card-hover-border transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quick Check-ins During Busy Days</h3>
            <p className="text-foreground/70">Brief 5-minute sessions to center yourself or process thoughts between meetings</p>
          </div>
          
          <div className="card p-6 card-hover-border transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Deep Sessions When You Need More</h3>
            <p className="text-foreground/70">Extended conversations for deeper exploration of challenges and emotions</p>
          </div>
          
          <div className="card p-6 card-hover-border transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Middle-of-the-Night Assistance</h3>
            <p className="text-foreground/70">Support during those 3AM moments when thoughts feel heaviest and other resources aren't available</p>
          </div>
          
          <div className="card p-6 card-hover-border transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Consistent Support Between Therapy</h3>
            <p className="text-foreground/70">Reinforcement and practice of skills learned in traditional therapy sessions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
