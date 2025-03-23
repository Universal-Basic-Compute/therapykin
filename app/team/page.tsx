import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Team() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h1>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              Meet the passionate individuals behind TherapyKin who are dedicated to creating a therapeutic companion that combines the best of AI technology with human expertise in mental health.
            </p>
          </div>
          
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Nicolas Lester Reynolds */}
            <div className="card p-8 shadow-depth">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/30 flex items-center justify-center mb-4 overflow-hidden">
                  <span className="text-3xl font-bold text-[var(--primary)]">NR</span>
                </div>
                <h2 className="text-2xl font-bold mb-1">Nicolas Lester Reynolds</h2>
                <div className="flex items-center mb-2">
                  <p className="text-foreground/70">Co-founder & CTO</p>
                  <svg className="h-5 w-5 text-[var(--primary)] ml-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <div className="flex space-x-3 mb-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-[var(--primary)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-[var(--primary)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-[var(--primary)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium">AI Development</span>
                  <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium">$UBC</span>
                  <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium">AI Swarms</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-foreground/80">
                  Product-focused entrepreneur and engineer building at the intersection of AI, Web3, and community. Founder of Universal Basic Compute ($UBC). Previously founded and scaled multiple successful projects including Civocracy (1M€+ raised) and gaming platforms with multi-million user bases.
                </p>
                
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Experience Highlights</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <p className="font-medium">Co-founder & CTO at DigitalKin</p>
                        <p className="text-sm text-foreground/60">Jan 2023 - Dec 2024</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <p className="font-medium">Co-Founder & CTO at Civocracy</p>
                        <p className="text-sm text-foreground/60">Apr 2015 - Apr 2019</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <p className="font-medium">Co-Founder at Loups-Garous en ligne SAS</p>
                        <p className="text-sm text-foreground/60">May 2011 - Jan 2016</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p className="flex items-center">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    Institut National des Sciences Appliquées de Lyon (INSA Lyon), Computer Engineering
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Current Focus</h3>
                  <p className="text-foreground/80">
                    At TherapyKin, Nicolas leads the technical development, combining expertise in software engineering and artificial intelligence to bring TherapyKin to life. He ensures our AI systems are both powerful and ethically implemented.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Paul C Clarke */}
            <div className="card p-8 shadow-depth">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/30 flex items-center justify-center mb-4 overflow-hidden">
                  <span className="text-3xl font-bold text-[var(--primary)]">PC</span>
                </div>
                <h2 className="text-2xl font-bold mb-1">Paul C Clarke</h2>
                <div className="flex items-center mb-2">
                  <p className="text-foreground/70">Co-founder & Business Development</p>
                  <svg className="h-5 w-5 text-[var(--primary)] ml-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <div className="flex space-x-3 mb-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-[var(--primary)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-[var(--primary)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium">Business Strategy</span>
                  <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium">Partnerships</span>
                  <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium">Growth</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-foreground/80">
                  Paul drives TherapyKin's business strategy and partnerships, working to make our therapeutic companion accessible to those who need it most. His focus on sustainable growth ensures we can fulfill our mission while building a viable business.
                </p>
                
                <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Experience Highlights</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <p className="font-medium">Business Development Lead at DigitalKin</p>
                        <p className="text-sm text-foreground/60">Jan 2023 - Dec 2024</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <p className="font-medium">Strategic Partnerships Manager</p>
                        <p className="text-sm text-foreground/60">2018 - 2022</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <p className="font-medium">Business Development Consultant</p>
                        <p className="text-sm text-foreground/60">2015 - 2018</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Current Focus</h3>
                  <p className="text-foreground/80">
                    At TherapyKin, Paul focuses on building strategic partnerships with mental health organizations, healthcare providers, and technology companies to expand our reach and impact. He's passionate about making quality mental health support accessible to everyone.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Vision</h3>
                  <p className="text-foreground/80">
                    "I believe that technology, when thoughtfully designed and ethically implemented, can help bridge the gaps in our mental healthcare system. TherapyKin represents our vision of how AI can complement human care, making support available whenever and wherever it's needed."
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Approach */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Collaborative Approach</h2>
            
            <div className="card p-8 shadow-depth">
              <p className="text-lg mb-6 text-center">
                At TherapyKin, we believe that the most innovative solutions come from close collaboration across disciplines. Our small, dedicated team brings together expertise in AI development, mental health, and business strategy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card p-6 bg-[var(--background-alt)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Technical Innovation</h3>
                  <p className="text-foreground/70">
                    Our engineering team develops cutting-edge AI systems that can understand context, remember important details, and provide personalized support.
                  </p>
                </div>
                
                <div className="card p-6 bg-[var(--background-alt)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Therapeutic Expertise</h3>
                  <p className="text-foreground/70">
                    We work closely with mental health professionals to ensure our approaches are grounded in evidence-based therapeutic techniques.
                  </p>
                </div>
                
                <div className="card p-6 bg-[var(--background-alt)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Ethical Foundation</h3>
                  <p className="text-foreground/70">
                    We prioritize user privacy, transparency about AI capabilities, and designing systems that promote genuine wellbeing rather than dependency.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Join Our Team */}
          <div className="card p-8 shadow-depth text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our vision of making quality mental health support accessible to everyone. If you're interested in joining our team, we'd love to hear from you.
            </p>
            <Link 
              href="/contact" 
              className="btn-primary px-8 py-3 text-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
