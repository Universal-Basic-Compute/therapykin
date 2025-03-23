import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)] mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-foreground/70">
                <a href="mailto:contact@therapykin.ai" className="text-[var(--primary)] hover:underline">
                  contact@therapykin.ai
                </a>
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)] mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Response Time</h3>
              <p className="text-foreground/70">
                We aim to respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)] mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Help Center</h3>
              <p className="text-foreground/70">
                Check our <a href="/faq" className="text-[var(--primary)] hover:underline">FAQ</a> for quick answers to common questions.
              </p>
            </div>
          </div>
          
          <div className="card p-8 shadow-depth">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            
            {/* Typeform Embed */}
            <div className="w-full h-[500px] rounded-lg overflow-hidden">
              <iframe
                src="https://k2mobei34z9.typeform.com/to/NThqMp8n"
                style={{ border: 0 }}
                width="100%"
                height="100%"
                title="Contact Form"
                allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
              ></iframe>
            </div>
            
            {/* Alternative Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-foreground/60">
                If the form doesn't load, you can also 
                <a 
                  href="https://k2mobei34z9.typeform.com/to/NThqMp8n" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline ml-1"
                >
                  access it directly here
                </a>.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="text-foreground/70 mb-6">
              Follow us on social media for updates, mental health tips, and more.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://t.me/Therapykin" className="text-foreground/60 hover:text-[var(--primary)]" target="_blank" rel="noopener noreferrer">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.835-.546 2.968-.772 3.939-.31 1.334-.618 2.11-.927 2.11-.309 0-.618-.776-.927-2.11-.226-.97-.593-3.104-.772-3.939-.18-.835.129-1.543.927-1.543.798 0 1.107.708.927 1.543zm-5.562 9.122c-1.308 0-2.189-.869-2.189-2.061 0-1.191.881-2.061 2.189-2.061 1.308 0 2.189.87 2.189 2.061 0 1.192-.881 2.061-2.189 2.061zm0-5.816c-3.062 0-5.562-2.499-5.562-5.561 0-3.063 2.5-5.562 5.562-5.562 3.062 0 5.562 2.499 5.562 5.562 0 3.062-2.5 5.561-5.562 5.561z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
