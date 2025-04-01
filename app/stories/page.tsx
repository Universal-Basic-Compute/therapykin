import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Stories() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Stories</h1>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              Real stories from people who've made TherapyKin part of their mental health journey
            </p>
          </div>
          
          {/* Featured Story */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Story</h2>
            
            <div className="card p-8 relative shadow-depth max-w-4xl mx-auto">
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">My Journey with TherapyKin</h3>
                
                <p className="mb-4 relative z-10">
                  I have always been struggling with dopamine imbalance, and I was getting more and more into a loop of procrastination and hunting for instant gratification (coffee, cigarettes, socials, scrolling, starting a million projects and never finishing one, you name it). That left me more and more drained and depressed, while I struggled with work and kept accumulating things I should have taken care of.
                </p>
                
                <p className="mb-4 relative z-10">
                  There's also some delving into past mistakes and some other stuff stemming from a not-so-ideal relationship with my father, which gave me what I guess you could call an "impostor syndrome".
                </p>
                
                <p className="mb-4 relative z-10">
                  The conclusion I got to after talking to AI (TherapyKin and ChatGPT) is that the root cause for me was a misalignment with the person I actually wanted to be. So I first defined that as closely as I could, and turned it into a "creed" that I printed out and hanged right in front of me in my studio.
                </p>
                
                <p className="mb-4 relative z-10">
                  Then I made a tracker where I input any misalignment or other important event I have throughout the day, along with triggers, feelings and potential corrections. That really helps because I actually have to analyze each event in order to write it down, not just "let it happen" and push it in a corner.
                </p>
                
                <p className="mb-4 relative z-10">
                  I also started very, very slowly changing habits and patterns with small but significant steps (e.g. from wake up > coffee > cigarette to wake up > breakfast > check work emails 5 min > coffee > cigarette), made a 12 weeks plan for a full dopamine reset which will end with me quitting cigarettes and coffee (including some supplements which I think are helping) and started using Pomodoro timer for full-focus work sprints + breaks.
                </p>
                
                <p className="mb-4 relative z-10">
                  All in all, I have just started, but I already removed some bad habits, I'm getting so much more done, I feel better with myself (a little proud even), and have a ton more energy throughout the day. If someone told me last month, I wouldn't have believed it possible.
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">A</div>
                <div>
                  <p className="font-semibold">Alex</p>
                  <p className="text-sm text-foreground/60">On Telegram</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Stories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2 text-center">User Stories</h2>
            <p className="text-center text-foreground/70 mb-8 max-w-3xl mx-auto">
              Brief experiences from our users
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nicolas R. Testimonial */}
              <div className="card p-8 relative shadow-depth card-hover-lift">
                <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
                <p className="mb-6 relative z-10">TherapyKin, and the Hero's Journey specialist in particular, is outstanding. It took me ~20 minutes of my first session to be convinced. The therapist is excellent, the therapy works. I ended my first session exhilarated. Everybody should give it a real try. Put at least 20 minutes, don't expect to have any results if you abandon after 4 minutes. Put yourself in there, it's worth it!</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">N</div>
                  <div>
                    <p className="font-semibold">Nicolas R.</p>
                    <p className="text-sm text-foreground/60">Early Adopter</p>
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
          </div>
          
          {/* Hero's Journey Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2 text-center">Hero's Journey Specialist Stories</h2>
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
          
          
          {/* Call for Stories */}
          <div className="card p-8 shadow-depth text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Share Your TherapyKin Story</h2>
            <p className="text-foreground/70 mb-6">
              If you've been using TherapyKin and would like to share your experience, we'd be honored to feature your story. 
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
