'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Blog post data structure based on your persona analysis
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
    persona: "busy-professional"
  },
  {
    id: 2,
    title: "Mental Agility: Why Top Performers Are Switching from Traditional Therapy to Adaptive Support",
    excerpt: "Discover the connection between mental flexibility and workplace performance, and why adaptive support creates better outcomes.",
    date: "2023-11-08",
    author: "TherapyKin Team",
    category: "Workplace Performance",
    imageUrl: "/blog/mental-agility.jpg",
    slug: "mental-agility-top-performers",
    persona: "busy-professional"
  },
  {
    id: 3,
    title: "Between Meetings and Deadlines: How AI-Powered Therapy is Filling the Mental Health Gap for Leaders",
    excerpt: "For those with unpredictable schedules, AI-powered therapy offers a flexible solution that adapts to your availability.",
    date: "2023-10-25",
    author: "TherapyKin Team",
    category: "Technology",
    imageUrl: "/blog/ai-therapy.jpg",
    slug: "ai-therapy-busy-leaders",
    persona: "busy-professional"
  },
  
  // Rural Resident (Sarah) Articles
  {
    id: 4,
    title: "Beyond Geography: How Rural Americans Are Finding Quality Mental Health Support Without the Drive",
    excerpt: "Rural residents are discovering effective alternatives to distant in-person therapy, saving time and money while getting quality care.",
    date: "2023-10-18",
    author: "TherapyKin Team",
    category: "Rural Access",
    imageUrl: "/blog/rural-therapy.jpg",
    slug: "rural-mental-health-access",
    persona: "rural-resident"
  },
  {
    id: 5,
    title: "Finding Privacy in Small Communities: Why Digital Therapy is Becoming the Preferred Choice in Rural America",
    excerpt: "In small towns where everyone knows everyone, digital therapy offers a level of privacy that traditional options can't match.",
    date: "2023-10-10",
    author: "TherapyKin Team",
    category: "Privacy",
    imageUrl: "/blog/rural-privacy.jpg",
    slug: "privacy-small-communities",
    persona: "rural-resident"
  },
  {
    id: 6,
    title: "Understanding Rural Stress: How Specialized Support is Addressing the Unique Mental Health Challenges of Rural Life",
    excerpt: "Rural life comes with distinctive stressors that urban-focused therapy often misses. Learn how specialized support is making a difference.",
    date: "2023-10-03",
    author: "TherapyKin Team",
    category: "Rural Life",
    imageUrl: "/blog/rural-stress.jpg",
    slug: "rural-specific-mental-health",
    persona: "rural-resident"
  },
  
  // Supplemental Support Seeker (Leila) Articles
  {
    id: 7,
    title: "The Missing Piece: Why Therapists Are Now Recommending Between-Session Support for Faster Progress",
    excerpt: "Research shows that most therapeutic growth happens between sessions. Learn how supplemental support can accelerate your progress.",
    date: "2023-09-25",
    author: "TherapyKin Team",
    category: "Therapy Enhancement",
    imageUrl: "/blog/between-sessions.jpg",
    slug: "between-session-support",
    persona: "supplemental-seeker"
  },
  {
    id: 8,
    title: "When You Can't Wait Until Tuesday: Creating a Safety Net for Emotional Crises Between Therapy Sessions",
    excerpt: "Emotional crises don't follow a schedule. Discover how to build a comprehensive support system for those moments when you need help now.",
    date: "2023-09-18",
    author: "TherapyKin Team",
    category: "Crisis Management",
    imageUrl: "/blog/crisis-support.jpg",
    slug: "emotional-crisis-support",
    persona: "supplemental-seeker"
  },
  {
    id: 9,
    title: "From Insight to Implementation: How Daily Practice With AI Support Transforms Therapeutic Techniques into Habits",
    excerpt: "Understanding therapeutic techniques isn't enough—you need to practice them consistently to create lasting change.",
    date: "2023-09-10",
    author: "TherapyKin Team",
    category: "Technique Practice",
    imageUrl: "/blog/therapeutic-practice.jpg",
    slug: "therapy-technique-practice",
    persona: "supplemental-seeker"
  }
];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Filter posts based on active filter
  const filteredPosts = activeFilter === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.persona === activeFilter);
  
  // Get featured post (first post after filtering)
  const featuredPost = filteredPosts[0];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">TherapyKin Blog</h1>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              Insights, research, and practical advice to support your mental health journey
            </p>
          </div>
          
          {/* Persona Filter */}
          <div className="mb-12 flex flex-wrap gap-2 justify-center">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "all" 
                  ? "bg-[var(--primary)] text-white" 
                  : "bg-[var(--background-alt)] hover:bg-[var(--primary)]/10"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Articles
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "busy-professional" 
                  ? "bg-[var(--primary)] text-white" 
                  : "bg-[var(--background-alt)] hover:bg-[var(--primary)]/10"
              }`}
              onClick={() => setActiveFilter("busy-professional")}
            >
              For Busy Professionals
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "rural-resident" 
                  ? "bg-[var(--primary)] text-white" 
                  : "bg-[var(--background-alt)] hover:bg-[var(--primary)]/10"
              }`}
              onClick={() => setActiveFilter("rural-resident")}
            >
              For Rural Residents
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "supplemental-seeker" 
                  ? "bg-[var(--primary)] text-white" 
                  : "bg-[var(--background-alt)] hover:bg-[var(--primary)]/10"
              }`}
              onClick={() => setActiveFilter("supplemental-seeker")}
            >
              Supplemental Support
            </button>
          </div>
          
          {featuredPost && (
            /* Featured Post */
            <div className="mb-16">
              <div className="relative rounded-xl overflow-hidden shadow-depth">
                <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
                  {/* In a real implementation, you would use actual images */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                    <span className="text-[var(--primary)] font-medium">Featured Article Image</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="mb-2">
                    <span className="px-2 py-1 bg-[var(--primary)] rounded-full text-xs font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{featuredPost.title}</h2>
                  <p className="mb-4 text-white/80">{featuredPost.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">{featuredPost.date} • {featuredPost.author}</span>
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="px-4 py-2 bg-white text-[var(--primary)] rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.slice(1).map((post) => (
              <div key={post.id} className="card overflow-hidden hover:shadow-depth transition-all">
                <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
                  {/* In a real implementation, you would use actual images */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10">
                    <span className="text-[var(--primary)] font-medium">Article Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground/60">{post.date}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-[var(--primary)] text-sm font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Newsletter Signup */}
          <div className="card p-8 bg-[var(--background-alt)] shadow-depth mb-16">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-foreground/70">
                Get the latest articles, resources, and mental health insights delivered to your inbox.
              </p>
            </div>
            <form className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  required
                />
                <button 
                  type="submit" 
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-foreground/60 mt-2 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
          
          {/* Additional Resources */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mental Health Library</h3>
                <p className="text-foreground/70 mb-4">
                  Access our comprehensive collection of articles, guides, and research on various mental health topics.
                </p>
                <Link href="/resources/library" className="text-[var(--primary)] font-medium hover:underline">
                  Browse Library →
                </Link>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
                <p className="text-foreground/70 mb-4">
                  Watch guided tutorials on therapeutic techniques, mindfulness exercises, and stress management.
                </p>
                <Link href="/resources/videos" className="text-[var(--primary)] font-medium hover:underline">
                  Watch Videos →
                </Link>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upcoming Webinars</h3>
                <p className="text-foreground/70 mb-4">
                  Join our live webinars featuring mental health experts discussing various topics and answering questions.
                </p>
                <Link href="/resources/webinars" className="text-[var(--primary)] font-medium hover:underline">
                  View Schedule →
                </Link>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="card p-8 shadow-depth text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience TherapyKin?</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Start your journey with TherapyKin today and discover how our personalized approach can support your mental wellbeing.
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
