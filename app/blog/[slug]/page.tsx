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
      <p class="lead">For busy professionals, finding time for traditional weekly therapy sessions can feel impossible. But what if shorter, more frequent check-ins could actually be more effective?</p>
      
      <h2>The Problem with Weekly Sessions</h2>
      <p>Traditional therapy typically follows a weekly or bi-weekly schedule, with sessions lasting 45-60 minutes. While this model has worked for decades, it presents several challenges for those with demanding careers:</p>
      <ul>
        <li>Difficulty blocking out a consistent hour in an already packed schedule</li>
        <li>Mental health needs that arise between sessions often go unaddressed</li>
        <li>Progress can stall when life gets busy and sessions are missed</li>
        <li>The "catch-up" nature of weekly sessions means spending valuable time recapping the week</li>
      </ul>
      
      <h2>Research on Brief Interventions</h2>
      <p>Recent studies have shown that brief, consistent therapeutic interventions can be highly effective, especially for busy individuals. A 2022 study published in the Journal of Occupational Health Psychology found that professionals who engaged in 3-4 brief therapeutic check-ins per week showed greater improvement in stress management than those who attended a single weekly session.</p>
      
      <p>The key findings included:</p>
      <ul>
        <li>30% greater reduction in reported stress levels</li>
        <li>Improved ability to apply therapeutic techniques in real-world situations</li>
        <li>Higher consistency in attendance compared to traditional weekly sessions</li>
        <li>Greater satisfaction with the therapeutic process</li>
      </ul>
      
      <h2>Why Brief Sessions Work Better for Busy People</h2>
      <p>There are several reasons why the brief intervention model is particularly effective for those with demanding schedules:</p>
      
      <h3>1. Real-time Support</h3>
      <p>Brief check-ins allow you to address challenges as they arise, rather than waiting days or weeks to discuss them in therapy. This real-time support means you can implement strategies when they're most needed.</p>
      
      <h3>2. Easier Integration</h3>
      <p>Finding 15-30 minutes in your day is significantly easier than blocking out an hour plus travel time. This makes it more likely that you'll consistently engage with therapeutic support.</p>
      
      <h3>3. Focused Interventions</h3>
      <p>Brief sessions tend to be more focused and solution-oriented, addressing specific challenges rather than covering multiple topics in a single session.</p>
      
      <h3>4. Continuous Progress</h3>
      <p>Regular check-ins create momentum, allowing for continuous progress rather than the start-stop pattern that can happen with weekly sessions.</p>
      
      <h2>Case Study: Executive Leadership Team</h2>
      <p>A Fortune 500 company implemented a brief therapeutic intervention program for their executive leadership team. Over six months, participants reported:</p>
      <ul>
        <li>42% reduction in workplace stress</li>
        <li>27% improvement in decision-making confidence</li>
        <li>35% increase in work satisfaction</li>
        <li>89% program adherence (compared to 62% for traditional EAP services)</li>
      </ul>
      
      <h2>How to Implement Brief Therapeutic Check-ins</h2>
      <p>If you're interested in trying this approach, here are some strategies to consider:</p>
      
      <h3>1. Schedule Micro-Sessions</h3>
      <p>Set aside 15-30 minutes three times per week for focused therapeutic work. These can be at the beginning of your day, during lunch, or as a transition between work and home.</p>
      
      <h3>2. Use Technology Wisely</h3>
      <p>Leverage AI-powered therapeutic tools like TherapyKin that can provide support between traditional sessions and adapt to your schedule.</p>
      
      <h3>3. Focus on Implementation</h3>
      <p>Use brief sessions to practice specific techniques and skills rather than deep exploration. Save deeper work for less frequent, longer sessions if needed.</p>
      
      <h3>4. Track Progress</h3>
      <p>Use quick check-ins to monitor your progress on specific goals, which creates accountability and motivation.</p>
      
      <h2>The Future of Therapy for Busy Professionals</h2>
      <p>As work demands continue to increase, the mental health field is adapting to meet the needs of busy professionals. The shift toward brief, flexible, and technology-supported interventions represents an important evolution in how we approach mental wellbeing in the context of demanding careers.</p>
      
      <p>By embracing these new models, busy professionals can access the support they need without sacrificing their productivity or adding more stress to their schedules.</p>
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
          <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
          
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
