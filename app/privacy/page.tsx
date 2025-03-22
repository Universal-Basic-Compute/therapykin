import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">Last Updated: June 1, 2023</p>
            
            <p className="mb-6">
              At TherapyKin, we take your privacy extremely seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Personal Information</h3>
            <p className="mb-4">
              We may collect personal information that you voluntarily provide when using TherapyKin, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Account information (email address, name, password)</li>
              <li>Profile information you choose to share</li>
              <li>Content of conversations with TherapyKin</li>
              <li>Survey responses and feedback</li>
              <li>Payment information (processed securely through our payment processors)</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Usage Information</h3>
            <p className="mb-4">
              We automatically collect certain information about your device and how you interact with TherapyKin, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and general location (city/country level only)</li>
              <li>Usage patterns and session information</li>
              <li>Log data and error reports</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, maintain, and improve TherapyKin</li>
              <li>Personalize your experience and therapeutic support</li>
              <li>Process transactions and manage your account</li>
              <li>Send you service-related communications</li>
              <li>Monitor and analyze usage patterns to enhance our service</li>
              <li>Protect against unauthorized access and ensure the security of our platform</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Conversation Data & AI Training</h2>
            <p className="mb-6">
              <strong>Your conversations are private and are not used to train our AI models.</strong> The content of your therapeutic conversations is stored securely and is only used to provide you with personalized support. We do not use your personal conversations to improve or train our AI systems.
            </p>
            <p className="mb-6">
              Our AI models are trained on carefully curated, anonymized datasets from consenting sources and publicly available therapeutic resources—never from private user conversations.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Data Storage and Security</h2>
            <p className="mb-4">
              We implement robust security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>End-to-end encryption for all conversation data</li>
              <li>Secure data storage with industry-standard encryption</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Strict access controls for our staff</li>
              <li>Compliance with applicable data protection regulations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Data Retention and Deletion</h2>
            <p className="mb-6">
              You can request deletion of your data at any time through your account settings. When you delete your account, we permanently delete your personal information and conversation history within 30 days, except where we have legal obligations to retain certain information.
            </p>
            <p className="mb-6">
              Premium users have access to additional data controls, including options for automatic data expiration settings.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>With service providers who help us operate TherapyKin (e.g., cloud storage, payment processing)</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer (e.g., merger or acquisition)</li>
            </ul>
            <p className="mb-6">
              All third-party service providers are contractually obligated to use your information only for the purposes of providing services to us and to maintain appropriate security measures.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Your Privacy Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Right to access and receive a copy of your data</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to delete your data</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="mb-6">
              To exercise these rights, please contact us at privacy@therapykin.ai or use the relevant features in your account settings.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Children's Privacy</h2>
            <p className="mb-6">
              TherapyKin is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child under 18, we will take steps to delete that information as quickly as possible.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. For significant changes, we will provide additional notice, such as an email notification.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-2">Email: privacy@therapykin.ai</p>
            <p className="mb-2">Address: 123 Wellness Street, Suite 456, San Francisco, CA 94103</p>
            <p className="mb-6">Phone: (555) 123-4567</p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
            <Link href="/terms" className="text-[var(--primary)] hover:underline">
              View our Terms of Service
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
