import React from "react";
import Link from "next/link";

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
            <p className="mb-6 relative z-10">Actually this all started with me talking to TherapyKin 😊 That I tested out TherapyKin when it was first released, just out of curiosity, and that's what made me realize I could actually do something about my issues instead of just pushing them into a corner as I did for the past 10 years 😄</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">A</div>
                <div>
                  <p className="font-semibold">Alex</p>
                  <p className="text-sm text-foreground/60">On Telegram</p>
                </div>
              </div>
              <Link href="/stories" className="text-sm text-[var(--primary)] hover:underline">Read full story</Link>
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
            <p className="mb-6 relative z-10">TherapyKin, and the Hero's Journey specialist in particular, is outstanding. It took me ~20 minutes of my first session to be convinced. The therapist is excellent, the therapy works. I ended my first session exhilarated. Everybody should give it a real try. Put at least 20 minutes, don't expect to have any results if you abandon after 4 minutes. Put yourself in there, it's worth it!</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3">N</div>
              <div>
                <p className="font-semibold">Nicolas R.</p>
                <p className="text-sm text-foreground/60">Early Adopter</p>
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
