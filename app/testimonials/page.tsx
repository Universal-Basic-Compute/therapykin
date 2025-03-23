import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Testimonials() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h1>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              Real stories from people who've made TherapyKin part of their mental health journey
            </p>
          </div>
          
          {/* Coming Soon Card */}
          <div className="card p-8 shadow-depth text-center mb-16 max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Real Human Testimonials Coming Soon!</h2>
            <p className="text-foreground/70 mb-6">
              We're currently collecting authentic testimonials from our actual users. 
            </p>
            <p className="text-foreground/70 mb-6">
              In the meantime, we'll be honest with you – those glowing reviews you saw on our homepage? 
              They're AI-generated placeholders. We know, we know... using AI-generated testimonials for an AI therapy 
              product is a bit meta, isn't it?
            </p>
            <p className="text-foreground/70 mb-8">
              But soon, this page will feature real stories from real humans who have experienced the benefits of TherapyKin firsthand. 
              No AI embellishment needed – just authentic experiences.
            </p>
            
            <div className="card p-6 bg-[var(--background-alt)] max-w-md mx-auto mb-8">
              <p className="italic text-sm">
                "Want to share your TherapyKin experience? We'd love to hear from you! Your story could help others discover the support they need."
              </p>
            </div>
            
            <Link 
              href="/contact" 
              className="btn-primary inline-flex items-center"
            >
              Share Your Experience
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          {/* Sample Testimonial Format */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">How Testimonials Will Look</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card p-6 shadow-depth relative">
                <div className="absolute -top-3 -left-3 text-5xl text-[var(--primary)] opacity-20">"</div>
                <p className="mb-6 relative z-10">
                  This is where we'll showcase real feedback from actual TherapyKin users, highlighting their authentic experiences and the impact on their mental health journey.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">R</div>
                  <div>
                    <p className="font-semibold">Real Person</p>
                    <p className="text-sm text-foreground/60">Actual User</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 shadow-depth relative">
                <div className="absolute -top-3 -left-3 text-5xl text-[var(--primary)] opacity-20">"</div>
                <p className="mb-6 relative z-10">
                  Each testimonial will include specific details about how TherapyKin helped with particular challenges, the features they found most valuable, and the outcomes they experienced.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">H</div>
                  <div>
                    <p className="font-semibold">Human User</p>
                    <p className="text-sm text-foreground/60">Genuine Client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call for Testimonials */}
          <div className="card p-8 shadow-depth text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Be Among the First to Share Your Story</h2>
            <p className="text-foreground/70 mb-6">
              If you've been using TherapyKin and would like to share your experience, we'd be honored to feature your testimonial. 
              Your insights could help others who are considering taking this step in their mental health journey.
            </p>
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              Contact Us to Share Your Story
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
