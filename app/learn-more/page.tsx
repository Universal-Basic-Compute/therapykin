import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LearnMore() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover TherapyKin</h1>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              Learn how our AI-powered therapeutic companion builds a genuine relationship with you over time, providing personalized mental health support when you need it most.
            </p>
          </div>
          
          {/* What Makes TherapyKin Different */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">What Makes TherapyKin Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">A Companion That Remembers</h3>
                <p className="text-foreground/70 mb-4">
                  Unlike traditional therapy apps that reset with each session, TherapyKin builds a continuous relationship with you. It remembers your history, preferences, challenges, and progress—no need to repeat yourself or start over.
                </p>
                <p className="text-foreground/70">
                  This continuous memory allows for deeper insights and more personalized support as your therapeutic journey progresses. The more you interact, the more tailored the experience becomes.
                </p>
              </div>
              <div className="card p-6 shadow-depth">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-3 mt-1">TK</div>
                  <div className="bg-[var(--background-alt)] p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p className="text-sm">Last week you mentioned feeling anxious about your presentation. How did it go? Did the breathing techniques we practiced help?</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-lg rounded-tr-none max-w-xs">
                    <p className="text-sm">They actually did help! I was still nervous but I managed to stay focused. Thank you for remembering.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold ml-3 mt-1">U</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div className="order-2 md:order-1 card p-6 shadow-depth">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Your Progress</h4>
                  <span className="text-sm text-foreground/60">Last 30 days</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Anxiety Levels</span>
                      <span className="text-sm text-[var(--primary)]">-23%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--background-alt)] rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-[var(--primary)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Mindfulness Practice</span>
                      <span className="text-sm text-[var(--primary)]">+45%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--background-alt)] rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-[var(--primary)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sleep Quality</span>
                      <span className="text-sm text-[var(--primary)]">+18%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--background-alt)] rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-[var(--primary)]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-xl font-semibold mb-4">Personalized Growth Insights</h3>
                <p className="text-foreground/70 mb-4">
                  TherapyKin doesn't just listen—it learns. By analyzing patterns in your conversations and tracking your progress, it provides meaningful insights about your mental health journey.
                </p>
                <p className="text-foreground/70">
                  These insights help you recognize your strengths, understand your challenges, and visualize your growth over time. You'll receive personalized recommendations based on what's working best for you.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Evidence-Based Approaches</h3>
                <p className="text-foreground/70 mb-4">
                  TherapyKin incorporates techniques from proven therapeutic modalities, including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Acceptance and Commitment Therapy (ACT), and mindfulness practices.
                </p>
                <p className="text-foreground/70">
                  These approaches are delivered conversationally and adapted to your specific needs, helping you develop practical skills for managing emotions, changing unhelpful thought patterns, and building resilience.
                </p>
              </div>
              <div className="card p-6 shadow-depth">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold mr-3 mt-1">TK</div>
                  <div className="bg-[var(--background-alt)] p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p className="text-sm">I notice you're having that thought again—"I'll never be good enough." Let's examine the evidence for and against this belief, as we've practiced before.</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-lg rounded-tr-none max-w-xs">
                    <p className="text-sm">You're right, I'm catastrophizing again. Let me think about the evidence...</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold ml-3 mt-1">U</div>
                </div>
              </div>
            </div>
          </section>
          
          {/* How TherapyKin Works */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">How TherapyKin Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Natural Conversation</h3>
                <p className="text-foreground/70">
                  Interact with TherapyKin through natural conversation—just like texting or talking with a therapist. No complicated interfaces or rigid structures, just genuine dialogue that flows naturally.
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
                <p className="text-foreground/70">
                  TherapyKin learns from every interaction, building a comprehensive understanding of your needs, preferences, and what approaches work best for you. This creates an increasingly personalized experience.
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy Protection</h3>
                <p className="text-foreground/70">
                  Your data is protected with end-to-end encryption and comprehensive privacy controls. Your personal information and conversations are never used to train our AI models.
                </p>
              </div>
            </div>
            
            <div className="card p-8 shadow-depth">
              <h3 className="text-xl font-semibold mb-6 text-center">The TherapyKin Experience</h3>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-2">1</div>
                    <h4 className="font-medium">Initial Connection</h4>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-foreground/70 mb-4">
                      When you first start with TherapyKin, you'll have a brief introductory conversation. This helps TherapyKin understand your goals, challenges, and what you're hoping to achieve.
                    </p>
                    <p className="text-foreground/70">
                      Unlike traditional therapy intake processes, this happens through natural conversation—no lengthy forms or questionnaires. Just talk about what's on your mind, and TherapyKin will ask relevant questions to better understand how to support you.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-2">2</div>
                    <h4 className="font-medium">Regular Sessions</h4>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-foreground/70 mb-4">
                      Engage with TherapyKin whenever it works for you—whether that's daily check-ins, several times a week, or whenever you need support. There are no scheduling constraints or time limits.
                    </p>
                    <p className="text-foreground/70">
                      Sessions can be brief check-ins or extended conversations, depending on your needs at the moment. TherapyKin adapts to your schedule and communication style.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-2">3</div>
                    <h4 className="font-medium">Skill Building</h4>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-foreground/70 mb-4">
                      TherapyKin helps you develop practical skills for managing emotions, changing unhelpful thought patterns, and building resilience. These skills are introduced conversationally and practiced over time.
                    </p>
                    <p className="text-foreground/70">
                      As you practice these skills, TherapyKin provides feedback and adjusts its approach based on what's working best for you. The skills become more personalized and effective over time.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold mb-2">4</div>
                    <h4 className="font-medium">Progress Tracking</h4>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-foreground/70 mb-4">
                      TherapyKin tracks your progress over time, providing insights about patterns, improvements, and areas that might need more attention. These insights help you recognize your growth and understand your mental health journey.
                    </p>
                    <p className="text-foreground/70">
                      You'll receive regular progress updates and personalized recommendations based on your unique patterns and what's working best for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Use Cases */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">How People Use TherapyKin</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-4">Between Therapy Sessions</h3>
                <p className="text-foreground/70 mb-4">
                  Many people use TherapyKin to maintain progress between sessions with their human therapist. It helps reinforce skills, provide support during challenging moments, and keep momentum going in your therapeutic journey.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="italic text-sm text-foreground/70">
                    "I see my therapist every two weeks, but sometimes I need support between sessions. TherapyKin helps me practice the CBT techniques my therapist taught me and keeps me accountable."
                  </p>
                  <p className="text-right text-sm mt-2">— Michael, 34</p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-4">Daily Emotional Support</h3>
                <p className="text-foreground/70 mb-4">
                  For many users, TherapyKin becomes a daily companion for processing emotions, reflecting on experiences, and maintaining mental wellbeing. Regular check-ins help build self-awareness and emotional regulation skills.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="italic text-sm text-foreground/70">
                    "I check in with TherapyKin every morning and evening. It helps me process my day, recognize patterns in my mood, and start implementing small changes that have made a big difference."
                  </p>
                  <p className="text-right text-sm mt-2">— Sophia, 28</p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-4">Crisis Prevention</h3>
                <p className="text-foreground/70 mb-4">
                  TherapyKin helps users identify early warning signs of emotional distress and implement coping strategies before small challenges become bigger problems. This proactive approach helps prevent crises.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="italic text-sm text-foreground/70">
                    "When I feel my anxiety building, I talk to TherapyKin right away. It helps me use my grounding techniques and challenge catastrophic thinking before things spiral."
                  </p>
                  <p className="text-right text-sm mt-2">— James, 42</p>
                </div>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <h3 className="text-xl font-semibold mb-4">Skill Development</h3>
                <p className="text-foreground/70 mb-4">
                  Many users focus on developing specific skills with TherapyKin, such as assertive communication, mindfulness, emotional regulation, or challenging negative thought patterns.
                </p>
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <p className="italic text-sm text-foreground/70">
                    "I've been working on mindfulness with TherapyKin for three months. The daily practices and gentle reminders have helped me become much more present in my daily life."
                  </p>
                  <p className="text-right text-sm mt-2">— Elena, 39</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Research & Development */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Approach to Development</h2>
            
            <div className="card p-8 shadow-depth">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Evidence-Based Foundation</h3>
                  <p className="text-foreground/70 mb-4">
                    TherapyKin is built on established therapeutic approaches with strong research support, including Cognitive Behavioral Therapy, Dialectical Behavior Therapy, and mindfulness practices.
                  </p>
                  <p className="text-foreground/70">
                    Our development team includes clinical psychologists, therapists, and researchers who ensure that TherapyKin's approaches align with current best practices in mental health care.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ethical AI Development</h3>
                  <p className="text-foreground/70 mb-4">
                    We adhere to strict ethical guidelines in our AI development process. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Never using private user conversations to train our models</li>
                    <li>Regular bias audits and mitigation strategies</li>
                    <li>Transparent communication about AI capabilities and limitations</li>
                    <li>Clear crisis protocols and escalation paths</li>
                    <li>Regular review by our ethics advisory board</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-center">Continuous Improvement</h3>
                <p className="text-foreground/70 text-center max-w-3xl mx-auto">
                  TherapyKin is constantly evolving based on user feedback, advances in therapeutic research, and improvements in AI technology. Our team regularly updates TherapyKin's capabilities to provide the most effective and supportive experience possible.
                </p>
              </div>
            </div>
          </section>
          
          {/* Important Limitations */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Important Limitations</h2>
            
            <div className="card p-8 bg-[var(--background-alt)]">
              <div className="max-w-3xl mx-auto">
                <p className="text-foreground/70 mb-6">
                  While TherapyKin provides valuable support for many people, it's important to understand its limitations:
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-medium">Not a Crisis Service</p>
                      <p className="text-sm text-foreground/70">TherapyKin is not designed to address mental health emergencies. If you're experiencing a crisis, please contact emergency services (911) or a crisis helpline like the National Suicide Prevention Lifeline (988).</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-medium">Not a Replacement for Professional Care</p>
                      <p className="text-sm text-foreground/70">TherapyKin complements but does not replace professional mental health treatment. It's not suitable as the sole form of support for severe mental health conditions.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-medium">No Diagnosis or Medical Advice</p>
                      <p className="text-sm text-foreground/70">TherapyKin cannot diagnose conditions or provide medical advice. For diagnosis and treatment recommendations, please consult with qualified healthcare professionals.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-medium">AI Limitations</p>
                      <p className="text-sm text-foreground/70">As an AI system, TherapyKin may occasionally misunderstand context or provide responses that don't perfectly address your needs. We're constantly improving, but human judgment should always be applied.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section>
            <div className="card p-8 shadow-depth text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Experience TherapyKin?</h2>
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
              <p className="mt-4 text-foreground/60">Questions? Contact us at <a href="mailto:support@therapykin.ai" className="text-[var(--primary)] hover:underline">support@therapykin.ai</a></p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
