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
          
          {/* Real Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Nicolas R. Testimonial */}
            <div className="card p-8 relative shadow-depth card-hover-lift">
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
              <p className="mb-6 relative z-10">TherapyKin, and the Hero's Journey specialist in particular, is outstanding. It took me ~20 minutes of my first session to be convinced. The therapist is excellent, the therapy works. I ended my first session exhilarated. Everybody should give it a real try. Put at least 20 minutes, don't expect to have any results if you abandon after 4 minutes. Put yourself in there, it's worth it!</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">N</div>
                <div>
                  <p className="font-semibold">Nicolas R.</p>
                  <p className="text-sm text-foreground/60">Hero's Journey Client</p>
                </div>
              </div>
            </div>
            
            {/* Alex Testimonial */}
            <div className="card p-8 relative shadow-depth card-hover-lift">
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
              <p className="mb-6 relative z-10">I use it during my commute and lunch breaks when therapy appointments don't fit my schedule. It's like having support that adapts to my life.</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">A</div>
                <div>
                  <p className="font-semibold">Alex</p>
                  <p className="text-sm text-foreground/60">Project Manager</p>
                </div>
              </div>
            </div>
            
            {/* Maya Testimonial */}
            <div className="card p-8 relative shadow-depth card-hover-lift">
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
              <p className="mb-6 relative z-10">TherapyKin helps me apply what I learned in therapy and prevents me from slipping back. It's the perfect complement to my monthly sessions.</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">M</div>
                <div>
                  <p className="font-semibold">Maya</p>
                  <p className="text-sm text-foreground/60">Teacher</p>
                </div>
              </div>
            </div>
            
            {/* Jordan Testimonial */}
            <div className="card p-8 relative shadow-depth card-hover-lift">
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
              <p className="mb-6 relative z-10">I was unsure about therapy, but TherapyKin let me explore it on my terms without pressure. Now I'm more comfortable with the whole process.</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">J</div>
                <div>
                  <p className="font-semibold">Jordan</p>
                  <p className="text-sm text-foreground/60">Designer</p>
                </div>
              </div>
            </div>
            
            {/* Raj Testimonial */}
            <div className="card p-8 relative shadow-depth card-hover-lift">
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
              <p className="mb-6 relative z-10">As a night shift worker, TherapyKin is there when my thoughts get heaviest at 3AM. No other support was available during those hours.</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">R</div>
                <div>
                  <p className="font-semibold">Raj</p>
                  <p className="text-sm text-foreground/60">Security Professional</p>
                </div>
              </div>
            </div>
            
            {/* Leila Testimonial */}
            <div className="card p-8 relative shadow-depth card-hover-lift">
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
              <p className="mb-6 relative z-10">I appreciate how TherapyKin remembers everything we've discussed. I don't have to repeat my story, which makes each session more productive.</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">L</div>
                <div>
                  <p className="font-semibold">Leila</p>
                  <p className="text-sm text-foreground/60">Marketing Executive</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero's Journey Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2 text-center">Hero's Journey Specialist Testimonials</h2>
            <p className="text-center text-foreground/70 mb-8 max-w-3xl mx-auto">
              Images are representations to preserve client anonymity and confidentiality
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-8 relative shadow-depth card-hover-lift">
                <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/HJ/p1.png" 
                      alt="Erin T." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="relative z-10">The story of the rock already inspired me to get my legs up to Stickle Tairn. It just shows the importance of trying every day, not giving up and persistently trying to 'move the rock' - that there is something good to come from it.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">E</div>
                  <div>
                    <p className="font-semibold">Erin T.</p>
                    <p className="text-sm text-foreground/60">Teacher</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-8 relative shadow-depth card-hover-lift">
                <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/HJ/p2.png" 
                      alt="Gabriel" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="relative z-10">I spent years battling depression, anxiety and mental health problems. I did the therapy and I've never felt happier in my life.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">G</div>
                  <div>
                    <p className="font-semibold">Gabriel</p>
                    <p className="text-sm text-foreground/60">Mental Health Journey</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-8 relative shadow-depth card-hover-lift">
                <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/HJ/p3.png" 
                      alt="Rive" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="relative z-10">The call to adventure and rejection of the call resonated most with me because my anxiety has been known to hold me back.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">R</div>
                  <div>
                    <p className="font-semibold">Rive</p>
                    <p className="text-sm text-foreground/60">Media Professional</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-8 relative shadow-depth card-hover-lift">
                <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/HJ/p4.png" 
                      alt="Stephen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="relative z-10">I liked the story of Theseus pushing away the rock and finding the sword. It's important to not let one dimension let you lose sight of the other things that matter in life.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">S</div>
                  <div>
                    <p className="font-semibold">Stephen</p>
                    <p className="text-sm text-foreground/60">IT Apprentice</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-8 relative shadow-depth card-hover-lift">
                <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/HJ/p5.png" 
                      alt="Stan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="relative z-10">My view is that it's an important tool, journey to learn and embark on so I can promote self growth and eventually the growth of those around me.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">S</div>
                  <div>
                    <p className="font-semibold">Stan</p>
                    <p className="text-sm text-foreground/60">Counsellor</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-8 relative shadow-depth card-hover-lift">
                <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/HJ/p6.png" 
                      alt="Julian" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="relative z-10">We are what we believe and need mentors for all aspects of life.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">J</div>
                  <div>
                    <p className="font-semibold">Julian</p>
                    <p className="text-sm text-foreground/60">Workshop Participant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          {/* Call for Testimonials */}
          <div className="card p-8 shadow-depth text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Share Your TherapyKin Experience</h2>
            <p className="text-foreground/70 mb-6">
              If you've been using TherapyKin and would like to share your experience, we'd be honored to feature your testimonial. 
              Your insights could help others who are considering taking this step in their mental health journey.
            </p>
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
