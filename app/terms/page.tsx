import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">Last Updated: June 1, 2023</p>
            
            <p className="mb-6">
              Welcome to TherapyKin. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using TherapyKin, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By creating an account, accessing, or using TherapyKin, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use TherapyKin.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">2. Important Health Disclaimer</h2>
            <p className="mb-6">
              <strong>TherapyKin is not a replacement for professional medical advice, diagnosis, or treatment.</strong> TherapyKin provides AI-powered conversational support that may incorporate therapeutic techniques, but it is not a licensed healthcare provider, therapist, or medical professional.
            </p>
            <p className="mb-6">
              If you are experiencing a medical or mental health emergency, are having thoughts of harming yourself or others, or need immediate help, please contact emergency services (911 in the US) or a crisis helpline immediately:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">3. Account Registration</h2>
            <p className="mb-6">
              To use certain features of TherapyKin, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p className="mb-6">
              You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">4. Subscription and Billing</h2>
            <p className="mb-6">
              TherapyKin offers various subscription plans and payment options. By selecting a subscription plan, you agree to pay the subscription fees and any applicable taxes.
            </p>
            <p className="mb-4">
              Subscription terms:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Subscriptions automatically renew unless canceled before the renewal date</li>
              <li>You can cancel your subscription at any time through your account settings</li>
              <li>Refunds are provided in accordance with our Refund Policy</li>
              <li>We may change subscription fees with 30 days' notice</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">5. Free Trial</h2>
            <p className="mb-6">
              We may offer a free trial period for new users. To use the free trial, you may need to provide payment information. At the end of the trial period, you will be automatically charged for the subscription unless you cancel before the trial ends.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">6. Acceptable Use</h2>
            <p className="mb-4">
              You agree not to use TherapyKin to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Distribute harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to TherapyKin or its systems</li>
              <li>Interfere with or disrupt the integrity or performance of TherapyKin</li>
              <li>Collect or harvest information about other users</li>
              <li>Use TherapyKin for any illegal or unauthorized purpose</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">7. Intellectual Property</h2>
            <p className="mb-6">
              TherapyKin and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="mb-6">
              You retain ownership of any content you provide to TherapyKin. By providing content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content solely for the purpose of providing and improving TherapyKin.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">8. Privacy</h2>
            <p className="mb-6">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using TherapyKin, you agree to our collection, use, and disclosure of information as described in our Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">9. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, TherapyKin and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Your access to or use of or inability to access or use TherapyKin</li>
              <li>Any conduct or content of any third party on TherapyKin</li>
              <li>Any content obtained from TherapyKin</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">10. Disclaimer of Warranties</h2>
            <p className="mb-6">
              TherapyKin is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation or availability of TherapyKin.
            </p>
            <p className="mb-6">
              We do not warrant that TherapyKin will be uninterrupted, secure, or error-free, that defects will be corrected, or that TherapyKin is free of viruses or other harmful components.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">11. Indemnification</h2>
            <p className="mb-6">
              You agree to defend, indemnify, and hold harmless TherapyKin and its licensors, service providers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of TherapyKin.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">12. Termination</h2>
            <p className="mb-6">
              We may terminate or suspend your account and access to TherapyKin immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
            </p>
            <p className="mb-6">
              Upon termination, your right to use TherapyKin will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">13. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to modify or replace these Terms at any time. We will provide notice of significant changes by posting the new Terms on this page and updating the "Last Updated" date.
            </p>
            <p className="mb-6">
              Your continued use of TherapyKin after any changes to the Terms constitutes your acceptance of the new Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">14. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">15. Dispute Resolution</h2>
            <p className="mb-6">
              Any dispute arising from or relating to these Terms or TherapyKin shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules. The arbitration shall be conducted in San Francisco, California.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">16. Contact Information</h2>
            <p className="mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-2">Email: legal@therapykin.ai</p>
            <p className="mb-2">Address: 123 Wellness Street, Suite 456, San Francisco, CA 94103</p>
            <p className="mb-6">Phone: (555) 123-4567</p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
            <Link href="/privacy" className="text-[var(--primary)] hover:underline">
              View our Privacy Policy
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
