import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Accessibility() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Accessibility Statement</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">Last Updated: June 1, 2023</p>
            
            <p className="mb-6">
              At TherapyKin, we are committed to ensuring digital accessibility for people of all abilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Our Commitment</h2>
            <p className="mb-6">
              We strive to ensure that our website and application conform to WCAG 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
            </p>
            <p className="mb-6">
              Our accessibility efforts are ongoing, and we regularly review our platform to identify and address any areas that may need improvement.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Accessibility Features</h2>
            <p className="mb-4">
              TherapyKin includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Keyboard navigation support throughout the application</li>
              <li>Screen reader compatibility with proper ARIA attributes</li>
              <li>Text-to-speech and speech-to-text capabilities</li>
              <li>Color contrast that meets WCAG 2.1 AA standards</li>
              <li>Resizable text without loss of functionality</li>
              <li>Alternative text for all meaningful images</li>
              <li>Clear and consistent navigation</li>
              <li>Focus indicators for keyboard users</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Customization Options</h2>
            <p className="mb-4">
              We provide several ways to customize your experience:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Light and dark mode support that respects system preferences</li>
              <li>Voice interaction as an alternative to text input</li>
              <li>Adjustable session length to accommodate different needs</li>
              <li>Multiple ways to communicate with TherapyKin (text, voice, or both)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Compatibility with Assistive Technologies</h2>
            <p className="mb-6">
              TherapyKin is designed to be compatible with a variety of assistive technologies, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Screen readers (such as JAWS, NVDA, VoiceOver, and TalkBack)</li>
              <li>Speech recognition software</li>
              <li>Screen magnification tools</li>
              <li>Alternative input devices</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Known Limitations</h2>
            <p className="mb-6">
              While we strive for comprehensive accessibility, we are aware of the following limitations that we are actively working to address:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Some interactive visualizations in the progress tracking section may be difficult to interpret with screen readers</li>
              <li>Voice interaction may not work optimally in very noisy environments</li>
              <li>Some third-party integrations may have varying levels of accessibility support</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Feedback and Assistance</h2>
            <p className="mb-6">
              We welcome your feedback on the accessibility of TherapyKin. If you encounter any barriers or have suggestions for improvement, please contact us at:
            </p>
            <p className="mb-2">Email: <a href="mailto:accessibility@therapykin.ai" className="text-[var(--primary)] hover:underline">accessibility@therapykin.ai</a></p>
            <p className="mb-6">Phone: (555) 123-4567</p>
            
            <p className="mb-6">
              If you need assistance with any part of our website or application, please contact us using the information above. We'll be happy to work with you to provide the information or service you seek through a communication method that works for you.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Continuous Improvement</h2>
            <p className="mb-6">
              We are committed to ongoing accessibility improvements. Our development team regularly reviews our platform, incorporates accessibility into our design and development process, and stays informed about new technologies and standards.
            </p>
            <p className="mb-6">
              This statement was last updated on June 1, 2023, and will be reviewed and updated as our platform evolves.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
            <Link href="/contact" className="text-[var(--primary)] hover:underline">
              Contact us with accessibility questions or feedback
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
