'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Create a component that uses useSearchParams
function RegisterForm() {
  const searchParams = useSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, loading, error } = useAuth();

  // Populate form fields from query parameters if available
  React.useEffect(() => {
    const emailParam = searchParams.get('email');
    const firstNameParam = searchParams.get('firstName');
    const lastNameParam = searchParams.get('lastName');
    
    if (emailParam) setEmail(emailParam);
    if (firstNameParam) setFirstName(firstNameParam);
    if (lastNameParam) setLastName(lastNameParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Registration form submitted with email:', email);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    await register(email, firstName, lastName, password);
    console.log('Registration function completed');
    // After successful registration, the user will be automatically redirected to the dashboard
    // by the register function in the AuthContext
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Account</h1>
      
      {error && (
        <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
          
          <form onSubmit={handleSubmit} className="card p-6 shadow-depth">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                required
                minLength={8}
              />
              <p className="text-xs text-foreground/60 mt-1">
                Must be at least 8 characters
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 border ${
                  passwordError ? 'border-red-500' : 'border-black/10 dark:border-white/10'
                } rounded-lg`}
                required
              />
              {passwordError && (
                <p className="text-xs text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
      <div className="mt-6 text-center">
        <p>
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--primary)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function Register() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <Suspense fallback={<div className="max-w-md mx-auto text-center">Loading registration form...</div>}>
          <RegisterForm />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}
