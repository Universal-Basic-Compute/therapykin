'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

export default function WorkplaceStressInfographic() {
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
    : 'https://therapykin.ai/resources/workplace-stress-infographic';
  
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
                      Workplace Stress Infographic
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="workplace-stress-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Workplace
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Managing Workplace Stress Infographic</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  A visual guide to identifying and addressing common sources of workplace stress.
                </p>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Understanding Workplace Stress</h2>
                <p className="mb-4">
                  Workplace stress is a significant challenge that affects both individual well-being and organizational performance. This infographic guide provides a visual overview of common workplace stressors, their impact, and effective strategies to manage them.
                </p>
                <p className="mb-4">
                  Whether you're an employee looking to improve your stress management or a manager seeking to create a healthier work environment, this resource offers practical insights and actionable steps.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Workplace Stress By The Numbers</h4>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• 83% of US workers suffer from work-related stress</li>
                        <li>• Work-related stress costs employers an estimated $300 billion annually</li>
                        <li>• 76% of workers report that workplace stress affects their mental health</li>
                        <li>• 1 million workers miss work each day due to stress</li>
                        <li>• Stress is linked to the six leading causes of death</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Common Workplace Stressors */}
              <section id="stressors" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Common Workplace Stressors</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Workload & Time Pressure</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Excessive workload or unrealistic deadlines</li>
                      <li>Insufficient time to complete tasks properly</li>
                      <li>Pressure to work longer hours</li>
                      <li>Inadequate breaks or time off</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Role Ambiguity & Conflict</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Unclear job expectations or responsibilities</li>
                      <li>Conflicting demands from different supervisors</li>
                      <li>Lack of clarity about performance standards</li>
                      <li>Uncertainty about career progression</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Interpersonal Relationships</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Conflicts with colleagues or supervisors</li>
                      <li>Bullying or harassment</li>
                      <li>Poor communication within teams</li>
                      <li>Lack of support from management</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Organizational Factors</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Poor leadership or management styles</li>
                      <li>Lack of involvement in decision-making</li>
                      <li>Organizational change or restructuring</li>
                      <li>Job insecurity or poor career development</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Work-Life Balance</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Difficulty balancing work and personal life</li>
                      <li>Technology enabling 24/7 connectivity</li>
                      <li>Spillover of work stress into home life</li>
                      <li>Inadequate flexibility for personal needs</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Physical Environment</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Uncomfortable or unsafe working conditions</li>
                      <li>Excessive noise or distractions</li>
                      <li>Poor ergonomics leading to physical strain</li>
                      <li>Inadequate resources or equipment</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Signs and Symptoms */}
              <section id="symptoms" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Signs and Symptoms of Workplace Stress</h2>
                
                <div className="card p-6 shadow-depth mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        Physical
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Headaches or migraines</li>
                        <li>Muscle tension or pain</li>
                        <li>Fatigue or sleep disturbances</li>
                        <li>Digestive issues</li>
                        <li>Increased heart rate</li>
                        <li>Weakened immune system</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Emotional
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Anxiety or nervousness</li>
                        <li>Irritability or anger</li>
                        <li>Feeling overwhelmed</li>
                        <li>Low mood or depression</li>
                        <li>Decreased motivation</li>
                        <li>Emotional exhaustion</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Behavioral
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Increased absenteeism</li>
                        <li>Reduced productivity</li>
                        <li>Social withdrawal</li>
                        <li>Changes in appetite</li>
                        <li>Increased substance use</li>
                        <li>Procrastination</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                    <h4 className="font-medium mb-2">Long-Term Impact:</h4>
                    <p className="text-foreground/70">
                      Chronic workplace stress can lead to burnout, characterized by emotional exhaustion, cynicism, and reduced professional efficacy. It's also associated with increased risk of cardiovascular disease, musculoskeletal disorders, mental health conditions, and impaired immune function.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Stress Management Strategies */}
              <section id="strategies" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Effective Stress Management Strategies</h2>
                
                <div className="space-y-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Individual Strategies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Time Management</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Prioritize tasks using importance/urgency matrix</li>
                          <li>Break large projects into smaller, manageable tasks</li>
                          <li>Use time-blocking techniques</li>
                          <li>Learn to delegate effectively</li>
                          <li>Set realistic deadlines and expectations</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Boundary Setting</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Establish clear work hours and stick to them</li>
                          <li>Take regular breaks throughout the workday</li>
                          <li>Avoid checking work emails during off-hours</li>
                          <li>Learn to say no to additional responsibilities when overloaded</li>
                          <li>Create physical and mental transitions between work and home</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Self-Care Practices</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Prioritize adequate sleep (7-9 hours)</li>
                          <li>Engage in regular physical activity</li>
                          <li>Practice good nutrition and hydration</li>
                          <li>Incorporate relaxation techniques (meditation, deep breathing)</li>
                          <li>Maintain social connections and support networks</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Cognitive Strategies</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Challenge negative thought patterns</li>
                          <li>Practice mindfulness to stay present-focused</li>
                          <li>Reframe stressful situations as challenges rather than threats</li>
                          <li>Focus on aspects within your control</li>
                          <li>Maintain perspective on work problems</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Organizational Strategies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Workplace Culture</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Foster a supportive and inclusive environment</li>
                          <li>Recognize and reward employee contributions</li>
                          <li>Promote work-life balance as an organizational value</li>
                          <li>Encourage open communication about stress and mental health</li>
                          <li>Lead by example with healthy work habits</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Job Design</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Ensure clear role definitions and expectations</li>
                          <li>Provide appropriate autonomy and decision-making authority</li>
                          <li>Match workload to employee capabilities</li>
                          <li>Create opportunities for skill development</li>
                          <li>Allow for job crafting where possible</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Support Systems</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Provide access to Employee Assistance Programs (EAPs)</li>
                          <li>Offer stress management training and resources</li>
                          <li>Implement mentoring or buddy systems</li>
                          <li>Create spaces for relaxation and social interaction</li>
                          <li>Provide mental health days or flexible time off</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Management Practices</h4>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                          <li>Train managers to recognize and respond to stress</li>
                          <li>Conduct regular check-ins with team members</li>
                          <li>Involve employees in decision-making processes</li>
                          <li>Provide constructive feedback and clear communication</li>
                          <li>Address workplace conflicts promptly and fairly</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Quick Stress Relief Techniques */}
              <section id="quick-relief" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Quick Stress Relief Techniques for the Workplace</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-5 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.414 8.464l3.536 3.536" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Box Breathing</h3>
                        <p className="text-foreground/70 text-sm mb-2">
                          A simple breathing technique to calm your nervous system:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-foreground/70">
                          <li>Inhale through your nose for 4 counts</li>
                          <li>Hold your breath for 4 counts</li>
                          <li>Exhale through your mouth for 4 counts</li>
                          <li>Hold for 4 counts before inhaling again</li>
                          <li>Repeat 3-5 times</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Progressive Muscle Relaxation</h3>
                        <p className="text-foreground/70 text-sm mb-2">
                          Reduce physical tension with this quick exercise:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-foreground/70">
                          <li>Tense the muscles in your shoulders for 5 seconds</li>
                          <li>Release and notice the relaxation sensation</li>
                          <li>Move to your hands, then arms, then other muscle groups</li>
                          <li>Focus on the contrast between tension and relaxation</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">5-4-3-2-1 Grounding Technique</h3>
                        <p className="text-foreground/70 text-sm mb-2">
                          Bring your attention to the present moment:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-foreground/70">
                          <li>Identify 5 things you can see</li>
                          <li>Acknowledge 4 things you can touch</li>
                          <li>Notice 3 things you can hear</li>
                          <li>Recognize 2 things you can smell</li>
                          <li>Become aware of 1 thing you can taste</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Mindful Minute</h3>
                        <p className="text-foreground/70 text-sm mb-2">
                          Take a short mindfulness break:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-foreground/70">
                          <li>Set a timer for one minute</li>
                          <li>Close your eyes or soften your gaze</li>
                          <li>Focus entirely on your breathing</li>
                          <li>When your mind wanders, gently bring it back</li>
                          <li>Notice how you feel afterward</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Physical Reset</h3>
                        <p className="text-foreground/70 text-sm mb-2">
                          Quick physical activities to release tension:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-foreground/70">
                          <li>Stand up and stretch for 30 seconds</li>
                          <li>Take a short walk (even just to the water cooler)</li>
                          <li>Roll your shoulders backward and forward</li>
                          <li>Gently roll your head from side to side</li>
                          <li>Shake out your hands and arms</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Cognitive Reframing</h3>
                        <p className="text-foreground/70 text-sm mb-2">
                          Shift your perspective on stressful situations:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-foreground/70">
                          <li>Identify the stressful thought</li>
                          <li>Ask: "Is this thought helpful or accurate?"</li>
                          <li>Consider alternative interpretations</li>
                          <li>Create a more balanced thought</li>
                          <li>Focus on solutions rather than problems</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Creating a Stress Management Plan */}
              <section id="plan" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Creating Your Workplace Stress Management Plan</h2>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Step-by-Step Approach</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Identify Your Stressors</h4>
                        <p className="text-foreground/70">
                          Keep a stress journal for 1-2 weeks to track situations, thoughts, feelings, and physical responses that trigger stress. Look for patterns and common themes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Categorize Your Stressors</h4>
                        <p className="text-foreground/70">
                          Divide your stressors into three categories: those you can change, those you can influence, and those you need to accept. This helps prioritize where to focus your energy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Develop Specific Strategies</h4>
                        <p className="text-foreground/70">
                          For each category of stressors, select appropriate strategies from this guide. Create specific, actionable steps that work for your situation and personality.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Build Daily Habits</h4>
                        <p className="text-foreground/70">
                          Incorporate stress management techniques into your daily routine. Start with 1-2 small changes and gradually build up. Consistency is more important than intensity.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Seek Support</h4>
                        <p className="text-foreground/70">
                          Identify people who can support your stress management efforts, whether colleagues, managers, friends, or professionals. Don't hesitate to ask for help when needed.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">6</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Review and Adjust</h4>
                        <p className="text-foreground/70">
                          Regularly review your plan's effectiveness and make adjustments as needed. What works during one period of your life may need to change as circumstances evolve.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Sample Stress Management Plan Template</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">My Top 3 Workplace Stressors:</h4>
                      <ol className="list-decimal pl-5 text-foreground/80 mt-2">
                        <li>Example: Tight deadlines</li>
                        <li>Example: Difficult colleague interactions</li>
                        <li>Example: Email overload</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">My Stress Warning Signs:</h4>
                      <ul className="list-disc pl-5 text-foreground/80 mt-2">
                        <li>Physical: Example: Tension headaches, tight shoulders</li>
                        <li>Emotional: Example: Irritability, anxiety</li>
                        <li>Behavioral: Example: Procrastination, skipping breaks</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">My Stress Management Strategies:</h4>
                      <ul className="list-disc pl-5 text-foreground/80 mt-2">
                        <li>Preventive: Example: Time-blocking my calendar, setting boundaries</li>
                        <li>In-the-moment: Example: Box breathing, 5-minute walk</li>
                        <li>Recovery: Example: Evening wind-down routine, weekend activities</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">My Support Resources:</h4>
                      <ul className="list-disc pl-5 text-foreground/80 mt-2">
                        <li>People: Example: Mentor, supportive colleague, therapist</li>
                        <li>Workplace: Example: EAP program, flexible work options</li>
                        <li>Tools: Example: Meditation app, time management software</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* When to Seek Help */}
              <section id="seek-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">When to Seek Professional Help</h2>
                
                <p className="mb-6">
                  While self-management strategies are effective for everyday workplace stress, sometimes professional help is needed. Recognize these signs that indicate it's time to seek additional support:
                </p>
                
                <div className="card p-6 bg-[var(--background-alt)] mb-8">
                  <h3 className="text-xl font-semibold mb-4">Warning Signs</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Persistent feelings of being overwhelmed, despite using stress management techniques</li>
                    <li>Significant changes in sleep patterns, appetite, or energy levels</li>
                    <li>Increased use of alcohol, drugs, or other substances to cope</li>
                    <li>Withdrawal from social activities or relationships</li>
                    <li>Decreased performance or increased errors at work</li>
                    <li>Chronic physical symptoms like headaches, digestive issues, or muscle tension</li>
                    <li>Persistent feelings of hopelessness, sadness, or anxiety</li>
                    <li>Thoughts of harming yourself or others</li>
                  </ul>
                </div>
                
                <div className="card p-6 shadow-depth">
                  <h3 className="text-xl font-semibold mb-4">Professional Resources</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Employee Assistance Programs (EAPs)</h4>
                        <p className="text-sm text-foreground/70">Many employers offer confidential counseling and referral services for employees facing personal or work-related problems.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Mental Health Professionals</h4>
                        <p className="text-sm text-foreground/70">Therapists, counselors, psychologists, and psychiatrists can provide specialized support for stress, anxiety, depression, and burnout.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Primary Care Physicians</h4>
                        <p className="text-sm text-foreground/70">Can assess physical symptoms related to stress, rule out other medical conditions, and provide referrals to specialists.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Crisis Hotlines</h4>
                        <p className="text-sm text-foreground/70">For immediate support during mental health crises, including severe stress, anxiety, or suicidal thoughts.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-[var(--primary)]/5 rounded-lg">
                    <p className="text-sm text-foreground/80">
                      <strong>Remember:</strong> Seeking help is a sign of strength, not weakness. Early intervention can prevent more serious problems and help you develop effective coping strategies for long-term wellbeing.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="mb-4">
                  Workplace stress is an inevitable part of professional life, but it doesn't have to dominate your experience or diminish your wellbeing. By understanding the sources of workplace stress, recognizing its signs, and implementing effective management strategies, you can create a healthier relationship with work.
                </p>
                <p className="mb-4">
                  Remember that stress management is not a one-time effort but an ongoing practice. Small, consistent actions often lead to the most sustainable improvements. Be patient with yourself as you develop new habits and skills.
                </p>
                <p>
                  Organizations and individuals share responsibility for creating healthier work environments. By working together to address workplace stressors and promote wellbeing, we can build more productive, satisfying, and sustainable work cultures.
                </p>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Managing Workplace Stress Infographic" 
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
                    href="/signup?plan=free" 
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
                    Understanding Workplace Stress
                  </a>
                  <a href="#stressors" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Common Workplace Stressors
                  </a>
                  <a href="#symptoms" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Signs and Symptoms
                  </a>
                  <a href="#strategies" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Stress Management Strategies
                  </a>
                  <a href="#quick-relief" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Quick Relief Techniques
                  </a>
                  <a href="#plan" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Creating a Management Plan
                  </a>
                  <a href="#seek-help" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    When to Seek Help
                  </a>
                  <a href="#conclusion" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Conclusion
                  </a>
                </nav>
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
                  Get a PDF version of this infographic guide to reference offline or share with your team.
                </p>
                <PDFDownloadButton
                  title="Managing Workplace Stress"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-Workplace-Stress-Guide.pdf"
                  contentId="workplace-stress-content"
                  className="w-full btn-primary text-sm py-2"
                />
              </div>
              
              {/* Related Resources */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Anxiety Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">Comprehensive overview of anxiety disorders and treatment approaches</p>
                      <Link href="/resources/anxiety-guide" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.414 8.464l3.536 3.536" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Guided Relaxation</h4>
                      <p className="text-sm text-foreground/70 mb-2">Audio guide for progressive muscle relaxation technique</p>
                      <Link href="/resources/muscle-relaxation-audio" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Self-Care Assessment</h4>
                      <p className="text-sm text-foreground/70 mb-2">Evaluate your self-care practices and create a personalized plan</p>
                      <Link href="/resources/self-care-assessment" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Facts */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Workplace Stress Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">40% of workers report their job is very or extremely stressful</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Workplace stress costs U.S. employers approximately $300 billion annually</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">25% of employees view their jobs as the number one stressor in their lives</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Companies with effective wellness programs have 28% lower staff turnover</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Even 5-minute stress management breaks can improve productivity by up to 23%</p>
                  </div>
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
