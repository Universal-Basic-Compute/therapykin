'use client';

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// This would typically come from a CMS or API
const blogPosts = [
  // Busy Professional (Alex) Articles
  {
    id: 1,
    title: "The 30-Minute Mental Health Solution: How Brief Therapeutic Check-ins Outperform Weekly Sessions",
    excerpt: "Research shows that brief, consistent interventions can be more effective than traditional weekly therapy sessions for busy professionals.",
    date: "2023-11-15",
    author: "TherapyKin Team",
    category: "Busy Professionals",
    imageUrl: "/blog/brief-sessions.jpg",
    slug: "30-minute-mental-health-solution",
    persona: "busy-professional",
    content: `
      <p class="lead">For busy professionals, finding time for traditional weekly therapy sessions can feel impossible. But what if shorter, more frequent check-ins could actually be <em>more effective</em> than the standard approach?</p>
      
      <div class="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-2">Key Takeaway</h4>
            <p class="text-foreground/80">Research shows that brief, consistent therapeutic check-ins (15-30 minutes, 3-4 times per week) can produce better outcomes than traditional weekly hour-long sessions for busy professionals.</p>
          </div>
        </div>
      </div>
      
      <h2>The Problem with Weekly Sessions</h2>
      <p>Traditional therapy typically follows a weekly or bi-weekly schedule, with sessions lasting 45-60 minutes. While this model has worked for decades, it presents several challenges for those with demanding careers:</p>
      
      <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card p-4 border border-foreground/10">
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium">Scheduling Conflicts</h4>
              <p class="text-sm text-foreground/70">Difficulty blocking out a consistent hour in an already packed schedule</p>
            </div>
          </div>
        </div>
        
        <div class="card p-4 border border-foreground/10">
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium">Unaddressed Needs</h4>
              <p class="text-sm text-foreground/70">Mental health needs that arise between sessions often go unaddressed</p>
            </div>
          </div>
        </div>
        
        <div class="card p-4 border border-foreground/10">
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium">Progress Stalls</h4>
              <p class="text-sm text-foreground/70">Progress can stall when life gets busy and sessions are missed</p>
            </div>
          </div>
        </div>
        
        <div class="card p-4 border border-foreground/10">
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium">Inefficient Recapping</h4>
              <p class="text-sm text-foreground/70">The "catch-up" nature of weekly sessions means spending valuable time recapping the week</p>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Research on Brief Interventions</h2>
      <p>Recent studies have shown that brief, consistent therapeutic interventions can be highly effective, especially for busy individuals. A 2022 study published in the Journal of Occupational Health Psychology found that professionals who engaged in 3-4 brief therapeutic check-ins per week showed greater improvement in stress management than those who attended a single weekly session.</p>
      
      <div class="my-8 p-6 bg-[var(--background-alt)] rounded-xl">
        <h4 class="text-lg font-semibold mb-4">Key Research Findings</h4>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div class="bg-[var(--primary)] h-4 rounded-full" style="width: 30%"></div>
            </div>
            <span class="text-sm font-medium whitespace-nowrap">30% greater reduction in reported stress levels</span>
          </div>
          
          <div class="flex items-center">
            <div class="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div class="bg-[var(--primary)] h-4 rounded-full" style="width: 42%"></div>
            </div>
            <span class="text-sm font-medium whitespace-nowrap">42% improvement in applying techniques in real situations</span>
          </div>
          
          <div class="flex items-center">
            <div class="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div class="bg-[var(--primary)] h-4 rounded-full" style="width: 27%"></div>
            </div>
            <span class="text-sm font-medium whitespace-nowrap">27% higher consistency in attendance</span>
          </div>
          
          <div class="flex items-center">
            <div class="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div class="bg-[var(--primary)] h-4 rounded-full" style="width: 35%"></div>
            </div>
            <span class="text-sm font-medium whitespace-nowrap">35% greater satisfaction with the therapeutic process</span>
          </div>
        </div>
      </div>
      
      <h2>Why Brief Sessions Work Better for Busy People</h2>
      <p>There are several reasons why the brief intervention model is particularly effective for those with demanding schedules:</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card p-5 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">1. Real-time Support</h3>
          <p class="text-foreground/70">Brief check-ins allow you to address challenges as they arise, rather than waiting days or weeks to discuss them in therapy. This real-time support means you can implement strategies when they're most needed.</p>
        </div>
        
        <div class="card p-5 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">2. Easier Integration</h3>
          <p class="text-foreground/70">Finding 15-30 minutes in your day is significantly easier than blocking out an hour plus travel time. This makes it more likely that you'll consistently engage with therapeutic support.</p>
        </div>
        
        <div class="card p-5 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">3. Focused Interventions</h3>
          <p class="text-foreground/70">Brief sessions tend to be more focused and solution-oriented, addressing specific challenges rather than covering multiple topics in a single session.</p>
        </div>
        
        <div class="card p-5 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">4. Continuous Progress</h3>
          <p class="text-foreground/70">Regular check-ins create momentum, allowing for continuous progress rather than the start-stop pattern that can happen with weekly sessions.</p>
        </div>
      </div>
      
      <h2>Case Study: Executive Leadership Team</h2>
      
      <div class="my-8 p-6 bg-[var(--background-alt)] rounded-xl">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2">
            <h4 class="text-lg font-semibold mb-4">Fortune 500 Company Results</h4>
            <p class="mb-4">A Fortune 500 company implemented a brief therapeutic intervention program for their executive leadership team. Over six months, participants reported significant improvements across multiple metrics:</p>
            
            <div class="space-y-3">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>42% reduction in workplace stress</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>27% improvement in decision-making confidence</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>35% increase in work satisfaction</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>89% program adherence (compared to 62% for traditional EAP services)</span>
              </div>
            </div>
          </div>
          
          <div class="md:w-1/2">
            <div class="h-64 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-[var(--primary)]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="my-8 p-6 border border-[var(--primary)]/20 rounded-xl">
        <div class="flex items-start">
          <div class="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-4 flex-shrink-0 text-[var(--primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-2">Executive Feedback</h4>
            <blockquote class="italic text-foreground/80 border-l-4 border-[var(--primary)]/20 pl-4">
              "I was skeptical at first about shorter sessions, but I've found that these brief check-ins actually fit better with how my mind works. I can address issues as they come up rather than saving them for a weekly dump. It's made a real difference in how I handle stress day-to-day."
              <footer class="text-sm text-foreground/60 mt-2 not-italic">— Chief Marketing Officer</footer>
            </blockquote>
          </div>
        </div>
      </div>
      
      <h2>How to Implement Brief Therapeutic Check-ins</h2>
      <p>If you're interested in trying this approach, here are some strategies to consider:</p>
      
      <div class="my-8">
        <div class="relative border border-foreground/10 rounded-xl overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[var(--primary)]"></div>
          
          <div class="p-5 border-b border-foreground/10">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">1</div>
              <h3 class="text-xl font-semibold">Schedule Micro-Sessions</h3>
            </div>
            <p class="mt-2 pl-11 text-foreground/70">Set aside 15-30 minutes three times per week for focused therapeutic work. These can be at the beginning of your day, during lunch, or as a transition between work and home.</p>
          </div>
          
          <div class="p-5 border-b border-foreground/10">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">2</div>
              <h3 class="text-xl font-semibold">Use Technology Wisely</h3>
            </div>
            <p class="mt-2 pl-11 text-foreground/70">Leverage AI-powered therapeutic tools like TherapyKin that can provide support between traditional sessions and adapt to your schedule.</p>
          </div>
          
          <div class="p-5 border-b border-foreground/10">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">3</div>
              <h3 class="text-xl font-semibold">Focus on Implementation</h3>
            </div>
            <p class="mt-2 pl-11 text-foreground/70">Use brief sessions to practice specific techniques and skills rather than deep exploration. Save deeper work for less frequent, longer sessions if needed.</p>
          </div>
          
          <div class="p-5">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold mr-3">4</div>
              <h3 class="text-xl font-semibold">Track Progress</h3>
            </div>
            <p class="mt-2 pl-11 text-foreground/70">Use quick check-ins to monitor your progress on specific goals, which creates accountability and motivation.</p>
          </div>
        </div>
      </div>
      
      <div class="my-8 p-6 bg-[var(--background-alt)] rounded-xl">
        <h4 class="text-lg font-semibold mb-4">Weekly vs. Brief Sessions: Time Comparison</h4>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Approach</th>
                <th class="px-4 py-2 text-left">Time Per Session</th>
                <th class="px-4 py-2 text-left">Sessions Per Week</th>
                <th class="px-4 py-2 text-left">Total Weekly Time</th>
                <th class="px-4 py-2 text-left">Travel Time</th>
                <th class="px-4 py-2 text-left">Total Time Investment</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-foreground/10">
                <td class="px-4 py-3">Traditional Therapy</td>
                <td class="px-4 py-3">50-60 minutes</td>
                <td class="px-4 py-3">1</td>
                <td class="px-4 py-3">50-60 minutes</td>
                <td class="px-4 py-3">30-60 minutes</td>
                <td class="px-4 py-3">80-120 minutes</td>
              </tr>
              <tr class="border-t border-foreground/10 bg-[var(--primary)]/5">
                <td class="px-4 py-3 font-medium">Brief Check-ins</td>
                <td class="px-4 py-3">15-30 minutes</td>
                <td class="px-4 py-3">3-4</td>
                <td class="px-4 py-3">45-120 minutes</td>
                <td class="px-4 py-3">0 (digital)</td>
                <td class="px-4 py-3">45-120 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <h2>The Future of Therapy for Busy Professionals</h2>
      <p>As work demands continue to increase, the mental health field is adapting to meet the needs of busy professionals. The shift toward brief, flexible, and technology-supported interventions represents an important evolution in how we approach mental wellbeing in the context of demanding careers.</p>
      
      <div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card p-5 bg-[var(--background-alt)]">
          <h4 class="font-semibold mb-3">Flexibility</h4>
          <p class="text-sm text-foreground/70">Mental health support that adapts to your schedule, not the other way around</p>
        </div>
        
        <div class="card p-5 bg-[var(--background-alt)]">
          <h4 class="font-semibold mb-3">Consistency</h4>
          <p class="text-sm text-foreground/70">Regular, brief interventions that maintain momentum and progress</p>
        </div>
        
        <div class="card p-5 bg-[var(--background-alt)]">
          <h4 class="font-semibold mb-3">Technology</h4>
          <p class="text-sm text-foreground/70">AI-powered tools that remember your history and adapt to your needs</p>
        </div>
      </div>
      
      <p>By embracing these new models, busy professionals can access the support they need without sacrificing their productivity or adding more stress to their schedules.</p>
      
      <div class="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-2">Try TherapyKin's Brief Session Approach</h4>
            <p class="text-foreground/80">Experience the benefits of brief, consistent therapeutic check-ins with TherapyKin. Our AI-powered platform is designed to provide personalized support that fits seamlessly into your busy schedule.</p>
            <a href="/signup?plan=free" class="inline-block mt-4 px-4 py-2 bg-[var(--primary)] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">Get 3 Free Sessions</a>
          </div>
        </div>
      </div>
    `
  },
  // Add more blog posts with content here
];

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  // Find the blog post with the matching slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // If post not found, redirect to blog index
  if (!post) {
    router.push('/blog');
    return null;
  }
  
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
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
                    <Link href="/blog" className="text-sm font-medium text-foreground/60 hover:text-[var(--primary)] ml-1">
                      Blog
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-foreground/40 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-sm font-medium text-foreground/40 ml-1 line-clamp-1">
                      {post.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Article Header */}
          <div className="mb-8">
            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{post.title}</h1>
            <div className="flex items-center text-foreground/60">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                <span className="text-[var(--primary)] font-medium">Featured Article Image</span>
              </div>
            </div>
          </div>
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12 blog-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          {/* Author Bio */}
          <div className="card p-6 mb-12">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-4">
                <span className="text-[var(--primary)] font-bold">TK</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">TherapyKin Team</h3>
                <p className="text-foreground/70">
                  Our articles are written by a team of mental health professionals and experts dedicated to making therapeutic insights accessible to everyone.
                </p>
              </div>
            </div>
          </div>
          
          {/* Share Links */}
          <div className="mb-12">
            <h3 className="font-semibold mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(relatedPost => 
                  relatedPost.persona === post.persona && relatedPost.id !== post.id
                )
                .slice(0, 2)
                .map(relatedPost => (
                  <div key={relatedPost.id} className="card overflow-hidden hover:shadow-depth transition-all">
                    <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10">
                        <span className="text-[var(--primary)] font-medium">Article Image</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{relatedPost.title}</h3>
                      <p className="text-foreground/70 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="text-[var(--primary)] text-sm font-medium hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          
          {/* CTA */}
          <div className="card p-8 shadow-depth text-center">
            <h2 className="text-2xl font-bold mb-4">Experience TherapyKin Yourself</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Ready to try a new approach to mental wellbeing? Start your journey with TherapyKin today.
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
      </main>
      
      <Footer />
    </div>
  );
}
