import Link from "next/link";
import React from "react";

export default function PrivacySection() {
  return (
    <section className="py-20 px-4 bg-[var(--background-alt)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Privacy Is Our Priority</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            TherapyKin was built with privacy as the foundation. We believe your therapeutic journey should be completely private and secure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="card p-8 card-hover-glow">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Military-grade encryption</p>
                  <p className="text-sm text-foreground/60">All conversations are protected with end-to-end encryption that meets the highest security standards.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Complete data deletion</p>
                  <p className="text-sm text-foreground/60">Delete any or all of your data at any time with one-click permanent removal.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Anonymous usage options</p>
                  <p className="text-sm text-foreground/60">Use TherapyKin without providing personally identifiable information.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Transparent privacy controls</p>
                  <p className="text-sm text-foreground/60">Easily accessible privacy settings in every session give you complete control.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="card p-8 card-hover-glow">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Regular security audits</p>
                  <p className="text-sm text-foreground/60">We regularly verify our security practices with independent third-party experts.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Never used to train AI models</p>
                  <p className="text-sm text-foreground/60">Your personal information and conversations are never used to improve our AI.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Clear privacy policy</p>
                  <p className="text-sm text-foreground/60">No legal jargon or hidden terms - just straightforward language about how we protect your data.</p>
                </div>
              </li>
            </ul>
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
      </div>
    </section>
  );
}
