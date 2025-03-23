import React from "react";

export default function UserStories() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">How People Use TherapyKin</h2>
        <p className="text-center max-w-2xl mx-auto mb-16 text-foreground/70">
          Real stories from people who've made TherapyKin part of their mental health journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          
          <div className="card p-8 relative shadow-depth card-hover-lift">
            <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-20">"</div>
            <p className="mb-6 relative z-10">Living in a rural area, quality mental health support was hours away until TherapyKin. It's been a lifeline for maintaining my wellbeing.</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">S</div>
              <div>
                <p className="font-semibold">Sarah</p>
                <p className="text-sm text-foreground/60">Nurse</p>
              </div>
            </div>
          </div>
          
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
    </section>
  );
}
