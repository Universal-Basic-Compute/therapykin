'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonial from "../../components/Testimonial";
import Link from "next/link";

export default function CryptoSpecialist() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-sm font-medium text-foreground/60 hover:text-[var(--primary)]">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-foreground/40 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-sm font-medium text-foreground/40 ml-1">
                      Specialists
                    </span>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-foreground/40 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-sm font-medium text-foreground/40 ml-1">
                      Crypto Specialist
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="mb-12">
            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
              Innovative Specialist
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Crypto & Web3 Mental Health Specialist</h1>
            
            <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-6 rounded-lg border-l-4 border-[var(--primary)] mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">A Revolutionary Approach: Therapy Meets Crypto Expertise</h2>
              <p className="text-lg text-foreground/80">
                For the first time, access mental health support from specialists who truly understand the unique psychological challenges of crypto trading and Web3 participation. Our crypto specialists combine therapeutic expertise with deep knowledge of digital assets, market psychology, and Web3 communities.
              </p>
            </div>
            
            <p className="text-xl text-foreground/70 mb-4">
              Until now, traditional therapists lacked the specialized knowledge to address crypto-specific stressors, while crypto coaches lacked therapeutic training. TherapyKin Crypto bridges this gap.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 mt-8 mb-10">
              <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-foreground/5">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <h3 className="font-medium">Traditional Therapists</h3>
                </div>
                <p className="text-foreground/70 text-sm">
                  Lack understanding of crypto terminology, market psychology, and the unique stressors of 24/7 markets
                </p>
              </div>
              
              <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-foreground/5">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <h3 className="font-medium">Crypto Coaches</h3>
                </div>
                <p className="text-foreground/70 text-sm">
                  Offer trading advice but lack therapeutic training to address anxiety, addiction, and psychological impacts
                </p>
              </div>
              
              <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] border-2 shadow-md">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <h3 className="font-medium">TherapyKin Crypto Specialists</h3>
                </div>
                <p className="text-foreground/70 text-sm">
                  Combine therapeutic expertise with deep crypto knowledge for truly effective mental health support
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Areas of Expertise</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Crypto market volatility stress and anxiety</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Trading addiction and compulsive checking behaviors</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Coping with significant financial losses</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Decision fatigue in fast-moving markets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Web3 community burnout and digital overwhelm</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Balancing crypto involvement with other life areas</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">When to Choose a Crypto Specialist</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're experiencing anxiety related to crypto investments</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're struggling with trading behaviors that feel out of control</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You want to talk with someone who understands crypto terminology</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're dealing with relationship issues related to crypto involvement</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're seeking better work-life balance in Web3 projects</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Specialized Use Cases for TherapyKin Crypto</h2>
            <p className="text-center text-foreground/80 mb-10 max-w-3xl mx-auto">
              Our crypto specialists provide targeted support for the unique psychological challenges faced by cryptocurrency traders and investors.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Active Trading Sessions */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Active Trading Sessions</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Real-time support during active trading, including pre-trading preparation, in-session emotional monitoring, and decision support at critical moments.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Pre-trading psychological preparation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Real-time intervention during market volatility</span>
                  </li>
                </ul>
              </div>
              
              {/* Market Volatility Response */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Market Volatility Response</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Tailored support for different market conditions, from maintaining discipline during quiet markets to implementing crisis protocols during extreme volatility.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Adaptive strategies for different volatility levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Crisis protocols for extreme market conditions</span>
                  </li>
                </ul>
              </div>
              
              {/* Performance Enhancement */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Performance Enhancement</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Development of elite psychological skills including mental preparation, emotional circuit breakers, and structured performance review techniques.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Emotional circuit breakers for better decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Performance psychology techniques from elite traders</span>
                  </li>
                </ul>
              </div>
              
              {/* Market Cycle Psychology */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Market Cycle Psychology</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Phase-appropriate support based on market cycles, from maintaining conviction during accumulation to providing emotional containment during downturns.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Psychological support for each market phase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Countering phase-specific cognitive biases</span>
                  </li>
                </ul>
              </div>
              
              {/* Emotional Dashboard */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Emotional Dashboard</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Development of tracking systems that correlate psychological states with performance, transforming subjective experiences into measurable metrics.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Emotional state tracking and correlation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Psychological P&L analysis for improvement</span>
                  </li>
                </ul>
              </div>
              
              {/* Digital Wellbeing */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Digital Wellbeing</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Strategies for managing the challenges of 24/7 crypto markets, including attention fragmentation, digital addiction patterns, and creating healthy boundaries.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Managing attention in 24/7 markets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Creating healthy digital boundaries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--background-alt)] p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="mb-4 text-foreground/80">
              Our crypto specialists combine traditional therapeutic techniques with specialized knowledge of the unique psychological challenges faced by those in the cryptocurrency and Web3 space. They understand the terminology, culture, and specific stressors of this environment.
            </p>
            <p className="mb-4 text-foreground/80">
              Sessions focus on developing healthy relationships with technology and investments, managing market-related anxiety, establishing boundaries, and building resilience in the face of volatility and uncertainty.
            </p>
            <div className="mt-6 pt-6 border-t border-foreground/10">
              <h3 className="text-xl font-medium mb-3">Our Methodology</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Trading style adaptation for different time horizons and risk profiles</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Cognitive bias identification and mitigation techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Emotional regulation strategies for high-pressure market conditions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Decision-making frameworks that separate emotion from analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mindfulness practices adapted specifically for traders</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Psychological P&L analysis to improve performance</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">What Crypto Traders Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial 
                quote="After a significant loss during the last market crash, I was experiencing paralyzing anxiety every time I tried to trade. My TherapyKin Crypto specialist helped me develop emotional circuit breakers that have completely transformed my approach."
                author="Alex K."
                title="Day Trader"
              />
              
              <Testimonial 
                quote="The emotional dashboard technique my specialist taught me has been a game-changer. I can now see patterns in my trading behavior that I was completely blind to before. My win rate has improved by 22% since implementing these tools."
                author="Maya R."
                title="Position Trader"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary)]/5 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-4">Try Something Revolutionary</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <p className="mb-4 text-foreground/80">
                  TherapyKin Crypto represents a new frontier in specialized mental health support. For the first time, you can work with professionals who understand both the psychological aspects of your challenges <em>and</em> the unique context of cryptocurrency markets and Web3 communities.
                </p>
                <p className="text-foreground/80">
                  Whether you're dealing with trading anxiety, digital burnout, or the emotional rollercoaster of volatile markets, our specialists speak your language and understand your world. Experience the difference that specialized support can make.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-full h-40 w-40 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <p className="text-[var(--primary)] font-bold text-xl">Try Your First</p>
                    <p className="text-3xl font-bold">Session</p>
                    <p className="text-sm text-foreground/60 mt-1">Experience the difference</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-[var(--background-alt)] p-10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to Experience Crypto-Specialized Therapy?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
              Join the growing community of traders and Web3 professionals who have discovered the power of specialized mental health support. Your first session could be the beginning of a transformative journey.
            </p>
            <Link 
              href="/chat?specialist=crypto" 
              className="btn-primary text-white px-8 py-4 rounded-md font-medium inline-block text-lg"
            >
              Start Your First Specialized Session
            </Link>
            <p className="text-sm text-foreground/60 mt-4">No prior therapy experience needed. Our specialists will guide you through the process.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
