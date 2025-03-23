'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

export default function CryptoTradingPsychology() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/crypto-trading-psychology';
  
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
                    <Link href="/resources/library" className="text-sm font-medium text-foreground/60 hover:text-[var(--primary)] ml-1">
                      Resource Library
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-foreground/40 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-sm font-medium text-foreground/40 ml-1">
                      Cryptocurrency Trading Psychology
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="crypto-psychology-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Trading Psychology
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">The Investor's Edge: Cryptocurrency Trading Psychology</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  Master the psychological aspects of crypto trading to gain a competitive advantage in volatile markets.
                </p>
              </div>
              
              {/* Featured Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src="/resources/crypto-trading-psychology.jpg" 
                    alt="Cryptocurrency Trading Psychology" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, replace with a gradient background
                      e.currentTarget.style.display = 'none';
                      const parentElement = e.currentTarget.parentElement;
                      if (parentElement) {
                        parentElement.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)';
                        parentElement.innerHTML += `<div class="w-full h-full flex items-center justify-center text-white font-medium p-4 text-center">Cryptocurrency Trading Psychology</div>`;
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">The Psychological Advantage</h2>
                <p className="mb-4">
                  The intersection of cryptocurrency trading and performance psychology represents an untapped competitive advantage in today's markets. While most investors focus exclusively on technical analysis, market research, and fundamental indicators, elite performers understand that psychological mastery is the critical differentiator between consistent success and costly emotional decisions.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">The Data Is Clear:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Top-performing crypto traders experience 40% less emotional interference during decision-making (CryptoMind Research, 2023)</li>
                    <li>Investors with structured psychological routines show 23% better risk-adjusted returns in high-volatility markets</li>
                    <li>87% of significant trading losses can be traced to psychological factors rather than analytical errors</li>
                    <li>Institutional investors dedicate 15-20% of professional development to psychological training</li>
                  </ul>
                </div>
                
                <p className="mb-4">
                  This resource transforms cutting-edge performance psychology into practical strategies specifically calibrated for cryptocurrency investors. By developing these mental skills, you'll gain the ability to:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 mb-6 text-foreground/80">
                  <li>Execute your strategy with discipline regardless of market conditions</li>
                  <li>Maintain clarity during extreme volatility when others panic</li>
                  <li>Recognize and counteract the psychological biases affecting market movements</li>
                  <li>Transform emotional triggers into information that enhances decision quality</li>
                  <li>Develop resilience that turns market challenges into competitive advantages</li>
                </ul>
                
                <p className="mb-4">
                  The most sophisticated trading algorithms and analysis mean nothing if emotional reactivity overrides your execution. This guide provides the missing component in most investors' toolkits: the psychological infrastructure required for consistent performance in the most volatile asset class in financial history.
                </p>
              </section>
              
              {/* Understanding the Psychological Impact */}
              <section id="psychological-impact" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Understanding the Psychological Impact of Crypto Trading</h2>
                
                <div className="space-y-8">
                  {/* Volatility and Emotional Responses */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Volatility and Emotional Responses</h3>
                    <p className="mb-4">
                      Cryptocurrency markets operate 24/7 and can experience dramatic price swings within minutes. This volatility creates a psychological environment unlike traditional investments:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="card p-4 border border-foreground/10 hover:border-[var(--primary)]/30 transition-all">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Cortisol Elevation</h4>
                            <p className="text-sm text-foreground/70">Research suggests that checking volatile investments can trigger cortisol releases similar to acute stress responses</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10 hover:border-[var(--primary)]/30 transition-all">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Emotional Rollercoaster</h4>
                            <p className="text-sm text-foreground/70">The rapid cycling between euphoria during upswings and despair during downturns can create emotional whiplash</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10 hover:border-[var(--primary)]/30 transition-all">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Uncertainty Tolerance</h4>
                            <p className="text-sm text-foreground/70">Individuals with lower tolerance for uncertainty often experience heightened anxiety when exposed to crypto volatility</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10 hover:border-[var(--primary)]/30 transition-all">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Anticipatory Anxiety</h4>
                            <p className="text-sm text-foreground/70">The constant possibility of significant price movements can create a state of perpetual alertness</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Real Impact:</h4>
                      <p className="text-foreground/70">
                        Studies show that during major market corrections, mental health hotlines report increased call volumes related to financial distress, with cryptocurrency volatility being a growing contributor.
                      </p>
                    </div>
                  </div>
                  
                  {/* Trading Psychology */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Trading Psychology</h3>
                    <p className="mb-4">
                      The psychology of cryptocurrency trading often amplifies cognitive biases that affect decision-making:
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center p-3 rounded-lg bg-[var(--primary)]/5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Confirmation Bias:</span>
                          <span className="text-sm text-foreground/80 ml-1">Traders tend to seek information that confirms their existing positions while dismissing contradictory data</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 rounded-lg">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Anchoring:</span>
                          <span className="text-sm text-foreground/80 ml-1">Fixating on specific price points (like all-time highs) as reference points for decision-making</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 rounded-lg bg-[var(--primary)]/5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Sunk Cost Fallacy:</span>
                          <span className="text-sm text-foreground/80 ml-1">Continuing to hold losing positions because of prior investment rather than future prospects</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 rounded-lg">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Overconfidence Effect:</span>
                          <span className="text-sm text-foreground/80 ml-1">Attributing successful trades to skill while blaming losses on bad luck or external factors</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 rounded-lg bg-[var(--primary)]/5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Herding Behavior:</span>
                          <span className="text-sm text-foreground/80 ml-1">Following group investment trends despite personal research or risk tolerance</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Self-Assessment Question:</h4>
                      <p className="text-foreground/70 italic">
                        "Do I make trading decisions based on systematic analysis, or am I reacting to emotions and social cues?"
                      </p>
                    </div>
                  </div>
                  
                  {/* FOMO */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">FOMO (Fear of Missing Out)</h3>
                    <p className="mb-4">
                      FOMO represents one of the most powerful psychological forces in cryptocurrency markets:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Social Amplification:</span> Social media creates visibility of others' gains, triggering comparative thinking
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Missed Opportunity Aversion:</span> The pain of missing potential gains often feels more acute than the pain of actual losses
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Viral Investment Stories:</span> Narratives of overnight crypto millionaires create unrealistic expectations
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Artificial Urgency:</span> Marketing tactics that emphasize limited opportunities create pressure to make hasty decisions
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Status Anxiety:</span> Feeling left behind when peers discuss crypto investments can trigger investment decisions based on social pressure rather than research
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Warning Signs:</h4>
                      <p className="text-foreground/70">
                        Making investments without proper research, feeling anxious when not checking prices, or investing beyond your means due to trending assets.
                      </p>
                    </div>
                  </div>
                  
                  {/* Digital Addiction */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Digital Addiction</h3>
                    <p className="mb-4">
                      The cryptocurrency ecosystem contains multiple elements that can trigger addiction-like behaviors:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Variable Reward Systems:</span> Unpredictable price movements create dopamine-triggering patterns similar to gambling
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Endless Scrolling:</span> Crypto news, social media, and price charts create endless consumption patterns
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Push Notifications:</span> Real-time alerts constantly pull attention back to investments
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Gamification Elements:</span> Trading interfaces often incorporate game-like features that encourage continued engagement
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Community Reinforcement:</span> Online communities can normalize excessive trading behaviors
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Risk Factors:</h4>
                      <p className="text-foreground/70">
                        Previous tendencies toward addictive behaviors, using crypto trading as escape from negative emotions, or experiencing withdrawal symptoms when not trading.
                      </p>
                    </div>
                  </div>
                  
                  {/* Identity and Self-Worth */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Identity and Self-Worth</h3>
                    <p className="mb-4">
                      Many crypto participants begin to merge their financial performance with their sense of self:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Intellectual Validation:</span> Successful trades can be perceived as confirmation of intelligence
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Community Status:</span> Portfolio size or successful trades becoming a source of social standing
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Financial Identity Merger:</span> Self-worth becoming directly tied to portfolio performance
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Expertise Illusion:</span> The complex terminology of crypto creating false sense of specialized knowledge
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Future Self Projection:</span> Basing future life expectations and identity on projected crypto wealth
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Perspective Check:</h4>
                      <p className="text-foreground/70 italic">
                        "Would I still value myself if my crypto investments disappeared tomorrow?"
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Recognizing Warning Signs */}
              <section id="warning-signs" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Recognizing Warning Signs</h2>
                
                <div className="space-y-8">
                  {/* Sleep Disruption */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Sleep Disruption</h3>
                    <p className="mb-4">
                      The 24/7 nature of crypto markets makes sleep disruption a common early warning sign:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Nighttime Checking</h4>
                            <p className="text-sm text-foreground/70">Waking to check prices during normal sleep hours</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Sleep Onset Issues</h4>
                            <p className="text-sm text-foreground/70">Difficulty falling asleep due to market rumination</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Reduced Quality</h4>
                            <p className="text-sm text-foreground/70">Decreased deep sleep phases due to market-related stress</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Timezone Adjustments</h4>
                            <p className="text-sm text-foreground/70">Altering sleep schedules to monitor markets in different regions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Health Impact:</h4>
                      <p className="text-foreground/70">
                        Chronic sleep disruption is linked to compromised immune function, cognitive decline, emotional dysregulation, and increased cardiovascular risks.
                      </p>
                    </div>
                  </div>
                  
                  {/* Relationship Strain */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Relationship Strain</h3>
                    <p className="mb-4">
                      Cryptocurrency involvement can create significant relationship tensions:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Attention Division:</span> Mental preoccupation with markets during family time
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Financial Secrecy:</span> Hiding trading activities or losses from partners
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Risk Tolerance Conflicts:</span> Differences in comfort with volatility creating relationship friction
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Time Allocation Disputes:</span> Arguments about time spent researching or trading
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Lifestyle Impact Disagreements:</span> Conflicts about how potential crypto wealth would change lifestyle
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Communication Strategies:</h4>
                      <p className="text-foreground/70">
                        Schedule designated times to discuss crypto, establish joint risk boundaries, and create no-trading zones (like dinner time or weekends).
                      </p>
                    </div>
                  </div>
                  
                  {/* Anxiety Symptoms */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Anxiety Symptoms</h3>
                    <p className="mb-4">
                      Crypto-specific anxiety often manifests in recognizable patterns:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Physical Symptoms:</span> Chest tightness, rapid breathing, digestive issues during market volatility
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Catastrophic Thinking:</span> Mentally rehearsing worst-case financial scenarios
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Hypervigilance:</span> Inability to disengage from price alerts or news
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Emotional Reactivity:</span> Disproportionate emotional responses to minor price movements
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Concentration Issues:</span> Difficulty focusing on work or relationships due to market preoccupation
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Self-Care Approach:</h4>
                      <p className="text-foreground/70">
                        Deep breathing exercises during price checking, scheduled worry time, and progressive muscle relaxation during market volatility.
                      </p>
                    </div>
                  </div>

                  {/* Risk-Taking Behavior */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Risk-Taking Behavior</h3>
                    <p className="mb-4">
                      The line between investment and gambling can blur in cryptocurrency markets:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Position Scaling:</span> Progressively increasing position sizes to recover losses
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Leverage Creep:</span> Gradually increasing leverage ratios beyond initial risk tolerance
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Diversification Reduction:</span> Concentrating investments in fewer, higher-risk assets
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Deadline Trading:</span> Making impulsive trades near key dates (like option expirations)
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Rebounding Behavior:</span> Making immediate new investments after experiencing losses
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Risk Assessment Framework:</h4>
                      <p className="text-foreground/70">
                        Set firm position size limits as percentage of total portfolio, establish maximum leverage rules, and create mandatory cooling-off periods after losses.
                      </p>
                    </div>
                  </div>

                  {/* Financial Stress Indicators */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Financial Stress Indicators</h3>
                    <p className="mb-4">
                      Financial overextension creates distinct psychological and behavioral patterns:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Liquidity Constraints:</span> Using credit or essential expense money for crypto investments
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Delayed Financial Responsibilities:</span> Postponing bills or obligations to maintain positions
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Borrowed Investment:</span> Taking loans specifically for crypto trading
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Opportunity Cost Blindness:</span> Neglecting emergency funds or retirement savings for crypto exposure
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Lifestyle Degradation:</span> Reducing necessary expenses to fund crypto activities
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Financial Boundary Setting:</h4>
                      <p className="text-foreground/70">
                        Create separate accounts for trading with strict percentage limitations, automate essential financial obligations, and schedule regular portfolio-to-income ratio reviews.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Healthy Practices for Crypto Investors */}
              <section id="healthy-practices" className="mb-12 mt-12">
                <h2 className="text-2xl font-bold mb-6">Healthy Practices for Crypto Investors</h2>
                
                <div className="space-y-8">
                  {/* Setting Boundaries */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Setting Boundaries</h3>
                    <p className="mb-4">
                      Establishing clear boundaries provides structure and reduces crypto-related stress:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Time Boundaries</h4>
                            <p className="text-sm text-foreground/70">Designated trading hours with technology-enforced limits</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Financial Boundaries</h4>
                            <p className="text-sm text-foreground/70">Fixed percentages of income/assets allocated to crypto</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Information Boundaries</h4>
                            <p className="text-sm text-foreground/70">Curated, limited information sources rather than constant input</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Social Boundaries</h4>
                            <p className="text-sm text-foreground/70">Clear limits on crypto discussion in relationships and social settings</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Implementation Tool:</h4>
                      <p className="text-foreground/70">
                        Create a personal "Crypto Constitution" document outlining your boundaries and review it monthly.
                      </p>
                    </div>
                  </div>
                  
                  {/* Mindfulness Techniques */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Mindfulness Techniques</h3>
                    <p className="mb-4">
                      Mindfulness practices can reduce reactivity to market movements:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Price Checking Mindfulness:</span> Brief breathing exercise before checking portfolios
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Emotional Labeling:</span> Naming specific emotions triggered by market movements
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Body Scanning:</span> Identifying physical tension during trading decisions
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Urge Surfing:</span> Observing investment impulses without immediately acting
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Present-Moment Anchoring:</span> Using physical senses to break rumination cycles
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Practice Sequence:</h4>
                      <p className="text-foreground/70">
                        Before making any trade over a certain size, complete a 2-minute mindfulness exercise to ensure decisions aren't emotionally reactive.
                      </p>
                    </div>
                  </div>
                  
                  {/* The Competitive Advantage: Emotional Discipline */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">The Competitive Advantage: Emotional Discipline</h3>
                    <p className="mb-4">
                      While retail investors are driven by FOMO and fear, elite performers leverage psychological discipline as their edge:
                    </p>
                    
                    <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Institutional Advantage:</strong> Professional traders implement systematic emotional regulation that removes impulse from their process</li>
                        <li><strong>Asymmetric Information:</strong> The "smart money" isn't just better informed—it's better regulated emotionally</li>
                        <li><strong>Counter-Trend Discipline:</strong> Top performers buy during fear and sell during euphoria—the opposite of emotional traders</li>
                        <li><strong>Metacognitive Edge:</strong> Superior investors think about their thinking, creating compounding advantages</li>
                        <li><strong>Volatility Utilization:</strong> While amateurs are paralyzed by volatility, disciplined traders use it as their greatest opportunity</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Edge Development:</h4>
                      <p className="text-foreground/70 italic">
                        "The market transfers money from the emotional to the disciplined. By developing psychological systems, you position yourself on the profitable side of this transfer."
                      </p>
                    </div>
                  </div>
                  
                  {/* Professional Trading Psychology Framework */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Professional Trading Psychology Framework</h3>
                    <p className="mb-4">
                      Elite crypto performers implement structured psychological systems rather than trading by feel:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="relative border-l-2 border-[var(--primary)]/30 pl-6 space-y-8 ml-4">
                        <div className="relative">
                          <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                            1
                          </div>
                          <h4 className="font-medium text-lg mb-3">Pre-Trading Mental Preparation</h4>
                          <div className="space-y-2 text-foreground/80">
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Emotional Baseline Assessment:</span> 2-minute mindfulness check-in to identify current emotional state
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Bias Identification Protocol:</span> Systematic review of potential cognitive biases affecting today's outlook
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Market Condition Calibration:</span> Adjusting psychological approach based on current market environment
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Intention Setting:</span> Establishing process goals rather than outcome goals for the session
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Focus Trigger Routine:</span> Personalized ritual that signals the brain to enter performance state
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                            2
                          </div>
                          <h4 className="font-medium text-lg mb-3">Active Trading Psychology</h4>
                          <div className="space-y-2 text-foreground/80">
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Emotional Circuit Breakers:</span> Predefined rules that pause trading when emotional indicators exceed thresholds
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Decision Documentation Protocol:</span> Real-time logging of psychological factors influencing each trade
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Contrarian Emotional Leverage:</span> Using market sentiment as a counter-indicator
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Execution Separation Technique:</span> Breaking analysis, decision, and execution into distinct psychological phases
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Recovery Micro-Routines:</span> 30-90 second reset practices after witnessing large gains or losses
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                            3
                          </div>
                          <h4 className="font-medium text-lg mb-3">Post-Session Performance Review</h4>
                          <div className="space-y-2 text-foreground/80">
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Psychological P&L Analysis:</span> Separating results caused by strategy from those caused by psychological factors
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Emotional Pattern Recognition:</span> Identifying recurring psychological triggers across multiple sessions
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">Intervention Development:</span> Creating targeted protocols for specific psychological weaknesses
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">State-Performance Correlation:</span> Tracking connections between emotional states and decision quality
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium">System Refinement Loop:</span> Continuous improvement of psychological framework based on data
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Implementation Protocol:</h4>
                      <p className="text-foreground/70 italic">
                        "Start with one component from each phase. Master it completely before adding another. Psychological training, like position building, should be systematic and incremental."
                      </p>
                    </div>
                  </div>

                  {/* Market-Specific Psychological Applications */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Market-Specific Psychological Applications</h3>
                    <p className="mb-4">
                      Different market conditions require specialized psychological approaches:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="overflow-hidden rounded-xl border border-foreground/10">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3">
                          <h4 className="font-medium text-lg text-white">Bull Market Psychology</h4>
                        </div>
                        <div className="p-5 bg-green-50 dark:bg-green-900/10">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              <div>
                                <span className="font-medium">Greed Containment:</span> Systems to prevent overexposure as assets appreciate
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <span className="font-medium">Confirmation Bias Defense:</span> Practices to maintain critical analysis when everyone is positive
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <span className="font-medium">Reality Testing Routines:</span> Regular exercises to distinguish between sustainable growth and euphoric bubbles
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              <div>
                                <span className="font-medium">Lock-In Discipline:</span> Frameworks for actually taking profits despite continuous growth narratives
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              <div>
                                <span className="font-medium">FOMO Management:</span> Specific techniques for maintaining discipline when others are making fortunes
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="overflow-hidden rounded-xl border border-foreground/10">
                        <div className="bg-gradient-to-r from-red-500 to-rose-600 px-5 py-3">
                          <h4 className="font-medium text-lg text-white">Bear Market Psychology</h4>
                        </div>
                        <div className="p-5 bg-red-50 dark:bg-red-900/10">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              <div>
                                <span className="font-medium">Capitulation Protection:</span> Methods to prevent selling bottoms during maximum pain
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <div>
                                <span className="font-medium">Opportunity Recognition:</span> Mental frameworks for identifying value during negative sentiment
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <span className="font-medium">Time Horizon Extension:</span> Cognitive techniques for maintaining long-term perspective during drawdowns
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              <div>
                                <span className="font-medium">Conviction Maintenance:</span> Practices for managing doubt during extended price declines
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <span className="font-medium">Strategic Disengagement:</span> Scheduled breaks from market observation during prolonged downtrends
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="overflow-hidden rounded-xl border border-foreground/10">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3">
                          <h4 className="font-medium text-lg text-white">Transitional Market Psychology</h4>
                        </div>
                        <div className="p-5 bg-blue-50 dark:bg-blue-900/10">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <div>
                                <span className="font-medium">Narrative Shift Recognition:</span> Cognitive tools for identifying emerging market stories early
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <div>
                                <span className="font-medium">Adaptation Acceleration:</span> Processes for quickly adjusting mental models as conditions change
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <div>
                                <span className="font-medium">Flexibility Training:</span> Methods for loosening attachment to previous market beliefs
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <span className="font-medium">Uncertainty Comfort:</span> Practices for operating effectively during unclear directional periods
                              </div>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                              </svg>
                              <div>
                                <span className="font-medium">Contradiction Management:</span> Frameworks for holding opposing market scenarios simultaneously
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Strategic Application:</h4>
                      <p className="text-foreground/70 italic">
                        "Professional investors don't just have different information—they interpret the same information differently because of superior psychological frameworks. This is your greatest potential edge."
                      </p>
                    </div>
                  </div>

                  {/* Digital Detox Strategies */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Digital Detox Strategies</h3>
                    <p className="mb-4">
                      Periodic disconnection promotes perspective and reduces addiction risk:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-[var(--background-alt)] to-[var(--background)]">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="font-medium">Scheduled Detox Periods</h4>
                        </div>
                        <p className="text-sm text-foreground/70 ml-13">Planned daily, weekly, and monthly breaks from crypto content</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-to-br from-[var(--background-alt)] to-[var(--background)]">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <h4 className="font-medium">Device-Free Zones</h4>
                        </div>
                        <p className="text-sm text-foreground/70 ml-13">Designating specific locations as crypto-free (bedroom, dining table)</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-to-br from-[var(--background-alt)] to-[var(--background)]">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h4 className="font-medium">App Containment</h4>
                        </div>
                        <p className="text-sm text-foreground/70 ml-13">Using separate devices for trading or containing crypto apps in time-limited folders</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-to-br from-[var(--background-alt)] to-[var(--background)]">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </div>
                          <h4 className="font-medium">Notification Management</h4>
                        </div>
                        <p className="text-sm text-foreground/70 ml-13">Creating silent periods and filtering alert types</p>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Progressive Approach:</h4>
                      <p className="text-foreground/70">
                        Begin with 2-hour daily breaks, expand to one full day weekly, then implement a monthly weekend completely free from crypto content.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Special Considerations */}
              <section id="special-considerations" className="mb-12 mt-12">
                <h2 className="text-2xl font-bold mb-6">Special Considerations</h2>
                
                <div className="space-y-8">
                  {/* Recovering from Significant Losses */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Recovering from Significant Losses</h3>
                    <p className="mb-4">
                      Financial losses in crypto can trigger grief responses requiring specific coping strategies:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Loss Processing:</span> Acknowledging the full emotional impact of significant financial losses
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Cognitive Restructuring:</span> Identifying and challenging catastrophic interpretations
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Experience Integration:</span> Finding constructive lessons without excessive self-blame
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Identity Reconstruction:</span> Rebuilding self-concept separate from the financial loss
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Graduated Re-Engagement:</span> Carefully structured return to markets with appropriate safeguards
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Recovery Milestones:</h4>
                      <p className="text-foreground/70">
                        Ability to discuss the loss without intense emotion, extracting specific lessons, and developing a modified approach to future investing with appropriate risk controls.
                      </p>
                    </div>
                  </div>
                  
                  {/* Managing Success */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Managing Success</h3>
                    <p className="mb-4">
                      Sudden crypto wealth creates its own psychological challenges:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Impostor Syndrome:</span> Feelings of not deserving success or fears of being "found out"
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Social Relationship Changes:</span> Navigating changing dynamics with friends and family
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Decision Paralysis:</span> Overwhelming options creating difficulty in making life choices
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Hedonic Adaptation:</span> Diminishing emotional returns from material improvements
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Purpose Recalibration:</span> Finding meaningful direction when financial needs are suddenly met
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Wealth Integration:</h4>
                      <p className="text-foreground/70">
                        Work with financial professionals to create structured wealth plans, set aside "play money," and focus on aligning resources with core values rather than consumption.
                      </p>
                    </div>
                  </div>
                  
                  {/* Community Support */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                    <p className="mb-4">
                      Crypto communities can provide both support and toxicity:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Echo Chamber Risk</h4>
                            <p className="text-sm text-foreground/70">Communities reinforcing biases and suppressing contrary information</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Social Validation</h4>
                            <p className="text-sm text-foreground/70">Finding others who understand the unique stresses of crypto</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Tribal Mentality</h4>
                            <p className="text-sm text-foreground/70">Us-versus-them thinking between different crypto communities</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Knowledge Sharing</h4>
                            <p className="text-sm text-foreground/70">Access to diverse perspectives and risk management strategies</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Community Assessment:</h4>
                      <p className="text-foreground/70">
                        Evaluate whether communities encourage thoughtful analysis, respectful disagreement, proportional position sizing, and mental health awareness.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Building a Healthy Relationship with Crypto */}
              <section id="healthy-relationship" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Building a Healthy Relationship with Crypto</h2>
                
                <div className="space-y-8">
                  {/* Defining Personal Values */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Defining Personal Values</h3>
                    <p className="mb-4">
                      Value alignment creates psychological stability amid market volatility:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Values Clarification:</span> Identifying core personal values independent of financial outcomes
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Purpose-Driven Investing:</span> Connecting investment activity to meaningful life goals
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Ethical Boundaries:</span> Establishing personal guidelines for types of projects/tokens to support
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Impact Consideration:</span> Evaluating broader social and environmental effects of investments
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Legacy Thinking:</span> Considering how crypto activity aligns with desired long-term impact
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Values Exercise:</h4>
                      <p className="text-foreground/70">
                        Write your "crypto epitaph" – how would you want your relationship with cryptocurrency to be remembered and described by others?
                      </p>
                    </div>
                  </div>
                  
                  {/* Long-Term Thinking */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Long-Term Thinking</h3>
                    <p className="mb-4">
                      Extending time horizons reduces psychological reactivity:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Historical Contextualization:</span> Studying previous market cycles to normalize volatility
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Compounding Appreciation:</span> Understanding the mathematical power of patient investing
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Narrative Resistance:</span> Developing immunity to "get-rich-quick" framing
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Technology Adoption Curves:</span> Viewing crypto through the lens of historical technology adoption
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Future Self Consideration:</span> Making decisions your future self will thank you for
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Temporal Expansion:</h4>
                      <p className="text-foreground/70">
                        Before reactive trading, ask, "How will I feel about this decision one month, one year, and five years from now?"
                      </p>
                    </div>
                  </div>
                  
                  {/* Reality Checks */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Reality Checks</h3>
                    <p className="mb-4">
                      Maintaining perspective requires deliberate reality-testing:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Probabilistic Thinking:</span> Assessing realistic probability ranges for different outcomes
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Scenario Analysis:</span> Regularly considering bear, base, and bull case scenarios
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Circle of Competence:</span> Honest assessment of your knowledge boundaries
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Historical Pattern Recognition:</span> Comparing current narratives to previous market cycles
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Outside View:</span> Considering how you would evaluate the situation if it weren't your money
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Reality Check Practice:</h4>
                      <p className="text-foreground/70">
                        For each major investment, write down specific conditions that would prove your investment thesis wrong, and review these regularly.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* When to Seek Additional Support */}
              <section id="additional-support" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">When to Seek Additional Support</h2>
                
                <div className="space-y-8">
                  {/* Professional Financial Advice */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Professional Financial Advice</h3>
                    <p className="mb-4">
                      Certain situations warrant professional financial guidance:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Windfall Management</h4>
                            <p className="text-sm text-foreground/70">Suddenly acquiring significant crypto wealth</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Tax Complexity</h4>
                            <p className="text-sm text-foreground/70">Navigating tax implications of crypto trading or mining</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Estate Planning</h4>
                            <p className="text-sm text-foreground/70">Incorporating crypto assets into inheritance planning</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Risk Reassessment</h4>
                            <p className="text-sm text-foreground/70">Evaluating portfolio allocation when crypto becomes substantial</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Advisor Selection:</h4>
                      <p className="text-foreground/70">
                        Look for financial professionals with specific cryptocurrency knowledge and fiduciary responsibility to clients.
                      </p>
                    </div>
                  </div>
                  
                  {/* Therapy Options */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Therapy Options</h3>
                    <p className="mb-4">
                      Different therapeutic approaches address various crypto-related psychological issues:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Cognitive Behavioral Therapy:</span> Addressing distorted thinking patterns about markets
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Acceptance and Commitment Therapy:</span> Developing psychological flexibility around volatility
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Mindfulness-Based Stress Reduction:</span> Building capacity for non-reactive awareness
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Financial Therapy:</span> Exploring unconscious patterns and beliefs about money
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Addiction-Focused Approaches:</span> For compulsive trading patterns resembling gambling disorders
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Therapeutic Goals:</h4>
                      <p className="text-foreground/70">
                        Reduced emotional reactivity to market movements, decreased checking behaviors, improved sleep, and more balanced attention distribution.
                      </p>
                    </div>
                  </div>
                  
                  {/* How TherapyKin Can Help */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">How TherapyKin Can Help</h3>
                    <p className="mb-4">
                      TherapyKin offers specialized support for crypto-related stress:
                    </p>
                    
                    <div className="card p-6 bg-[var(--primary)]/5 rounded-xl mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Emotion Regulation</h4>
                            <p className="text-sm text-foreground/70">Tools for managing intense feelings during market volatility</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Cognitive Restructuring</h4>
                            <p className="text-sm text-foreground/70">Identifying and transforming unhelpful thought patterns</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Boundary Setting</h4>
                            <p className="text-sm text-foreground/70">Creating healthy limits around trading and checking behaviors</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Values Clarification</h4>
                            <p className="text-sm text-foreground/70">Aligning crypto participation with meaningful life goals</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">TherapyKin Integration:</h4>
                      <p className="text-foreground/70">
                        Set up regular check-ins during high market volatility, create custom protocols for market stress, and develop personalized grounding techniques.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Performance Enhancement Tools */}
              <section id="performance-tools" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Performance Enhancement Tools</h2>
                
                <div className="space-y-8">
                  {/* Visual Performance Dashboards */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Visual Performance Dashboards</h3>
                    
                    <div className="grid grid-cols-1 gap-8 mb-6">
                      {/* Emotional Impact on Returns Chart */}
                      <div className="card p-5 border border-foreground/10">
                        <h4 className="font-medium mb-3">Emotional Impact on Returns Chart</h4>
                        <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg bg-white dark:bg-gray-800 p-4" style={{ height: "300px" }}>
                          <svg width="100%" height="100%" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                            {/* Chart background and grid */}
                            <rect x="50" y="50" width="700" height="300" fill="none" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="1" />
                            
                            {/* Grid lines */}
                            <g stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="1">
                              <line x1="50" y1="100" x2="750" y2="100" />
                              <line x1="50" y1="150" x2="750" y2="150" />
                              <line x1="50" y1="200" x2="750" y2="200" />
                              <line x1="50" y1="250" x2="750" y2="250" />
                              <line x1="50" y1="300" x2="750" y2="300" />
                              <line x1="190" y1="50" x2="190" y2="350" />
                              <line x1="330" y1="50" x2="330" y2="350" />
                              <line x1="470" y1="50" x2="470" y2="350" />
                              <line x1="610" y1="50" x2="610" y2="350" />
                            </g>
                            
                            {/* X and Y axis */}
                            <line x1="50" y1="350" x2="750" y2="350" stroke="var(--foreground)" strokeWidth="2" />
                            <line x1="50" y1="50" x2="50" y2="350" stroke="var(--foreground)" strokeWidth="2" />
                            
                            {/* X-axis labels */}
                            <text x="50" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">1</text>
                            <text x="190" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">2</text>
                            <text x="330" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">3</text>
                            <text x="470" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">4</text>
                            <text x="610" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">5</text>
                            <text x="750" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">6</text>
                            
                            {/* Y-axis labels */}
                            <text x="35" y="350" textAnchor="end" fill="var(--foreground)" fontSize="14">0%</text>
                            <text x="35" y="300" textAnchor="end" fill="var(--foreground)" fontSize="14">5%</text>
                            <text x="35" y="250" textAnchor="end" fill="var(--foreground)" fontSize="14">10%</text>
                            <text x="35" y="200" textAnchor="end" fill="var(--foreground)" fontSize="14">15%</text>
                            <text x="35" y="150" textAnchor="end" fill="var(--foreground)" fontSize="14">20%</text>
                            <text x="35" y="100" textAnchor="end" fill="var(--foreground)" fontSize="14">25%</text>
                            <text x="35" y="50" textAnchor="end" fill="var(--foreground)" fontSize="14">30%</text>
                            
                            {/* Axis titles - moved X-axis title down to ensure visibility */}
                            <text x="400" y="430" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontWeight="bold">Emotional Reactivity Score (Lower is Better)</text>
                            <text x="15" y="200" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontWeight="bold" transform="rotate(-90, 15, 200)">Investment Returns</text>
                            
                            {/* Data points */}
                            <circle cx="120" cy="80" r="6" fill="var(--primary)" />
                            <circle cx="190" cy="120" r="6" fill="var(--primary)" />
                            <circle cx="260" cy="150" r="6" fill="var(--primary)" />
                            <circle cx="330" cy="180" r="6" fill="var(--primary)" />
                            <circle cx="400" cy="210" r="6" fill="var(--primary)" />
                            <circle cx="470" cy="240" r="6" fill="var(--primary)" />
                            <circle cx="540" cy="270" r="6" fill="var(--primary)" />
                            <circle cx="610" cy="300" r="6" fill="var(--primary)" />
                            <circle cx="680" cy="320" r="6" fill="var(--primary)" />
                            
                            {/* Trend line */}
                            <path d="M120,80 L190,120 L260,150 L330,180 L400,210 L470,240 L540,270 L610,300 L680,320" 
                                  stroke="var(--primary)" 
                                  strokeWidth="3" 
                                  fill="none" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" />
                            
                            {/* Confidence interval */}
                            <path d="M120,100 L190,140 L260,170 L330,200 L400,230 L470,260 L540,290 L610,320 L680,340 
                                    L680,300 L610,280 L540,250 L470,220 L400,190 L330,160 L260,130 L190,100 L120,60 Z" 
                                  fill="var(--primary)" 
                                  fillOpacity="0.1" 
                                  stroke="none" />
                          </svg>
                        </div>
                        <p className="text-sm text-foreground/70">
                          This visualization shows the correlation between emotional reactivity and investment returns. Traders with lower emotional reactivity scores consistently achieve better risk-adjusted returns, demonstrating how psychological discipline creates a measurable performance edge.
                        </p>
                      </div>
                      
                      {/* Market Cycle Psychology Map */}
                      <div className="card p-5 border border-foreground/10">
                        <h4 className="font-medium mb-3">Market Cycle Psychology Map</h4>
                        <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg bg-white dark:bg-gray-800 p-4" style={{ height: "400px" }}>
                          <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
                            {/* Chart background */}
                            <rect x="50" y="50" width="700" height="400" fill="none" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="1" />
                            
                            {/* Market cycle curve - improved with smoother curve */}
                            <path d="M50,250 C150,100 250,100 350,250 C450,400 550,400 650,250 C700,180 750,250 750,250" 
                                  stroke="var(--foreground)" 
                                  strokeWidth="3" 
                                  fill="none" 
                                  strokeLinecap="round" />
                            
                            {/* Phase labels - repositioned for better visibility */}
                            <text x="100" y="290" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontWeight="bold">Accumulation</text>
                            <text x="250" y="140" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontWeight="bold">Mark-Up</text>
                            <text x="400" y="290" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontWeight="bold">Distribution</text>
                            <text x="550" y="140" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontWeight="bold">Mark-Down</text>
                            <text x="700" y="290" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontWeight="bold">Capitulation</text>
                            
                            {/* Market phases background - adding visual enhancement */}
                            <path d="M50,250 C150,100 250,100 350,250" 
                                  stroke="#10b981" 
                                  strokeWidth="5" 
                                  fill="none" 
                                  strokeLinecap="round"
                                  strokeOpacity="0.6" />
                            
                            <path d="M350,250 C450,400 550,400 650,250" 
                                  stroke="#f59e0b" 
                                  strokeWidth="5" 
                                  fill="none" 
                                  strokeLinecap="round"
                                  strokeOpacity="0.6" />
                            
                            <path d="M650,250 C700,180 750,250 750,250" 
                                  stroke="#ef4444" 
                                  strokeWidth="5" 
                                  fill="none" 
                                  strokeLinecap="round"
                                  strokeOpacity="0.6" />
                            
                            {/* Emotional states - repositioned and styled better */}
                            <g>
                              {/* Accumulation phase emotions */}
                              <rect x="70" y="320" width="70" height="30" rx="5" fill="#4338ca" fillOpacity="0.2" stroke="#4338ca" strokeWidth="1" />
                              <text x="105" y="340" textAnchor="middle" fill="var(--foreground)" fontSize="14">Disbelief</text>
                              
                              <rect x="70" y="360" width="70" height="30" rx="5" fill="#4338ca" fillOpacity="0.2" stroke="#4338ca" strokeWidth="1" />
                              <text x="105" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">Hope</text>
                              
                              {/* Mark-up phase emotions */}
                              <rect x="220" y="90" width="70" height="30" rx="5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
                              <text x="255" y="110" textAnchor="middle" fill="var(--foreground)" fontSize="14">Optimism</text>
                              
                              <rect x="220" y="50" width="70" height="30" rx="5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
                              <text x="255" y="70" textAnchor="middle" fill="var(--foreground)" fontSize="14">Excitement</text>
                              
                              {/* Distribution phase emotions */}
                              <rect x="370" y="320" width="70" height="30" rx="5" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
                              <text x="405" y="340" textAnchor="middle" fill="var(--foreground)" fontSize="14">Thrill</text>
                              
                              <rect x="370" y="360" width="70" height="30" rx="5" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
                              <text x="405" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">Euphoria</text>
                              
                              {/* Mark-down phase emotions */}
                              <rect x="520" y="90" width="70" height="30" rx="5" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
                              <text x="555" y="110" textAnchor="middle" fill="var(--foreground)" fontSize="14">Anxiety</text>
                              
                              <rect x="520" y="50" width="70" height="30" rx="5" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
                              <text x="555" y="70" textAnchor="middle" fill="var(--foreground)" fontSize="14">Denial</text>
                              
                              {/* Capitulation phase emotions */}
                              <rect x="670" y="320" width="70" height="30" rx="5" fill="#6b7280" fillOpacity="0.2" stroke="#6b7280" strokeWidth="1" />
                              <text x="705" y="340" textAnchor="middle" fill="var(--foreground)" fontSize="14">Fear</text>
                              
                              <rect x="670" y="360" width="70" height="30" rx="5" fill="#6b7280" fillOpacity="0.2" stroke="#6b7280" strokeWidth="1" />
                              <text x="705" y="380" textAnchor="middle" fill="var(--foreground)" fontSize="14">Despair</text>
                            </g>
                            
                            {/* Cognitive biases - improved layout */}
                            <g>
                              <rect x="70" y="400" width="110" height="30" rx="5" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1" />
                              <text x="125" y="420" textAnchor="middle" fill="var(--foreground)" fontSize="13">Anchoring Bias</text>
                              
                              <rect x="220" y="10" width="110" height="30" rx="5" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1" />
                              <text x="275" y="30" textAnchor="middle" fill="var(--foreground)" fontSize="13">Confirmation Bias</text>
                              
                              <rect x="370" y="400" width="110" height="30" rx="5" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1" />
                              <text x="425" y="420" textAnchor="middle" fill="var(--foreground)" fontSize="13">Overconfidence</text>
                              
                              <rect x="520" y="10" width="110" height="30" rx="5" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1" />
                              <text x="575" y="30" textAnchor="middle" fill="var(--foreground)" fontSize="13">Sunk Cost Fallacy</text>
                              
                              <rect x="670" y="400" width="110" height="30" rx="5" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1" />
                              <text x="725" y="420" textAnchor="middle" fill="var(--foreground)" fontSize="13">Recency Bias</text>
                            </g>
                            
                            {/* Optimal entry/exit zones - enhanced with better visibility */}
                            <path d="M50,250 C100,210 150,180 200,200" 
                                  stroke="#10b981" 
                                  strokeWidth="4" 
                                  fill="none" 
                                  strokeDasharray="6,3" />
                            <text x="125" y="180" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">Optimal Entry</text>
                            
                            <path d="M450,280 C500,310 550,310 600,280" 
                                  stroke="#ef4444" 
                                  strokeWidth="4" 
                                  fill="none" 
                                  strokeDasharray="6,3" />
                            <text x="525" y="330" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">Optimal Exit</text>
                            
                            {/* Adding volume indicator at bottom for more context */}
                            <g>
                              <text x="400" y="470" textAnchor="middle" fill="var(--foreground)" fontSize="14" fontWeight="bold">Trading Volume</text>
                              
                              <rect x="100" y="440" width="40" height="15" fill="#4338ca" fillOpacity="0.3" />
                              <rect x="250" y="440" width="60" height="25" fill="#10b981" fillOpacity="0.3" />
                              <rect x="400" y="440" width="80" height="30" fill="#f59e0b" fillOpacity="0.3" />
                              <rect x="550" y="440" width="60" height="25" fill="#ef4444" fillOpacity="0.3" />
                              <rect x="700" y="440" width="40" height="15" fill="#6b7280" fillOpacity="0.3" />
                            </g>
                          </svg>
                        </div>
                        <p className="text-sm text-foreground/70">
                          This infographic maps the typical market cycle with overlaid psychological patterns, showing emotional states and cognitive biases at each phase. Understanding where you are in this cycle helps identify when emotions might be clouding judgment and provides a framework for counter-cyclical decision making. The volume indicator at the bottom shows how trading activity typically peaks during distribution phases.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Decision Enhancement Tools */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Interactive Decision Enhancement Tools</h3>
                    <p className="mb-4">
                      These tools help improve decision quality by addressing psychological factors:
                    </p>
                    
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all mb-6">
                      <ul className="list-disc pl-5 space-y-4 text-foreground/80">
                        <li>
                          <span className="font-medium text-foreground">Psychological Pre-Trade Checklist:</span> 
                          <p className="mt-1">Complete a real-time emotional baseline assessment and receive immediate feedback on your current psychological trading readiness.</p>
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Bias Detection System:</span>
                          <p className="mt-1">Guide yourself through a series of questions to identify active cognitive biases and get customized debiasing techniques.</p>
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Trade Post-Mortem Analyzer:</span>
                          <p className="mt-1">Separate technical/analytical factors from psychological factors and calculate the "psychological P&L" distinct from the financial P&L.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Self-Assessment Quizzes */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Self-Assessment Quizzes</h3>
                    <p className="mb-4">
                      Regular self-checks help identify emerging patterns:
                    </p>
                    
                    <div className="card p-6 bg-[var(--background-alt)] rounded-xl mb-6">
                      <h4 className="font-medium text-lg mb-4">Crypto-Emotional Check-Up</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="mb-2">How often do you check crypto prices?</p>
                          <div className="flex space-x-2">
                            <span className="text-xs text-foreground/60">Few times weekly</span>
                            <div className="flex-grow flex space-x-1">
                              <button className="w-full h-2 rounded-full bg-[var(--primary)]"></button>
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                            </div>
                            <span className="text-xs text-foreground/60">Multiple times hourly</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="mb-2">How would you rate your anxiety when unable to check prices?</p>
                          <div className="flex space-x-2">
                            <span className="text-xs text-foreground/60">None</span>
                            <div className="flex-grow flex space-x-1">
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                              <button className="w-full h-2 rounded-full bg-[var(--primary)]"></button>
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                              <button className="w-full h-2 rounded-full bg-foreground/20"></button>
                            </div>
                            <span className="text-xs text-foreground/60">Severe</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-sm text-foreground/70">
                        <p><strong>Scoring:</strong> 5-10: Healthy relationship; 11-15: Developing concerns; 16-20: Moderate risk; 21-25: High risk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Conclusion</h2>
                
                <p className="mb-4">
                  The relationship between cryptocurrency participation and mental health represents a complex intersection of technology, finance, and psychology. By approaching this space with self-awareness, appropriate boundaries, and intentional practices, it's possible to engage with digital assets while maintaining psychological wellbeing.
                </p>
                
                <p className="mb-4">
                  Remember that your value as a person is never defined by your portfolio performance. By developing a healthy, balanced approach to cryptocurrency, you can potentially benefit from this emerging asset class while preserving your mental health and overall quality of life.
                </p>
                
                <p className="mb-8">
                  TherapyKin is here to support you throughout your journey, providing tools, insights, and personalized guidance whenever market volatility creates challenges. Reach out anytime through the app for immediate support during difficult market movements.
                </p>
                
                <div className="p-6 border border-foreground/10 rounded-lg text-sm text-foreground/70 italic">
                  <p>
                    This resource was developed by TherapyKin in consultation with financial psychologists, cryptocurrency experts, and mental health professionals. While we strive to provide accurate and helpful information, this guide does not constitute financial advice. Always consult with qualified financial professionals for investment decisions.
                  </p>
                </div>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="The Investor's Edge: Cryptocurrency Trading Psychology" 
                  url={currentUrl}
                />
              </div>
              
              {/* Feedback */}
              <div className="card p-6 bg-[var(--background-alt)] mb-12">
                <h3 className="text-lg font-semibold mb-3">Was this resource helpful?</h3>
                <p className="mb-4 text-foreground/70">
                  We're constantly working to improve our resources. Your feedback helps us make them more useful.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium transition-all">
                    Very Helpful
                  </button>
                  <button className="px-4 py-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium transition-all">
                    Somewhat Helpful
                  </button>
                  <button className="px-4 py-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium transition-all">
                    Not Helpful
                  </button>
                </div>
              </div>
              
              {/* CTA */}
              <div className="card p-8 shadow-depth text-center">
                <h2 className="text-2xl font-bold mb-4">Need Personalized Support?</h2>
                <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                  TherapyKin provides personalized, AI-powered therapeutic support that adapts to your needs and is available whenever you need it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/chat?specialist=crypto" 
                    className="btn-primary px-8 py-3"
                  >
                    Get 3 Free Sessions
                  </Link>
                  <Link 
                    href="/learn-more" 
                    className="btn-secondary px-8 py-3"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Table of Contents */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">In This Guide</h3>
                <nav className="space-y-2">
                  <a href="#introduction" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    The Psychological Advantage
                  </a>
                  <a href="#psychological-impact" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Understanding the Psychological Impact
                  </a>
                  <a href="#warning-signs" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Recognizing Warning Signs
                  </a>
                  <a href="#healthy-practices" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Healthy Practices for Crypto Investors
                  </a>
                  <a href="#special-considerations" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Special Considerations
                  </a>
                  <a href="#healthy-relationship" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Building a Healthy Relationship with Crypto
                  </a>
                  <a href="#additional-support" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    When to Seek Additional Support
                  </a>
                  <a href="#performance-tools" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Performance Enhancement Tools
                  </a>
                  <a href="#conclusion" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Conclusion
                  </a>
                </nav>
              </div>
              
              {/* Related Resources */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Stress Management Techniques</h4>
                      <p className="text-sm text-foreground/70 mb-2">Practical strategies to manage stress during market volatility</p>
                      <Link href="/resources/stress-management" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Digital Wellbeing Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">Creating healthy boundaries with technology and digital content</p>
                      <Link href="/resources/digital-wellbeing" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Download PDF */}
              <div className="card p-6 mb-6 bg-[var(--primary)]/5">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold">Download This Guide</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Get a PDF version of this guide to read offline or share with others.
                </p>
                <PDFDownloadButton
                  title="The Investor's Edge: Cryptocurrency Trading Psychology"
                  subtitle="TherapyKin Resource Library"
                  filename="TherapyKin-Crypto-Trading-Psychology.pdf"
                  contentId="crypto-psychology-content"
                  className="w-full btn-primary text-sm py-2"
                />
              </div>
              
              {/* Need Help? */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Need Support Now?</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  If you're experiencing severe anxiety or distress related to financial markets, please reach out for immediate support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">Financial Distress Helpline:</span>
                  </div>
                  <p className="pl-7">1-800-273-8255</p>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="font-medium">Crisis Text Line:</span>
                  </div>
                  <p className="pl-7">Text HOME to 741741</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
