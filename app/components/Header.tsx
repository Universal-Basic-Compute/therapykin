'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

// Helper function to check if user is a therapist
const isUserTherapist = (user: any) => {
  if (!user) return false;
  
  console.log('Checking isTherapist for user:', user.email);
  console.log('isTherapist value:', (user as any).isTherapist);
  
  // Check if user is admin or has a specific email
  if ((user as any).isAdmin || user.email === 'nlr@universalbasiccompute.ai' || user.email === 'theherosjourneyteam@gmail.com') {
    console.log('User is admin or has authorized email, granting therapist access');
    return true;
  }
  
  if ((user as any).isTherapist) {
    try {
      console.log('Attempting to parse isTherapist:', (user as any).isTherapist);
      const therapistTypes = JSON.parse((user as any).isTherapist);
      console.log('Parsed therapistTypes:', therapistTypes);
      const isValid = Array.isArray(therapistTypes) && therapistTypes.length > 0;
      console.log('Is valid therapist?', isValid);
      return isValid;
    } catch (error) {
      console.error('Error parsing therapist types:', error);
      // If parsing fails, check if it's a string that contains "herosjourney"
      if (typeof (user as any).isTherapist === 'string' && (user as any).isTherapist.includes('herosjourney')) {
        console.log('String contains herosjourney, granting access');
        return true;
      }
      return false;
    }
  }
  
  return false;
};

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Debug user values
  useEffect(() => {
    if (user) {
      console.log('User isAdmin value:', (user as any).isAdmin);
      console.log('User isAdmin type:', typeof (user as any).isAdmin);
      console.log('User isTherapist value:', (user as any).isTherapist);
      console.log('User isTherapist type:', typeof (user as any).isTherapist);
    }
  }, [user]);
  
  // State for dropdown menus
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [specialistsDropdownOpen, setSpecialistsDropdownOpen] = useState(false);
  
  // Refs for dropdown menus (for click outside detection)
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const specialistsDropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
        setResourcesDropdownOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
      if (specialistsDropdownRef.current && !specialistsDropdownRef.current.contains(event.target as Node)) {
        setSpecialistsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Close dropdowns when route changes
  useEffect(() => {
    // Only close menus after navigation is complete
    if (mobileMenuOpen || resourcesDropdownOpen || accountDropdownOpen || specialistsDropdownOpen) {
      setResourcesDropdownOpen(false);
      setAccountDropdownOpen(false);
      setSpecialistsDropdownOpen(false);
      setMobileMenuOpen(false);
    }
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
              
              {/* Circles Link */}
              <Link href="/circles" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium relative">
                Circles
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[10px] text-yellow-500 dark:text-yellow-400 whitespace-nowrap font-medium">coming soon</span>
              </Link>
              
              {/* Bridges Link */}
              <Link href="/bridges" className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium">
                Bridges
              </Link>
              
              {/* Our Specialists Dropdown */}
              <div className="relative" ref={specialistsDropdownRef}>
                <button 
                  className="text-foreground/70 hover:text-[var(--primary)] px-3 py-2 text-sm font-medium flex items-center"
                  onClick={() => setSpecialistsDropdownOpen(!specialistsDropdownOpen)}
                >
                  Our Specialists
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ml-1 transition-transform ${specialistsDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {specialistsDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[var(--background-alt)] ring-1 ring-black/5 dark:ring-white/10 z-50">
                    <div className="py-1">
                      <Link 
                        href="/specialists/herosjourney" 
                        className="block px-4 py-2 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] border-l-2 border-[var(--accent)]"
                      >
                        Hero's Journey Specialist <span className="ml-1 text-xs bg-[var(--accent)]/20 px-1.5 py-0.5 rounded-full">Partner</span>
                      </Link>
                      <Link 
                        href="/specialists/generalist" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Generalist
                      </Link>
                      <Link 
                        href="/specialists/crypto" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Crypto Specialist
                      </Link>
                      <Link 
                        href="/specialists/athletes" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Athletes Specialist
                      </Link>
                      <Link 
                        href="/specialists/executives" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Executives Specialist
                      </Link>
                      <Link 
                        href="/specialists/sexologist" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Sexual Health Specialist
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
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
                        href="/features" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Features
                      </Link>
                      <Link 
                        href="/pricing" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Pricing
                      </Link>
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
                        href="/stories" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        Stories
                      </Link>
                      <Link 
                        href="/resources/for-therapists" 
                        className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                      >
                        For Therapists
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
                          href="/my-bridges" 
                          className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                        >
                          My Bridges
                        </Link>
                        <Link 
                          href="/account" 
                          className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                        >
                          Account Settings
                        </Link>
                        <hr className="my-1 border-foreground/10" />
                        {isUserTherapist(user) && (
                          <Link 
                            href="/resources/therapist-dashboard" 
                            className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                          >
                            Therapist Dashboard
                          </Link>
                        )}
                        {((user as any)?.isAdmin === true || (user as any)?.isAdmin === "true" || (user as any)?.isAdmin === 1 || (user as any)?.isAdmin === "1" || user?.email === 'nlr@universalbasiccompute.ai') && (
                          <Link 
                            href="/resources/admin" 
                            className="block px-4 py-2 text-sm text-foreground/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button 
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20"
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
                  href="/register?plan=free" 
                  className="ml-4 btn-primary text-sm px-4 py-2"
                >
                  Start Session
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
      
      {/* Mobile menu - simplified version */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[var(--background)] shadow-lg max-h-[80vh] overflow-y-auto">
            {/* Resources links - flat list instead of dropdown */}
            <div className="border-t border-foreground/10 pt-2 mt-2">
              <p className="px-3 py-1 text-xs uppercase text-foreground/40 font-semibold">Our Specialists</p>
              <Link 
                href="/specialists/herosjourney" 
                className="text-[var(--accent)] hover:text-[var(--accent)] block px-3 py-2 text-base font-medium border-l-2 border-[var(--accent)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hero's Journey Specialist <span className="ml-1 text-xs bg-[var(--accent)]/20 px-1.5 py-0.5 rounded-full">Partner</span>
              </Link>
              
              {/* Add Circles link after specialists */}
              <Link 
                href="/circles" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                Circles
                <span className="text-[10px] text-yellow-500 dark:text-yellow-400 ml-2 font-medium">coming soon</span>
              </Link>
              <Link 
                href="/bridges" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bridges
                <span className="text-[10px] text-yellow-500 dark:text-yellow-400 ml-2 font-medium">coming soon</span>
              </Link>
              <Link 
                href="/specialists/generalist" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Generalist
              </Link>
              <Link 
                href="/specialists/crypto" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Crypto Specialist
              </Link>
              <Link 
                href="/specialists/athletes" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Athletes Specialist
              </Link>
              <Link 
                href="/specialists/executives" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Executives Specialist
              </Link>
              <Link 
                href="/specialists/sexologist" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sexual Health Specialist
              </Link>
              
              <p className="px-3 py-1 text-xs uppercase text-foreground/40 font-semibold mt-2">Resources</p>
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
                About Us
              </Link>
              <Link 
                href="/blog" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/resources/library" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resource Library
              </Link>
              <Link 
                href="/faq" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/stories" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stories
              </Link>
              <Link 
                href="/resources/for-therapists" 
                className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Therapists
              </Link>
            </div>
            
            {user ? (
              <>
                {/* Account links - flat list instead of dropdown */}
                <div className="border-t border-foreground/10 pt-2 mt-2">
                  <p className="px-3 py-1 text-xs uppercase text-foreground/40 font-semibold">My Account</p>
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
                    Account Settings
                  </Link>
                  {isUserTherapist(user) && (
                    <Link 
                      href="/resources/therapist-dashboard" 
                      className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Therapist Dashboard
                    </Link>
                  )}
                  {((user as any)?.isAdmin === true || (user as any)?.isAdmin === "true" || (user as any)?.isAdmin === 1 || (user as any)?.isAdmin === "1" || user?.email === 'nlr@universalbasiccompute.ai') && (
                    <Link 
                      href="/resources/admin" 
                      className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-violet-600 hover:text-violet-800 block w-full text-left px-3 py-2 text-base font-medium"
                  >
                    Sign Out
                  </button>
                </div>
                
                {pathname !== '/chat' && (
                  <div className="mt-4 pt-2 border-t border-foreground/10">
                    <Link 
                      href="/chat" 
                      className="bg-[var(--primary)] text-white block text-center rounded-md px-3 py-2 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Start Session
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="border-t border-foreground/10 pt-2 mt-2">
                <Link 
                  href="/login" 
                  className="text-foreground/70 hover:text-[var(--primary)] block px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  href="/register?plan=free" 
                  className="bg-[var(--primary)] text-white block text-center rounded-md px-3 py-2 text-base font-medium mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Session
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
