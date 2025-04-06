'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

interface Circle {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  tags: string[];
}

export default function CirclesPage() {
  const [activeCircles] = useState<Circle[]>([
    {
      id: 'anxiety',
      name: 'Anxiety Management Circle', 
      description: 'A supportive space for managing anxiety and stress. You can actively participate or simply listen - there\'s no pressure to share until you\'re ready.',
      participants: 3,
      maxParticipants: 6,
      tags: ['Anxiety', 'Stress', 'Support', 'Listen Only']
    },
    {
      id: 'addiction',
      name: 'Addiction Recovery Circle',
      description: 'A supportive space for recovery and maintaining sobriety. You can actively participate or simply listen - there\'s no pressure to share until you\'re ready.',
      participants: 4,
      maxParticipants: 6,
      tags: ['Recovery', 'Addiction', 'Support', 'Listen Only']
    }
  ]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - Updated with more detailed explanation */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
              TherapyKin Circles
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Join AI-powered support circles where you can connect with others facing similar challenges,
              while maintaining complete privacy and anonymity.
            </p>
            
            {/* New explanation section */}
            <div className="max-w-3xl mx-auto bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--primary)]/10">
              <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">How TherapyKin Circles Work</h2>
              <div className="text-left space-y-4 text-foreground/80">
                <p>
                  Each circle is composed of advanced AI personas, carefully crafted from real therapeutic experiences and clinical literature. These AI members simulate authentic recovery journeys, creating a supportive environment that feels natural and relatable.
                </p>
                <p>
                  <strong className="text-[var(--primary)]">Completely Private:</strong> Unlike traditional group therapy, you're the only human participant. Everything shared stays between you and your AI circle members - no other humans will ever see or know about your conversations.
                </p>
                <p>
                  <strong className="text-[var(--primary)]">Growing Together:</strong> Your circle members will remember your interactions, adapt to your journey, and grow alongside you. Each session builds on previous conversations, creating a continuous and personalized support experience.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card p-6">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete Privacy</h3>
              <p className="text-foreground/70">
                Share openly while maintaining anonymity through our AI-powered system.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-foreground/70">
                Access support whenever you need it, with circles always active and welcoming.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Diverse Perspectives</h3>
              <p className="text-foreground/70">
                Learn from others at different stages of their journey while maintaining privacy.
              </p>
            </div>
          </section>

          {/* Active Circles Section */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Active Circles</h2>
              <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm">
                {activeCircles.length} Active Now
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCircles.map((circle) => (
                <div key={circle.id} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{circle.name}</h3>
                    <span className="px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                      {circle.participants}/{circle.maxParticipants} Members
                    </span>
                  </div>
                  
                  <p className="text-foreground/70 mb-4">
                    {circle.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {circle.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 rounded-full bg-[var(--background-alt)] text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/circle?name=${circle.id}&mode=peek`}
                      className="flex-1 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-center hover:bg-[var(--primary-dark)] transition-colors"
                    >
                      Peek In
                    </Link>
                    <button 
                      disabled
                      className="flex-1 px-4 py-2 rounded-lg border border-[var(--primary)]/20 text-foreground/40 text-center cursor-not-allowed relative group"
                    >
                      Create Your Circle
                      <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                        Coming Soon
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
