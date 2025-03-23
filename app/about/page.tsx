import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About TherapyKin</h1>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              The story behind our mission to create a therapeutic companion that combines the best of AI technology with human expertise in mental health.
            </p>
          </div>
          
          {/* Our Mission */}
          <section className="mb-20">
            <div className="card p-8 shadow-depth">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg mb-6">
                  At TherapyKin, we believe that everyone deserves access to high-quality mental health support that's personalized, consistent, and available whenever needed. Our mission is to combine the best of artificial intelligence with human expertise to create a therapeutic companion that truly understands and grows with you.
                </p>
                <p className="text-lg mb-6">
                  We're working to bridge the gap in mental health care by providing a solution that complements traditional therapy, extends support between sessions, and offers a first step for those who might not otherwise seek help.
                </p>
                <p className="text-lg">
                  By harnessing the power of advanced AI while maintaining a deep respect for the human elements of therapy, we're creating a new kind of support system—one that remembers your journey, adapts to your needs, and helps you build lasting resilience.
                </p>
              </div>
            </div>
          </section>
          
          {/* The Human-AI Collaboration */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">The Human-AI Collaboration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-xl font-semibold mb-4">Why We Need Both</h3>
                <p className="text-foreground/70 mb-6">
                  TherapyKin represents a new paradigm in mental health support—one that recognizes the unique strengths of both human expertise and artificial intelligence. We believe that neither can reach its full potential in isolation.
                </p>
                <p className="text-foreground/70">
                  Our approach combines the empathy, ethical judgment, and specialized knowledge of mental health professionals with the consistency, availability, and pattern recognition capabilities of advanced AI systems. This collaboration creates something greater than the sum of its parts.
                </p>
              </div>
              <div className="card p-6 shadow-depth bg-[var(--background-alt)]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">AI Strengths</h4>
                    <p className="text-sm text-foreground/70">Consistency, 24/7 availability, perfect memory, pattern recognition</p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Human Strengths</h4>
                    <p className="text-sm text-foreground/70">Empathy, ethical judgment, specialized knowledge, intuition</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center text-[var(--primary)] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Combined Potential</h4>
                    <p className="text-sm text-foreground/70">Personalized, ethical, accessible, and effective mental health support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="card p-6 shadow-depth">
                  <h4 className="font-semibold mb-4">Our Collaborative Approach</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">1</div>
                      <div>
                        <p className="font-medium">Therapeutic Framework Design</p>
                        <p className="text-sm text-foreground/70">Our licensed therapist designs the therapeutic approaches and frameworks that guide TherapyKin's interactions.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">2</div>
                      <div>
                        <p className="font-medium">AI Implementation</p>
                        <p className="text-sm text-foreground/70">Our AI engineer implements these frameworks using advanced language models and machine learning techniques.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">3</div>
                      <div>
                        <p className="font-medium">Continuous Improvement</p>
                        <p className="text-sm text-foreground/70">Our therapist regularly reviews interaction patterns to identify areas for improvement.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">4</div>
                      <div>
                        <p className="font-medium">User-Centered Development</p>
                        <p className="text-sm text-foreground/70">We continuously gather user feedback to ensure TherapyKin meets real-world needs.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-xl font-semibold mb-4">Bridging Technology and Therapy</h3>
                <p className="text-foreground/70 mb-6">
                  TherapyKin isn't just an AI system—it's the product of ongoing collaboration between our small, dedicated team of experts in mental health, AI development, and business strategy. This multidisciplinary approach ensures that our technology remains grounded in clinical best practices while pushing the boundaries of what's possible.
                </p>
                <p className="text-foreground/70">
                  Our therapist guides the development of therapeutic approaches, reviews interaction patterns, and helps refine the system's responses. Meanwhile, our AI specialist works to implement these insights, creating a system that can understand nuance, remember context, and provide personalized support.
                </p>
              </div>
            </div>
          </section>
          
          {/* Our Team */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="card p-6 text-center hover:shadow-depth transition-all">
                <div className="w-24 h-24 rounded-full bg-[var(--primary)]/10 mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--primary)]">NR</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Nicolas Lester Reynolds</h3>
                <p className="text-foreground/60 mb-3">Development & AI Lead</p>
                <p className="text-foreground/70 text-sm">
                  Nicolas leads our technical development, combining expertise in software engineering and artificial intelligence to bring TherapyKin to life. He ensures our AI systems are both powerful and ethically implemented.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-depth transition-all">
                <div className="w-24 h-24 rounded-full bg-[var(--primary)]/10 mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--primary)]">PC</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Paul C Clarke</h3>
                <p className="text-foreground/60 mb-3">Business Development</p>
                <p className="text-foreground/70 text-sm">
                  Paul drives our business strategy and partnerships, working to make TherapyKin accessible to those who need it most. His focus on sustainable growth ensures we can fulfill our mission while building a viable business.
                </p>
              </div>
              
              <div className="card p-6 text-center hover:shadow-depth transition-all">
                <div className="w-24 h-24 rounded-full bg-[var(--primary)]/10 mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--primary)]">TBA</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Clinical Expert</h3>
                <p className="text-foreground/60 mb-3">Therapeutic Director</p>
                <p className="text-foreground/70 text-sm">
                  Our licensed therapist brings clinical expertise to TherapyKin, ensuring all interactions are grounded in evidence-based therapeutic approaches. They guide our therapeutic framework and provide ongoing clinical oversight.
                </p>
              </div>
            </div>
            
            <div className="card p-8 shadow-depth">
              <h3 className="text-xl font-semibold mb-4 text-center">Our Unique Approach</h3>
              <p className="text-foreground/70 mb-6">
                As a small team, we bring a unique blend of expertise to TherapyKin. Our size allows us to be nimble, responsive, and deeply connected to our mission. We believe that the most innovative solutions come from close collaboration across disciplines, with each team member bringing their specialized knowledge to the table.
              </p>
              <p className="text-foreground/70">
                This collaborative spirit is at the heart of TherapyKin—just as our product bridges the gap between AI technology and human therapeutic expertise, our team bridges the gap between technical innovation and real-world mental health needs.
              </p>
            </div>
          </section>
          
          {/* Our Development Philosophy */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Development Philosophy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Ethics First</h3>
                <p className="text-foreground/70">
                  We believe that ethical considerations must be built into every aspect of our product from the ground up. This means prioritizing user privacy, ensuring transparency about AI capabilities, and designing systems that promote genuine wellbeing rather than dependency.
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Human-Centered Design</h3>
                <p className="text-foreground/70">
                  We design TherapyKin with real human needs at the center. This means creating interfaces that are intuitive and accessible, developing AI responses that feel natural and supportive, and ensuring that the technology serves the user—not the other way around.
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Evidence-Based Approaches</h3>
                <p className="text-foreground/70">
                  We ground our therapeutic frameworks in established, evidence-based approaches like Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and mindfulness practices. This ensures that TherapyKin's support is based on techniques with proven effectiveness.
                </p>
              </div>
              
              <div className="card p-6 hover:shadow-depth transition-all">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Continuous Improvement</h3>
                <p className="text-foreground/70">
                  We view TherapyKin as an evolving system that grows and improves over time. Through regular review of anonymized interaction patterns, user feedback, and advances in both AI and therapeutic research, we continuously refine our approach to provide the best possible support.
                </p>
              </div>
            </div>
          </section>
          
          {/* The Future of Mental Health Support */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">The Future of Mental Health Support</h2>
            
            <div className="card p-8 shadow-depth">
              <p className="text-lg mb-6">
                We believe that the future of mental health support lies in thoughtful collaboration between human expertise and AI technology. TherapyKin represents our vision of this future—a world where everyone has access to personalized, high-quality mental health support whenever they need it.
              </p>
              <p className="text-lg mb-6">
                As we continue to develop TherapyKin, we remain committed to our core values: respect for human dignity, evidence-based approaches, ethical AI development, and accessibility. We envision a future where TherapyKin serves as a valuable complement to traditional therapy, helping to bridge gaps in care and extend support to those who might otherwise go without.
              </p>
              <p className="text-lg">
                We're excited to be part of this journey, and we invite you to join us in reimagining what mental health support can be in the digital age.
              </p>
            </div>
          </section>
          
          {/* CTA */}
          <section>
            <div className="card p-8 shadow-depth text-center">
              <h2 className="text-2xl font-bold mb-4">Join Us on This Journey</h2>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Experience the future of mental health support with TherapyKin. Start your free trial today and discover how our unique blend of AI technology and human therapeutic expertise can support your wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup?plan=free" 
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Get 3 Free Sessions
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary px-8 py-3 text-lg"
                >
                  Contact Us
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
