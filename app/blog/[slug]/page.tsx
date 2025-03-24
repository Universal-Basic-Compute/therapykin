'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import TableOfContents from "../../components/TableOfContents";
import ReadingTime from "../../components/ReadingTime";
import CommentSection from "../../components/CommentSection";
import ArticleSchema from "../../components/ArticleSchema";
import { getPostBySlug, blogPosts } from "../../data/blog-posts";
import Head from "next/head";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  // Find the blog post with the matching slug
  const post = getPostBySlug(slug as string);
  
  // Move the redirect to useEffect
  useEffect(() => {
    // If post not found, redirect to blog index
    if (!post) {
      router.push('/blog');
    }
  }, [post, router]);
  
  // Return early if post is not found
  if (!post) {
    return null; // or a loading state
  }
  
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://therapykin.ai/blog/${post.slug}`;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{post.title} | TherapyKin Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, mental health, therapy, ${post.persona}, TherapyKin`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl || "https://therapykin.ai/logo.png"} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.excerpt} />
        <meta property="twitter:image" content={post.imageUrl || "https://therapykin.ai/logo.png"} />
      </Head>
      
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        author={post.author}
        imageUrl={post.imageUrl || ""}
        url={currentUrl}
      />
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
            <div className="flex flex-wrap items-center gap-2 text-foreground/60">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <ReadingTime content={post.content} />
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
              {post.imageUrl ? (
                <img 
                  src={post.imageUrl} 
                  alt={`Featured image for article: ${post.title} - TherapyKin Blog`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                  <span className="text-[var(--primary)] font-medium">Featured Article Image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Content Layout with Table of Contents for longer posts */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Table of Contents for longer posts */}
            {post.content.length > 5000 && (
              <div className="md:w-1/4">
                <TableOfContents content={post.content} />
              </div>
            )}
            
            {/* Main Content */}
            <div className={post.content.length > 5000 ? "md:w-3/4" : "w-full"}>
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none mb-12 blog-content" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>
          </div>
          
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
            <ShareButtons 
              title={post.title} 
              url={currentUrl} 
              sources={post.sources}
            />
          </div>
          
          {/* Comment Section */}
          <CommentSection postSlug={post.slug} />
          
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
                      {relatedPost.imageUrl ? (
                        <img 
                          src={relatedPost.imageUrl} 
                          alt={`Image for ${relatedPost.title}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10">
                          <span className="text-[var(--primary)] font-medium">Article Image</span>
                        </div>
                      )}
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
