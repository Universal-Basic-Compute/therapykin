'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[var(--background)] border-b border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/android-chrome-192x192.png" 
                alt="TherapyKin Logo" 
                width={32} 
                height={32} 
                className="mr-2" 
              />
              <span className="text-xl font-bold bg-gradient-to-br from-[#5ee7df] via-[#8ced7d] via-[#d8cc59] via-[#f59c87] via-[#c278f5] to-[#6a7af5] text-transparent bg-clip-text">TherapyKin</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/features" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/about" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="/blog" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                Blog
              </Link>
              <Link href="/faq" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium hidden md:block"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/timeline" 
                  className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium hidden md:block"
                >
                  My Journey
                </Link>
                <Link 
                  href="/account" 
                  className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium hidden md:block"
                >
                  Account
                </Link>
                {pathname === '/chat' ? (
                  <button 
                    className="ml-4 btn-primary text-sm px-4 py-2 cursor-default opacity-75"
                  >
                    In Session
                  </button>
                ) : (
                  <Link 
                    href="/chat" 
                    className="ml-4 btn-primary text-sm px-4 py-2"
                  >
                    Start Session
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium hidden md:block"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup?plan=free" 
                  className="ml-4 btn-primary text-sm px-4 py-2"
                >
                  Get 3 Free Sessions
                </Link>
              </>
            )}
          
            {/* Mobile menu button */}
            <button 
              className="md:hidden ml-4 text-foreground/70"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[var(--background)] shadow-lg">
            <Link 
              href="/features" 
              className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/faq" 
              className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/blog" 
              className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/timeline" 
                  className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Journey
                </Link>
                <Link 
                  href="/account" 
                  className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </Link>
                {pathname === '/chat' ? (
                  <span 
                    className="text-foreground/70 block px-3 py-2 text-base font-medium"
                  >
                    In Session
                  </span>
                ) : (
                  <Link 
                    href="/chat" 
                    className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Session
                  </Link>
                )}
              </>
            ) : (
              <Link 
                href="/login" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
