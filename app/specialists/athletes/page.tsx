'use client';

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonial from "../../components/Testimonial";
import Link from "next/link";

export default function AthleteSpecialist() {
  // State for the assessment
  const [assessmentScores, setAssessmentScores] = useState({
    mentalGoals: 0,
    refocus: 0,
    anxietyManagement: 0,
    offSeasonTraining: 0,
    identityBalance: 0
  });
  
  const [totalScore, setTotalScore] = useState(0);
  const [scoreCalculated, setScoreCalculated] = useState(false);
  
  // Define type for assessment score keys
  type AssessmentScoreKey = 'mentalGoals' | 'refocus' | 'anxietyManagement' | 'offSeasonTraining' | 'identityBalance';
  
  // Handle score selection
  const handleScoreSelection = (question: AssessmentScoreKey, score: number) => {
    const newScores = { ...assessmentScores, [question]: score };
    setAssessmentScores(newScores);
  };
  
  // Calculate the total score
  const calculateTotalScore = () => {
    const sum = Object.values(assessmentScores).reduce((total, score) => total + score, 0);
    setTotalScore(sum);
    setScoreCalculated(true);
  };
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
          
          {/* Hero Section with Image */}
          <div className="relative mb-12 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 p-8">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
              <div className="w-full h-full bg-[url('/images/athlete-focus.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="relative z-10 max-w-2xl">
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
              
            {/* Quick Takeaways Section */}
            <div className="bg-white dark:bg-[var(--background-alt)]/70 p-5 rounded-lg border-l-4 border-[var(--primary)] mb-6">
              <h3 className="font-semibold text-lg mb-2">Quick Takeaways</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mental performance training is as crucial as physical training for elite athletes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Support adapts to your training cycle, competition schedule, and career stage</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Available 24/7, fitting into your schedule rather than disrupting it</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>87% of athletes report reduced performance anxiety within 4 sessions</span>
                </li>
              </ul>
            </div>
              
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
          </div>
          
          {/* Top CTA Section */}
          <div className="mb-12 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 p-6 rounded-lg border border-[var(--primary)]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Ready to Elevate Your Mental Game?</h2>
                <p className="text-foreground/80">
                  Start your journey with TherapyKin Athletes today and discover how specialized mental performance support can transform your athletic experience.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link 
                  href="/chat?specialist=athletes" 
                  className="btn-primary text-white px-6 py-3 rounded-md font-medium inline-block whitespace-nowrap"
                >
                  Start Your First Session
                </Link>
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
              
              <div className="mt-6 pt-4 border-t border-foreground/10">
                <h4 className="text-sm font-medium text-[var(--primary)]">Related Resources:</h4>
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link href="/resources/mental-skills-development" className="text-sm hover:underline text-foreground/70">
                      → Complete Mental Skills Development Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/visualization-techniques-for-athletes" className="text-sm hover:underline text-foreground/70">
                      → Advanced Visualization Techniques for Elite Performance
                    </Link>
                  </li>
                </ul>
              </div>
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
          
          {/* Integration with Physical Training */}
          <div className="mb-16 bg-gradient-to-r from-[var(--primary)]/10 to-transparent p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Seamless Integration with Physical Training</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <p className="text-foreground/80 mb-4">
                  TherapyKin Athletes is designed to complement your existing physical training regimen, not compete with it. Our specialists work in harmony with your technical coaches and physical trainers.
                </p>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Mental skills that enhance physical technique acquisition</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Psychological strategies that optimize physical recovery</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Mental approaches that maximize physical training adaptations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Coordination with strength coaches and technical trainers</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">The Mind-Body Performance Loop</h3>
                <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-40 h-40 mx-auto rounded-full border-4 border-[var(--primary)]/30 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--primary)] animate-spin" style={{animationDuration: '8s'}}></div>
                      <div className="text-center">
                        <p className="font-bold text-lg">Mental</p>
                        <svg className="w-6 h-6 mx-auto my-2 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                        </svg>
                        <p className="font-bold text-lg">Physical</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 mt-4 text-center">
                  Mental and physical training work in a continuous feedback loop, each enhancing the other for optimal performance.
                </p>
              </div>
            </div>
          </div>
          
          {/* Social Proof Metrics */}
          <div className="mb-16 bg-white dark:bg-[var(--background-alt)]/30 p-8 rounded-lg border border-foreground/5">
            <h2 className="text-2xl font-semibold mb-6 text-center">The TherapyKin Athletes Impact</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">87%</div>
                <p className="text-sm text-foreground/70">of athletes report reduced performance anxiety within 4 sessions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">92%</div>
                <p className="text-sm text-foreground/70">satisfaction rate among professional athletes using our service</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">76%</div>
                <p className="text-sm text-foreground/70">of users report measurable performance improvements</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">3.2x</div>
                <p className="text-sm text-foreground/70">faster recovery from setbacks compared to traditional support</p>
              </div>
            </div>
            
            <div className="text-center text-foreground/70">
              <p className="italic">
                "TherapyKin Athletes has become an essential component of our high-performance program. The specialized mental support has transformed how our athletes approach competition and recovery."
              </p>
              <p className="font-medium mt-2">— Director of Performance, Professional Sports Organization</p>
            </div>
          </div>
          
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Specialized Modes for Every Aspect of Athletic Life</h2>
            <p className="text-center text-foreground/70 mb-8 max-w-3xl mx-auto">
              Our platform adapts to your specific needs with specialized support modes designed for different phases of your athletic journey
            </p>
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
          
          {/* Team Packages and Remote Support */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                  <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Team Performance Packages</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Elevate your entire team's mental performance with our specialized team packages. Ideal for professional teams, collegiate programs, and elite club organizations.
              </p>
              <ul className="text-foreground/70 space-y-2 pl-4 mb-6">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Team culture and cohesion development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Leadership and communication enhancement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Group workshops and individual sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Coach-athlete relationship optimization</span>
                </li>
              </ul>
              <div className="text-center">
                <Link 
                  href="/contact?subject=Team%20Package%20Inquiry" 
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Request Team Package Information
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                  <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 14.5V17m0 0v2.5M12 17h2.5M12 17h-2.5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Remote Competition Support</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Access specialized mental performance support wherever your competitions take you. Our platform is designed to provide seamless support during your most critical moments.
              </p>
              <ul className="text-foreground/70 space-y-2 pl-4 mb-6">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Pre-competition preparation sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Between-event mental reset guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Post-competition processing and recovery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Time-zone adapted availability for global events</span>
                </li>
              </ul>
              <div className="text-center">
                <Link 
                  href="/chat?specialist=athletes&mode=competition" 
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Learn About Competition Support
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Athlete Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pre-Competition Support */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Pre-Competition Support</h3>
                <p className="text-foreground/70 mb-4">
                  Mental preparation in the days leading to competition, including last-minute confidence reinforcement, pre-performance routine refinement, and competition anxiety management.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "The visualization techniques my TherapyKin Athletes specialist helped me develop made a huge difference. For the first time, I felt completely mentally prepared before my championship match. I was able to stay present and execute exactly as I had practiced."
                  </p>
                  <p className="text-sm font-medium mt-2">— Maria L., Professional Tennis Player</p>
                </div>
                <div className="mt-4 bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "As a team sport athlete, I struggled with balancing my individual goals with team objectives. My specialist helped me reframe this as complementary rather than competing priorities, which transformed my approach to training."
                  </p>
                  <p className="text-sm font-medium mt-2">— Jason T., Professional Basketball Forward</p>
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
                    "Having consistent mental support throughout the season helped me avoid the mid-season slump I usually experience. I was able to maintain focus and motivation even during our toughest stretch of games. My shooting percentage actually improved during playoff pressure."
                  </p>
                  <p className="text-sm font-medium mt-2">— Darius J., Professional Basketball Player</p>
                </div>
              </div>
              
              {/* Injury Rehabilitation */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Injury Rehabilitation</h3>
                <p className="text-foreground/70 mb-4">
                  Psychological support during recovery, maintaining mental skills during physical limitations, return-to-play confidence building, and finding meaning in the rehabilitation process.
                </p>
                <div className="space-y-4">
                  <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                    <p className="text-sm italic text-foreground/80">
                      "After my ACL tear, I was devastated. My specialist helped me use visualization to maintain my mental edge during recovery and build the confidence I needed to return to competition without fear. I came back stronger mentally than I was before the injury."
                    </p>
                    <p className="text-sm font-medium mt-2">— Emma R., Olympic Alpine Skier</p>
                  </div>
                
                  {/* Olympic Athlete Recovery Timeline */}
                  <div className="bg-white dark:bg-[var(--background-alt)]/70 p-4 rounded-lg border border-foreground/10">
                    <h4 className="font-medium text-sm mb-3">Emma's Mental Recovery Timeline</h4>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--primary)]/30"></div>
                    
                      {/* Timeline events */}
                      <div className="ml-10 space-y-6 relative pb-2">
                        <div className="relative">
                          <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[var(--primary)]"></div>
                          <div>
                            <span className="text-xs font-medium text-[var(--primary)]">Week 1-2</span>
                            <p className="text-sm">Initial trauma processing and emotional regulation</p>
                          </div>
                        </div>
                      
                        <div className="relative">
                          <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[var(--primary)]"></div>
                          <div>
                            <span className="text-xs font-medium text-[var(--primary)]">Month 1-2</span>
                            <p className="text-sm">Daily visualization of successful rehabilitation and healing</p>
                          </div>
                        </div>
                      
                        <div className="relative">
                          <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[var(--primary)]"></div>
                          <div>
                            <span className="text-xs font-medium text-[var(--primary)]">Month 3-5</span>
                            <p className="text-sm">Identity work and skill maintenance during physical limitations</p>
                          </div>
                        </div>
                      
                        <div className="relative">
                          <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[var(--primary)]"></div>
                          <div>
                            <span className="text-xs font-medium text-[var(--primary)]">Month 6-8</span>
                            <p className="text-sm">Return-to-snow confidence building and fear processing</p>
                          </div>
                        </div>
                      
                        <div className="relative">
                          <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[var(--primary)]"></div>
                          <div>
                            <span className="text-xs font-medium text-[var(--primary)]">Month 9-12</span>
                            <p className="text-sm">Competition readiness and performance enhancement</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Team Sport Dynamics */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Team Sport Dynamics</h3>
                <p className="text-foreground/70 mb-4">
                  Navigating complex team relationships, managing leadership responsibilities, and maintaining individual performance within team contexts.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "As team captain, I was struggling with the pressure of leadership while maintaining my own performance. My specialist helped me develop communication strategies that transformed our team culture. We went from constant conflict to winning the championship."
                  </p>
                  <p className="text-sm font-medium mt-2">— Carlos M., Professional Soccer Team Captain</p>
                </div>
              </div>
              
              {/* Individual Sport Focus */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Individual Sport Focus</h3>
                <p className="text-foreground/70 mb-4">
                  Developing self-reliance, managing isolation during training and competition, and maintaining motivation without team support.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="text-sm italic text-foreground/80">
                    "The loneliness of long-distance training was affecting my performance. My specialist helped me develop mental routines that keep me focused and motivated even during solo training. I've shaved 4 minutes off my marathon time."
                  </p>
                  <p className="text-sm font-medium mt-2">— Aisha K., Elite Marathon Runner</p>
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
                  <p className="text-sm font-medium mt-2">— Miguel S., Professional Baseball Player</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5">
                <h3 className="text-lg font-semibold mb-2">How does TherapyKin Athletes differ from traditional sports psychology?</h3>
                <p className="text-foreground/70">
                  While sports psychology typically focuses on performance enhancement in clinical settings, TherapyKin Athletes provides continuous, accessible support throughout your athletic journey. Our specialists integrate sport psychology techniques with broader mental health support, available 24/7 via our platform, adapting to your training cycles and competition schedule.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5">
                <h3 className="text-lg font-semibold mb-2">Can TherapyKin Athletes help with my specific sport?</h3>
                <p className="text-foreground/70">
                  Yes! Our specialists are trained to understand the unique mental demands across different sports, from team sports like basketball and soccer to individual sports like tennis, golf, and endurance events. We tailor our approach to your specific sport's psychological requirements, whether that involves team dynamics, individual focus, or specialized performance contexts.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5">
                <h3 className="text-lg font-semibold mb-2">How quickly might I see results?</h3>
                <p className="text-foreground/70">
                  Many athletes report immediate benefits from their first session, particularly in areas like pre-competition anxiety management and focus techniques. More comprehensive mental skills development typically shows measurable improvement within 2-4 weeks of consistent practice. Our specialists work with you to establish baseline metrics and track your progress over time.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5">
                <h3 className="text-lg font-semibold mb-2">Will my coach or team know I'm using this service?</h3>
                <p className="text-foreground/70">
                  Your privacy is paramount. Your use of TherapyKin Athletes is completely confidential unless you choose to share this information. Many athletes find that sharing certain techniques with their coaches enhances their training, but this is always your decision. We can also provide guidance on how to effectively communicate mental skills work with your coaching staff if desired.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5">
                <h3 className="text-lg font-semibold mb-2">Can I access support during competitions or while traveling?</h3>
                <p className="text-foreground/70">
                  Absolutely! Our platform is designed for accessibility anywhere, anytime. Many athletes use our services during competition travel, between events, or even for quick check-ins before performances. Our specialists can provide brief, focused interventions that fit into your competition schedule and help you maintain your mental edge when it matters most.
                </p>
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

          {/* Self-Assessment Tool */}
          <div className="mb-16 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 p-8 rounded-lg border border-foreground/5">
            <h2 className="text-2xl font-semibold mb-4 text-center">Off-Season Mental Readiness Assessment</h2>
            <p className="text-center text-foreground/70 mb-6 max-w-3xl mx-auto">
              Rate yourself on each statement from 1-5 (1 = Strongly Disagree, 5 = Strongly Agree) to assess your current mental approach to training and competition
            </p>
            
            <div className="bg-white dark:bg-[var(--background-alt)]/70 p-6 rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-medium">I have clear mental performance goals separate from my physical goals</label>
                    <span className="text-sm text-foreground/60">Score: {assessmentScores.mentalGoals}/5</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs">Strongly Disagree</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div 
                          key={num} 
                          className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-[var(--primary)]/10 ${
                            assessmentScores.mentalGoals === num 
                              ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
                              : "border-foreground/20"
                          }`}
                          onClick={() => handleScoreSelection("mentalGoals", num)}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs">Strongly Agree</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-medium">I can quickly refocus after distractions during training or competition</label>
                    <span className="text-sm text-foreground/60">Score: {assessmentScores.refocus}/5</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs">Strongly Disagree</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div 
                          key={num} 
                          className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-[var(--primary)]/10 ${
                            assessmentScores.refocus === num 
                              ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
                              : "border-foreground/20"
                          }`}
                          onClick={() => handleScoreSelection("refocus", num)}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs">Strongly Agree</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-medium">I have effective strategies for managing pre-competition anxiety</label>
                    <span className="text-sm text-foreground/60">Score: {assessmentScores.anxietyManagement}/5</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs">Strongly Disagree</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div 
                          key={num} 
                          className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-[var(--primary)]/10 ${
                            assessmentScores.anxietyManagement === num 
                              ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
                              : "border-foreground/20"
                          }`}
                          onClick={() => handleScoreSelection("anxietyManagement", num)}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs">Strongly Agree</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-medium">I maintain mental training during off-season periods</label>
                    <span className="text-sm text-foreground/60">Score: {assessmentScores.offSeasonTraining}/5</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs">Strongly Disagree</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div 
                          key={num} 
                          className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-[var(--primary)]/10 ${
                            assessmentScores.offSeasonTraining === num 
                              ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
                              : "border-foreground/20"
                          }`}
                          onClick={() => handleScoreSelection("offSeasonTraining", num)}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs">Strongly Agree</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-medium">I can effectively balance athletic identity with other aspects of my life</label>
                    <span className="text-sm text-foreground/60">Score: {assessmentScores.identityBalance}/5</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs">Strongly Disagree</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div 
                          key={num} 
                          className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-[var(--primary)]/10 ${
                            assessmentScores.identityBalance === num 
                              ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
                              : "border-foreground/20"
                          }`}
                          onClick={() => handleScoreSelection("identityBalance", num)}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs">Strongly Agree</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-foreground/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Score: {scoreCalculated ? totalScore : "___"}/25</span>
                  <button 
                    onClick={calculateTotalScore}
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-md text-sm"
                  >
                    Calculate My Score
                  </button>
                </div>
                
                {scoreCalculated && (
                  <div className="mt-4 p-4 rounded-lg bg-[var(--background-alt)]/50">
                    <h4 className="font-semibold mb-2">Your Assessment Result:</h4>
                    {totalScore >= 20 ? (
                      <div>
                        <p className="text-green-600 font-medium mb-2">Excellent mental readiness (20-25)</p>
                        <p className="text-foreground/80 mb-2">
                          You demonstrate an exceptional foundation in mental performance skills! Your approach to mental training appears to be as structured and consistent as your physical training.
                        </p>
                        <p className="text-foreground/80">
                          <strong>Next steps:</strong> Consider refining your mental skills even further by exploring advanced visualization techniques, developing situation-specific mental strategies, and mentoring others. Your TherapyKin Athletes specialist can help you reach even higher levels of mental mastery.
                        </p>
                      </div>
                    ) : totalScore >= 15 ? (
                      <div>
                        <p className="text-blue-600 font-medium mb-2">Good foundation (15-19)</p>
                        <p className="text-foreground/80 mb-2">
                          You have solid mental skills with clear strengths in some areas. You likely notice the positive impact of mental training on your performance, but there are still opportunities to develop a more comprehensive approach.
                        </p>
                        <p className="text-foreground/80">
                          <strong>Next steps:</strong> Identify the specific areas where you scored lower and create a targeted plan to strengthen these skills. A TherapyKin Athletes specialist can help you develop consistency across all aspects of mental performance.
                        </p>
                      </div>
                    ) : totalScore >= 10 ? (
                      <div>
                        <p className="text-amber-600 font-medium mb-2">Developing (10-14)</p>
                        <p className="text-foreground/80 mb-2">
                          You're aware of the importance of mental skills and have begun implementing some techniques, but several areas need significant development to reach your full potential. You may experience inconsistent mental performance during training and competition.
                        </p>
                        <p className="text-foreground/80">
                          <strong>Next steps:</strong> Establish a structured mental training routine that addresses your specific challenges. Working with a TherapyKin Athletes specialist can help you build a comprehensive mental skills foundation that complements your physical training.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-medium mb-2">Beginning stage (Below 10)</p>
                        <p className="text-foreground/80 mb-2">
                          Your assessment suggests that mental performance training represents a significant opportunity for improvement. Like many athletes, you may have focused primarily on physical development while mental skills have remained underdeveloped.
                        </p>
                        <p className="text-foreground/80">
                          <strong>Next steps:</strong> Consider prioritizing mental performance training as a key focus area. Starting with fundamentals like goal-setting, focus training, and pre-performance routines can yield rapid improvements. A TherapyKin Athletes specialist can guide you through this process and help you build these essential skills from the ground up.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-sm mt-4 text-foreground/70">
                  <strong>Scoring Guide:</strong><br/>
                  20-25: Excellent mental readiness<br/>
                  15-19: Good foundation with room for improvement<br/>
                  10-14: Several areas need significant development<br/>
                  Below 10: Consider prioritizing mental performance training
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Start Guide */}
          <div className="mb-16 bg-white dark:bg-[var(--background-alt)]/30 p-8 rounded-lg border border-foreground/5">
            <h2 className="text-2xl font-semibold mb-6 text-center">Quick Start Mental Performance Guide</h2>
            <p className="text-center text-foreground/70 mb-8 max-w-3xl mx-auto">
              Begin enhancing your mental performance today with these evidence-based techniques used by elite athletes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-medium">
                    First Week Implementation
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Pre-Performance Routine</h3>
                <p className="text-foreground/70 text-sm mb-3">
                  Develop a consistent 3-5 minute routine to perform before competition or training.
                </p>
                <ul className="text-sm space-y-1 text-foreground/70">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Take 5 deep breaths, inhaling for 4 counts, holding for 2, exhaling for 6</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Visualize one successful performance moment in vivid detail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Repeat your personal performance mantra 3 times</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-medium">
                    Week 2-3 Implementation
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Focus Reset Technique</h3>
                <p className="text-foreground/70 text-sm mb-3">
                  Use this 30-second technique whenever you need to regain focus during competition.
                </p>
                <ul className="text-sm space-y-1 text-foreground/70">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Acknowledge the distraction without judgment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Take one deliberate breath while saying "reset" to yourself</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Direct attention to one immediate physical sensation</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-medium">
                    Ongoing Daily Practice
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Performance Journal</h3>
                <p className="text-foreground/70 text-sm mb-3">
                  Spend 5 minutes after each training session or competition recording:
                </p>
                <ul className="text-sm space-y-1 text-foreground/70">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>One mental aspect that went well</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>One mental challenge you faced</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>One specific mental adjustment for next time</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8 space-y-3">
              <Link 
                href="/resources/athletes-starter-kit" 
                className="text-[var(--primary)] font-medium hover:underline block"
              >
                Download the complete Athletes Mental Performance Starter Kit →
              </Link>
              <Link 
                href="/downloads/one-page-mental-performance-summary.pdf" 
                className="inline-flex items-center text-sm px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)]/5"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download One-Page Summary (PDF)
              </Link>
            </div>
          </div>
          
          {/* Common Mistakes to Avoid Section */}
          <div className="mb-16 bg-white dark:bg-[var(--background-alt)]/30 p-8 rounded-lg border border-foreground/5">
            <h2 className="text-2xl font-semibold mb-6 text-center">Common Mental Performance Mistakes to Avoid</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[var(--background-alt)]/70 p-6 rounded-lg border border-red-200">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Neglecting Mental Training During Off-Season</h3>
                    <p className="text-foreground/70 text-sm">
                      Many athletes focus exclusively on physical recovery and training during the off-season, allowing mental skills to deteriorate.
                    </p>
                  </div>
                </div>
                <div className="ml-13 pl-13">
                  <h4 className="text-sm font-medium text-[var(--primary)] mb-2">Better Approach:</h4>
                  <p className="text-sm text-foreground/70">
                    Maintain a consistent mental training schedule year-round, using the off-season to develop new mental skills without the pressure of immediate competition.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)]/70 p-6 rounded-lg border border-red-200">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Inconsistent Pre-Performance Routines</h3>
                    <p className="text-foreground/70 text-sm">
                      Changing mental preparation approaches before different competitions creates inconsistency in mental readiness.
                    </p>
                  </div>
                </div>
                <div className="ml-13 pl-13">
                  <h4 className="text-sm font-medium text-[var(--primary)] mb-2">Better Approach:</h4>
                  <p className="text-sm text-foreground/70">
                    Develop a standardized pre-performance routine that can be scaled up or down based on competition importance, but maintains the same core elements.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)]/70 p-6 rounded-lg border border-red-200">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Reactive Instead of Proactive Support</h3>
                    <p className="text-foreground/70 text-sm">
                      Only seeking mental performance support when already experiencing problems or performance declines.
                    </p>
                  </div>
                </div>
                <div className="ml-13 pl-13">
                  <h4 className="text-sm font-medium text-[var(--primary)] mb-2">Better Approach:</h4>
                  <p className="text-sm text-foreground/70">
                    Establish ongoing mental performance support that builds skills proactively, preventing issues before they impact performance.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[var(--background-alt)]/70 p-6 rounded-lg border border-red-200">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Isolating Mental and Physical Training</h3>
                    <p className="text-foreground/70 text-sm">
                      Treating mental and physical training as completely separate domains rather than integrated aspects of performance.
                    </p>
                  </div>
                </div>
                <div className="ml-13 pl-13">
                  <h4 className="text-sm font-medium text-[var(--primary)] mb-2">Better Approach:</h4>
                  <p className="text-sm text-foreground/70">
                    Integrate mental skills practice directly into physical training sessions, reinforcing the mind-body connection that drives peak performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/blog/mental-performance-pitfalls" 
                className="text-[var(--primary)] font-medium hover:underline"
              >
                Read our complete guide to avoiding the top 10 mental performance pitfalls →
              </Link>
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
