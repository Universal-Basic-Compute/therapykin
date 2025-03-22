import React from "react";
import Image from "next/image";

export default function CommunicationFlexibility() {
  return (
    <section className="py-20 px-4 bg-[var(--background-alt)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Your Therapy, Your Way</h2>
        <p className="text-center max-w-2xl mx-auto mb-16 text-foreground/70">
          Communicate however feels most comfortable for you, whenever you need support
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="card p-6 mb-8 shadow-depth">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3 mt-1">T</div>
                <div className="bg-[var(--background-alt)] p-3 rounded-lg rounded-tl-none max-w-xs">
                  <p className="text-sm">I've been feeling really anxious about my presentation tomorrow. I can't seem to focus on anything else.</p>
                </div>
              </div>
              <div className="flex items-start mb-4 justify-end">
                <div className="bg-[var(--primary)]/10 p-3 rounded-lg rounded-tr-none max-w-xs">
                  <p className="text-sm">That sounds challenging. Let's work through this together. What specific aspects of the presentation are causing you the most worry?</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold ml-3 mt-1">TK</div>
              </div>
              <div className="flex justify-center">
                <div className="bg-[var(--background)] p-2 rounded-full shadow-sm flex items-center">
                  <button className="px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-medium">Switch to Voice</button>
                  <span className="mx-2 text-xs text-foreground/60">or</span>
                  <button className="px-3 py-1 rounded-full bg-transparent text-xs font-medium">Continue Typing</button>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Text When You Prefer Typing</h3>
            <p className="text-foreground/70 mb-6">Perfect for processing thoughts carefully or when voice isn't an option. Type at your own pace and take time to reflect.</p>
            <h3 className="text-xl font-semibold mb-3">Voice When You Need To Talk</h3>
            <p className="text-foreground/70 mb-6">Express yourself naturally through conversation when typing feels limiting. Just speak naturally as you would with a therapist.</p>
            <h3 className="text-xl font-semibold mb-3">Switch Seamlessly Between Both</h3>
            <p className="text-foreground/70">Start typing and switch to voice mid-session as your needs change. TherapyKin maintains context across modalities.</p>
          </div>
          
          <div className="relative">
            <div className="card p-6 shadow-depth relative z-10 mx-auto max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-2">TK</div>
                  <span className="font-medium">TherapyKin</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--background-alt)] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--background-alt)] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--background-alt)] p-4 rounded-lg mb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-2 bg-[var(--primary)]/30 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-[var(--primary)] animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-center text-foreground/70 mb-4">Listening...</p>
              
              <div className="flex justify-center">
                <button className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
              <div className="w-72 h-72 rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 animate-pulse"></div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold mb-3">Multiple Device Support</h3>
              <p className="text-foreground/70">Access TherapyKin from your phone, tablet, computer, or smart speaker. Your therapeutic relationship continues seamlessly across all your devices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
