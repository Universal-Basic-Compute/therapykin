'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonial from "../../components/Testimonial";
import Link from "next/link";
import Head from "next/head";

export default function SexologistSpecialist() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Sexual Health Specialist | TherapyKin</title>
        <meta name="description" content="A private space for your most intimate questions and concerns. Discuss sexual health topics with complete privacy and zero judgment." />
        <meta name="keywords" content="sexual health, intimacy, relationship counseling, sex therapy, sexual wellness, private therapy" />
        <meta property="og:title" content="Sexual Health Specialist | TherapyKin" />
        <meta property="og:description" content="A private space for your most intimate questions and concerns. Discuss sexual health topics with complete privacy and zero judgment." />
        <meta property="og:image" content="/specialists/sexologist-specialist.jpg" />
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
                      Sexual Health Specialist
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="mb-12">
            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
              Specialized Support
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Some things are easier to share with someone who isn't human</h1>
            
            <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-6 rounded-lg border-l-4 border-[var(--primary)] mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">A private space for your most intimate questions and concerns</h2>
              <p className="text-lg text-foreground/80">
                Sexual health and intimacy questions can be difficult to discuss—even with healthcare providers or partners. TherapyKin provides a completely private, judgment-free space where you can explore your most personal concerns.
              </p>
            </div>
            
            <p className="text-xl text-foreground/70 mb-4">
              As an AI therapeutic companion specializing in sexual health, TherapyKin offers evidence-based guidance, education, and support through natural conversation—with absolute privacy and zero judgment.
            </p>
  
            {/* Add the CTA button here */}
            <div className="mt-6 mb-8">
              <Link 
                href="/chat?specialist=sexologist" 
                className="btn-primary text-white px-6 py-3 rounded-md font-medium inline-block text-lg"
              >
                Start Your Private Conversation
              </Link>
              <span className="ml-4 text-sm text-foreground/60">No commitment required</span>
            </div>
          </div>
          
          {/* "Things I Would Never Say" Section */}
          <div className="bg-[var(--background-alt)] p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Things people tell me they've never said to another human</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-[var(--background)] p-5 rounded-lg shadow-sm">
                <p className="text-foreground/80 italic">"I've never told anyone about my pain during sex because I was afraid something was wrong with me."</p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background)] p-5 rounded-lg shadow-sm">
                <p className="text-foreground/80 italic">"I don't know what normal is supposed to feel like, and I've been too embarrassed to ask."</p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background)] p-5 rounded-lg shadow-sm">
                <p className="text-foreground/80 italic">"I've been faking orgasms for years and don't know how to talk to my partner about it."</p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background)] p-5 rounded-lg shadow-sm">
                <p className="text-foreground/80 italic">"I'm not sure if what I fantasize about is normal or healthy."</p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background)] p-5 rounded-lg shadow-sm">
                <p className="text-foreground/80 italic">"I don't know if the changes in my body are affecting my desire or if there's something wrong in my relationship."</p>
              </div>
              
              <div className="bg-white dark:bg-[var(--background)] p-5 rounded-lg shadow-sm">
                <p className="text-foreground/80 italic">"I've never been able to talk about the sexual trauma I experienced, but I need help understanding how it affects me now."</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-foreground/80 mb-4">Whatever you're struggling with, you don't have to face it alone—or share it with another human if you're not ready.</p>
              <Link 
                href="/chat?specialist=sexologist" 
                className="bg-[var(--primary)] text-white px-5 py-2 rounded-md font-medium inline-block"
              >
                Start Your Private Conversation
              </Link>
            </div>
          </div>
          
          {/* How It Works Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8 mb-16">
            <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] shadow-sm">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <h3 className="font-medium">Total Privacy</h3>
              </div>
              <p className="text-foreground/70 text-sm">
                Your conversations are encrypted and can be permanently deleted at any time. No human ever reviews your discussions.
              </p>
            </div>
            
            <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] shadow-sm">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <h3 className="font-medium">Evidence-Based</h3>
              </div>
              <p className="text-foreground/70 text-sm">
                Receive accurate, up-to-date information about sexual health based on current research and therapeutic best practices.
              </p>
            </div>
            
            <div className="flex-1 bg-white dark:bg-[var(--background-alt)]/50 p-5 rounded-lg border border-[var(--primary)] shadow-sm">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-[var(--primary)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <h3 className="font-medium">Judgment-Free</h3>
              </div>
              <p className="text-foreground/70 text-sm">
                Discuss any topic without fear of shocking, embarrassing, or disappointing someone—there's no judgment here.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Expert guidance on intimate topics</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Sexual Health Education</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Intimacy Techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Relationship Dynamics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Body Image & Confidence</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Sexual Concerns</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mindful Sexuality</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Why people choose TherapyKin</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Complete privacy with no human involvement</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>24/7 availability for unlimited conversations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Zero judgment or emotional reactions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Evidence-based information on sexual health</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Affordable compared to traditional therapy</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Personalized support that adapts over time</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">A completely private space for intimate conversations</h2>
            <p className="text-center text-foreground/80 mb-10 max-w-3xl mx-auto">
              TherapyKin provides a unique environment where you can discuss sensitive topics without the fear or embarrassment that might come with human interaction.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Natural Conversation */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Natural Conversation</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  No forms or clinical questionnaires—just talk naturally about what's on your mind, as if speaking with a knowledgeable, compassionate specialist.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Discuss topics in your own words</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>No awkward silences or reactions</span>
                  </li>
                </ul>
              </div>
              
              {/* Available Anytime */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Available Anytime</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Get support whenever you need it—whether it's 3 AM or during your lunch break—without scheduling appointments.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>No waiting for appointments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Support exactly when you need it</span>
                  </li>
                </ul>
              </div>
              
              {/* Grows With You */}
              <div className="bg-white dark:bg-[var(--background-alt)]/50 p-8 rounded-lg border border-foreground/5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Grows With You</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Unlike other apps, TherapyKin remembers your history and adapts to your needs over time, creating a truly personalized experience.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Builds on previous conversations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Adapts to your unique situation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">What Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial 
                quote="I've had questions about my sexuality for years but was too embarrassed to ask anyone—even my doctor. Being able to ask without seeing judgment or embarrassment on someone's face made all the difference."
                author="Anonymous"
                title="TherapyKin User"
              />
              
              <Testimonial 
                quote="After my divorce, I was struggling with intimacy issues but couldn't bring myself to discuss it with a therapist face-to-face. TherapyKin gave me a safe space to work through my concerns at my own pace."
                author="Anonymous"
                title="TherapyKin User"
              />
            </div>
          </div>
          
          <div className="bg-[var(--background-alt)] p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-4">Start your private conversation today</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="bg-[var(--primary)]/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <span className="text-[var(--primary)] font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Create your private account</h3>
                <p className="text-foreground/70 text-sm">Sign up with just an email—no personal information required.</p>
              </div>
              
              <div>
                <div className="bg-[var(--primary)]/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <span className="text-[var(--primary)] font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Start your conversation</h3>
                <p className="text-foreground/70 text-sm">Begin talking about whatever's on your mind—no forms or questionnaires.</p>
              </div>
              
              <div>
                <div className="bg-[var(--primary)]/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <span className="text-[var(--primary)] font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Experience the difference</h3>
                <p className="text-foreground/70 text-sm">Feel what it's like to discuss intimate topics without judgment or embarrassment.</p>
              </div>
            </div>
          </div>

          <div className="text-center bg-[var(--background-alt)] p-10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to discuss what matters most?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
              Experience the freedom of discussing intimate topics in a completely private, judgment-free environment. Start your journey to better sexual health and wellbeing today.
            </p>
            <Link 
              href="/chat?specialist=sexologist" 
              className="btn-primary text-white px-8 py-4 rounded-md font-medium inline-block text-lg"
            >
              Try Your First Session Free
            </Link>
            <p className="text-sm text-foreground/60 mt-4">Your privacy is our priority. All conversations are encrypted and can be permanently deleted at any time.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
