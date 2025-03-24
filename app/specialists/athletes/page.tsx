'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonial from "../../components/Testimonial";
import Link from "next/link";

export default function AthleteSpecialist() {
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
                      Athletes Specialist
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="mb-12">
            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
              Performance Specialist
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Mental Performance Companion for Elite Athletes</h1>
            
            <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-6 rounded-lg border-l-4 border-[var(--primary)] mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">The Mental Edge: Where Champions Are Made</h2>
              <p className="text-lg text-foreground/80">
                Elite athletes face unique psychological demands that traditional mental health support often fails to address. TherapyKin Athletes bridges the gap between sport psychology and mental wellbeing, providing specialized support that adapts to your training cycles, competition schedules, and career stages.
              </p>
            </div>
            
            <p className="text-xl text-foreground/70 mb-4">
              While physical training is meticulously planned, mental skills are often undertrained. TherapyKin Athletes delivers consistent, accessible mental performance support whenever and wherever you need it.
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
                  Lack understanding of sport-specific demands, competitive mindset, and the unique pressures of athletic performance
                </p>
              </div>
              
              <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-foreground/5">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <h3 className="font-medium">Sports Coaches</h3>
                </div>
                <p className="text-foreground/70 text-sm">
                  Focus primarily on physical training and technique, with limited expertise in psychological aspects of performance
                </p>
              </div>
              
              <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] border-2 shadow-md">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <h3 className="font-medium">TherapyKin Athletes Specialists</h3>
                </div>
                <p className="text-foreground/70 text-sm">
                  Combine sport psychology expertise with mental health support, available 24/7 throughout your athletic journey
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Core Capabilities</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Evidence-based sport psychology techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Personalized mental skills development</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Competition preparation and performance enhancement</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Recovery and rehabilitation support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Team dynamics and relationship navigation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Identity development beyond sport</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">When to Choose an Athletes Specialist</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're preparing for important competitions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're experiencing performance anxiety or mental blocks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're recovering from injury or setbacks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're navigating team dynamics or coach relationships</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>You're transitioning between career stages or teams</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Adaptive Framework: Personalized to Your Athletic Journey</h2>
            <p className="text-center text-foreground/80 mb-10 max-w-3xl mx-auto">
              TherapyKin Athletes adapts to your specific needs based on your training cycle, performance intensity, career stage, and sport-specific demands.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Training-Competition Cycle Adaptation */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Training-Competition Cycle</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Support that adjusts based on your current phase: off-season, pre-season, in-season, competition, and post-competition periods.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Off-season skill development and reflection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Pre-competition mental preparation strategies</span>
                  </li>
                </ul>
              </div>
              
              {/* Performance Intensity Adaptation */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Performance Intensity</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Tailored support that ranges from recovery periods to peak performance moments, adjusting to your current intensity needs.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>High-intensity focus and concentration techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Recovery-focused mindfulness and relaxation</span>
                  </li>
                </ul>
              </div>
              
              {/* Career Stage Adaptation */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Career Stage</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Customized guidance for early, mid, late-career, and transition phases, addressing the unique challenges of each stage.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Early career confidence and identity building</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Late career transition planning and preparation</span>
                  </li>
                </ul>
              </div>
              
              {/* Sport-Specific Adaptation */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Sport-Specific</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Recognizes and addresses the unique mental demands across different sports, from team dynamics to individual performance.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Team sport cohesion and communication strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Individual sport focus and self-reliance techniques</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Specialized Modes for Every Aspect of Athletic Life</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Performance Preparation Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Performance Preparation Mode</h3>
                </div>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Mental readiness for competition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Pre-performance routine development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Visualization and mental rehearsal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Competition anxiety management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Confidence building interventions</span>
                  </li>
                </ul>
              </div>
              
              {/* Recovery Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Recovery Mode</h3>
                </div>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Injury rehabilitation support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Overtraining prevention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Post-competition processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Identity maintenance during forced breaks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Finding meaning in recovery periods</span>
                  </li>
                </ul>
              </div>
              
              {/* Team Dynamics Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Team Dynamics Mode</h3>
                </div>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Coach-athlete relationship navigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Teammate conflict resolution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Leadership development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Team culture adaptation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Balancing individual and team goals</span>
                  </li>
                </ul>
              </div>
              
              {/* General Support Mode */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">General Support Mode</h3>
                </div>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Ongoing mental skills development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Life balance exploration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Identity development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Motivation maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Relationship building</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--background-alt)] p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-4">Our Approach: Continuous Learning and Personalization</h2>
            <p className="mb-4 text-foreground/80">
              TherapyKin Athletes creates a personalized experience by tracking your performance patterns, documenting effective mental techniques, and maintaining awareness of your career journey and development.
            </p>
            <p className="mb-4 text-foreground/80">
              This continuous learning system ensures that support is increasingly tailored to your specific needs, creating true continuity across your athletic journey.
            </p>
            <div className="mt-6 pt-6 border-t border-foreground/10">
              <h3 className="text-xl font-medium mb-3">Benefits for Athletes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Performance Enhancement</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Improved mental skills for competition</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Consistent psychological preparation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Enhanced focus and concentration</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Wellbeing Support</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Reduced performance anxiety</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Better stress management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Smoother career transitions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Case Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pre-Competition Support */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Pre-Competition Support</h3>
                <p className="text-foreground/70 mb-4">
                  Mental preparation in the days leading to competition, including last-minute confidence reinforcement, pre-performance routine refinement, and competition anxiety management.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "The visualization techniques my TherapyKin Athletes specialist helped me develop made a huge difference. For the first time, I felt completely mentally prepared before my championship match."
                  </p>
                  <p className="text-sm font-medium mt-2">— Professional Tennis Player</p>
                </div>
              </div>
              
              {/* In-Season Maintenance */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">In-Season Maintenance</h3>
                <p className="text-foreground/70 mb-4">
                  Consistency through competitive season, managing performance fluctuations, balancing training and competition demands, and maintaining motivation through challenges.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "Having consistent mental support throughout the season helped me avoid the mid-season slump I usually experience. I was able to maintain focus and motivation even during our toughest stretch of games."
                  </p>
                  <p className="text-sm font-medium mt-2">— Professional Basketball Player</p>
                </div>
              </div>
              
              {/* Injury Rehabilitation */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Injury Rehabilitation</h3>
                <p className="text-foreground/70 mb-4">
                  Psychological support during recovery, maintaining mental skills during physical limitations, return-to-play confidence building, and finding meaning in the rehabilitation process.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "After my ACL tear, I was devastated. My specialist helped me use visualization to maintain my mental edge during recovery and build the confidence I needed to return to competition without fear."
                  </p>
                  <p className="text-sm font-medium mt-2">— Olympic Skier</p>
                </div>
              </div>
              
              {/* Career Transitions */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Career Transitions</h3>
                <p className="text-foreground/70 mb-4">
                  Support through team changes, guidance during level advancement, preparation for retirement, and identity development beyond sport.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "When I was traded to a new team mid-season, my specialist helped me navigate the emotional challenges and quickly adapt to the new environment. This support was crucial for maintaining my performance during a difficult transition."
                  </p>
                  <p className="text-sm font-medium mt-2">— Professional Soccer Player</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary)]/5 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-4">Your Mental Performance Partner</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <p className="mb-4 text-foreground/80">
                  TherapyKin Athletes represents a new approach to mental performance support - one that's specialized for the unique needs of elite athletes, adaptive to your specific sport and career stage, and available whenever and wherever you need it.
                </p>
                <p className="text-foreground/80">
                  Whether you're preparing for competition, recovering from injury, navigating team dynamics, or transitioning between career stages, our specialists understand the unique psychological demands you face and provide targeted support to help you perform at your best.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-full h-40 w-40 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <p className="text-[var(--primary)] font-bold text-xl">Start Your</p>
                    <p className="text-3xl font-bold">Journey</p>
                    <p className="text-sm text-foreground/60 mt-1">Mental edge awaits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-[var(--background-alt)] p-10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to Gain Your Mental Edge?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
              Join the growing community of elite athletes who have discovered the power of specialized mental performance support. Your first session could be the beginning of a transformative journey.
            </p>
            <Link 
              href="/chat?specialist=athletes" 
              className="btn-primary text-white px-8 py-4 rounded-md font-medium inline-block text-lg"
            >
              Start Your First Specialized Session
            </Link>
            <p className="text-sm text-foreground/60 mt-4">No prior experience needed. Our specialists will guide you through the process.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
