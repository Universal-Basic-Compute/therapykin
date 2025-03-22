'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // State for dropdown menus
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  
  // Refs for dropdown menus (for click outside detection)
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
        setResourcesDropdownOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Close dropdowns when route changes
  useEffect(() => {
    setResourcesDropdownOpen(false);
    setAccountDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

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
            <div className="hidden md:ml-10 md:flex md:space-x-6">
              {/* Main navigation items */}
              <Link href="/features" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              
              {/* Resources Dropdown */}
              <div className="relative" ref={resourcesDropdownRef}>
                <button 
                  className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium flex items-center"
                  onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                >
                  Resources
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ml-1 transition-transform ${resourcesDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {resourcesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[var(--background-alt)] ring-1 ring-black/5 dark:ring-white/10 z-50">
                    <div className="py-1">
                      <Link 
                        href="/about" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        About Us
                      </Link>
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Blog
                      </Link>
                      <Link 
                        href="/resources/library" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Resource Library
                      </Link>
                      <Link 
                        href="/faq" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        FAQ
                      </Link>
                      <Link 
                        href="/testimonials" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Testimonials
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                {/* Account Dropdown for logged-in users */}
                <div className="relative hidden md:block" ref={accountDropdownRef}>
                  <button 
                    className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium flex items-center"
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  >
                    My Account
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ml-1 transition-transform ${accountDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {accountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[var(--background-alt)] ring-1 ring-black/5 dark:ring-white/10 z-50">
                      <div className="py-1">
                        <Link 
                          href="/dashboard" 
                          className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                        >
                          Dashboard
                        </Link>
                        <Link 
                          href="/timeline" 
                          className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                        >
                          My Journey
                        </Link>
                        <Link 
                          href="/account" 
                          className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                        >
                          Account Settings
                        </Link>
                        <hr className="my-1 border-foreground/10" />
                        <button 
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
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
      
      {/* Mobile menu - with collapsible sections */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[var(--background)] shadow-lg">
            <Link 
              href="/features" 
              className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
            >
              Pricing
            </Link>
            
            {/* Mobile Resources Dropdown */}
            <div className="relative">
              <button 
                className="text-foreground/70 hover:text-[var(--primary)] flex justify-between items-center w-full px-3 py-2 text-base font-medium"
                onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
              >
                <span>Resources</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform ${resourcesDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {resourcesDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1 border-l-2 border-[var(--primary)]/20 ml-3">
                  <Link 
                    href="/about" 
                    className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  >
                    About Us
                  </Link>
                  <Link 
                    href="/blog" 
                    className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  >
                    Blog
                  </Link>
                  <Link 
                    href="/resources/library" 
                    className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  >
                    Resource Library
                  </Link>
                  <Link 
                    href="/faq" 
                    className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  >
                    FAQ
                  </Link>
                  <Link 
                    href="/testimonials" 
                    className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  >
                    Testimonials
                  </Link>
                </div>
              )}
            </div>
            
            {user ? (
              <>
                {/* Mobile Account Dropdown */}
                <div className="relative">
                  <button 
                    className="text-foreground/70 hover:text-[var(--primary)] flex justify-between items-center w-full px-3 py-2 text-base font-medium"
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  >
                    <span>My Account</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 transition-transform ${accountDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {accountDropdownOpen && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-[var(--primary)]/20 ml-3">
                      <Link 
                        href="/dashboard" 
                        className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href="/timeline" 
                        className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                      >
                        My Journey
                      </Link>
                      <Link 
                        href="/account" 
                        className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                      >
                        Account Settings
                      </Link>
                      <button 
                        onClick={logout}
                        className="text-red-600 hover:text-red-800 block w-full text-left px-3 py-2 text-base font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
                
                {pathname !== '/chat' && (
                  <Link 
                    href="/chat" 
                    className="text-[var(--primary)] hover:text-[var(--primary)]/80 block px-3 py-2 text-base font-medium"
                  >
                    Start Session
                  </Link>
                )}
              </>
            ) : (
              <Link 
                href="/login" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
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
