'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';

export default function Bridges() {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyPageLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        {/* Floating Copy Link Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={copyPageLink}
            className="group flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="text-lg font-medium">
              {linkCopied ? 'Link Copied!' : 'Copy Link'}
            </span>
            <span className="absolute -top-2 -right-2 flex h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-white/30"></span>
            </span>
          </button>
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with background image */}
          <div className="text-center mb-32 rounded-2xl shadow-depth relative overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="/bridges/hero.png" 
                alt="Bridges Hero" 
                fill 
                className="object-cover"
                priority
              />
              {/* Optional overlay to ensure text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Content on top of the image */}
            <div className="relative z-10 p-16 md:p-24 min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">TherapyKin Bridges</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Healing Connections Through AI Facilitation
              </p>
              <div className="w-24 h-1 bg-white mx-auto my-8"></div>
              
              {/* Add this button */}
              <Link href="/my-bridges" className="btn-primary bg-white text-[var(--primary)] hover:bg-white/90 px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Start My Bridge
              </Link>
            </div>
          </div>
          
          {/* Main Value Proposition */}
          <div className="card p-8 mb-16 text-center shadow-depth card-hover-glow">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-transparent bg-clip-text">When Communication Breaks Down, We Build Bridges</h2>
            <p className="text-lg text-foreground/80 max-w-4xl mx-auto mb-8">
              Relationships face obstacles that can seem insurmountable. Whether between partners, family members, colleagues, or friends, miscommunication and emotional barriers can prevent genuine understanding.
            </p>
            <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
              TherapyKin Bridges offers a revolutionary approach to relationship healing through AI-facilitated asynchronous mediation, creating a safe space for honest expression and deeper understanding.
            </p>
          </div>
          
          {/* How It Works */}
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[var(--primary)]">How Bridges Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card p-6 text-center hover:shadow-lg transition-shadow card-hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--primary-dark)]">Independent Sessions</h3>
                <p className="text-foreground/70">
                  Each person speaks privately with our AI mediator, expressing their thoughts, feelings, and perspectives without interruption or judgment.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-lg transition-shadow card-hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--accent)]">Thoughtful Translation</h3>
                <p className="text-foreground/70">
                  Our AI identifies communication patterns, emotional triggers, and potential misunderstandings, then translates emotional messages into constructive language.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-lg transition-shadow card-hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-[var(--warm)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--warm)]">Guided Understanding</h3>
                <p className="text-foreground/70">
                  Each person receives insights about their partner's perspective, along with reflective questions that encourage deeper understanding.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-lg transition-shadow card-hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--warm)] to-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">Progressive Reconciliation</h3>
                <p className="text-foreground/70">
                  Through multiple exchanges, participants build mutual understanding and develop healthier communication patterns.
                </p>
              </div>
            </div>
          </section>
          
          {/* Unique Benefits */}
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[var(--primary)]">Unique Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[var(--primary)]">Bridges Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="card p-6 hover:shadow-lg transition-shadow card-hover-scale">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Relationship Renewal</h3>
                    <p className="text-foreground/60 italic">For couples seeking to strengthen their connection</p>
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    8-week structured program
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on communication patterns, emotional needs, and shared vision
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Optional transition to couples therapy preparation
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow card-hover-scale">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Family Harmony</h3>
                    <p className="text-foreground/60 italic">For parent-child, sibling, or extended family relationships</p>
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Adaptable program for different family dynamics
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Age-appropriate approaches for younger participants
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on boundaries, understanding, and mutual respect
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow card-hover-scale">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Workplace Resolution</h3>
                    <p className="text-foreground/60 italic">For colleagues working through professional conflicts</p>
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional context-sensitive facilitation
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on productive collaboration and clear expectations
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Integration with organizational values and objectives
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 hover:shadow-lg transition-shadow card-hover-scale">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Friendship Repair</h3>
                    <p className="text-foreground/60 italic">For friends navigating challenges or growing apart</p>
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible format for various friendship dynamics
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on mutual understanding and evolving relationships
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Options for either reconnection or healthy closure
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* How to Begin */}
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[var(--primary)]">How to Begin</h2>
            
            <div className="card p-8 shadow-depth bg-gradient-to-br from-[var(--background)] to-[var(--background-alt)]">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-[var(--primary)]">Individual Sign-Up</h3>
                  <p className="text-sm text-foreground/70">One person initiates the Bridge and invites the other participant</p>
                </div>
                
                <div className="text-center relative">
                  <div className="hidden md:block absolute top-6 left-0 right-0 h-1 border-b-2 border-dashed border-[var(--primary-dark)]/50 -z-10"></div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-[var(--primary-dark)]">Independent Onboarding</h3>
                  <p className="text-sm text-foreground/70">Each person completes a private assessment about the relationship</p>
                </div>
                
                <div className="text-center relative">
                  <div className="hidden md:block absolute top-6 left-0 right-0 h-1 border-b-2 border-dashed border-[var(--accent)]/50 -z-10"></div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--warm)] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-[var(--accent)]">Initial Sessions</h3>
                  <p className="text-sm text-foreground/70">Begin with individual sessions to express perspectives</p>
                </div>
                
                <div className="text-center relative">
                  <div className="hidden md:block absolute top-6 left-0 right-0 h-1 border-b-2 border-dashed border-[var(--warm)]/50 -z-10"></div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--warm)] to-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-[var(--warm)]">Guided Exchange</h3>
                  <p className="text-sm text-foreground/70">Progress to AI-facilitated communication exchanges</p>
                </div>
                
                <div className="text-center relative">
                  <div className="hidden md:block absolute top-6 left-0 right-0 h-1 border-b-2 border-dashed border-[var(--primary)]/50 -z-10"></div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-xl font-bold text-white">5</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-[var(--primary)]">Relationship Roadmap</h3>
                  <p className="text-sm text-foreground/70">Develop a shared understanding and path forward</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Success Stories */}
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[var(--primary)]">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-6 shadow-depth">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-xl font-bold">S</span>
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
              
              <div className="card p-6 shadow-depth">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-xl font-bold">M</span>
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
              
              <div className="card p-6 shadow-depth">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-xl font-bold">E</span>
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
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[var(--primary)]">Expert Validation</h2>
            
            <div className="card p-8 shadow-depth bg-gradient-to-br from-[var(--background)] to-[var(--background-alt)]">
              <p className="text-foreground/80 mb-6 text-center max-w-4xl mx-auto">
                TherapyKin Bridges was developed in consultation with relationship therapists, communication experts, and conflict resolution specialists to ensure it follows best practices in:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/40 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[var(--primary)]">Non-violent communication</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-dark)]/20 to-[var(--primary-dark)]/40 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[var(--primary-dark)]">Emotional regulation</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/40 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[var(--accent)]">Cognitive reframing</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--warm)]/20 to-[var(--warm)]/40 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--warm)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[var(--warm)]">Solution-focused mediation</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/40 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[var(--primary)]">Attachment theory application</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing section removed */}
          
          {/* CTA */}
          <section className="mb-24">
            <div className="card p-8 bg-[var(--background-alt)] text-center shadow-depth overflow-hidden relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--primary)] relative z-10">Begin Your Bridge Journey Today</h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto relative z-10">
                Difficult relationships don't have to remain that way. 
                Take the first step toward better understanding.
              </p>
              <div className="flex justify-center relative z-10">
                <Link href="/my-bridges" className="btn-primary px-8 py-3 text-lg">
                  Start My Bridge
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
