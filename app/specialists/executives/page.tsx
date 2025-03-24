'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonial from "../../components/Testimonial";
import Link from "next/link";
import Head from "next/head";

export default function ExecutiveSpecialist() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Executive Mental Health Specialist | TherapyKin</title>
        <meta name="description" content="Specialized mental health support for executives and leaders. Time-optimized therapy that integrates with your demanding schedule and addresses leadership-specific challenges." />
        <meta name="keywords" content="executive therapy, leadership mental health, executive wellbeing, leadership resilience, executive coaching, leadership psychology" />
        <meta property="og:title" content="Executive Mental Health Specialist | TherapyKin" />
        <meta property="og:description" content="Specialized mental health support for executives and leaders. Time-optimized therapy that integrates with your demanding schedule." />
        <meta property="og:image" content="/specialists/executive-specialist.jpg" />
      </Head>
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
                      Executive Specialist
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="mb-12">
            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
              Premium Specialist
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">TherapyKin Executives</h1>
            
            <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-6 rounded-lg border-l-4 border-[var(--primary)] mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">A Specialized Therapeutic Companion for High-Performing Leaders</h2>
              <p className="text-lg text-foreground/80">
                Personalized mental health support specifically designed for the unique challenges of executive leadership, delivering high-impact therapeutic value that integrates with your demanding schedule.
              </p>
            </div>
            
            <p className="text-xl text-foreground/70 mb-4">
              TherapyKin Executives bridges the gap between leadership excellence and personal wellbeing, providing confidential support tailored to the specific demands of high-stakes leadership roles.
            </p>
  
            {/* Add the CTA button here */}
            <div className="mt-6 mb-8">
              <Link 
                href="/chat?specialist=executives" 
                className="btn-primary text-white px-6 py-3 rounded-md font-medium inline-block text-lg"
              >
                Start Executive Session Now
              </Link>
              <span className="ml-4 text-sm text-foreground/60">No commitment required</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mt-8 mb-16">
            <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] shadow-sm">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="font-medium">Time-Optimized</h3>
              </div>
              <p className="text-foreground/70 text-sm">
                Delivers high-impact therapeutic value in as little as 5 minutes, respecting the constraints of executive schedules
              </p>
            </div>
            
            <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] shadow-sm">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <h3 className="font-medium">Leadership-Integrated</h3>
              </div>
              <p className="text-foreground/70 text-sm">
                Connects personal wellbeing with leadership effectiveness, speaking the language of executive leadership
              </p>
            </div>
            
            <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] shadow-sm">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <h3 className="font-medium">Confidential</h3>
              </div>
              <p className="text-foreground/70 text-sm">
                Provides a secure space to process sensitive leadership challenges with complete privacy
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Executive-Specific Challenges Addressed</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Performance pressure and decision fatigue</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Leadership isolation and stakeholder management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Work-life integration for sustainable leadership</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Crisis navigation and organizational change</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Leadership identity and transition management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Strategic clarity amid competing priorities</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Why TherapyKin Executives?</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Speaks the language of leadership</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Respects the constraints of executive schedules</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Understands the unique pressures of high-stakes positions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Integrates personal wellbeing with leadership effectiveness</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Provides a confidential space for authentic leadership exploration</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Specialized Executive Modes</h2>
            <p className="text-center text-foreground/80 mb-10 max-w-3xl mx-auto">
              TherapyKin Executives offers specialized interaction modes designed to address the specific needs of leadership roles.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Decision Support Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Decision Support Mode</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Integrates psychological insight with decision-making frameworks to address both cognitive and emotional dimensions of leadership choices.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Identifies decision biases and values alignment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Supports processing the aftermath of difficult decisions</span>
                  </li>
                </ul>
              </div>
              
              {/* Time-Optimized Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Time-Optimized Mode</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Delivers meaningful support in 5-15 minute windows with "micro-practices" implementable in 30-60 seconds.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Focuses on high-impact, targeted interventions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Maintains therapeutic depth despite time constraints</span>
                  </li>
                </ul>
              </div>
              
              {/* Leadership Resilience Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Leadership Resilience Mode</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Builds psychological capacity to maintain wellbeing under pressure with specific resilience skills for leadership challenges.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Addresses leadership setbacks and disappointments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Creates sustainable practices for ongoing leadership demands</span>
                  </li>
                </ul>
              </div>
              
              {/* Strategic Reflection Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Strategic Reflection Mode</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Creates space to examine leadership patterns and impact, connecting actions with personal values and purpose.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Facilitates meaningful insights across leadership situations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Bridges reflection with practical leadership application</span>
                  </li>
                </ul>
              </div>
              
              {/* Executive Transition Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Executive Transition Mode</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Supports navigation of role changes and career evolution, addressing identity shifts in leadership progression.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Facilitates adaptation to new leadership contexts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Helps process leadership legacy and succession</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--background-alt)] p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-4">Implementation Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[var(--primary)]/10 p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                      <span className="text-[var(--primary)] font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Initial Assessment</h3>
                      <p className="text-foreground/70 text-sm">Understanding your specific leadership context and challenges</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[var(--primary)]/10 p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                      <span className="text-[var(--primary)] font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Personalized Configuration</h3>
                      <p className="text-foreground/70 text-sm">Adapting to your communication preferences and leadership style</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[var(--primary)]/10 p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                      <span className="text-[var(--primary)] font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Continuous Learning</h3>
                      <p className="text-foreground/70 text-sm">Building a comprehensive understanding of your leadership journey</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[var(--primary)]/10 p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                      <span className="text-[var(--primary)] font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Seamless Integration</h3>
                      <p className="text-foreground/70 text-sm">Fitting into your existing workflow with minimal disruption</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[var(--primary)]/10 p-2 rounded-full mr-3 flex-shrink-0 mt-1">
                      <span className="text-[var(--primary)] font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Ongoing Adaptation</h3>
                      <p className="text-foreground/70 text-sm">Evolving alongside your leadership development</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">What Executives Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial 
                quote="TherapyKin Executives has been transformative for my leadership. The time-optimized sessions fit perfectly into my schedule, and the strategic reflection mode has helped me make better decisions during our company's expansion."
                author="Sarah J."
                title="CEO, Tech Startup"
              />
              
              <Testimonial 
                quote="As a C-suite executive, I needed support that understood the unique pressures of my position. TherapyKin Executives speaks my language and has helped me navigate leadership isolation while maintaining my wellbeing."
                author="Michael T."
                title="CFO, Fortune 500 Company"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary)]/5 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-4">Leadership Wellbeing Is Strategic</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <p className="mb-4 text-foreground/80">
                  In today's complex business environment, executive wellbeing is not just a personal matter—it's a strategic advantage. TherapyKin Executives helps you maintain peak performance while sustaining your mental health through leadership challenges.
                </p>
                <p className="text-foreground/80">
                  Our approach recognizes that leadership effectiveness and personal wellbeing are deeply interconnected. By supporting both dimensions simultaneously, we help you lead with greater clarity, resilience, and impact.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-full h-40 w-40 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <p className="text-[var(--primary)] font-bold text-xl">Executive</p>
                    <p className="text-3xl font-bold">Support</p>
                    <p className="text-sm text-foreground/60 mt-1">Leadership-focused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Related Resources</h2>
            <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Leadership Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-20 h-20 rounded-md bg-[var(--primary)]/10 flex-shrink-0 overflow-hidden mr-4">
                    <img 
                      src="/blog/leadership-resilience-gap.jpg" 
                      alt="Leadership Resilience Gap" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">The Leadership Resilience Gap</h4>
                    <p className="text-sm text-foreground/70 mb-2">Why traditional executive support falls short in addressing the psychological needs of leaders.</p>
                    <Link href="/blog/leadership-resilience-gap" className="text-[var(--primary)] text-sm font-medium hover:underline">
                      Read Article →
                    </Link>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-20 h-20 rounded-md bg-[var(--primary)]/10 flex-shrink-0 overflow-hidden mr-4">
                    <img 
                      src="/blog/ai-therapy-busy-leaders.jpg" 
                      alt="AI Therapy for Busy Leaders" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Between Meetings and Deadlines</h4>
                    <p className="text-sm text-foreground/70 mb-2">How AI-powered therapy is filling the mental health gap for leaders with unpredictable schedules.</p>
                    <Link href="/blog/ai-therapy-busy-leaders" className="text-[var(--primary)] text-sm font-medium hover:underline">
                      Read Article →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-[var(--background-alt)] p-10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to Enhance Your Leadership Journey?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
              Experience the difference of mental health support specifically designed for executive leadership. TherapyKin Executives integrates seamlessly with your schedule while providing the depth of support you need.
            </p>
            <Link 
              href="/chat?specialist=executives" 
              className="btn-primary text-white px-8 py-4 rounded-md font-medium inline-block text-lg"
            >
              Start Your Executive Support Journey
            </Link>
            <p className="text-sm text-foreground/60 mt-4">Confidential, time-optimized, and tailored to your leadership context.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
