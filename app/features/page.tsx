import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Features() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">TherapyKin Features</h1>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              Discover how TherapyKin's innovative features create a personalized therapeutic experience that evolves with you over time.
            </p>
          </div>
          
          {/* Core Features Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Core Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="card p-8 shadow-depth">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Continuous Memory</h3>
                <p className="text-foreground/70 mb-6">
                  Unlike traditional therapy apps that reset with each session, TherapyKin builds a comprehensive understanding of you over time. It remembers your history, preferences, challenges, and progress—no need to repeat yourself or start over.
                </p>
                <div className="card p-4 bg-[var(--background-alt)]">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-3 mt-1">TK</div>
                    <div className="bg-[var(--background)] p-3 rounded-lg rounded-tl-none max-w-xs">
                      <p className="text-sm">Last week you mentioned feeling anxious about your presentation. How did it go? Did the breathing techniques we practiced help?</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-8 shadow-depth">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Personalized Strategies</h3>
                <p className="text-foreground/70 mb-6">
                  TherapyKin adapts to your unique needs, learning which therapeutic approaches work best for you. It provides custom coping techniques and strategies based on your specific challenges, preferences, and progress.
                </p>
                <div className="card p-4 bg-[var(--background-alt)]">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-3 mt-1">TK</div>
                    <div className="bg-[var(--background)] p-3 rounded-lg rounded-tl-none max-w-xs">
                      <p className="text-sm">I've noticed the body scan meditation works well for you. Would you like to try a slightly longer version today that includes a focus on areas where you typically hold tension?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="card p-8 shadow-depth">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Progress Visualization</h3>
                <p className="text-foreground/70 mb-6">
                  Track your mental health journey with intuitive tools that show patterns, insights, and growth over time. TherapyKin helps you recognize your progress and understand the factors that influence your wellbeing.
                </p>
                <div className="card p-4 bg-[var(--background-alt)]">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Anxiety Levels</span>
                        <span className="text-sm text-[var(--primary)]">-23%</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--background)] rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-[var(--primary)]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Mindfulness Practice</span>
                        <span className="text-sm text-[var(--primary)]">+45%</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--background)] rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-[var(--primary)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-8 shadow-depth">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">In-the-Moment Support</h3>
                <p className="text-foreground/70 mb-6">
                  Get help exactly when you need it, whether scheduled or during unexpected difficulties. TherapyKin is available 24/7 for both brief check-ins and deeper sessions, providing support during critical moments.
                </p>
                <div className="card p-4 bg-[var(--background-alt)]">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-3 mt-1">TK</div>
                    <div className="bg-[var(--background)] p-3 rounded-lg rounded-tl-none max-w-xs">
                      <p className="text-sm">I can see you're feeling overwhelmed right now. Let's take a moment to ground ourselves. Focus on your breath with me for just 30 seconds...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Communication Features */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Flexible Communication</h2>
            
            <div className="card p-8 shadow-depth mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Seamless Text & Voice Interaction</h3>
                  <p className="text-foreground/70 mb-6">
                    Communicate with TherapyKin however feels most comfortable for you. Switch seamlessly between text and voice—even mid-conversation—as your needs and preferences change.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Text when you prefer typing</strong> - Perfect for processing thoughts carefully or when voice isn't an option</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Voice when you need to talk</strong> - Express yourself naturally through conversation when typing feels limiting</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Context maintained across modalities</strong> - TherapyKin remembers your conversation regardless of how you communicate</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="card p-6 shadow-depth">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold mr-3 mt-1">U</div>
                      <div className="bg-[var(--primary)]/10 p-3 rounded-lg rounded-tl-none max-w-xs">
                        <p className="text-sm">I'm feeling too anxious to type everything out right now.</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4 justify-end">
                      <div className="bg-[var(--background-alt)] p-3 rounded-lg rounded-tr-none max-w-xs">
                        <p className="text-sm">That's completely fine. Would you prefer to switch to voice mode? You can just talk to me instead of typing.</p>
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
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Device Access</h3>
                <p className="text-foreground/70">
                  Access TherapyKin from your phone, tablet, computer, or smart speaker. Your therapeutic relationship continues seamlessly across all your devices.
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Voice Customization</h3>
                <p className="text-foreground/70">
                  Choose from a variety of natural-sounding voices for TherapyKin's responses. Select the voice that feels most comfortable and supportive for your therapeutic journey.
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Natural Conversation</h3>
                <p className="text-foreground/70">
                  Interact with TherapyKin through natural conversation—just like texting or talking with a therapist. No complicated interfaces or rigid structures, just genuine dialogue.
                </p>
              </div>
            </div>
          </section>
          
          {/* Therapeutic Approaches */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Evidence-Based Approaches</h2>
            
            <p className="text-center max-w-3xl mx-auto mb-12 text-foreground/70">
              TherapyKin incorporates techniques from proven therapeutic modalities, delivered conversationally and adapted to your specific needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-3">Cognitive Behavioral Therapy (CBT)</h3>
                <p className="text-foreground/70 mb-4">
                  Identify and change unhelpful thought patterns that affect your emotions and behaviors.
                </p>
                <div className="bg-[var(--background-alt)] p-3 rounded-lg text-sm">
                  <p className="italic">
                    "I notice you're having that thought again—'I'll never be good enough.' Let's examine the evidence for and against this belief."
                  </p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-3">Dialectical Behavior Therapy (DBT)</h3>
                <p className="text-foreground/70 mb-4">
                  Build skills in mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness.
                </p>
                <div className="bg-[var(--background-alt)] p-3 rounded-lg text-sm">
                  <p className="italic">
                    "When you feel overwhelmed, let's try the TIPP skills we discussed—Temperature change, Intense exercise, Paced breathing, and Progressive muscle relaxation."
                  </p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-3">Acceptance and Commitment Therapy (ACT)</h3>
                <p className="text-foreground/70 mb-4">
                  Learn to accept difficult thoughts and feelings while committing to behaviors aligned with your values.
                </p>
                <div className="bg-[var(--background-alt)] p-3 rounded-lg text-sm">
                  <p className="italic">
                    "Instead of fighting against these feelings, can we practice making room for them while still moving toward what matters to you?"
                  </p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-3">Mindfulness Practices</h3>
                <p className="text-foreground/70 mb-4">
                  Develop present-moment awareness and non-judgmental attention to thoughts, feelings, and sensations.
                </p>
                <div className="bg-[var(--background-alt)] p-3 rounded-lg text-sm">
                  <p className="italic">
                    "Let's take a moment to notice what's happening right now—what sensations do you feel in your body? What thoughts are passing through your mind?"
                  </p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-3">Positive Psychology</h3>
                <p className="text-foreground/70 mb-4">
                  Focus on strengths, resilience, and positive experiences to enhance wellbeing and life satisfaction.
                </p>
                <div className="bg-[var(--background-alt)] p-3 rounded-lg text-sm">
                  <p className="italic">
                    "You've shown remarkable perseverance through this challenge. What strengths did you draw on that you might apply to other areas of your life?"
                  </p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-3">Solution-Focused Brief Therapy</h3>
                <p className="text-foreground/70 mb-4">
                  Concentrate on solutions rather than problems, identifying what works and doing more of it.
                </p>
                <div className="bg-[var(--background-alt)] p-3 rounded-lg text-sm">
                  <p className="italic">
                    "Think of a time when you handled a similar situation successfully. What did you do then that you could apply now?"
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Privacy & Security */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Privacy & Security Features</h2>
            
            <div className="card p-8 shadow-depth mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Built with Privacy as the Foundation</h3>
                  <p className="text-foreground/70 mb-6">
                    TherapyKin was designed from the ground up with your privacy as the top priority. We believe your therapeutic journey should be completely private and secure.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>End-to-end encryption</strong> for all conversations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Never used to train AI models</strong> - Your personal information and conversations are never used to improve our AI</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Complete data deletion</strong> - Delete any or all of your data at any time with one-click permanent removal</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="card p-6 shadow-depth bg-[var(--background-alt)]">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-medium">Privacy Controls</h4>
                      <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full">Premium</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium">Data Storage</label>
                          <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full bg-[var(--primary)]">
                            <span className="absolute right-1 top-1 w-4 h-4 transition duration-100 ease-in-out transform bg-white rounded-full"></span>
                          </div>
                        </div>
                        <p className="text-xs text-foreground/60">Manage how your data is stored</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium">Auto-Delete History</label>
                          <select className="text-xs p-1 border border-black/10 dark:border-white/10 rounded">
                            <option>After 30 days</option>
                            <option>After 90 days</option>
                            <option>After 1 year</option>
                            <option>Never</option>
                          </select>
                        </div>
                        <p className="text-xs text-foreground/60">Automatically delete conversation history</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium">Anonymous Mode</label>
                          <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full bg-[var(--background)]">
                            <span className="absolute left-1 top-1 w-4 h-4 transition duration-100 ease-in-out transform bg-foreground/30 rounded-full"></span>
                          </div>
                        </div>
                        <p className="text-xs text-foreground/60">Use without personal identifiers</p>
                      </div>
                      
                      <button className="w-full bg-[var(--primary)] text-white py-2 rounded-lg text-sm">
                        Export All My Data
                      </button>
                      
                      <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm">
                        Delete All My Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/privacy" className="btn-secondary inline-flex items-center">
                Learn More About Our Privacy Approach
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </section>
          
          {/* Advanced Features */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Advanced Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="card p-8 shadow-depth">
                <h3 className="text-xl font-semibold mb-4">Mood & Pattern Analysis</h3>
                <p className="text-foreground/70 mb-6">
                  TherapyKin analyzes patterns in your conversations and mood over time, providing insights about factors that influence your mental wellbeing. Identify triggers, track progress, and understand your unique patterns.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Your Monthly Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>Your mood tends to improve after morning exercise sessions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      <span>Work meetings on Mondays correlate with increased anxiety</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Mindfulness practice consistency has increased by 35%</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card p-8 shadow-depth">
                <h3 className="text-xl font-semibold mb-4">Personalized Growth Plan</h3>
                <p className="text-foreground/70 mb-6">
                  Based on your interactions, TherapyKin develops a customized growth plan with specific skills to practice, goals to work toward, and strategies tailored to your needs. The plan evolves as you progress.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Your Current Focus Areas</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Stress Management</span>
                        <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded-full">In Progress</span>
                      </div>
                      <p className="text-xs text-foreground/70">Daily 5-minute breathing exercises</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Negative Thought Patterns</span>
                        <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded-full">In Progress</span>
                      </div>
                      <p className="text-xs text-foreground/70">Thought record practice 3x weekly</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Sleep Improvement</span>
                        <span className="text-xs bg-[var(--background)] px-2 py-0.5 rounded-full">Upcoming</span>
                      </div>
                      <p className="text-xs text-foreground/70">Starting next week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Crisis Resources */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Crisis Resources</h2>
            
            <div className="card p-8 shadow-depth">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Immediate Support When Needed</h3>
                  <p className="text-foreground/70 mb-6">
                    While TherapyKin is not a crisis service, it provides immediate grounding techniques during difficult moments and can seamlessly connect you with human support when needed for your safety and wellbeing.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Important Note</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                      TherapyKin is not designed to address mental health emergencies. If you're experiencing a crisis, please contact emergency services (911) or a crisis helpline like the National Suicide Prevention Lifeline (988).
                    </p>
                  </div>
                  <p className="text-foreground/70">
                    TherapyKin can help you identify when you might need additional support and provide resources appropriate to your situation.
                  </p>
                </div>
                <div>
                  <div className="card p-6 shadow-depth">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-3 mt-1">TK</div>
                      <div className="bg-[var(--background-alt)] p-3 rounded-lg rounded-tl-none max-w-xs">
                        <p className="text-sm">I'm noticing that you're expressing thoughts of hopelessness. Would it be helpful if I shared some immediate coping strategies, or would you prefer resources to connect with a crisis counselor?</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4 justify-end">
                      <div className="bg-[var(--primary)]/10 p-3 rounded-lg rounded-tr-none max-w-xs">
                        <p className="text-sm">I think I need to talk to someone right now.</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold ml-3 mt-1">U</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-3 mt-1">TK</div>
                      <div className="bg-[var(--background-alt)] p-3 rounded-lg rounded-tl-none max-w-xs">
                        <p className="text-sm">I understand. Here are immediate resources:</p>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• National Suicide Prevention Lifeline: 988</li>
                          <li>• Crisis Text Line: Text HOME to 741741</li>
                          <li className="mt-2">Would you like me to connect you directly?</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section>
            <div className="card p-8 shadow-depth text-center">
              <h2 className="text-2xl font-bold mb-4">Experience TherapyKin For Yourself</h2>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Start your journey with a therapeutic companion that remembers, adapts, and grows with you. No credit card required for your 3 free sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup?plan=free" 
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Get 3 Free Sessions
                </Link>
                <Link 
                  href="/pricing" 
                  className="btn-secondary px-8 py-3 text-lg"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
