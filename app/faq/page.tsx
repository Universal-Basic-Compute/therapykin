import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function FAQ() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6">About TherapyKin</h2>
              
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">What is TherapyKin?</h3>
                  <p className="text-foreground/80">
                    TherapyKin is an AI-powered therapeutic companion that builds a genuine relationship with you over time. Unlike traditional therapy apps that reset with each session, TherapyKin remembers your history, learns your preferences, and evolves alongside you, providing personalized mental health support.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">How is TherapyKin different from other mental health apps?</h3>
                  <p className="text-foreground/80 mb-4">
                    TherapyKin stands apart in several key ways:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li><strong>Continuous Memory:</strong> Unlike apps that treat each session as isolated, TherapyKin builds on previous conversations.</li>
                    <li><strong>Relationship Building:</strong> The more you interact, the more personalized the support becomes.</li>
                    <li><strong>Flexible Communication:</strong> Seamlessly switch between text and voice based on your preference.</li>
                    <li><strong>24/7 Availability:</strong> Get support exactly when you need it, not just during scheduled sessions.</li>
                    <li><strong>Privacy-First Design:</strong> End-to-end encryption and comprehensive privacy controls.</li>
                  </ul>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">Is TherapyKin a replacement for traditional therapy?</h3>
                  <p className="text-foreground/80 mb-4">
                    TherapyKin is not a replacement for professional mental health treatment. It's designed to complement traditional therapy by providing ongoing support between sessions, reinforcing skills learned in therapy, and offering assistance when your therapist isn't available.
                  </p>
                  <p className="text-foreground/80">
                    Many users find the greatest benefit comes from using TherapyKin alongside traditional therapy. If you're experiencing a mental health emergency or crisis, please contact emergency services or a crisis helpline immediately.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Using TherapyKin</h2>
              
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">How do I get started with TherapyKin?</h3>
                  <p className="text-foreground/80 mb-4">
                    Getting started is simple:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-foreground/80">
                    <li>Choose a subscription plan or start with our 7-day free trial</li>
                    <li>Create your account</li>
                    <li>Have a brief introductory conversation so TherapyKin can understand your needs</li>
                    <li>Begin communicating via text or voice, whichever you prefer</li>
                  </ol>
                  <p className="mt-4 text-foreground/80">
                    There are no lengthy intake forms or complicated setup processes. TherapyKin learns about you naturally through conversation.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">What therapeutic approaches does TherapyKin use?</h3>
                  <p className="text-foreground/80 mb-4">
                    TherapyKin incorporates evidence-based approaches including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Identifying and changing unhelpful thought patterns</li>
                    <li><strong>Dialectical Behavior Therapy (DBT):</strong> Building skills in mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness</li>
                    <li><strong>Acceptance and Commitment Therapy (ACT):</strong> Accepting difficult thoughts and feelings while committing to behavior change</li>
                    <li><strong>Mindfulness Practices:</strong> Developing present-moment awareness and non-judgmental attention</li>
                    <li><strong>Positive Psychology:</strong> Focusing on strengths, resilience, and positive experiences</li>
                  </ul>
                  <p className="mt-4 text-foreground/80">
                    TherapyKin adapts these approaches based on your specific needs and what works best for you.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">Can I switch between text and voice communication?</h3>
                  <p className="text-foreground/80">
                    Yes! You can seamlessly switch between text and voice communication at any point during a session. Start typing and switch to voice if you find it easier to express yourself that way, or vice versa. TherapyKin maintains context across both modalities, so your conversation flows naturally regardless of how you choose to communicate.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">How long should my sessions be?</h3>
                  <p className="text-foreground/80">
                    TherapyKin adapts to your needs and schedule. You can have brief 5-minute check-ins during busy days, longer 30-minute sessions for deeper exploration, or anything in between. There are no time limits or scheduling requirements—use TherapyKin in whatever way works best for you, whenever you need support.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">How are sessions counted?</h3>
                  <p className="text-foreground/80">
                    Sessions are only counted if they are more than 5 minutes long. This policy allows you to change your mind, refresh the page, or recover from accidental clicks without using up your session allowance. If you connect with TherapyKin for less than 5 minutes, it won't count against your session limit or subscription usage.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Privacy & Security</h2>
              
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">How does TherapyKin protect my privacy?</h3>
                  <p className="text-foreground/80 mb-4">
                    Privacy is our top priority. TherapyKin implements multiple layers of protection:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li>End-to-end encryption for all conversations</li>
                    <li>Option to use the service anonymously</li>
                    <li>One-click data deletion at any time</li>
                    <li>Transparent privacy controls accessible during every session</li>
                    <li>Regular third-party security audits</li>
                    <li>Premium plans offer local-only storage options</li>
                  </ul>
                  <p className="mt-4 text-foreground/80">
                    Your personal information and conversations are never used to train our AI models.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">Is my data shared with third parties?</h3>
                  <p className="text-foreground/80">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent. The only exceptions are trusted service providers who help us operate TherapyKin (such as cloud storage providers), and these providers are contractually obligated to keep your information confidential. For complete details, please review our <Link href="/privacy" className="text-[var(--primary)] hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">How can I delete my data?</h3>
                  <p className="text-foreground/80">
                    You can delete your data at any time through your account settings. You have options to delete specific conversations or your entire account history. When you delete your account, we permanently delete all your personal information and conversation history within 30 days, except where we have legal obligations to retain certain information.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Subscription & Billing</h2>
              
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">What subscription plans are available?</h3>
                  <p className="text-foreground/80 mb-4">
                    TherapyKin offers several subscription options:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li><strong>Pay-Per-Session:</strong> $25 per session with no subscription required</li>
                    <li><strong>Essential Plan:</strong> $59/month for unlimited text and basic voice support</li>
                    <li><strong>Standard Plan:</strong> $99/month for unlimited text and voice with full features</li>
                    <li><strong>Premium Plan:</strong> $149/month for priority support and advanced features</li>
                  </ul>
                  <p className="mt-4 text-foreground/80">
                    Visit our <Link href="/pricing" className="text-[var(--primary)] hover:underline">Pricing page</Link> for complete details on each plan.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">Is there a free trial?</h3>
                  <p className="text-foreground/80">
                    Yes, we offer a 7-day free trial with full access to all features. No credit card is required to start your trial. At the end of the trial period, you can choose the subscription plan that works best for you.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">Can I cancel my subscription?</h3>
                  <p className="text-foreground/80">
                    Yes, you can cancel your subscription at any time through your account settings. There are no cancellation fees or long-term commitments. If you cancel, you'll continue to have access to TherapyKin until the end of your current billing period.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">Do you offer refunds?</h3>
                  <p className="text-foreground/80">
                    If you're not satisfied with TherapyKin, we offer a 14-day money-back guarantee for new subscribers. Contact our support team at support@therapykin.ai within 14 days of your first payment to request a refund.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Technical Questions</h2>
              
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">What devices can I use with TherapyKin?</h3>
                  <p className="text-foreground/80">
                    TherapyKin is available on iOS and Android mobile devices, web browsers on desktop and laptop computers, and as a voice application on smart speakers. Your therapeutic relationship continues seamlessly across all your devices.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">Do I need an internet connection to use TherapyKin?</h3>
                  <p className="text-foreground/80">
                    An internet connection is required to use TherapyKin's full features. However, Premium subscribers have access to limited offline functionality, allowing you to review previous conversations and access certain resources without an internet connection.
                  </p>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-medium mb-3">How do I get help if I have technical issues?</h3>
                  <p className="text-foreground/80">
                    For technical support, please contact our support team at support@therapykin.ai. We aim to respond to all support requests within 24 hours. You can also visit our Help Center for troubleshooting guides and frequently asked technical questions.
                  </p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
            <p className="text-foreground/70 mb-4">Still have questions? We're here to help.</p>
            <Link href="/contact" className="btn-primary inline-flex items-center">
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
