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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Extend Your Therapeutic Reach with TherapyKin</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Transform Your Practice, Preserve Your Essence</h2>
            <p className="text-foreground/70 mb-6">
              Your therapeutic approach is unique. It's the culmination of your education, experience, and personal insight. 
              What if you could extend its reach beyond the constraints of time, location, and physical capacity—without 
              sacrificing its authenticity?
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Introducing the TherapyKin Partnership Program</h2>
            <p className="text-foreground/70 mb-6">
              TherapyKin translates your distinct therapeutic methodology into an AI extension of your practice—preserving 
              your authentic voice, techniques, and wisdom while allowing you to help thousands instead of dozens.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Our Proprietary DNA Extraction Process</h3>
            <div className="mb-6 relative aspect-[2/1] w-full">
              <Image 
                src="https://via.placeholder.com/800x400" 
                alt="The TherapyKin Extraction Process" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <p className="text-foreground/70 mb-4">Our systematic method captures the essence of your therapeutic approach:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6 text-foreground/70">
              <li><strong>Source Material Analysis</strong> - We study your written work, session recordings, and methodological framework</li>
              <li><strong>Core Framework Extraction</strong> - We identify your unique therapeutic concepts and techniques</li>
              <li><strong>Therapeutic Style Analysis</strong> - We capture your distinctive voice, language patterns, and interaction style</li>
              <li><strong>Implementation Design</strong> - We create a structured approach for translating your methodology into AI</li>
              <li><strong>Validation Testing</strong> - We refine the system through iterative testing with your input</li>
              <li><strong>Client Experience Optimization</strong> - We ensure the final product delivers authentic therapeutic value</li>
            </ol>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Why Leading Therapists Are Joining TherapyKin</h2>
            
            <blockquote className="border-l-4 border-[var(--primary)] pl-4 italic mb-6 text-foreground/80">
              <p>"After 25 years of developing my therapeutic approach, TherapyKin has allowed me to extend my reach beyond what I thought possible. My methodology now helps people while I sleep, while maintaining the essence of how I work."</p>
              <footer className="mt-2 font-medium">— Dr. Emily Chen, Trauma Specialist</footer>
            </blockquote>
            
            <h3 className="text-xl font-semibold mb-4">Your Practice, Amplified</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-foreground/70">
              <li><strong>Extend Your Impact</strong>: Reach more clients without increasing your personal workload</li>
              <li><strong>Preserve Your Legacy</strong>: Your therapeutic approach continues to help people for years to come</li>
              <li><strong>Generate Passive Income</strong>: Earn 10% profit redistribution on all client interactions</li>
              <li><strong>Maintain Your Authority</strong>: You remain the source and center of the therapeutic relationship</li>
              <li><strong>Support Between Sessions</strong>: Your clients receive consistent guidance aligned with your approach</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">How Your Clients Benefit</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-foreground/70">
              <li><strong>Continuous Support</strong>: Access to your therapeutic wisdom whenever they need it</li>
              <li><strong>Consistent Approach</strong>: Guidance that maintains your unique methodology</li>
              <li><strong>Accessibility</strong>: Reduced barriers of cost, scheduling, and location</li>
              <li><strong>Tailored Experience</strong>: Choose from multiple voice options and session lengths</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Success Stories</h2>
            
            <h3 className="text-xl font-semibold mb-4">Nelson Lecuane, The Hero's Journey</h3>
            <blockquote className="border-l-4 border-[var(--primary)] pl-4 mb-6 text-foreground/80">
              <p className="italic">"The TherapyKin extraction process was remarkable. They didn't just digitize my words—they captured the essence of the Hero's Journey approach I've developed over years. Now clients can begin their transformative journey even when I'm not personally available, using the exact methodology I would guide them with. The five dimensions framework, mythological references, and shadow integration techniques are all preserved authentically. This isn't just technology—it's my therapeutic legacy extended to those who need it most."</p>
              <footer className="mt-2 font-medium">— Nelson Lecuane, Creator of The Hero's Journey Therapeutic Approach</footer>
            </blockquote>
            
            <h3 className="text-xl font-semibold mb-4">Client Impact</h3>
            <blockquote className="border-l-4 border-[var(--primary)] pl-4 mb-6 text-foreground/80">
              <p className="italic">"I was skeptical about AI therapy until I experienced Nelson's Hero's Journey approach through TherapyKin. It was uncanny how it guided me to name my 'rock' and helped me understand where I was on my journey. During a critical moment of addiction recovery, it provided the exact support I needed between my regular sessions. The mythology references and five dimensions assessment gave me a framework to understand my challenges that changed everything."</p>
              <footer className="mt-2 font-medium">— Anthony, Hero's Journey Client</footer>
            </blockquote>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">The Partnership Process</h2>
            <div className="mb-6 relative aspect-[4/1] w-full">
              <Image 
                src="https://via.placeholder.com/800x200" 
                alt="Partnership Timeline" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <ol className="list-decimal pl-5 space-y-2 mb-6 text-foreground/70">
              <li><strong>Initial Consultation</strong>: We discuss your therapeutic approach and partnership goals</li>
              <li><strong>Material Collection</strong>: We gather examples of your work and methodology</li>
              <li><strong>Extraction Process</strong>: Our team captures the essence of your approach</li>
              <li><strong>Collaborative Refinement</strong>: We work together to ensure authenticity</li>
              <li><strong>Launch Preparation</strong>: We prepare your TherapyKin extension for clients</li>
              <li><strong>Ongoing Optimization</strong>: We continuously improve based on client interactions</li>
            </ol>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Designed for Ethical Practice</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-foreground/70">
              <li><strong>Client Privacy Protected</strong>: All data handling meets highest security standards</li>
              <li><strong>Transparent AI Relationship</strong>: Clients always know they're working with an AI extension</li>
              <li><strong>Appropriate Scope</strong>: Clear boundaries about what the AI can and cannot address</li>
              <li><strong>Therapist Remains Central</strong>: The AI supports but never replaces your therapeutic relationship</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Limited Partnership Opportunities</h2>
            <p className="text-foreground/70 mb-6">
              We're selectively partnering with therapists who have developed distinctive methodologies that can benefit 
              from AI extension. Due to our thorough extraction process, we can only onboard a limited number of 
              therapeutic approaches each quarter.
            </p>
          </section>
          
          <section className="mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Extend Your Impact?</h2>
            <p className="text-foreground/70 mb-6">
              Schedule a 30-minute consultation to discuss how TherapyKin can amplify your therapeutic approach 
              while preserving its essence.
            </p>
            
            <a 
              href="https://calendly.com/nlrai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary inline-block px-8 py-3 text-lg"
            >
              Book Your Consultation Now
            </a>
          </section>
          
          <div className="text-center italic text-foreground/60 mt-16">
            <p>TherapyKin: Your Methodology, Extended Reach</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
