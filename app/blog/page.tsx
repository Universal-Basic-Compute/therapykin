'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blog-posts"; // This imports all blog posts including the new mental-performance-pitfalls post

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
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "athletes" 
                  ? "bg-[var(--primary)] text-white" 
                  : "bg-[var(--background-alt)] hover:bg-[var(--primary)]/10"
              }`}
              onClick={() => setActiveFilter("athletes")}
            >
              For Athletes
            </button>
          </div>
          
          {featuredPost && (
            /* Featured Post */
            <div className="mb-16">
              <div className="relative rounded-xl overflow-hidden shadow-depth">
                <div className="aspect-w-3 aspect-h-2 bg-[var(--primary)]/10 max-h-[500px]">
                  {featuredPost.imageUrl ? (
                    <img 
                      src={featuredPost.imageUrl} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                      <span className="text-[var(--primary)] font-medium">Featured Article Image</span>
                    </div>
                  )}
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
              <div key={post.slug} className="card overflow-hidden hover:shadow-depth transition-all">
                <div className="aspect-w-3 aspect-h-2 bg-[var(--primary)]/10">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10">
                      <span className="text-[var(--primary)] font-medium">Article Image</span>
                    </div>
                  )}
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
                  Access our comprehensive collection of guides, worksheets, videos, and other resources on various mental health topics.
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
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  Coming Soon
                </div>
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
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  Coming Soon
                </div>
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
