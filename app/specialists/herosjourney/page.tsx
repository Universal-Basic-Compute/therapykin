'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonial from "../../components/Testimonial";
import Link from "next/link";
import Head from "next/head";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HerosJourneySpecialist() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling down 500px
      if (window.scrollY > 500) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      <Head>
        <title>Hero's Journey Specialist | TherapyKin</title>
        <meta name="description" content="Embark on your Hero's Journey with specialized therapeutic support. Transform your challenges into strengths and discover your authentic path through ancient wisdom and modern psychology." />
        <meta name="keywords" content="hero's journey, personal transformation, shadow integration, therapeutic journey, mythological therapy, joseph campbell" />
        <meta property="og:title" content="Hero's Journey Specialist | TherapyKin" />
        <meta property="og:description" content="Embark on your Hero's Journey with specialized therapeutic support. Transform your challenges into strengths and discover your authentic path." />
        <meta property="og:image" content="/specialists/herosjourney-specialist.jpg" />
      </Head>
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4 relative">
        {/* Add this decorative background element */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[var(--primary-light)] blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-[var(--accent)] blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-[var(--primary-dark)] blur-3xl"></div>
        </div>
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
                      Hero's Journey Specialist
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="relative mb-12">
            {/* Hero background image */}
            <div className="absolute inset-0 z-0 h-[500px] overflow-hidden rounded-xl">
              <img 
                src="/hero.png" 
                alt="Hero's Journey" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-dark)]/60 via-[var(--primary)]/40 to-[var(--accent)]/30"></div>
            </div>
            
            <div className="relative z-10 pt-20 pb-24 px-6">
              <span className="px-3 py-1 bg-white/60 text-[var(--primary-dark)] rounded-full text-sm font-medium backdrop-blur-sm">
                Transformational Specialist
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-yellow-200 max-w-3xl mx-auto text-center">
                The Hero's Journey: A path to self healing & Transformation
              </h1>
              
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-lg border border-white/20 mb-8 max-w-xl mx-auto">
                <p className="text-xl text-[var(--primary)] text-center">
                  "Your childhood trauma, your depression, your anxiety, your mental health challenges, your addictions are paths to deep personal transformation because everything happens for a reason."
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-lg border border-white/20 mt-4 max-w-xl mx-auto">
                <p className="text-xl text-[var(--primary)] text-center">
                  Every human being has two journeys available: the Victim's Journey or the Hero's Journey. The Hero's Journey is an ancient framework for personal transformation that guides you through the challenges of life toward greater wholeness, purpose, and authenticity.
                </p>
              </div>
              
              {/* Add the CTA button here */}
              <div className="mt-8">
                <Link 
                  href="/chat?specialist=herosjourney" 
                  className="bg-white text-[var(--primary)] hover:bg-white/90 px-6 py-3 rounded-md font-medium inline-block text-lg transition-all"
                >
                  Start Your Hero's Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
          
          
          
          {/* Description paragraph moved to hero section */}
          
          <div className="mt-16 mb-20">
            <h2 className="text-2xl font-semibold mb-6 text-center">The Hero's Journey Path</h2>
            <p className="text-center text-foreground/80 mb-10 max-w-3xl mx-auto">
              The Hero's Journey follows twelve key stages that guide you through transformation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Card 1: The Ordinary World */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/1.png" 
                    alt="The Ordinary World" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">1. Ordinary World</h3>
                  <p className="text-sm text-foreground/70">
                    The hero begins in their familiar environment, unaware of the adventures to come.
                  </p>
                </div>
              </div>
              
              {/* Card 2: Call to Adventure */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/2.png" 
                    alt="Call to Adventure" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">2. Call to Adventure</h3>
                  <p className="text-sm text-foreground/70">
                    The hero is presented with a challenge, problem, or adventure to undertake.
                  </p>
                </div>
              </div>
              
              {/* Card 3: Refusal of the Call */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/3.png" 
                    alt="Refusal of the Call" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">3. Refusal of the Call</h3>
                  <p className="text-sm text-foreground/70">
                    The hero initially refuses the adventure because of fear, insecurity, or other obligations.
                  </p>
                </div>
              </div>
              
              {/* Card 4: Meeting the Mentor */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/4.png" 
                    alt="Meeting the Mentor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">4. Meeting the Mentor</h3>
                  <p className="text-sm text-foreground/70">
                    The hero encounters a mentor who provides guidance, wisdom, or magical gifts to help on the journey.
                  </p>
                </div>
              </div>
              
              {/* Card 5: Crossing the Threshold */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/5.png" 
                    alt="Crossing the Threshold" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">5. Crossing the Threshold</h3>
                  <p className="text-sm text-foreground/70">
                    The hero commits to the adventure and crosses into the special world where the rules are different.
                  </p>
                </div>
              </div>
              
              {/* Card 6: Tests, Allies, Enemies */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/6.png" 
                    alt="Tests, Allies, Enemies" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">6. Tests, Allies, Enemies</h3>
                  <p className="text-sm text-foreground/70">
                    The hero faces tests, encounters allies, and confronts enemies as they learn the rules of the special world.
                  </p>
                </div>
              </div>
              
              {/* Card 7: Approach to the Inmost Cave */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/7.png" 
                    alt="Approach to the Inmost Cave" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">7. Approach to the Inmost Cave</h3>
                  <p className="text-sm text-foreground/70">
                    The hero prepares for the major challenge in the special world, facing deep inner conflicts.
                  </p>
                </div>
              </div>
              
              {/* Card 8: The Ordeal */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/8.png" 
                    alt="The Ordeal" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">8. The Ordeal</h3>
                  <p className="text-sm text-foreground/70">
                    The hero faces their greatest fear, confronts death, and experiences a "death and rebirth" transformation.
                  </p>
                </div>
              </div>
              
              {/* Card 9: Reward (Seizing the Sword) */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/9.png" 
                    alt="Reward (Seizing the Sword)" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">9. Reward (Seizing the Sword)</h3>
                  <p className="text-sm text-foreground/70">
                    The hero takes possession of the treasure, reward, or elixir they sought, gaining new knowledge or power.
                  </p>
                </div>
              </div>
              
              {/* Card 10: The Road Back */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/10.png" 
                    alt="The Road Back" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">10. The Road Back</h3>
                  <p className="text-sm text-foreground/70">
                    The hero begins the journey back to the ordinary world, often pursued by remaining threats.
                  </p>
                </div>
              </div>
              
              {/* Card 11: Resurrection */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/11.png" 
                    alt="Resurrection" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">11. Resurrection</h3>
                  <p className="text-sm text-foreground/70">
                    The hero faces a final test where everything is at stake, experiencing a final moment of death and rebirth.
                  </p>
                </div>
              </div>
              
              {/* Card 12: Return with the Elixir */}
              <div className="card card-hover-lift overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/HJ/12.png" 
                    alt="Return with the Elixir" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">12. Return with the Elixir</h3>
                  <p className="text-sm text-foreground/70">
                    The hero returns to the ordinary world with the elixir, treasure, or lesson that can benefit others.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Each card represents a stage in the Hero's Journey, first introduced by the Ancient Priests of Kemet (Ancient Egypt). This framework highlights the universal pattern of transformation found in myths and stories across cultures.
              </p>
            </div>
          </div>
          
          
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">The Five Dimensions of Transformation</h2>
            <p className="text-center text-foreground/80 mb-10 max-w-3xl mx-auto">
              The Hero's Journey therapy addresses all five dimensions of your life, creating holistic transformation and balance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Spiritual Dimension */}
              <div className="bg-gradient-to-br from-white to-[var(--primary)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--primary)]/40 p-8 rounded-lg border border-[var(--primary)]/20 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Spiritual Dimension</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Your mental health, thoughts, mind & soul - the realm of purpose and meaning.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Discover your authentic purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Connect with deeper meaning in your life</span>
                  </li>
                </ul>
              </div>
              
              {/* Emotional Dimension */}
              <div className="bg-gradient-to-br from-white to-[var(--primary-dark)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--primary-dark)]/40 p-8 rounded-lg border border-[var(--primary-dark)]/20 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Emotional Dimension</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Your four families: biological family, soul's family, social family, and Hero's Journey family.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Heal family patterns and relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Find your soul's family and support network</span>
                  </li>
                </ul>
              </div>
              
              {/* Social Dimension */}
              <div className="bg-gradient-to-br from-white to-[var(--accent)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--accent)]/40 p-8 rounded-lg border border-[var(--accent)]/20 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Social Dimension</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Your community and society - what role do you play in the larger world?
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Develop meaningful connections</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Find your place in the larger community</span>
                  </li>
                </ul>
              </div>
              
              {/* Professional Dimension */}
              <div className="bg-gradient-to-br from-white to-[var(--primary-light)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--primary-light)]/40 p-8 rounded-lg border border-[var(--primary-light)]/20 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Professional Dimension</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Your sources of income and profession - how you contribute and sustain yourself.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Align your work with your authentic purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Transform career challenges into opportunities</span>
                  </li>
                </ul>
              </div>
              
              {/* Biological Dimension */}
              <div className="bg-gradient-to-br from-white to-[var(--accent-light)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--accent-light)]/40 p-8 rounded-lg border border-[var(--accent-light)]/20 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Biological Dimension</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Your immune system and physical health - the foundation of your wellbeing.
                </p>
                <ul className="text-foreground/70 space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Develop practices that support physical wellbeing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">•</span>
                    <span>Understand the mind-body connection in your journey</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">The Five Minds Framework</h2>
            <p className="text-center text-foreground/80 mb-10 max-w-3xl mx-auto">
              Understanding the five minds helps you navigate your Hero's Journey with greater awareness and intention.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* The Thinker Mind */}
              <div className="bg-gradient-to-br from-white to-[var(--primary)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--primary)]/40 p-8 rounded-lg border border-[var(--primary)]/20 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                    <img 
                      src="/HJ/thinker.png" 
                      alt="The Thinker Mind" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">The Thinker</h3>
                </div>
                <p className="text-foreground/70 mb-4 text-center">
                  Active 24 hours a day, constantly processing information
                </p>
                <div className="bg-[var(--primary)]/10 p-4 rounded-lg">
                  <p className="text-sm italic text-center">
                    "What if I approached this challenge as an opportunity for growth rather than an obstacle?"
                  </p>
                </div>
              </div>
              
              {/* The Observer Mind */}
              <div className="bg-gradient-to-br from-white to-[var(--primary-dark)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--primary-dark)]/40 p-8 rounded-lg border border-[var(--primary-dark)]/20 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-64 h-64 rounded-full overflow-hidden mb-4">
                    <img 
                      src="/HJ/observer.png" 
                      alt="The Observer Mind" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">The Observer</h3>
                </div>
                <p className="text-foreground/70 mb-4 text-center">
                  The ancient, wise mind that watches without judgment
                </p>
                <div className="bg-[var(--primary-dark)]/10 p-4 rounded-lg">
                  <p className="text-sm italic text-center">
                    "I notice these feelings arising within me, and I can watch them without becoming them."
                  </p>
                </div>
              </div>
              
              {/* The Judge Mind */}
              <div className="bg-gradient-to-br from-white to-[var(--accent)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--accent)]/40 p-8 rounded-lg border border-[var(--accent)]/20 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-64 h-64 rounded-full overflow-hidden mb-4">
                    <img 
                      src="/HJ/judge.png" 
                      alt="The Judge Mind" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">The Judge</h3>
                </div>
                <p className="text-foreground/70 mb-4 text-center">
                  The mind that creates labels and evaluations
                </p>
                <div className="bg-[var(--accent)]/10 p-4 rounded-lg">
                  <p className="text-sm italic text-center">
                    "I recognize when I'm judging myself or others, and I can choose compassion instead."
                  </p>
                </div>
              </div>
              
              {/* The Commentator Mind */}
              <div className="bg-gradient-to-br from-white to-[var(--primary-light)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--primary-light)]/40 p-8 rounded-lg border border-[var(--primary-light)]/20 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-64 h-64 rounded-full overflow-hidden mb-4">
                    <img 
                      src="/HJ/commentator.png" 
                      alt="The Commentator Mind" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">The Commentator</h3>
                </div>
                <p className="text-foreground/70 mb-4 text-center">
                  The voice that narrates and interprets your experience
                </p>
                <div className="bg-[var(--primary-light)]/10 p-4 rounded-lg">
                  <p className="text-sm italic text-center">
                    "I can rewrite the story I tell myself about this situation to empower rather than limit me."
                  </p>
                </div>
              </div>
              
              {/* The Doer Mind */}
              <div className="bg-gradient-to-br from-white to-[var(--accent-light)]/30 dark:from-[var(--background-alt)]/60 dark:to-[var(--accent-light)]/40 p-8 rounded-lg border border-[var(--accent-light)]/20 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-64 h-64 rounded-full overflow-hidden mb-4">
                    <img 
                      src="/HJ/doer.png" 
                      alt="The Doer Mind" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">The Doer</h3>
                </div>
                <p className="text-foreground/70 mb-4 text-center">
                  The mind that takes action based on the other minds
                </p>
                <div className="bg-[var(--accent-light)]/10 p-4 rounded-lg">
                  <p className="text-sm italic text-center">
                    "The Doer is the mind that takes action and executes instructions from the other four minds, whether helpful or harmful, simply following the directive to 'just do it' without questioning the wisdom of those choices."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-foreground/70 max-w-2xl mx-auto">
                By understanding these five minds, you can develop greater awareness of your thought patterns and learn to consciously choose which mind to engage with in different situations on your Hero's Journey.
              </p>
            </div>
          </div>
          
          {/* Book Recommendation Section */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg my-12 border border-white/20 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/4">
                <a href="https://www.amazon.co.uk/dp/B0DSFKX28M" target="_blank" rel="noopener noreferrer" className="block">
                  <img 
                    src="/HJ/book-cover.jpg" 
                    alt="The Hero's Journey Book Cover" 
                    className="w-full h-auto rounded-md shadow-md hover:shadow-lg transition-all"
                  />
                </a>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">Deepen Your Journey</h3>
                <p className="text-foreground/80 mb-4">
                  Continue your exploration with "The Hero's Journey: Love Yourself, Invest in Yourself, Heal Yourself" by Nelson Lecuane. This book provides a practical roadmap to healing and personal transformation.
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <span className="ml-2 text-sm text-foreground/70">5.0 out of 5 stars (4 reviews)</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.amazon.co.uk/dp/B0DSFKX28M" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)] transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"></path>
                    </svg>
                    Get the Book
                  </a>
                  <span className="text-sm text-foreground/60 self-center">Available in paperback and Kindle formats</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Exclusive Partnership Banner */}
          <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--primary-dark)] p-6 rounded-lg my-16 shadow-lg relative overflow-hidden">
            {/* Add decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            
            <div className="flex items-center relative z-10">
              <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-black text-xl font-bold mb-1">Exclusive Partnership</h3>
                <p className="text-black">
                  This specialist is powered by our therapeutic partnership with the Hero's Journey Academy, bringing their proven methodology directly to TherapyKin users.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Transformation Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial 
                quote="The story of the rock already inspired me to get my legs up to Stickle Tairn. It just shows the importance of trying every day, not giving up and persistently trying to 'move the rock' - that there is something good to come from it."
                author="Erin T."
                title="Teacher"
                imageSrc="/HJ/p1.png"
              />
              
              <Testimonial 
                quote="I spent years battling depression, anxiety and mental health problems. I did the therapy and I've never felt happier in my life."
                author="Gabriel"
                title="Mental Health Journey"
                imageSrc="/HJ/p2.png"
              />
              
              <Testimonial 
                quote="The call to adventure and rejection of the call resonated most with me because my anxiety has been known to hold me back."
                author="Rive"
                title="Media Professional"
                imageSrc="/HJ/p3.png"
              />
              
              <Testimonial 
                quote="I liked the story of Theseus pushing away the rock and finding the sword. It's important to not let one dimension let you lose sight of the other things that matter in life."
                author="Stephen"
                title="IT Apprentice"
                imageSrc="/HJ/p4.png"
              />
              
              <Testimonial 
                quote="My view is that it's an important tool, journey to learn and embark on so I can promote self growth and eventually the growth of those around me."
                author="Stan"
                title="Counsellor"
                imageSrc="/HJ/p5.png"
              />
              
              <Testimonial 
                quote="We are what we believe and need mentors for all aspects of life."
                author="Julian"
                title="Workshop Participant"
                imageSrc="/HJ/p6.png"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[var(--primary)]/80 via-[var(--primary-light)]/70 to-[var(--accent)]/70 p-8 rounded-lg mb-16 text-white shadow-lg relative overflow-hidden">
            {/* Add a subtle overlay to reduce brightness */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Make content relative to appear above the overlay */}
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-4">The Gifts of Your Journey</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <p className="mb-4 text-white/90">
                  Every Hero's Journey begins with a single step - recognizing the call to adventure. What's your rock? What challenge is inviting you to transformation?
                </p>
                <p className="text-white/90">
                  It doesn't matter how difficult your challenges have been or how badly you feel you've managed your life, there is always a path to light. That's the Hero's journey.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white p-6 rounded-full h-40 w-40 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <p className="text-[var(--primary)] font-bold text-xl">Begin Your</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">Journey</p>
                    <p className="text-sm text-foreground/60 mt-1">Transform today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section with a more elegant design */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm p-10 rounded-lg text-center border border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Start Your Hero's Journey?</h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Every journey begins with a single step. Start your transformation today and discover how your greatest challenges can become your greatest strengths.
            </p>
            <Link 
              href="/chat?specialist=herosjourney" 
              className="bg-white text-[var(--primary)] hover:bg-white/90 px-8 py-4 rounded-md font-bold inline-block text-lg hover:shadow-lg transition-all hover:-translate-y-1"
            >
              Start Your Hero's Journey
            </Link>
            <p className="text-sm text-white/80 mt-4">Transform your challenges into wisdom that lights the way for others.</p>
          </div>
        </div>

        {showFloatingCTA && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <Link 
              href="/chat?specialist=herosjourney" 
              className="flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Start Your Hero's Journey
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
