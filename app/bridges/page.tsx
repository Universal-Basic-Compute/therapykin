'use client';

import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';

export default function Bridges() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">TherapyKin Bridges</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Healing Connections Through AI Facilitation
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto my-8"></div>
          </div>
          
          {/* Main Value Proposition */}
          <div className="card p-8 mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">When Communication Breaks Down, We Build Bridges</h2>
            <p className="text-lg text-foreground/80 max-w-4xl mx-auto mb-8">
              Relationships face obstacles that can seem insurmountable. Whether between partners, family members, colleagues, or friends, miscommunication and emotional barriers can prevent genuine understanding.
            </p>
            <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
              TherapyKin Bridges offers a revolutionary approach to relationship healing through AI-facilitated asynchronous mediation, creating a safe space for honest expression and deeper understanding.
            </p>
          </div>
          
          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How Bridges Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[var(--primary)]">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Independent Sessions</h3>
                <p className="text-foreground/70">
                  Each person speaks privately with our AI mediator, expressing their thoughts, feelings, and perspectives without interruption or judgment.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[var(--primary)]">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Thoughtful Translation</h3>
                <p className="text-foreground/70">
                  Our AI identifies communication patterns, emotional triggers, and potential misunderstandings, then translates emotional messages into constructive language.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[var(--primary)]">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Guided Understanding</h3>
                <p className="text-foreground/70">
                  Each person receives insights about their partner's perspective, along with reflective questions that encourage deeper understanding.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[var(--primary)]">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Progressive Reconciliation</h3>
                <p className="text-foreground/70">
                  Through multiple exchanges, participants build mutual understanding and develop healthier communication patterns.
                </p>
              </div>
            </div>
          </section>
          
          {/* Unique Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Unique Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Asynchronous Communication
                </h3>
                <p className="text-foreground/70">
                  Participate on your own schedule without coordinating meeting times
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Emotional Safety
                </h3>
                <p className="text-foreground/70">
                  Express yourself fully without fear of immediate reaction
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Thoughtful Reflection
                </h3>
                <p className="text-foreground/70">
                  Take time to process information and formulate responses
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Bias-Free Mediation
                </h3>
                <p className="text-foreground/70">
                  AI facilitation without human judgment or preconceptions
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy Control
                </h3>
                <p className="text-foreground/70">
                  Decide what parts of your communication to share
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Skill Development
                </h3>
                <p className="text-foreground/70">
                  Learn healthier communication patterns that extend beyond the platform
                </p>
              </div>
            </div>
          </section>
          
          {/* Bridges Programs */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Bridges Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Relationship Renewal</h3>
                <p className="text-foreground/60 italic mb-4">For couples seeking to strengthen their connection</p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    8-week structured program
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on communication patterns, emotional needs, and shared vision
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Optional transition to couples therapy preparation
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Family Harmony</h3>
                <p className="text-foreground/60 italic mb-4">For parent-child, sibling, or extended family relationships</p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Adaptable program for different family dynamics
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Age-appropriate approaches for younger participants
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on boundaries, understanding, and mutual respect
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Workplace Resolution</h3>
                <p className="text-foreground/60 italic mb-4">For colleagues working through professional conflicts</p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional context-sensitive facilitation
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on productive collaboration and clear expectations
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Integration with organizational values and objectives
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Friendship Repair</h3>
                <p className="text-foreground/60 italic mb-4">For friends navigating challenges or growing apart</p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible format for various friendship dynamics
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on mutual understanding and evolving relationships
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Options for either reconnection or healthy closure
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* How to Begin */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How to Begin</h2>
            
            <div className="card p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Individual Sign-Up</h3>
                  <p className="text-sm text-foreground/70">One person initiates the Bridge and invites the other participant</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Independent Onboarding</h3>
                  <p className="text-sm text-foreground/70">Each person completes a private assessment about the relationship</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Initial Sessions</h3>
                  <p className="text-sm text-foreground/70">Begin with individual sessions to express perspectives</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Guided Exchange</h3>
                  <p className="text-sm text-foreground/70">Progress to AI-facilitated communication exchanges</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-white">5</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Relationship Roadmap</h3>
                  <p className="text-sm text-foreground/70">Develop a shared understanding and path forward</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Success Stories */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-[var(--primary)]">S</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Sarah K.</h3>
                    <p className="text-sm text-foreground/60">Mother-Daughter Relationship</p>
                  </div>
                </div>
                <blockquote className="text-foreground/80 italic">
                  "After months of tension, my mother and I couldn't have a conversation without arguing. TherapyKin Bridges helped us understand each other's concerns without the immediate emotional reactions. Now we can actually talk again."
                </blockquote>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-[var(--primary)]">M</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Marcus T.</h3>
                    <p className="text-sm text-foreground/60">Business Partnership</p>
                  </div>
                </div>
                <blockquote className="text-foreground/80 italic">
                  "My business partner and I had different visions for our company that were creating constant friction. The Bridge process helped us articulate our perspectives clearly and find common ground that saved our business and friendship."
                </blockquote>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-[var(--primary)]">E</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Elena R.</h3>
                    <p className="text-sm text-foreground/60">Marriage Reconciliation</p>
                  </div>
                </div>
                <blockquote className="text-foreground/80 italic">
                  "My husband and I were considering separation after 12 years. Traditional counseling felt intimidating, but Bridges gave us a way to express things we'd been afraid to say face-to-face. It wasn't easy, but we're now rebuilding with a stronger foundation."
                </blockquote>
              </div>
            </div>
          </section>
          
          {/* Expert Validation */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Expert Validation</h2>
            
            <div className="card p-8">
              <p className="text-foreground/80 mb-6 text-center max-w-4xl mx-auto">
                TherapyKin Bridges was developed in consultation with relationship therapists, communication experts, and conflict resolution specialists to ensure it follows best practices in:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Non-violent communication</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Emotional regulation</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Cognitive reframing</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Solution-focused mediation</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Attachment theory application</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Essential Bridge</h3>
                <p className="text-3xl font-bold mb-4">$89<span className="text-lg font-normal text-foreground/60">/month per person</span></p>
                <ul className="space-y-2 text-foreground/70 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly facilitated exchanges
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic communication tools
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Core mediation features
                  </li>
                </ul>
                <Link href="/bridges/start?plan=essential" className="btn-secondary w-full block text-center">
                  Select Plan
                </Link>
              </div>
              
              <div className="card p-6 border-2 border-[var(--primary)] hover:shadow-lg transition-shadow relative">
                <div className="absolute top-0 right-0 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 -mt-2 -mr-2 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Bridge</h3>
                <p className="text-3xl font-bold mb-4">$129<span className="text-lg font-normal text-foreground/60">/month per person</span></p>
                <ul className="space-y-2 text-foreground/70 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited facilitated exchanges
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enhanced communication analysis
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Personalized skill development
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Comprehensive progress tracking
                  </li>
                </ul>
                <Link href="/bridges/start?plan=advanced" className="btn-primary w-full block text-center">
                  Select Plan
                </Link>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Professional Bridge</h3>
                <p className="text-3xl font-bold mb-4">$199<span className="text-lg font-normal text-foreground/60">/month per person</span></p>
                <ul className="space-y-2 text-foreground/70 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All Advanced features
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority response time
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Specialized workplace or family modules
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Optional integration with in-person therapy
                  </li>
                </ul>
                <Link href="/bridges/start?plan=professional" className="btn-secondary w-full block text-center">
                  Select Plan
                </Link>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="mb-16">
            <div className="card p-8 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Begin Your Bridge Journey Today</h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Difficult relationships don't have to remain that way. 
                Take the first step toward better understanding.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/bridges/start" className="btn-primary px-8 py-3 text-lg">
                  Start My Bridge
                </Link>
                <Link href="/bridges/learn-more" className="btn-secondary px-8 py-3 text-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </section>
          
          {/* Disclaimer */}
          <div className="text-center text-foreground/60 text-sm max-w-3xl mx-auto">
            <p>
              TherapyKin Bridges complements but does not replace traditional therapy for severe relationship issues, abuse situations, or major mental health concerns. If you're experiencing abuse, please contact appropriate support services.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
