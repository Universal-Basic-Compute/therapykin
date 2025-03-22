import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TherapyKin</h3>
            <p className="text-foreground/70 mb-4">Developed By Experts, Powered By KinOS</p>
            <div className="flex space-x-4">
              <a href="https://t.me/Therapykin" className="text-foreground/60 hover:text-[var(--primary)]" target="_blank" rel="noopener noreferrer">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.835-.546 2.968-.772 3.939-.31 1.334-.618 2.11-.927 2.11-.309 0-.618-.776-.927-2.11-.226-.97-.593-3.104-.772-3.939-.18-.835.129-1.543.927-1.543.798 0 1.107.708.927 1.543zm-5.562 9.122c-1.308 0-2.189-.869-2.189-2.061 0-1.191.881-2.061 2.189-2.061 1.308 0 2.189.87 2.189 2.061 0 1.192-.881 2.061-2.189 2.061zm0-5.816c-3.062 0-5.562-2.499-5.562-5.561 0-3.063 2.5-5.562 5.562-5.562 3.062 0 5.562 2.499 5.562 5.562 0 3.062-2.5 5.561-5.562 5.561z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-foreground/70 hover:text-[var(--primary)]">Features</Link></li>
              <li><Link href="/pricing" className="text-foreground/70 hover:text-[var(--primary)]">Pricing</Link></li>
              <li><Link href="/faq" className="text-foreground/70 hover:text-[var(--primary)]">FAQ</Link></li>
              <li><Link href="/testimonials" className="text-foreground/70 hover:text-[var(--primary)]">Testimonials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-foreground/70 hover:text-[var(--primary)]">About</Link></li>
              <li><Link href="/team" className="text-foreground/70 hover:text-[var(--primary)]">Team</Link></li>
              <li><Link href="/partnerships" className="text-foreground/70 hover:text-[var(--primary)]">Partnerships</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-[var(--primary)]">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-foreground/70 hover:text-[var(--primary)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-foreground/70 hover:text-[var(--primary)]">Terms of Service</Link></li>
              <li><Link href="/accessibility" className="text-foreground/70 hover:text-[var(--primary)]">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">© 2023 TherapyKin. All rights reserved.</p>
          <p className="text-sm text-foreground/60 mt-2 md:mt-0">Made with care for mental health.</p>
        </div>
      </div>
    </footer>
  );
}
