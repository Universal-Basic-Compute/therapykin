'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ForTherapists() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        {/* Hero section with gradient background */}
        <div className="relative overflow-hidden rounded-3xl mb-16 max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary-dark)] opacity-90"></div>
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="relative z-10 py-20 px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Extend Your Therapeutic Reach with TherapyKin</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-center text-white/90">
              Transform Your Practice, Preserve Your Essence
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Your therapeutic approach is unique. It's the culmination of your education, experience, and personal insight. 
              What if you could extend its reach beyond the constraints of time, location, and physical capacity—without 
              sacrificing its authenticity?
            </p>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">Introducing the TherapyKin Partnership Program</h2>
            <div className="card p-8 mb-8">
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                TherapyKin translates your distinct therapeutic methodology into an AI extension of your practice—preserving 
                your authentic voice, techniques, and wisdom while allowing you to help thousands instead of dozens.
              </p>
              
              <h3 className="text-2xl font-semibold mb-6 text-center">Our Proprietary DNA Extraction Process</h3>
              <div className="mb-8 relative aspect-[2/1] w-full overflow-hidden rounded-xl shadow-lg">
                <Image 
                  src="https://via.placeholder.com/800x400" 
                  alt="The TherapyKin Extraction Process" 
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-700"
                />
              </div>
              
              <p className="text-lg text-foreground/80 mb-4">Our systematic method captures the essence of your therapeutic approach:</p>
              <ol className="list-decimal pl-5 space-y-4 mb-6 text-foreground/80">
                <li className="pl-2">
                  <strong className="text-[var(--primary)]">Source Material Analysis</strong> 
                  <p className="mt-1">We study your written work, session recordings, and methodological framework</p>
                </li>
                <li className="pl-2">
                  <strong className="text-[var(--primary)]">Core Framework Extraction</strong> 
                  <p className="mt-1">We identify your unique therapeutic concepts and techniques</p>
                </li>
                <li className="pl-2">
                  <strong className="text-[var(--primary)]">Therapeutic Style Analysis</strong> 
                  <p className="mt-1">We capture your distinctive voice, language patterns, and interaction style</p>
                </li>
                <li className="pl-2">
                  <strong className="text-[var(--primary)]">Implementation Design</strong> 
                  <p className="mt-1">We create a structured approach for translating your methodology into AI</p>
                </li>
                <li className="pl-2">
                  <strong className="text-[var(--primary)]">Validation Testing</strong> 
                  <p className="mt-1">We refine the system through iterative testing with your input</p>
                </li>
                <li className="pl-2">
                  <strong className="text-[var(--primary)]">Client Experience Optimization</strong> 
                  <p className="mt-1">We ensure the final product delivers authentic therapeutic value</p>
                </li>
              </ol>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">Why Leading Therapists Are Joining TherapyKin</h2>
            
            <div className="card p-8 mb-8 card-hover-glow">
              <blockquote className="border-l-4 border-[var(--primary)] pl-6 py-2 italic mb-6 text-foreground/80">
                <p className="text-lg">"After 25 years of developing my therapeutic approach, TherapyKin has allowed me to extend my reach beyond what I thought possible. My methodology now helps people while I sleep, while maintaining the essence of how I work."</p>
                <footer className="mt-4 font-medium text-[var(--primary)]">— Dr. Emily Chen, Trauma Specialist</footer>
              </blockquote>
            </div>
            
            <h3 className="text-2xl font-semibold mb-6 text-center">Your Practice, Amplified</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card p-6 card-hover-lift">
                <div className="flex items-start mb-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Extend Your Impact</h4>
                    <p className="text-foreground/70">Reach more clients without increasing your personal workload</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex items-start mb-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Preserve Your Legacy</h4>
                    <p className="text-foreground/70">Your therapeutic approach continues to help people for years to come</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex items-start mb-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Generate Passive Income</h4>
                    <p className="text-foreground/70">Earn 10% profit redistribution on all client interactions</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex items-start mb-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Maintain Your Authority</h4>
                    <p className="text-foreground/70">You remain the source and center of the therapeutic relationship</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 card-hover-lift md:col-span-2">
                <div className="flex items-start mb-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Support Between Sessions</h4>
                    <p className="text-foreground/70">Your clients receive consistent guidance aligned with your approach</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">How Your Clients Benefit</h2>
            <div className="card p-8 bg-gradient-to-br from-[var(--background-alt)] to-[var(--card-bg)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-[var(--accent)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Continuous Support</h4>
                    <p className="text-foreground/70">Access to your therapeutic wisdom whenever they need it</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[var(--accent)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Consistent Approach</h4>
                    <p className="text-foreground/70">Guidance that maintains your unique methodology</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[var(--accent)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Accessibility</h4>
                    <p className="text-foreground/70">Reduced barriers of cost, scheduling, and location</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[var(--accent)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Tailored Experience</h4>
                    <p className="text-foreground/70">Choose from multiple voice options and session lengths</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">Our Success Stories</h2>
            
            <div className="card p-8 mb-10 card-hover-glow border-l-4 border-[var(--primary-dark)]">
              <h3 className="text-2xl font-semibold mb-4">Nelson Lecuane, The Hero's Journey</h3>
              <blockquote className="mb-6 text-foreground/80">
                <p className="text-lg italic leading-relaxed">"The TherapyKin extraction process was remarkable. They didn't just digitize my words—they captured the essence of the Hero's Journey approach I've developed over years. Now clients can begin their transformative journey even when I'm not personally available, using the exact methodology I would guide them with. The five dimensions framework, mythological references, and shadow integration techniques are all preserved authentically. This isn't just technology—it's my therapeutic legacy extended to those who need it most."</p>
                <footer className="mt-4 font-medium text-[var(--primary-dark)]">— Nelson Lecuane, Creator of The Hero's Journey Therapeutic Approach</footer>
              </blockquote>
            </div>
            
            <div className="card p-8 card-hover-glow border-l-4 border-[var(--accent)]">
              <h3 className="text-2xl font-semibold mb-4">Client Impact</h3>
              <blockquote className="mb-6 text-foreground/80">
                <p className="text-lg italic leading-relaxed">"I was skeptical about AI therapy until I experienced Nelson's Hero's Journey approach through TherapyKin. It was uncanny how it guided me to name my 'rock' and helped me understand where I was on my journey. During a critical moment of addiction recovery, it provided the exact support I needed between my regular sessions. The mythology references and five dimensions assessment gave me a framework to understand my challenges that changed everything."</p>
                <footer className="mt-4 font-medium text-[var(--accent)]">— Anthony, Hero's Journey Client</footer>
              </blockquote>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">The Partnership Process</h2>
            <div className="mb-8 relative aspect-[4/1] w-full overflow-hidden rounded-xl shadow-lg">
              <Image 
                src="https://via.placeholder.com/800x200" 
                alt="Partnership Timeline" 
                fill
                className="object-cover"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card p-6 card-hover-lift">
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xl mb-4 mx-auto">1</div>
                <h4 className="font-bold text-center mb-2">Initial Consultation</h4>
                <p className="text-foreground/70 text-center">We discuss your therapeutic approach and partnership goals</p>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xl mb-4 mx-auto">2</div>
                <h4 className="font-bold text-center mb-2">Material Collection</h4>
                <p className="text-foreground/70 text-center">We gather examples of your work and methodology</p>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xl mb-4 mx-auto">3</div>
                <h4 className="font-bold text-center mb-2">Extraction Process</h4>
                <p className="text-foreground/70 text-center">Our team captures the essence of your approach</p>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xl mb-4 mx-auto">4</div>
                <h4 className="font-bold text-center mb-2">Collaborative Refinement</h4>
                <p className="text-foreground/70 text-center">We work together to ensure authenticity</p>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xl mb-4 mx-auto">5</div>
                <h4 className="font-bold text-center mb-2">Launch Preparation</h4>
                <p className="text-foreground/70 text-center">We prepare your TherapyKin extension for clients</p>
              </div>
              
              <div className="card p-6 card-hover-lift">
                <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xl mb-4 mx-auto">6</div>
                <h4 className="font-bold text-center mb-2">Ongoing Optimization</h4>
                <p className="text-foreground/70 text-center">We continuously improve based on client interactions</p>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">Designed for Ethical Practice</h2>
            <div className="card p-8 bg-gradient-to-br from-[var(--background-alt)] to-[var(--card-bg)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-[var(--primary-dark)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Client Privacy Protected</h4>
                    <p className="text-foreground/70">All data handling meets highest security standards</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[var(--primary-dark)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Transparent AI Relationship</h4>
                    <p className="text-foreground/70">Clients always know they're working with an AI extension</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[var(--primary-dark)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Appropriate Scope</h4>
                    <p className="text-foreground/70">Clear boundaries about what the AI can and cannot address</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[var(--primary-dark)]/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Therapist Remains Central</h4>
                    <p className="text-foreground/70">The AI supports but never replaces your therapeutic relationship</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="card p-8 border-t-4 border-[var(--primary)]">
              <h2 className="text-2xl font-semibold mb-4">Limited Partnership Opportunities</h2>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                We're selectively partnering with therapists who have developed distinctive methodologies that can benefit 
                from AI extension. Due to our thorough extraction process, we can only onboard a limited number of 
                therapeutic approaches each quarter.
              </p>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="card p-10 text-center bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary-dark)]/5 border border-[var(--primary)]/20">
              <h2 className="text-3xl font-semibold mb-6">Ready to Extend Your Impact?</h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Schedule a 30-minute consultation to discuss how TherapyKin can amplify your therapeutic approach 
                while preserving its essence.
              </p>
              
              <a 
                href="https://calendly.com/nlrai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary inline-block px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Book Your Consultation Now
              </a>
            </div>
          </section>
          
          <div className="text-center italic text-foreground/60 mt-16">
            <p className="text-lg">TherapyKin: Your Methodology, Extended Reach</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
